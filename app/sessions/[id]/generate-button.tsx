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
  console.log(quiz);
  const getQuiz = async () => {
    const quiz = await generateQuiz();
    setQuiz(quiz);
  };
  return (
    <div>
      <Button onClick={(e) => getQuiz()} size="lg">
        Generate Quiz
      </Button>
      <div>
        {quiz.questions?.map((question: any, i: number) => (
          <div key={i}>
            <p>{question.text}</p>
            <div>
              {question.answers.map((answer: string, j: number) => (
                <div key={j}>
                  <input
                    type="radio"
                    name={`question-${i}`}
                    id={`question-${i}-answer-${j}`}
                  />
                  <label htmlFor={`question-${i}-answer-${j}`}>{answer}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* <div>
        {quiz.questions?.map((question: any, i: number) => (
          <div key={i}>
            <p>{question.text}</p>
            <div>
              {question.answers.map((answer: string, j: number) => (
                <div key={j}>
                  <input
                    type="radio"
                    name={`question-${i}`}
                    id={`question-${i}-answer-${j}`}
                  />
                  <label htmlFor={`question-${i}-answer-${j}`}>{answer}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default GenerateQuizButton;
