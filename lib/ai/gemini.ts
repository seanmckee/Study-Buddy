const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// ...

// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Generate text from a prompt
export async function writeQuiz(document_text: string, quiz_length: number) {
  const prompt =
    "Write a quiz based on the following document: " +
    document_text +
    " with " +
    quiz_length +
    " questions. Make it multiple choice. Format it in JSON and include the correct answer index at the bottom";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}
