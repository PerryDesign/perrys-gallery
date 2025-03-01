"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/admin?error=" + error.message);
  }

  redirect("/admin/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin");
}

export async function createEvent(formData: FormData) {
  const supabase = await createClient();

  // Get the current user to verify authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("You must be logged in to create an event");
  }

  // Extract form data
  const eventData = {
    title: formData.get("title") as string,
    date: formData.get("date") as string,
    start_time: formData.get("start_time") as string,
    end_time: formData.get("end_time") as string,
    description: formData.get("description") as string,
    event_type: formData.get("event_type") as string,
    button_text: "RSVP",
  };

  // Insert the event into the database
  const { error } = await supabase.from("events").insert(eventData);

  if (error) {
    console.error("Error creating event:", error);
    throw new Error(`Failed to create event: ${error.message}`);
  }

  // Revalidate the events page to show the new event
  revalidatePath("/events");
  revalidatePath("/admin/dashboard");

  return { success: true };
}

export async function deleteEvent(eventId: string) {
  const supabase = await createClient();

  // Get the current user to verify authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("You must be logged in to delete an event");
  }

  // Delete the event from the database
  const { error } = await supabase.from("events").delete().eq("id", eventId);

  if (error) {
    console.error("Error deleting event:", error);
    throw new Error(`Failed to delete event: ${error.message}`);
  }

  // Revalidate the events page to show the updated list
  revalidatePath("/events");
  revalidatePath("/admin/dashboard");

  return { success: true };
}

export async function publishEvent(eventId: string) {
  const supabase = await createClient();

  // Get the current user to verify authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("You must be logged in to publish an event");
  }

  try {
    // Call the publish API endpoint
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/publish`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to publish event");
    }

    // Revalidate the events page to show the updated status
    revalidatePath("/events");
    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error publishing event:", error);
    throw error;
  }
}
