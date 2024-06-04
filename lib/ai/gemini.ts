const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// ...

// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface QuizData {
  questions: Question[];
  all_correct_answers: number[];
}

interface Question {
  text: string;
  answers: string[];
  correct_answer_index: number;
}

const quizData: QuizData = {
  questions: [
    {
      text: "What is the capital of France?",
      answers: ["London", "Berlin", "Paris", "Madrid"],
      correct_answer_index: 2,
    },
    {
      text: "What is the tallest mountain in the world?",
      answers: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
      correct_answer_index: 0,
    },
  ],
  all_correct_answers: [2, 0],
};

// Generate text from a prompt
export async function writeQuiz(document_text: string, quiz_length: number) {
  const prompt =
    "Write a quiz based on the following document: " +
    document_text +
    " with " +
    quiz_length +
    " questions. Make it multiple choice. Format it in JSON and include the correct answer index at the bottom" +
    `. Format the JSON as follows: ${JSON.stringify(
      quizData
    )}}. Do not add any additional punctuation or formatting towards the beginning or end of the JSON`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}
