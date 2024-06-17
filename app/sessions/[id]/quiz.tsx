"use client";

import { Button } from "@/components/ui/button";
import { updateMasteryLevel } from "@/lib/actions/user.actions";
import { fdatasyncSync } from "fs";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import React, { Suspense, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface QuizProps {
  generateQuiz: () => Promise<any>;
  sessionId: string;
}

const Quiz: React.FC<QuizProps> = ({ generateQuiz, sessionId }) => {
  const [quiz, setQuiz] = useState<any>({
    questions: [
      {
        text: "Generate a quiz to see questions",
        answers: [],
        correct_answer_index: 0,
      },
    ],
    all_correct_answers: [],
  });

  const router = useRouter();

  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const getQuiz = async () => {
    const newQuiz = await generateQuiz();
    if (newQuiz) {
      setQuiz(newQuiz);
      setSubmitted(false);
      setSelectedAnswers(new Array(newQuiz.questions?.length).fill(null));
    }
  };
  {
  }
  const onSubmit = async () => {
    if (selectedAnswers.includes(null)) {
      toast.error("Please answer all questions before submitting");
      return;
    }
    const correctAnswers = quiz.questions.map((question: any, i: number) => {
      return question.correct_answer_index === selectedAnswers[i] ? 1 : 0;
    });
    const score = correctAnswers.reduce((acc: any, curr: any) => acc + curr, 0);
    console.log({ correctAnswers, score });
    try {
      await updateMasteryLevel(sessionId, score, quiz.questions.length);
      console.log("updated mastery");
    } catch (error: any) {
      console.error("Error updating mastery level:", error.message);
    }
    // updateMasteryLevel(score, quiz.questions.length);

    toast.success(`You scored ${score}/${quiz.questions.length}`);
    setSubmitted(true);
    router.refresh();
    // return { correctAnswers, score };
  };
  return (
    <div className=" flex flex-col items-center">
      <Toaster />
      <div className="flex-shrink-0 mb-5">
        <Button className="" onClick={(e) => getQuiz()} size="lg">
          Generate Quiz
        </Button>
      </div>

      {/* <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                What is the smallest planet in our solar system?
              </h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="question4"
                    value="a"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">Mercury</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="question4"
                    value="b"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  /> */}

      <div className="bg-gray-100 p-4 rounded-lg">
        {quiz.questions?.map((question: any, i: number) => (
          <div key={i} className="space-y-2 py-2">
            <p className="text-lg font-medium text-gray-900">{question.text}</p>
            <div className="space-y-2 mt-2">
              {question.answers?.map((answer: string, j: number) => (
                <div key={j} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`question-${i}`}
                    id={`question-${i}-answer-${j}`}
                    checked={selectedAnswers[i] === j}
                    onChange={() => handleAnswerChange(i, j)}
                    disabled={submitted}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`question-${i}-answer-${j}`}
                    className={
                      submitted && question.correct_answer_index == j
                        ? "bg-green-100 border-gray-300 rounded"
                        : submitted && j == selectedAnswers[i]
                        ? "bg-red-100  border-gray-300 rounded"
                        : ""
                    }
                  >
                    {answer}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col flex-shrink-0 items-center">
        <Button className="mt-5" onClick={onSubmit} size={"lg"}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
