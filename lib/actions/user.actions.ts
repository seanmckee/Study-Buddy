"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeQuiz } from "../ai/gemini";

export async function newSession({
  name,
  description,
  text,
  currentUserId,
}: {
  name: string;
  description: string;
  text: string;
  currentUserId: string;
}) {
  const supabase = createClient();
  const { error } = await supabase.from("review_sessions").insert({
    user_id: currentUserId,
    name: name,
    description: description,
    document_text: text,
  });
  revalidatePath("/dashboard");
}

// get individual session by id
export async function getSession(sessionId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("review_sessions")
    .select("*")
    .eq("id", sessionId)
    .single();
  return data;
}

// get all sessions for a user
export async function getSessions() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");
  const { data, error } = await supabase
    .from("review_sessions")
    .select("*")
    .eq("user_id", user.id);
  if (error) {
    console.error("Error fetching sessions:", error.message);
  }
  return data;
}

// delete a session
export async function deleteSession(sessionId: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("review_sessions")
    .delete()
    .eq("id", sessionId);
  if (error) {
    console.error("Error deleting session:", error.message);
  }
  revalidatePath("/dashboard");
}

// edit a sessions name and description
export async function updateSession(
  name: string,
  description: string,
  sessionId: string
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("review_sessions")
    .update({ name, description })
    .eq("id", sessionId);
  if (error) {
    console.error("Error updating session:", error.message);
  }
  revalidatePath("/dashboard");
}

// generate a quiz from document text

// export const generateQuiz = async (id: string) => {
//   "use server";
//   const session = await getSession(id);
//   try {
//     const quiz = await writeQuiz(session.document_text, 5);
//     const quizJSON = JSON.parse(quiz);
//     return quizJSON;
//     // quizExists = true;
//   } catch (error) {
//     console.error("Error parsing quiz:", error);
//   }
// };
// export const generateQuiz = async (
//   setQuiz: React.Dispatch<React.SetStateAction<any>>,
//   setQuizJSON: React.Dispatch<React.SetStateAction<any>>,
//   session: any,
//   quiz: any
// ) => {
//   // "use server";
//   setQuiz(await writeQuiz(session.document_text, 5));
//   setQuizJSON(JSON.parse(quiz));
// };
