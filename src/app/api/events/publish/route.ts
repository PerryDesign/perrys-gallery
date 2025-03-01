import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { publishEventbriteEvent } from "@/utils/eventbrite";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // Get the current user to verify authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { message: "You must be logged in to publish an event" },
      { status: 401 }
    );
  }

  try {
    const { eventId } = await request.json();

    if (!eventId) {
      return NextResponse.json(
        { message: "Event ID is required" },
        { status: 400 }
      );
    }

    // Get the event from the database
    const { data: event, error: fetchError } = await supabase
      .from("events")
      .select("*")
      .eq("id", eventId)
      .single();

    if (fetchError || !event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    // Check if the event has an Eventbrite ID
    if (!event.eventbrite_id) {
      return NextResponse.json(
        { message: "Event does not have an associated Eventbrite event" },
        { status: 400 }
      );
    }

    // Publish the event in Eventbrite
    try {
      const eventbriteResponse = await publishEventbriteEvent(
        event.eventbrite_id
      );

      // Update the event status in the database
      const { error: updateError } = await supabase
        .from("events")
        .update({ status: "published" })
        .eq("id", eventId);

      if (updateError) {
        console.error("Error updating event status:", updateError);
        return NextResponse.json(
          { message: `Failed to update event status: ${updateError.message}` },
          { status: 500 }
        );
      }

      // Revalidate the events page to show the updated event
      revalidatePath("/events");
      revalidatePath("/admin/dashboard");

      return NextResponse.json(
        {
          success: true,
          status: "published",
          eventbrite_url: event.eventbrite_url,
        },
        { status: 200 }
      );
    } catch (eventbriteError) {
      console.error("Error publishing Eventbrite event:", eventbriteError);
      return NextResponse.json(
        {
          message: `Failed to publish event on Eventbrite: ${eventbriteError}`,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
