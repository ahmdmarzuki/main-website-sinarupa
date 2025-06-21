import { getAI, getGenerativeModel, VertexAIBackend } from "firebase/ai";
import { app } from "./firebaseConfig";

const ai = getAI(app, { backend: new VertexAIBackend() });
export const geminiModel = getGenerativeModel(ai, {
  model: "gemini-2.5-flash",
});
