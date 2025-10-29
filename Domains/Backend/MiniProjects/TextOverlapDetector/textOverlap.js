/**
 * Text Overlap Detector
 * Calculates similarity scores between two texts using various methods
 * 
 * Key Modern JS Features Used:
 * - Private static methods (#methodName) – encapsulates helper logic
 * - Set/Map operations – clean intersection/union with spread syntax
 * - Arrow functions & reduce – concise frequency counting
 * - Object.fromEntries / Object.entries – elegant object transformations
 * - Template literals – clean string output
 * - Destructuring & spread – e.g., new Set([...ngrams1, ...ngrams2])
 * - Nullish coalescing style – (freq1[ch] || 0) for safe access
 * - Array.from + fill – efficient 2D array initialization
 */

class TextOverlapDetector {
  /**
   * Calculate overall overlap score between two texts
   * @param {string} text1 - First text
   * @param {string} text2 - Second text
   * @returns {number} - Overlap score between 0 and 1
   */
  static calculateOverlapScore(text1, text2) {
    if (!text1 || !text2) return 0;

    const t1 = text1.toLowerCase();
    const t2 = text2.toLowerCase();

    const ngramScore = this.#calculateNGramOverlap(t1, t2, 2);
    const freqScore = this.#calculateCharFrequencyOverlap(t1, t2);
    const substringScore = this.#calculateCommonSubstringRatio(t1, t2);

    return ngramScore * 0.4 + freqScore * 0.3 + substringScore * 0.3;
  }

  /**
   * Calculate n-gram overlap between two texts
   * @private
   */
  static #calculateNGramOverlap(t1, t2, n) {
    const ngrams1 = this.#getNGrams(t1, n);
    const ngrams2 = this.#getNGrams(t2, n);
    
    if (ngrams1.size === 0 && ngrams2.size === 0) return 0;

    const intersection = [...ngrams1].filter(x => ngrams2.has(x)).length;
    const union = new Set([...ngrams1, ...ngrams2]).size;

    return union ? intersection / union : 0;
  }

  /**
   * Get n-grams from text
   * @private
   */
  static #getNGrams(text, n) {
    const ngrams = new Set();
    if (text.length < n) return ngrams;
    for (let i = 0; i <= text.length - n; i++) {
      ngrams.add(text.slice(i, i + n));
    }
    return ngrams;
  }

  /**
   * Calculate character frequency overlap
   * @private
   */
  static #calculateCharFrequencyOverlap(t1, t2) {
    const freq1 = this.#getCharFrequency(t1);
    const freq2 = this.#getCharFrequency(t2);

    const allChars = new Set([...Object.keys(freq1), ...Object.keys(freq2)]);
    const dot = [...allChars].reduce((sum, ch) => sum + (freq1[ch] || 0) * (freq2[ch] || 0), 0);
    const mag1 = Math.sqrt([...Object.values(freq1)].reduce((sum, f) => sum + f * f, 0));
    const mag2 = Math.sqrt([...Object.values(freq2)].reduce((sum, f) => sum + f * f, 0));

    return mag1 && mag2 ? dot / (mag1 * mag2) : 0;
  }

  /**
   * Get character frequency distribution
   * @private
   */
  static #getCharFrequency(text) {
    const chars = text.replace(/\s/g, '').split('');
    const total = chars.length;
    if (!total) return {};

    const counts = chars.reduce((acc, ch) => {
      acc[ch] = (acc[ch] || 0) + 1;
      return acc;
    }, {});

    return Object.fromEntries(
      Object.entries(counts).map(([ch, count]) => [ch, count / total])
    );
  }

  /**
   * Calculate common substring ratio
   * @private
   */
  static #calculateCommonSubstringRatio(t1, t2) {
    const common = this.#longestCommonSubstring(t1, t2);
    const maxLen = Math.max(t1.length, t2.length);
    return maxLen ? common.length / maxLen : 0;
  }

  /**
   * Find longest common substring
   * @private
   */
  static #longestCommonSubstring(t1, t2) {
    const m = t1.length;
    const n = t2.length;
    if (!m || !n) return '';

    let maxLength = 0;
    let endingIndex = 0;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (t1[i - 1] === t2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
          if (dp[i][j] > maxLength) {
            maxLength = dp[i][j];
            endingIndex = i;
          }
        }
      }
    }

    return maxLength ? t1.slice(endingIndex - maxLength, endingIndex) : '';
  }
}

module.exports = TextOverlapDetector;