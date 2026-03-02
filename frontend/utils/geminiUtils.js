// Utility functions for Gemini API integration with SAKHA

export const CAREER_CONTEXTS = {
  interview: `You are helping a student prepare for technical and behavioral interviews. 
Provide tips on common questions, behavioral patterns, and technical problem-solving approaches.`,
  
  resume: `You are helping optimize a resume for career applications. 
Provide advice on formatting, content, achievements, and tailoring for specific roles.`,
  
  skills: `You are helping develop professional skills. 
Recommend resources, learning paths, and practice strategies for career advancement.`,
  
  general: `You are SAKHA, a comprehensive AI career assistant.
Help with interviews, resumes, skills, job search, internships, and professional development.`
};

export const generateSystemPrompt = (context = 'general') => {
  const basePrompt = CAREER_CONTEXTS[context] || CAREER_CONTEXTS.general;
  
  return `You are SAKHA, an AI career assistant for students and professionals at CareerSpyke.
${basePrompt}

Guidelines:
- Be encouraging, supportive, and motivational
- Provide specific, actionable advice
- Include examples when helpful
- Keep responses concise but comprehensive (100-300 words)
- Focus on practical, immediately applicable tips
- Suggest resources and next steps when appropriate
- Be honest about your limitations

Your goal is to help users succeed in their career journey!`;
};

export const formatGeminiResponse = (text) => {
  // Clean up formatting
  let formatted = text
    .replace(/\*\*/g, '')  // Remove bold markers
    .replace(/\n\n+/g, '\n\n')  // Clean up excessive newlines
    .trim();
  
  return formatted;
};

export async function callGeminiAPI(message, context = 'general') {
  try {
    const response = await fetch('/api/gemini-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        context
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      answer: formatGeminiResponse(data.answer),
      raw: data
    };
  } catch (error) {
    console.error('Gemini API call failed:', error);
    return {
      success: false,
      answer: 'Sorry, I\'m having trouble connecting. Please try again in a moment.',
      error: error.message
    };
  }
}
