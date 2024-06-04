/**
 * v0 by Vercel.
 * @see https://v0.dev/t/2bWxWGE4zoI
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";
import DragDrop from "@/components/DragDrop";
import CreateSession from "./create-session";
import { deleteSession, getSessions } from "@/lib/actions/user.actions";
import SessionCard from "./session-card";

export default async function Component() {
  const supabase = createClient();
  // const [file, setFile] = useState(null);
  const sessions = await getSessions();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Review Sessions</h1>
        <div className="flex gap-2">
          <Link
            className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md"
            href="#"
          >
            Create New Quiz
          </Link>
          <CreateSession />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sessions &&
          sessions.map((session, i) => (
            <SessionCard key={i} session={session} />
          ))}
      </div>
    </div>
  );
}
