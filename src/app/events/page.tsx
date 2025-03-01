import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export const revalidate = 3600; // Revalidate this page every hour

// Helper function to format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Component to safely render HTML content
function HtmlContent({ html }: { html: string }) {
  return (
    <div
      className="prose prose-sm prose-invert max-w-none prose-headings:text-white prose-headings:font-serif prose-a:text-[#ff4b4b] hover:prose-a:text-[#ff6b6b]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default async function EventsPage() {
  const supabase = await createClient();

  // Fetch all events from the database
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  // If there's an error or no events, show the static events as fallback
  const hasEvents = !error && events && events.length > 0;

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-8 text-center">
          Upcoming Events
        </h1>

        <div className="max-w-4xl mx-auto">
          {/* Events Section */}
          <div className="space-y-6">
            {hasEvents ? (
              // Display events from the database
              events.map((event) => (
                <div
                  key={event.id}
                  className="bg-black/30 p-8 rounded-lg backdrop-blur-sm border border-white/10 hover:border-[#ff4b4b]/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <div className="text-[#ff4b4b] text-sm mb-2">
                        {formatDate(event.date)}
                      </div>
                      <h3 className="text-2xl font-serif">{event.title}</h3>
                    </div>
                    <div className="text-lg text-gray-300 mt-2 md:mt-0">
                      {event.start_time} - {event.end_time}
                    </div>
                  </div>
                  <div className="text-gray-300 mb-6">
                    <HtmlContent html={event.description} />
                  </div>
                  <Link
                    href={event.eventbrite_url}
                    className="px-6 py-2 bg-[#ff4b4b] hover:bg-[#ff6b6b] transition-colors rounded-full text-sm inline-block"
                  >
                    RSVP
                  </Link>
                </div>
              ))
            ) : (
              // Fallback static events
              <>
                <div className="bg-black/30 p-8 rounded-lg backdrop-blur-sm border border-white/10 hover:border-[#ff4b4b]/30 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <div className="text-[#ff4b4b] text-sm mb-2">
                        December 19, 2023
                      </div>
                      <h3 className="text-2xl font-serif">Grand Opening</h3>
                    </div>
                    <div className="text-lg text-gray-300 mt-2 md:mt-0">
                      4:30 PM - 10:00 PM
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Join us for drinks and entertainment as we celebrate our
                    grand opening! Experience an evening of art, music, and
                    community as we unveil our gallery space. Meet local artists
                    and enjoy complimentary refreshments while exploring our
                    inaugural exhibition.
                  </p>
                  <Link
                    href="#rsvp"
                    className="px-6 py-2 bg-[#ff4b4b] hover:bg-[#ff6b6b] transition-colors rounded-full text-sm inline-block"
                  >
                    RSVP
                  </Link>
                </div>

                <div className="bg-black/30 p-8 rounded-lg backdrop-blur-sm border border-white/10 hover:border-[#ff4b4b]/30 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <div className="text-[#ff4b4b] text-sm mb-2">
                        Weekly Event
                      </div>
                      <h3 className="text-2xl font-serif">Open Mic Night</h3>
                    </div>
                    <div className="text-lg text-gray-300 mt-2 md:mt-0">
                      Every Thursday • 7:00 PM - 9:00 PM
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Express yourself through poetry, music, or spoken word at
                    our weekly open mic sessions. Whether you&apos;re a seasoned
                    performer or trying it for the first time, our supportive
                    community welcomes all artists. Sign up early as spots fill
                    quickly!
                  </p>
                  <Link
                    href="#learn-more"
                    className="px-6 py-2 bg-[#ff4b4b] hover:bg-[#ff6b6b] transition-colors rounded-full text-sm inline-block"
                  >
                    RSVP
                  </Link>
                </div>

                <div className="bg-black/30 p-8 rounded-lg backdrop-blur-sm border border-white/10 hover:border-[#ff4b4b]/30 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <div className="text-[#ff4b4b] text-sm mb-2">
                        Monthly Event
                      </div>
                      <h3 className="text-2xl font-serif">Wine & Art Social</h3>
                    </div>
                    <div className="text-lg text-gray-300 mt-2 md:mt-0">
                      First Friday of every month • 6:00 PM - 8:00 PM
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Join us for our monthly wine tasting and art appreciation
                    evening. Each month features a carefully curated selection
                    of wines paired with discussions about featured artworks. A
                    perfect opportunity to meet fellow art enthusiasts and learn
                    about different artistic styles.
                  </p>
                  <Link
                    href="#reserve"
                    className="px-6 py-2 bg-[#ff4b4b] hover:bg-[#ff6b6b] transition-colors rounded-full text-sm inline-block"
                  >
                    RSVP
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
