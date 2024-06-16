"use client";

import { Button } from "@/components/ui/button";
import { updateMasteryLevel } from "@/lib/actions/user.actions";
import { fdatasyncSync } from "fs";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface GenerateQuizButtonProps {
  generateQuiz: () => Promise<any>;
}

const GenerateQuizButton: React.FC<GenerateQuizButtonProps> = ({
  generateQuiz,
}) => {
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

  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(updatedSelectedAnswers);
    console.log(selectedAnswers);
  };

  const getQuiz = async () => {
    setSubmitted(false);
    const newQuiz = await generateQuiz();
    if (newQuiz) {
      setQuiz(newQuiz);

      setSelectedAnswers(new Array(newQuiz.questions?.length).fill(null));
    }
  };
  {
  }
  const onSubmit = async () => {
    if (selectedAnswers.includes(null)) {
      toast.error("Please answer all questions before submitting");
    }
    const correctAnswers = quiz.questions.map((question: any, i: number) => {
      return question.correct_answer_index === selectedAnswers[i] ? 1 : 0;
    });
    const score = correctAnswers.reduce((acc: any, curr: any) => acc + curr, 0);
    console.log({ correctAnswers, score });
    toast.success(`You scored ${score}/${quiz.questions.length}`);
    setSubmitted(true);
    updateMasteryLevel(score, quiz.questions.length);
    // return { correctAnswers, score };
  };
  return (
    <div>
      <Toaster />
      <Button
        className="flex justify-center"
        onClick={(e) => getQuiz()}
        size="lg"
      >
        Generate Quiz
      </Button>
      <div className="mt-2 text-gray-500 dark:text-gray-400">
        {quiz.questions?.map((question: any, i: number) => (
          <div key={i} className="space-y-2">
            <p className="font-bold">{question.text}</p>
            <div className="space-y-2">
              {question.answers?.map((answer: string, j: number) => (
                <div key={j} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`question-${i}`}
                    id={`question-${i}-answer-${j}`}
                    checked={selectedAnswers[i] === j}
                    onChange={() => handleAnswerChange(i, j)}
                    disabled={submitted}
                  />
                  <label
                    htmlFor={`question-${i}-answer-${j}`}
                    className={
                      submitted && question.correct_answer_index == j
                        ? "bg-green-100"
                        : submitted && j == selectedAnswers[i]
                        ? "bg-red-100"
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
        <Button onClick={onSubmit} size={"lg"}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default GenerateQuizButton;
