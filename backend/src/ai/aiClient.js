import Groq from "groq-sdk";
import dotenv from "dotenv"

dotenv.config();

// If GROQ_API_KEY is not set, do not crash the whole server at startup.
// Only the AI features will fail (with a clear error) when they are used.
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || "missing_groq_key"
});

export default groq;
