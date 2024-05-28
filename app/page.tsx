import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import Link from "next/link";
import { Book, CheckIcon } from "lucide-react";
import studyImage from "../public/study.jpg";
import writingImage from "../public/writing.jpg";

import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  CardContent,
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    // <div className="flex-1 w-full flex flex-col gap-20 items-center">
    //   <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
    //     <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
    //       <DeployButton />
    //       {isSupabaseConnected && <AuthButton />}
    //     </div>
    //   </nav>

    //   <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
    //     <Header />
    //     <main className="flex-1 flex flex-col gap-6">
    //       <h2 className="font-bold text-4xl mb-4">Next steps</h2>
    //       {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
    //     </main>
    //   </div>

    //   <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
    //     <p>
    //       Powered by{" "}
    //       <a
    //         href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
    //         target="_blank"
    //         className="font-bold hover:underline"
    //         rel="noreferrer"
    //       >
    //         Supabase
    //       </a>
    //     </p>
    //   </footer>
    // </div>
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Book className="h-6 w-6" />
          <span className="sr-only">Study Buddy</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Testimonials
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4 "
            href="#"
          >
            Contact
          </Link>

          {/* <Link
            className="inline-flex h-8 items-center justifty-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            // inline-flex h-8 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300
            href="#"
          >
            Login
          </Link> */}
          <div className="text-sm font-medium hover:underline underline-offset-4 ">
            {isSupabaseConnected && <AuthButton />}
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unlock Your Potential with Study Buddy
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Streamline your study process with our powerful PDF-to-quiz
                    generator. Upload your materials, and let Study Buddy create
                    personalized quizzes to help you master the content.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Get Started
                  </Link>
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <Image
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                height="550"
                src={studyImage}
                width="550"
              />
            </div>
          </div>
        </section>
        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
          id="features"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Streamline Your Study Process
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Study Buddy offers a suite of powerful features to help you
                  master your course materials and ace your exams.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                alt="Features"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src={writingImage}
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">PDF Uploader</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Easily upload your course materials and let Study Buddy
                        handle the rest.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Quiz Generator</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Our AI-powered quiz generator creates personalized
                        assessments to test your knowledge.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Progress Tracking</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Monitor your progress and identify areas for improvement
                        with our comprehensive analytics.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" id="testimonials">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                What Our Users Say
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Hear from our satisfied customers about how Study Buddy has
                transformed their study experience.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <Card>
                <CardContent>
                  <blockquote className="text-lg font-semibold leading-snug">
                    “Study Buddy has been a game-changer for my studies. The
                    quiz generator is incredibly accurate and helps me identify
                    my weak areas.”
                  </blockquote>
                  <div className="mt-4 flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/avatars/01.png" />
                      <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Sofia Davis</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        University Student
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <blockquote className="text-lg font-semibold leading-snug">
                    “I was struggling with my coursework, but Study Buddy helped
                    me stay organized and on track. The progress tracking
                    feature is invaluable.”
                  </blockquote>
                  <div className="mt-4 flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/avatars/02.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">James Doe</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Graduate Student
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section
          className="w-full py-12 md:py-24 lg:py-32 border-t"
          id="pricing"
        >
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Unlock Your Potential with Study Buddy
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Study Buddy is a free service to help you master your course
                materials.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <Card>
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  {/* <CardDescription>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl font-bold">$0</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        /month
                      </span>
                    </div>
                  </CardDescription> */}
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <li className="flex items-center space-x-2">
                      <CheckIcon className="h-4 w-4 text-green-500" />
                      <span>1 PDF upload per month</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckIcon className="h-4 w-4 text-green-500" />
                      <span>Basic quiz generation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckIcon className="h-4 w-4 text-green-500" />
                      <span>Progress tracking</span>
                    </li>
                  </ul>
                  <Button className="w-full" variant="secondary">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section
          className="w-full py-12 md:py-24 lg:py-32 border-t"
          id="contact"
        >
          <div className="container grid items-center justify-center gap-4 px-4 md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Have a question or feedback? We'd love to hear from you.
              </p>
            </div>
            <form className="mx-auto w-full max-w-md space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Your email" type="email" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message" />
              </div>
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
