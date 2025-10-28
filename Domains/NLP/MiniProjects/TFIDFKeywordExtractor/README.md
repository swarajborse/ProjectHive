# TF-IDF Keyword Extractor

## Advanced Term Weighting Engine for Document Analysis and Search Relevance

A sophisticated Natural Language Processing tool that implements Term Frequency-Inverse Document Frequency (TF-IDF) algorithms for intelligent keyword extraction and document analysis. This project bridges academic concepts with practical applications in search relevance, document similarity, and text mining.

### 🎯 Core Capabilities

- **Dual Implementation**: Both manual TF-IDF calculation and optimized library-based approaches
- **Academic Foundation**: Pure JavaScript implementation demonstrating TF-IDF mathematical principles
- **Production Ready**: Library-based implementation for high-performance applications
- **Flexible Corpus**: Dynamic document collection analysis with real-time scoring
- **Multi-Method Support**: Switch between manual and library implementations

### 🔬 High-Impact Applications

- **Search Engine Optimization**: Identify key terms for content optimization
- **Document Classification**: Extract discriminative features for categorization
- **Academic Research**: Analyze term importance across document collections
- **Content Analysis**: Understand thematic focus and keyword distribution
- **Information Retrieval**: Improve search relevance and result ranking

### 🏗️ Technical Architecture

#### TF-IDF Mathematical Foundation

```
TF-IDF(term, document, corpus) = TF(term, document) × IDF(term, corpus)

Where:
- TF(term, document) = (Number of times term appears in document) / (Total terms in document)
- IDF(term, corpus) = log(Total documents in corpus / Number of documents containing term)
```

#### Implementation Features

- **Manual Algorithm**: Pure JavaScript implementation for educational purposes
- **Library Integration**: Production-grade TF-IDF calculations using `tfidf` npm package
- **RESTful API**: HTTP endpoints for easy integration
- **Configurable Parameters**: Adjustable top-N keywords and analysis methods

### 🚀 Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd TFIDFKeywordExtractor

# Install dependencies
npm install

# Start the server
npm start
```

### 📖 Usage Examples

#### API Endpoint: Extract Keywords

```bash
curl -X POST http://localhost:3001/extract-keywords \
  -H "Content-Type: application/json" \
  -d '{
    "document": "Machine learning algorithms require large datasets for training and validation. Deep learning models particularly benefit from extensive training data to achieve high accuracy in complex tasks like image recognition and natural language processing.",
    "corpus": [
      "Data science involves statistical analysis and machine learning techniques.",
      "Artificial intelligence systems use algorithms to solve complex problems.",
      "Natural language processing enables computers to understand human language.",
      "Computer vision algorithms analyze and interpret visual information.",
      "Deep learning networks require substantial computational resources."
    ],
    "method": "library",
    "topN": 5
  }'
```

#### Sample Response

```json
{
  "document": "Machine learning algorithms require large datasets for training and validation. Deep learning models particularly benefit from extensive training data...",
  "corpus_size": 5,
  "method": "library",
  "top_keywords": [
    { "term": "learning", "score": 0.245 },
    { "term": "training", "score": 0.198 },
    { "term": "algorithms", "score": 0.156 },
    { "term": "deep", "score": 0.134 },
    { "term": "datasets", "score": 0.112 }
  ],
  "analysis": {
    "total_terms_analyzed": 28,
    "unique_terms_scored": 5
  }
}
```

### 🎓 Academic Significance

#### Foundational Information Retrieval

TF-IDF represents a cornerstone of modern information retrieval systems, providing:

- **Term Discrimination**: Identifies terms that best distinguish documents
- **Collection Awareness**: Considers term importance relative to entire corpus
- **Statistical Rigor**: Mathematical foundation for relevance scoring
- **Scalable Analysis**: Efficient processing of large document collections

#### Historical Context

- **1970s Origins**: Developed by Karen Spärck Jones for document retrieval
- **Search Engine Foundation**: Core algorithm in early web search engines
- **Modern Applications**: Basis for more advanced techniques like BM25
- **Educational Value**: Essential concept in information retrieval curricula

### 🔧 API Reference

#### POST /extract-keywords

Extract top keywords from a document using TF-IDF scoring.

**Parameters:**
- `document` (string): Target document for keyword extraction
- `corpus` (array): Collection of related documents (optional)
- `method` (string): "manual" or "library" implementation (default: "library")
- `topN` (number): Number of top keywords to return (default: 5)

#### GET /health

Service health check and capability information.

### 🌟 Hacktoberfest Impact

This project demonstrates:

- **Advanced NLP Concepts**: Implementation of foundational information retrieval algorithms
- **Dual Implementation Strategy**: Educational manual code alongside production libraries
- **Academic-Practical Bridge**: Connecting theoretical concepts with real-world applications
- **API Design Excellence**: RESTful interface for easy integration
- **Documentation Quality**: Comprehensive explanation of mathematical foundations

### 🔮 Future Enhancements

- BM25 algorithm implementation for improved search relevance
- Multi-language support with language-specific preprocessing
- Real-time corpus updates and incremental TF-IDF calculations
- Integration with vector databases for similarity search
- Web interface for interactive keyword analysis

### 📚 Learning Resources

- [TF-IDF Wikipedia](https://en.wikipedia.org/wiki/Tf%E2%80%93idf)
- [Information Retrieval Textbook](https://nlp.stanford.edu/IR-book/)
- [TF-IDF in Modern Search](https://www.elastic.co/guide/en/elasticsearch/guide/current/scoring-theory.html)

---

**Built for Hacktoberfest 2025** | **ProjectHive NLP Domain** | **Advanced Information Retrieval**