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

// update mastery level for a session
// adds to correct answers and total answers

export const updateMasteryLevel = async (
  session_id: string,
  correct: number,
  answered: number
) => {
  const supabase = createClient();
  try {
    // Fetch current values from Supabase
    const { data: currentData, error: fetchError } = await supabase
      .from("review_sessions")
      .select("correct_answers, total_answers")
      .eq("id", session_id)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    // Calculate new values
    const currentCorrectAnswers = currentData?.correct_answers || 0;
    const currentTotalAnswers = currentData?.total_answers || 0;

    const newCorrectAnswers = currentCorrectAnswers + correct;
    const newTotalAnswers = currentTotalAnswers + answered;

    // Update Supabase with the new values
    const { data: updateData, error: updateError } = await supabase
      .from("review_sessions")
      .update({
        correct_answers: newCorrectAnswers,
        total_answers: newTotalAnswers,
      })
      .eq("id", session_id);

    if (updateError) {
      throw updateError;
    }

    console.log("Mastery level updated successfully.");
  } catch (error: any) {
    console.error("Error updating mastery level:", error.message);
    throw error;
  }
};

// get mastery level in percentage
export const getMasteryLevel = async (session_id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("review_sessions")
    .select("correct_answers, total_answers")
    .eq("id", session_id);
  if (error) {
    console.error("Error fetching mastery level:", error.message);
  }
  return data;
};
