**contributor** "Samikshaa-A"
# Advanced Spell Checker (Python, Trie + BK-Tree + N-Gram)

This project implements a **high-performance spell checker** in Python using advanced data structures and algorithms, including:

- **Trie** for fast prefix search and approximate matches
- **BK-Tree** for efficient Levenshtein distance queries
- **N-Gram language model** for context-aware scoring
- **Multi-threading** and **ThreadPoolExecutor** for concurrent candidate scoring
- **Persistence** via `pickle` for saving/loading trained models

---

## Features

- **Word Insertion & Frequency Tracking**: Tracks frequency of words in a Trie.
- **Approximate Matching**: Suggests corrections for misspelled words using Damerau-Levenshtein distance.
- **BK-Tree Queries**: Efficiently finds words within a certain edit distance.
- **Context-Aware Ranking**: Scores candidates using N-Gram probabilities and word frequency.
- **Multi-threaded Candidate Scoring**: Leverages multiple threads for ranking suggestions quickly.
- **Persistence**: Save and load trained models for reuse.
- **Customizable Suggestions**: Specify maximum edit distance and number of suggestions.

---

## Classes

### `Trie` and `TrieNode`
- Stores words for fast prefix lookup.
- Supports approximate search using Damerau-Levenshtein distance.
- Tracks frequency of each word.

### `BKTree` and `BKNode`
- Stores words in a BK-Tree for fast Levenshtein distance queries.
- Supports adding words and querying approximate matches.

### `NGram`
- Trains a language model on a corpus.
- Scores words based on preceding context for more accurate suggestions.

### `SpellEngine`
- Integrates Trie, BK-Tree, and N-Gram model.
- Provides methods to:
  - Load word lists with frequency
  - Train corpus for N-Gram scoring
  - Suggest candidate corrections
  - Persist/load model using `pickle`
  - Multi-threaded scoring for high performance

---

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd advanced-spell-checker
