import axios from 'axios'
import { GoogleGenerativeAI } from '@google/generative-ai'

/**
 * Enhanced SAKHA Component with Gemini Integration
 * This is an advanced example component showing how to use SAKHA with different contexts
 */

export const SakhaAdvancedConfig = {
  // Different system prompts for different scenarios
  prompts: {
    interview: `You are an expert interview coach helping prepare candidates for technical and behavioral interviews.
- Provide specific tips and strategies
- Share common questions and best answers
- Explain technical concepts clearly
- Give confidence-building advice
- Mention real interview experiences when relevant`,

    resume: `You are a professional resume consultant and career strategist.
- Optimize resume content and format
- Suggest impactful action verbs
- Recommend metrics and quantifiable achievements
- Advise on ATS (Applicant Tracking System) optimization
- Provide industry-specific guidance`,

    coding: `You are a senior software engineer providing coding interview help.
- Explain algorithms and data structures
- Provide solution approaches
- Discuss time/space complexity
- Share coding best practices
- Help debug and optimize code`,

    networking: `You are a networking expert and career mentor.
- Guide on building professional relationships
- Suggest networking strategies
- Advise on LinkedIn optimization
- Help with informational interview preparation
- Share career advancement strategies`,

    general: `You are SAKHA, CareerSpyke's AI career assistant.
- Help with any career-related questions
- Provide encouragement and motivation
- Suggest resources and next steps
- Connect different career topics
- Be supportive and practical`
  }
};

/**
 * Function to send enhanced messages with context
 * @param {string} message - User's message
 * @param {string} context - Context type (interview, resume, coding, networking, general)
 * @param {object} options - Additional options
 * @returns {Promise} API response
 */
export async function sendSakhaMessage(message, context = 'general', options = {}) {
  try {
    const payload = {
      message,
      context,
      ...options
    };

    const response = await axios.post('/api/gemini-chat', payload);

    return {
      success: true,
      message: response.data.answer,
      raw: response.data
    };
  } catch (error) {
    console.error('SAKHA Error:', error);
    return {
      success: false,
      message: 'Sorry, I encountered an issue. Please try again.',
      error: error.message
    };
  }
}

/**
 * Follow-up question handler
 * Maintains context for multi-turn conversations
 */
export class SakhaConversation {
  constructor(context = 'general') {
    this.history = [];
    this.context = context;
  }

  async addMessage(userMessage) {
    // Add user message to history
    this.history.push({
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    });

    // Get Gemini response
    const response = await sendSakhaMessage(userMessage, this.context);

    // Add bot response to history
    this.history.push({
      role: 'assistant',
      content: response.message,
      timestamp: new Date()
    });

    return response;
  }

  getHistory() {
    return this.history;
  }

  clearHistory() {
    this.history = [];
  }

  setContext(newContext) {
    this.context = newContext;
  }
}

/**
 * Specialized handlers for different features
 */
export const SakhaFeatures = {
  async askInterviewTip(topic) {
    return sendSakhaMessage(
      `Give me an interview tip about: ${topic}`,
      'interview'
    );
  },

  async reviewResumeTip(resumeSection) {
    return sendSakhaMessage(
      `Help me improve this resume section: ${resumeSection}`,
      'resume'
    );
  },

  async solveCodingProblem(problem) {
    return sendSakhaMessage(
      `Help me solve this coding problem: ${problem}`,
      'coding'
    );
  },

  async getNetworkingAdvice(goal) {
    return sendSakhaMessage(
      `I want to ${goal}. What networking steps should I take?`,
      'networking'
    );
  },

  async explainConcept(concept) {
    return sendSakhaMessage(
      `Explain ${concept} in the context of career development`,
      'general'
    );
  }
};

/**
 * Response formatting utilities
 */
export const SakhaFormatting = {
  // Highlight key points in response
  highlightKeyPoints(text) {
    return text.replace(/key point|important|remember|tip|note/gi, match => 
      `**${match}**`
    );
  },

  // Add bullet points for list items
  formatAsList(text) {
    return text.split('\n').map(line => 
      line.trim() ? `• ${line}` : line
    ).join('\n');
  },

  // Add action items
  extractActionItems(text) {
    const actionPattern = /(?:you should|try|consider|plan to|next step)[^.]*\./gi;
    return text.match(actionPattern) || [];
  },

  // Clean response
  cleanResponse(text) {
    return text
      .replace(/\*\*/g, '')
      .replace(/\n\n+/g, '\n\n')
      .trim();
  }
};

/**
 * Question templates for common scenarios
 */
export const SakhaTemplates = {
  interviewQuestions: [
    "How do I answer 'Tell me about yourself'?",
    "What are STAR method questions?",
    "How do I handle 'Why do you want to leave your job?'?",
    "What's a good way to explain weaknesses?",
    "How do I negotiate salary?",
    "Should I ask questions in the interview?"
  ],

  resumeQuestions: [
    "How long should my resume be?",
    "What should I include in my summary?",
    "How do I quantify my achievements?",
    "What's the best resume format?",
    "Should I include a photo?",
    "How do I tailor my resume for different jobs?"
  ],

  skillsQuestions: [
    "What skills should I focus on?",
    "How long to learn a new technology?",
    "What's the best way to learn programming?",
    "Should I take online courses or bootcamps?",
    "How do I showcase my skills?",
    "What projects should I build?"
  ]
};

/**
 * Analytics - Track common questions (optional)
 */
export class SakhaAnalytics {
  static logQuestion(question, context) {
    const analytics = {
      question,
      context,
      timestamp: new Date(),
      url: typeof window !== 'undefined' ? window.location.pathname : 'unknown'
    };

    // Store in localStorage for analytics
    try {
      const existing = JSON.parse(localStorage.getItem('sakha_analytics') || '[]');
      existing.push(analytics);
      localStorage.setItem('sakha_analytics', JSON.stringify(existing.slice(-100))); // Keep last 100
    } catch (e) {
      console.log('Analytics logging failed', e);
    }
  }

  static getAnalytics() {
    try {
      return JSON.parse(localStorage.getItem('sakha_analytics') || '[]');
    } catch (e) {
      return [];
    }
  }
}

export default SakhaAdvancedConfig;
