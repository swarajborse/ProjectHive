const express = require('express');
const summarizer = require('summarizer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/**
 * Advanced Single-Sentence Text Summarization API
 * Leverages NLP algorithms to identify and extract the most semantically
 * significant sentence from any text input, enabling rapid content
 * comprehension and information distillation.
 */
app.post('/summarize', (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Text input is required for summarization processing' 
      });
    }
    
    const summary = summarizer.summarize(text, { numSentences: 1 });
    
    res.json({ 
      summary,
      original_length: text.split(' ').length,
      compression_ratio: Math.round((1 - summary.split(' ').length / text.split(' ').length) * 100) / 100
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Summarization processing failed',
      details: error.message
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'operational',
    service: 'One-Sentence Summarizer',
    version: '1.0.0'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 One-Sentence Summarizer API running on port ${PORT}`);
  console.log('✅ Summarization engine initialized successfully');
});