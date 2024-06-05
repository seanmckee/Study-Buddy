"use client";

import { Button } from "@/components/ui/button";
import React from "react";

const Questions = (session: any, quizJSON: any) => {
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
        <div className="flex justify-center">
          <Button size="lg">Generate Quiz</Button>
          {/* <GenerateQuizButton generateQuiz={generateQuiz} /> */}
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold">Multiple Choice Questions</h2>
            <div className="mt-2 text-gray-500 dark:text-gray-400">
              {quizJSON.questions.map((question: any, i: number) => (
                <div key={i} className="space-y-2">
                  <p className="font-bold">{question.text}</p>
                  <div className="space-y-2">
                    {question.answers.map((answer: string, j: number) => (
                      <div key={j} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`question-${i}`}
                          id={`question-${i}-answer-${j}`}
                        />
                        <label htmlFor={`question-${i}-answer-${j}`}>
                          {answer}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex justify-center">
                <Button size="lg" className="mt-6">
                  Submit
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-4 m-auto">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
