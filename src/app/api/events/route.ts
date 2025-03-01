import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createEventbriteEvent } from "@/utils/eventbrite";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // Get the current user to verify authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { message: "You must be logged in to create an event" },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();

    // Extract form data
    const eventData = {
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      start_time: formData.get("start_time") as string,
      end_time: formData.get("end_time") as string,
      description: formData.get("description") as string,
      event_type: formData.get("event_type") as string,
    };

    // Validate required fields
    const requiredFields = [
      "title",
      "date",
      "start_time",
      "end_time",
      "description",
      "event_type",
    ];

    for (const field of requiredFields) {
      if (!eventData[field as keyof typeof eventData]) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create the event in Eventbrite
    let eventbriteEventId = null;
    let eventbriteEventUrl = null;

    try {
      // Only create Eventbrite event if the environment variables are set
      if (
        process.env.EVENTBRITE_API_KEY &&
        process.env.EVENTBRITE_ORGANIZATION_ID
      ) {
        const eventbriteResponse = await createEventbriteEvent(eventData);

        if (eventbriteResponse && eventbriteResponse.id) {
          eventbriteEventId = eventbriteResponse.id;
          eventbriteEventUrl = eventbriteResponse.url;
        }
      }
    } catch (eventbriteError) {
      console.error("Error creating Eventbrite event:", eventbriteError);
      throw new Error("Error creating Eventbrite event", {
        cause: eventbriteError,
      });
    }

    // Insert the event into the database with Eventbrite information if available
    const { error } = await supabase.from("events").insert({
      ...eventData,
      eventbrite_id: eventbriteEventId,
      eventbrite_url: eventbriteEventUrl,
    });

    if (error) {
      console.error("Error creating event:", error);
      return NextResponse.json(
        { message: `Failed to create event: ${error.message}` },
        { status: 500 }
      );
    }

    // Revalidate the events page to show the new event
    revalidatePath("/events");
    revalidatePath("/admin/dashboard");

    return NextResponse.json(
      {
        success: true,
        eventbrite_id: eventbriteEventId,
        eventbrite_url: eventbriteEventUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
