const express = require('express');
const TfIdf = require('tfidf');

const app = express();
app.use(express.json());

// Manual TF-IDF implementation for academic demonstration
function manualTFIDF(term, doc, corpus) {
  const tf = doc.split(' ').filter(w => w === term).length / doc.split(' ').length;
  const idf = Math.log(corpus.length / corpus.filter(d => d.includes(term)).length);
  return tf * idf;
}

function extractKeywordsManual(document, corpus, topN = 5) {
  const terms = [...new Set(document.split(' ').filter(term => term.length > 2))];
  const scores = terms.map(term => ({
    term,
    score: manualTFIDF(term, document, corpus)
  }));
  
  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}

// Library-based TF-IDF implementation for production use
function extractKeywordsLibrary(document, corpus, topN = 5) {
  const tfidf = new TfIdf();
  
  // Add all documents to the corpus
  corpus.forEach(doc => tfidf.addDocument(doc));
  
  // Get scores for the target document (last added)
  const documentIndex = corpus.length - 1;
  const terms = [...new Set(document.split(' ').filter(term => term.length > 2))];
  
  const scores = terms.map(term => ({
    term,
    score: tfidf.tfidf(term, documentIndex)
  }));
  
  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}

// API Endpoints
app.post('/extract-keywords', (req, res) => {
  try {
    const { document, corpus = [], method = 'library', topN = 5 } = req.body;
    
    if (!document) {
      return res.status(400).json({ error: 'Document is required' });
    }
    
    // Ensure corpus includes the target document
    const fullCorpus = [...corpus, document];
    
    let keywords;
    if (method === 'manual') {
      keywords = extractKeywordsManual(document, fullCorpus, topN);
    } else {
      keywords = extractKeywordsLibrary(document, fullCorpus, topN);
    }
    
    res.json({
      document: document.substring(0, 200) + (document.length > 200 ? '...' : ''),
      corpus_size: corpus.length,
      method,
      top_keywords: keywords,
      analysis: {
        total_terms_analyzed: [...new Set(document.split(' '))].length,
        unique_terms_scored: keywords.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Keyword extraction failed', details: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'TF-IDF Keyword Extractor',
    version: '1.0.0',
    capabilities: ['manual-tfidf', 'library-tfidf', 'keyword-extraction']
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`TF-IDF Keyword Extractor running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API endpoint: POST http://localhost:${PORT}/extract-keywords`);
});