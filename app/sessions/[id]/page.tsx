import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/actions/user.actions";
import { writeQuiz } from "@/lib/ai/gemini";
import React from "react";

const page = async ({ params: { id } }: any) => {
  const session = await getSession(id);
  const quiz = await writeQuiz(session.document_text, 5);
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
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold">
              Sample Multiple Choice Questions
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">{quiz}</p>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">
                What is the capital of France?
              </h3>
              <div className="mt-2 space-y-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
