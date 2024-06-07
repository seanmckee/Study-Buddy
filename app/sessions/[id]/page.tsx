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
      console.log("document text:" + session.document_text);
      const quiz = await writeQuiz(session.document_text, 5);
      console.log("quiz", quiz);
      quizJSON = JSON.parse(quiz);
      console.log("quizJSON", quizJSON);
      console.log("generating quiz", quizJSON);
    } catch (error) {
      console.error("Error parsing quiz:", error);
    }
  };

  const exampleQuiz = await writeQuiz(session.document_text, 5);
  console.log("exampleQuiz", exampleQuiz);
  const exampleQuizJSON = JSON.parse(exampleQuiz);
  console.log("exampleQuizJSON", exampleQuizJSON);

  // const exampleQuiz = await generateQuiz();
  // console.log("exampleQuiz", exampleQuiz);
  // useEffect(() => {
  //   const fetchQuiz = async () => {
  //     const quiz = await generateQuiz();
  //     setQuiz(quiz);
  //   };
  //   fetchQuiz();
  // })
  // const session = await getSession(id);
  // const quiz = await writeQuiz(session.document_text, 5);
  // const quizJSON = JSON.parse(quiz);

  // generate quiz

  return (
    <div>
      <div>
        <h1>{session.name}</h1>
        <p>{session.description}</p>
      </div>
      <GenerateQuizButton generateQuiz={generateQuiz} />
      <Quiz quizJSON={quizJSON} />
    </div>
  );
};

export default page;
