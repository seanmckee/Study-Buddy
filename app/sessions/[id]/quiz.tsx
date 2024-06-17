"use client";
import { Button } from "@/components/ui/button";
import { updateMasteryLevel } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface QuizProps {
  generateQuiz: () => Promise<any>;
  sessionId: string;
}

const Quiz: React.FC<QuizProps> = ({ generateQuiz, sessionId }) => {
  let router = useRouter();

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
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const getQuiz = async () => {
    setLoading(true); // Start loading
    setSubmitted(false);
    try {
      const newQuiz = await generateQuiz();
      if (newQuiz) {
        setQuiz(newQuiz);
        console.log(newQuiz);
        setSelectedAnswers(new Array(newQuiz.questions?.length).fill(null));
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const onSubmit = async () => {
    if (selectedAnswers.includes(null)) {
      toast.error("Please answer all questions before submitting");
      return;
    }
    const correctAnswers = quiz.questions.map((question: any, i: number) => {
      return question.correct_answer_index === selectedAnswers[i] ? 1 : 0;
    });
    const score = correctAnswers.reduce((acc: any, curr: any) => acc + curr, 0);
    try {
      await updateMasteryLevel(sessionId, score, quiz.questions.length);
      toast.success(`You scored ${score}/${quiz.questions.length}`);
      setSubmitted(true);
      setLoading(false); // Stop loading
      // Optional: router.refresh();
    } catch (error: any) {
      console.error("Error updating mastery level:", error.message);
      toast.error("Failed to update mastery level");
    }
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center">
      <Toaster />
      <div className="flex-shrink-0 mb-5">
        <Button onClick={(e) => getQuiz()} size="lg" disabled={loading}>
          {loading ? "Generating..." : "Generate Quiz"}
        </Button>
      </div>

      {loading ? (
        <div className="text-center mt-8">
          <p className="text-gray-600">Generating Quiz...</p>
          {/* You can add a spinner or any loading animation here */}
        </div>
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg w-full sm:w-auto">
          {quiz.questions?.map((question: any, i: number) => (
            <div key={i} className="space-y-2 py-2">
              <p className="text-lg font-medium text-gray-900">
                {question.text}
              </p>
              <div className="space-y-2 mt-2">
                {question.answers?.map((answer: string, j: number) => (
                  <div key={j} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${i}`}
                      id={`question-${i}-answer-${j}`}
                      checked={selectedAnswers[i] === j}
                      onChange={() => handleAnswerChange(i, j)}
                      disabled={submitted || loading}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`question-${i}-answer-${j}`}
                      className={
                        submitted && question.correct_answer_index === j
                          ? "bg-green-100 border-gray-300 rounded"
                          : submitted && j === selectedAnswers[i]
                          ? "bg-red-100 border-gray-300 rounded"
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
      )}

      <div className="flex flex-col items-center mt-5">
        <Button onClick={onSubmit} size="lg" disabled={submitted || loading}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
