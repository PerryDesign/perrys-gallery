/**
 * Eventbrite API integration
 *
 * This file contains functions to interact with the Eventbrite API
 * for creating and managing events.
 */

// Eventbrite API base URL
const EVENTBRITE_API_BASE = "https://www.eventbriteapi.com/v3";

/**
 * Create a new event in Eventbrite
 *
 * @param eventData - The event data from our application
 * @returns The created Eventbrite event data
 */
export async function createEventbriteEvent(eventData: {
  title: string;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  event_type: string;
}) {
  const apiKey = process.env.EVENTBRITE_API_KEY;
  const organizationId = process.env.EVENTBRITE_ORGANIZATION_ID;

  if (!apiKey || !organizationId) {
    throw new Error("Eventbrite API key or organization ID not configured");
  }

  // Format the start and end times for Eventbrite
  // Eventbrite expects ISO 8601 format: YYYY-MM-DDThh:mm:ssZ
  const startDateTime = `${eventData.date}T${eventData.start_time}:00Z`;
  const endDateTime = `${eventData.date}T${eventData.end_time}:00Z`;

  // Prepare the event payload for Eventbrite
  const eventbritePayload = {
    event: {
      name: {
        html: eventData.title,
      },
      description: {
        html: eventData.description,
      },
      start: {
        timezone: "America/New_York", // You may want to make this configurable
        utc: startDateTime,
      },
      end: {
        timezone: "America/New_York", // You may want to make this configurable
        utc: endDateTime,
      },
      currency: "USD",
      online_event: false,
      //   organizer_id: organizationId,
      listed: true,
      shareable: true,
      invite_only: false,
      show_remaining: true,
      capacity: 100, // You may want to make this configurable
      is_reserved_seating: false,
      is_series: false,
      locale: "en_US",
    },
  };

  try {
    const response = await fetch(
      `${EVENTBRITE_API_BASE}/organizations/${organizationId}/events/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventbritePayload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Eventbrite API error: ${JSON.stringify(errorData)}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating Eventbrite event:", error);
    throw error;
  }
}

/**
 * Map our event types to Eventbrite category IDs
 *
 * @param eventType - The event type from our application
 * @returns The corresponding Eventbrite category ID
 */
function getCategoryId(eventType: string): string {
  // Eventbrite category IDs: https://www.eventbrite.com/platform/api#/reference/category/list/list-categories
  const categoryMap: Record<string, string> = {
    exhibition: "105", // Visual Arts
    workshop: "101", // Business & Professional
    opening: "105", // Visual Arts
    talk: "102", // Science & Technology
    performance: "103", // Music
    other: "199", // Other
  };

  return categoryMap[eventType.toLowerCase()] || "199"; // Default to 'Other'
}

/**
 * Publish an event in Eventbrite
 *
 * @param eventbriteId - The ID of the event in Eventbrite
 * @returns The published Eventbrite event data
 */
export async function publishEventbriteEvent(eventbriteId: string) {
  const apiKey = process.env.EVENTBRITE_API_KEY;

  if (!apiKey) {
    throw new Error("Eventbrite API key not configured");
  }

  try {
    const response = await fetch(
      `${EVENTBRITE_API_BASE}/events/${eventbriteId}/publish/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Eventbrite API error: ${JSON.stringify(errorData)}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error publishing Eventbrite event:", error);
    throw error;
  }
}
