"use client";

import { Button } from "@/components/ui/button";
import React from "react";

const Quiz = (quizJSON: any) => {
  //   console.log(quizJSON.quizJSON.questions);
  return (
    <div>
      {quizJSON.quizJSON.questions.map((question: any, i: number) => (
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
    // <div>{quizJSON.quizJSON.questions[0].text}</div>
  );
};

export default Quiz;
