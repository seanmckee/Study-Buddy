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
import { useState } from "react";
import DragDrop from "@/components/DragDrop";

export default async function Component() {
  const supabase = createClient();

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
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
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
                    className="col-span-3"
                  />
                </div>

                <div className="grid gap-4 py-4">
                  <DragDrop />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent>
            <h2 className="text-xl font-bold mb-2">Biology Quiz</h2>
            <p className="text-gray-500 mb-4">
              A comprehensive quiz covering the fundamentals of biology.
            </p>
            <div className="text-gray-400 text-sm">Created on May 15, 2023</div>
          </CardContent>
          <CardFooter>
            <Button
              className="bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              size="sm"
              variant="outline"
            >
              View
            </Button>
            <Button
              className="bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              size="sm"
              variant="outline"
            >
              Edit
            </Button>
            <Button
              className="bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              size="sm"
              variant="outline"
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-xl font-bold mb-2">History of Art</h2>
            <p className="text-gray-500 mb-4">
              A quiz that explores the evolution of art throughout history.
            </p>
            <div className="text-gray-400 text-sm">
              Created on April 28, 2023
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              size="sm"
              variant="outline"
            >
              View
            </Button>
            <Button
              className="bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              size="sm"
              variant="outline"
            >
              Edit
            </Button>
            <Button
              className="bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              size="sm"
              variant="outline"
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-xl font-bold mb-2">Introduction to Python</h2>
            <p className="text-gray-500 mb-4">
              A beginner-friendly quiz to test your knowledge of Python
              programming.
            </p>
            <div className="text-gray-400 text-sm">
              Created on March 12, 2023
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              size="sm"
              variant="outline"
            >
              View
            </Button>
            <Button
              className="bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              size="sm"
              variant="outline"
            >
              Edit
            </Button>
            <Button
              className="bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              size="sm"
              variant="outline"
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-xl font-bold mb-2">Geography Trivia</h2>
            <p className="text-gray-500 mb-4">
              A fun quiz to test your knowledge of world geography.
            </p>
            <div className="text-gray-400 text-sm">
              Created on February 22, 2023
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              size="sm"
              variant="outline"
            >
              View
            </Button>
            <Button
              className="bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              size="sm"
              variant="outline"
            >
              Edit
            </Button>
            <Button
              className="bg-gray-900 text-gray-50 hover:bg-gray-900/90 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              size="sm"
              variant="outline"
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
