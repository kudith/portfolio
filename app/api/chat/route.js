import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function POST(req) {
  try {
    if (!genAI) {
      return NextResponse.json(
        { error: "Server is missing GOOGLE_GENERATIVE_AI_API_KEY" },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Build a bilingual, portfolio-focused prompt that mirrors the user's language
    const systemInstruction = `
You are Aditya's portfolio AI assistant.
Answer helpfully, professionally, and concisely.
Respond in the same language as the user's last message (English or Indonesian).
If the user uses Indonesian, reply in Indonesian. If the user uses English, reply in English.

Context about Aditya (use this to answer questions):
- Fullstack Developer with experience in Next.js, React.js, TypeScript, Node.js, Express, MongoDB, MySQL, REST API, Docker.
- Built projects such as:
  • Learning management platform with admin dashboard.
  • Point of Sale (POS) system with transactions, inventory, and reporting.
  • Company Profile Website (freelance) with Next.js and Shadcn UI.
  • Academic projects: E-Voting Platform (Next.js, Shadcn UI, MongoDB) and Notario (digital signature platform with RSA/ECDSA, AI document analysis, QR verification).
- Skilled in frontend development, responsive web design, and integrating backend APIs.
- Strengths: Problem-solving, teamwork, clean scalable code, continuous learning.
- Looking for opportunities in remote frontend/fullstack development.

Contact Information:
- Email: aditya.dev@example.com
- LinkedIn: https://www.linkedin.com/in/aditya-dev
- Location: Indonesia | Open to remote work

Always answer recruiters in a way that highlights Aditya’s skills, projects, and contact details, without revealing sensitive or NDA-protected information.
`;

    const conversation = Array.isArray(messages)
      ? messages
          .map(
            (m) => `${m.type === "user" ? "User" : "Assistant"}: ${m.message}`
          )
          .join("\n")
      : "";

    const prompt = `${systemInstruction}\n\nConversation so far:\n${conversation}\n\nAssistant:`;

    const result = await model.generateContent(prompt);
    const text = result?.response?.text?.() ?? "";

    return NextResponse.json({ text });
  } catch (error) {
    console.error("/api/chat error", error);
    return NextResponse.json(
      { error: "Failed to generate a response" },
      { status: 500 }
    );
  }
}
