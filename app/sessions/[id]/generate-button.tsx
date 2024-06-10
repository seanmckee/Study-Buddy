"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface GenerateQuizButtonProps {
  generateQuiz: () => void;
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

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(updatedSelectedAnswers);
    console.log(selectedAnswers);
  };

  const getQuiz = async () => {
    const quiz = await generateQuiz();
    setQuiz(quiz);
    setSelectedAnswers(new Array(quiz.questions?.length).fill(null));
  };

  const onSubmit = () => {
    console.log("submit");
  };
  return (
    <div>
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
                  />
                  <label htmlFor={`question-${i}-answer-${j}`}>{answer}</label>
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
