import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/actions/user.actions";
import { writeQuiz } from "@/lib/ai/gemini";
import React, { Suspense, use, useEffect, useState } from "react";
import Quiz from "./quiz";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const page = async ({ params: { id } }: any) => {
  const session = await getSession(id);

  const supabase = createClient();
  // const [file, setFile] = useState(null);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

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
    <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 py-3">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="space-y-4">
          <div className="flex flex-col justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center">
              {session.name}
            </h1>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-28 h-28 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {session.correct_answers && session.total_answers
                  ? Math.round(
                      (session.correct_answers / session.total_answers) *
                        100 *
                        10
                    ) / 10
                  : 0}
                %
              </span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            {session.description}
          </p>
          <Quiz sessionId={session.id} generateQuiz={generateQuiz} />
          {/* <div className="flex justify-end">
            <Button >Submit</Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

// <div className="max-w-3xl px-4 py-12 md:px-6 md:py-16 lg:py-20">
//   <div className="space-y-6">
//     <div className="">
//       <h1 className="text-4xl font-bold tracking-tight sm:text-4xl">
//         {session.name}
//       </h1>
//       <p className="text-sm text-gray-500">
//         {session.correct_answers && session.total_answers
//           ? Math.round(
//               (session.correct_answers / session.total_answers) * 100 * 10
//             ) / 10
//           : 0}{" "}
//         % Mastery
//       </p>
//       <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
//         {session.description}
//       </p>
//     </div>
//   </div>
//   {/* <GenerateQuizButton sessionId={session.id} generateQuiz={generateQuiz} /> */}
//   {/* <Quiz quizJSON={quizJSON} /> */}
//   <Suspense fallback={<div>Loading...</div>}>
//     <Quiz sessionId={session.id} generateQuiz={generateQuiz} />
//   </Suspense>
// </div>

export default page;
