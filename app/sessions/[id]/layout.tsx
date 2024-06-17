import AuthButton from "@/components/AuthButton";
import { Book } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { Suspense } from "react";
import Loading from "./loading";
import Link from "next/link";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
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
    <section>
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between w-screen">
        <div className="flex items-center justify-center">
          <Link href="/dashboard">
            <Book className="h-6 w-6" />
          </Link>
          <span className="sr-only">Study Buddy</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <div className="text-sm font-medium hover:underline underline-offset-4 ">
            {isSupabaseConnected && <AuthButton />}
          </div>
        </nav>
      </header>

      <Suspense fallback={<Loading />}>{children}</Suspense>
      {/* {children} */}
    </section>
  );
}
