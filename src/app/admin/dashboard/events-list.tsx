import { createClient } from "@/utils/supabase/server";
import { deleteEvent, publishEvent } from "../actions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExternalLink } from "lucide-react";

// Helper function to format date
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Helper function to strip HTML tags and truncate text
function stripHtmlAndTruncate(html: string, maxLength: number = 100): string {
  // Simple regex to strip HTML tags
  const strippedText = html.replace(/<[^>]*>/g, "");

  // Truncate the text
  if (strippedText.length <= maxLength) {
    return strippedText;
  }

  return strippedText.substring(0, maxLength) + "...";
}

export default async function EventsList() {
  const supabase = await createClient();

  // Fetch all events from the database
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching events:", error);
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error loading events. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!events || events.length === 0) {
    return (
      <Alert>
        <AlertDescription className="text-gray-500 italic">
          No events have been created yet.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Current Events</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of all upcoming events.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>{formatDate(event.date)}</TableCell>
                <TableCell>
                  {event.start_time} - {event.end_time}
                </TableCell>
                <TableCell>{event.event_type}</TableCell>
                <TableCell>
                  {event.status === "published" ? (
                    <span className="text-green-600 font-medium">
                      Published
                    </span>
                  ) : (
                    <span className="text-amber-600 font-medium">Draft</span>
                  )}
                  {event.eventbrite_url && (
                    <a
                      href={event.eventbrite_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 inline-flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  )}
                </TableCell>
                <TableCell className="space-x-2">
                  {event.eventbrite_id && event.status !== "published" && (
                    <form
                      className="inline-block"
                      action={async () => {
                        "use server";
                        await publishEvent(event.id);
                      }}
                    >
                      <Button
                        type="submit"
                        size="sm"
                        variant="outline"
                        className="mr-2"
                      >
                        Publish
                      </Button>
                    </form>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete the event "{event.title}".
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <form
                          action={async () => {
                            "use server";
                            await deleteEvent(event.id);
                          }}
                        >
                          <Button type="submit" variant="destructive">
                            Delete
                          </Button>
                        </form>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
