import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      {/* Hey, {user.email}! */}
      <form action={signOut}>
        <button className="text-sm font-medium hover:underline underline-offset-4 ">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/dashboard"
      className="text-sm font-medium hover:underline underline-offset-4 "
    >
      Login
    </Link>
  );
}
