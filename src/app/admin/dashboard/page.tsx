import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { logout } from "../actions";
import AddEventForm from "./add-event";
import EventsList from "./events-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 pt-24 md:pt-40">
      <div className="max-w-7xl mx-auto">
        <Card className="border shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-2xl font-bold">
                Admin Dashboard
              </CardTitle>
              <CardDescription className="text-gray-600 mt-1">
                Welcome, {user.email}
              </CardDescription>
            </div>
            <form
              action={async () => {
                "use server";
                await logout();
              }}
            >
              <Button type="submit" variant="destructive">
                Logout
              </Button>
            </form>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold mb-6">Event Management</h2>
                <AddEventForm />
                <EventsList />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
