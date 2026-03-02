import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { message, context = '' } = await req.json();

    if (!message || !message.trim()) {
      return Response.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // System prompt to guide SAKHA as a career assistant
    const systemPrompt = `You are SAKHA, an AI career assistant for students and professionals. You help with:
- Interview preparation (technical, behavioral, HR rounds)
- Resume and profile building
- Skill development guidance
- Career path recommendations
- Internship and job opportunities
- Mock interview feedback and tips
- Course and educational resource recommendations
- Communication and soft skills improvement

Be helpful, encouraging, and provide specific, actionable advice. Keep responses concise but comprehensive.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Combine system prompt with user message
    const fullMessage = `${systemPrompt}\n\nUser Question: ${message}`;

    const result = await model.generateContent(fullMessage);
    const response = result.response;
    const text = response.text();

    return Response.json(
      { 
        answer: text,
        success: true 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Gemini API Error:", error);
    
    return Response.json(
      { 
        error: "Failed to get response from AI assistant",
        details: error.message,
        success: false
      },
      { status: 500 }
    );
  }
}
