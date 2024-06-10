import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/actions/user.actions";
import { writeQuiz } from "@/lib/ai/gemini";
import React, { use, useEffect, useState } from "react";
import GenerateQuizButton from "./generate-button";
import Quiz from "./quiz";

const page = async ({ params: { id } }: any) => {
  const session = await getSession(id);

  let quizJSON = {
    questions: [
      {
        text: "Generate a quiz to see questions",
        answers: [],
        correct_answer_index: 0,
      },
    ],
    all_correct_answers: [],
  };

  const generateQuiz = async () => {
    "use server";
    try {
      const quiz = JSON.parse(await writeQuiz(session.document_text, 5));
      return quiz;
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {session.name}
          </h1>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
            {session.description}
          </p>
        </div>
      </div>
      <GenerateQuizButton generateQuiz={generateQuiz} />
      {/* <Quiz quizJSON={quizJSON} /> */}
    </div>
  );
};

export default page;
