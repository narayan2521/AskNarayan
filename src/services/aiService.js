import { GoogleGenerativeAI } from "@google/generative-ai";
import profileData from "../data/Profile.json";
import myInfoData from "../data/MyInfo.json";

// Initialize the API client if the key is available
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
let genAI = null;

if (apiKey && apiKey !== 'your_gemini_api_key_here') {
  genAI = new GoogleGenerativeAI(apiKey);
}

// System prompt to instruct the AI on its role
const SYSTEM_INSTRUCTION = `
You are the personal AI Assistant for Narayan Prasad's portfolio website. 
Your primary goal is to answer questions about his skills, experience, projects, and education based on the provided profile context.
You should act in a professional, friendly, and enthusiastic manner.
If a user asks a general real-world question (e.g. coding help, general knowledge), you may answer it, but always try to loosely connect it back to how Narayan's skills could be helpful if relevant.

Format your responses using Markdown (e.g., **bold**, *italics*, bullet points) for readability. Keep responses concise unless asked for details.

If the user asks something that is highly relevant to one of the main sections of the website (about, experience, skills, projects, education, contact), 
you can optionally output a special token at the VERY END of your response to tell the UI to redirect them. 
The tokens are: [REDIRECT:about], [REDIRECT:experience], [REDIRECT:skills], [REDIRECT:projects], [REDIRECT:education], [REDIRECT:contact]. 
For example: "Narayan has built several amazing applications! [REDIRECT:projects]"

Here is all the data about Narayan (from Profile):
${JSON.stringify(profileData, null, 2)}

Here is additional detailed information about Narayan's background, strengths, and specific AI rules (from MyInfo):
${JSON.stringify(myInfoData, null, 2)}
`;

export const getAIResponse = async (userMessage, history) => {
  if (!genAI) {
    return "Oops! The Gemini API key is not configured yet. Please add your `VITE_GEMINI_API_KEY` to the `.env` file.";
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    // Convert our internal history format to Gemini's expected format
    let formattedHistory = history.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    // Gemini API requires the first message in history to be from a 'user'
    const firstUserIndex = formattedHistory.findIndex(msg => msg.role === 'user');
    if (firstUserIndex > 0) {
      formattedHistory = formattedHistory.slice(firstUserIndex);
    } else if (firstUserIndex === -1) {
      formattedHistory = [];
    }

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(userMessage);
    const responseText = result.response.text();
    return responseText;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};
