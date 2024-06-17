"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { newSession } from "@/lib/actions/user.actions";
import { createClient } from "@/utils/supabase/client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import pdfToText from "react-pdftotext";

const CreateSession = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState<string>("");

  const supabase = createClientComponentClient();
  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  };

  useEffect(() => {
    getUser()
      .then((userData) => {
        if (userData) {
          setCurrentUserId(userData.id);
        } else {
          console.error("User data is null.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

  function extractText(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      pdfToText(file)
        .then((text) => setText(text))
        .catch((error) => console.error("Failed to extract text from pdf"));
    }
  }

  const onSubmit = async () => {
    console.log("name: " + name + " description: " + description);
    newSession({ name, description, text, currentUserId });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="bg-gray-900 text-gray-50 hover:bg-gray-600 hover:-text-gray-50"
            size="sm"
            variant="outline"
          >
            New Review Session
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Review Session</DialogTitle>
            <DialogDescription>
              Enter your Review Session information here. Click create when
              you're done
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter Session Name"
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid gap-4 py-4">
              <Label htmlFor="description" className="text-left">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter Description Here"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid gap-4 py-4">
              {/* <DragDrop /> */}
              <input type="file" onChange={extractText} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogTrigger asChild>
              <Button onClick={onSubmit} type="submit">
                Create
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateSession;
