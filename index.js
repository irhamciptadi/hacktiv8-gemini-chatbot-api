import "dotenv/config";
import express from "express";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// **Set your default Gemini model here:**
const GEMINI_MODEL = "gemini-2.5-flash";

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// add setup _dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`GEMINI API Server ready on http://localhost:${PORT}`)
);

app.post("/api/chat", async (req, res) => {
  const { conversation, model = GEMINI_MODEL } = req.body;

  try {
    if (!Array.isArray(conversation)) {
      return res.status(400).json({ error: "Conversation must be an array" });
    }

    if (conversation.some((msg) => !msg.role || !msg.text)) {
      return res
        .status(400)
        .json({ error: "Each message must have 'role' and 'text' fields" });
    }

    const contents = conversation.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const response = await ai.models.generateContent({
      model,
      contents,
    });

    res.status(200).json({ result: response.text });
  } catch (error) {
    console.error("Error during chat:", error);
    res.status(500).json({ error: "Chat failed: " + error.message });
  }
});
