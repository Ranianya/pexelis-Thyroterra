import express from 'express';

import { HfInference } from '@huggingface/inference';
const router = express.Router();

// System prompt with ThyroTerra context
const SYSTEM_PROMPT = `You are the Forest Guide, a warm and knowledgeable companion for ThyroTerra - a gamified health app for hypothyroidism patients.

ThyroTerra turns daily medication into a journey of building virtual worlds. Users select yearly lands (Lavender Valley, Emerald Peak), monthly spots, and complete daily health tasks. Missed days don't reset progress - the forest enters "Restful Mist" mode, preserving achievements.

About Hypothyroidism: Low thyroid hormones (T4, T3) causing fatigue, weight gain, brain fog. Treatment: Daily Levothyroxine on empty stomach, 30-60 min fasting window.

Your Role: Be warm, encouraging, supportive. Provide accurate medical info. Explain ThyroTerra features engagingly. NEVER shame users for missed doses. Keep responses concise (2-4 sentences), friendly. Use occasional nature emojis 🌲✨🌱. For serious medical decisions, suggest consulting healthcare providers.

Mission: Help patients see their health journey as building a legacy of vitality, not a reminder of illness.`;

// Initialize Hugging Face client
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// POST /api/chat
router.post('/', async (req, res) => {
  try {
    const { question, conversationHistory = [] } = req.body;

    // Validate input
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required' });
    }

    if (question.trim().length === 0) {
      return res.status(400).json({ error: 'Question cannot be empty' });
    }

    if (question.length > 500) {
      return res.status(400).json({ error: 'Question is too long. Please keep it under 500 characters.' });
    }

    // Build messages array for chat completion
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory.slice(-6).map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      })),
      { role: 'user', content: question }
    ];

    console.log('[Chat] Using Hugging Face Inference Providers');

    // Use Hugging Face Inference Providers API
    // This uses free models through their provider network
    const stream = hf.chatCompletionStream({
      model: "meta-llama/Llama-3.3-70B-Instruct", // Free via providers
      messages: messages,
      max_tokens: 400,
      temperature: 0.7,
    });

    // Collect the streamed response
    let answer = '';
    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices.length > 0) {
        const delta = chunk.choices[0].delta;
        if (delta.content) {
          answer += delta.content;
        }
      }
    }

    // Clean up the response
    answer = answer.trim();
    
    if (!answer) {
      answer = "I'm having trouble responding right now. Please try again! 🌲";
    }

    // Add medical disclaimer for medical questions
    const medicalKeywords = ['should i', 'diagnosis', 'treatment', 'doctor', 'medication change', 'dosage'];
    const containsMedicalQuestion = medicalKeywords.some(keyword => 
      question.toLowerCase().includes(keyword)
    );
    
    if (containsMedicalQuestion && !answer.includes('healthcare provider') && !answer.includes('doctor')) {
      answer += "\n\n💚 Always consult your healthcare provider for medical decisions.";
    }

    console.log(`[Chat] ✅ Success - Response: ${answer.length} chars`);

    res.json({ answer });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Handle specific errors
    if (error.message && error.message.includes('rate')) {
      return res.status(429).json({ 
        error: 'Too many requests. Please wait a moment and try again.'
      });
    }
    
    res.status(500).json({ 
      error: 'An unexpected error occurred. Please try again.',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    model: 'Llama-3.3-70B-Instruct',
    service: 'Hugging Face Inference Providers',
    message: '100% FREE with provider network!'
  });
});

export default router;