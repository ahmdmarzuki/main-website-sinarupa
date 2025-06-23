import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";

import { app } from "./firebaseConfig";

const ai = getAI(app, { backend: new GoogleAIBackend() });
export const geminiModel = getGenerativeModel(ai, {
  model: "gemini-2.5-flash",
});
