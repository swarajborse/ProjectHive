import math
import pickle
import threading
from functools import lru_cache
from concurrent.futures import ThreadPoolExecutor, as_completed
from heapq import nsmallest, heappush, heappop
from typing import Dict, Tuple, List, Optional

class TrieNode:
    def __init__(self):
        self.children: Dict[str, "TrieNode"] = {}
        self.is_word: bool = False
        self.freq: int = 0

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, w: str, freq: int = 1):
        node = self.root
        for ch in w.lower():
            node = node.children.setdefault(ch, TrieNode())
        node.is_word = True
        node.freq += freq

    def contains(self, w: str) -> bool:
        node = self.root
        for ch in w.lower():
            node = node.children.get(ch)
            if node is None:
                return False
        return node.is_word

    def iterate(self, prefix: str = ""):
        node = self.root
        for ch in prefix:
            node = node.children.get(ch)
            if node is None:
                return
        stack = [(node, prefix)]
        while stack:
            n, p = stack.pop()
            if n.is_word:
                yield p, n.freq
            for ch, child in n.children.items():
                stack.append((child, p + ch))

def damerau_levenshtein_rows(target: str, ch: str, prev_row: List[int], prev_char: str, prev_prev_row: List[int]) -> List[int]:
    current = [prev_row[0] + 1]
    n = len(target)
    for j in range(1, n + 1):
        cost = 0 if ch == target[j - 1] else 1
        ins = current[j - 1] + 1
        delete = prev_row[j] + 1
        replace = prev_row[j - 1] + cost
        val = ins if ins < delete else delete
        val = replace if replace < val else val
        if prev_prev_row and j > 1 and ch == target[j - 2] and prev_char == target[j - 1]:
            tp = prev_prev_row[j - 2] + cost
            val = tp if tp < val else val
        current.append(val)
    return current

def trie_approx_search(trie: Trie, word: str, max_cost: int):
    word = word.lower()
    n = len(word)
    results: List[Tuple[str, int, int]] = []
    initial = list(range(n + 1))
    stack = [(trie.root, "", initial, "", [])]
    while stack:
        node, prefix, prev_row, prev_char, prev_prev_row = stack.pop()
        if node.is_word and prev_row[-1] <= max_cost:
            results.append((prefix, prev_row[-1], node.freq))
        if min(prev_row) > max_cost:
            continue
        for ch, child in node.children.items():
            cur = damerau_levenshtein_rows(word, ch, prev_row, prev_char, prev_prev_row)
            stack.append((child, prefix + ch, cur, ch, prev_row))
    return results

def levenshtein(a: str, b: str) -> int:
    a = a.lower()
    b = b.lower()
    if len(a) < len(b):
        a, b = b, a
    previous = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        current = [i]
        for j, cb in enumerate(b, 1):
            ins = current[j - 1] + 1
            delete = previous[j] + 1
            replace = previous[j - 1] + (0 if ca == cb else 1)
            current.append(min(ins, delete, replace))
        previous = current
    return previous[-1]

class BKNode:
    def __init__(self, word: str):
        self.word = word
        self.children: Dict[int, "BKNode"] = {}

class BKTree:
    def __init__(self):
        self.root: Optional[BKNode] = None
        self.lock = threading.Lock()

    def add(self, word: str):
        with self.lock:
            if self.root is None:
                self.root = BKNode(word)
                return
            node = self.root
            while True:
                d = levenshtein(word, node.word)
                child = node.children.get(d)
                if child is not None:
                    node = child
                else:
                    node.children[d] = BKNode(word)
                    break

    def query(self, word: str, max_dist: int) -> List[Tuple[str, int]]:
        if self.root is None:
            return []
        result: List[Tuple[str, int]] = []
        stack = [self.root]
        while stack:
            node = stack.pop()
            d = levenshtein(word, node.word)
            if d <= max_dist:
                result.append((node.word, d))
            for dist, child in node.children.items():
                if d - max_dist <= dist <= d + max_dist:
                    stack.append(child)
        return result

class NGram:
    def __init__(self, n=3):
        self.n = n
        self.counts: Dict[Tuple[str, ...], int] = {}
        self.context_counts: Dict[Tuple[str, ...], int] = {}
        self.vocab: Dict[str, int] = {}

    def train(self, sentences: List[str]):
        for s in sentences:
            toks = ["<s>"] + s.lower().split() + ["</s>"]
            for i in range(len(toks)):
                self.vocab[toks[i]] = self.vocab.get(toks[i], 0) + 1
            for i in range(len(toks) - self.n + 1):
                gram = tuple(toks[i:i + self.n])
                ctx = gram[:-1]
                self.counts[gram] = self.counts.get(gram, 0) + 1
                self.context_counts[ctx] = self.context_counts.get(ctx, 0) + 1

    def score(self, prev_tokens: Tuple[str, ...], word: str) -> float:
        ctx = tuple(prev_tokens[-(self.n - 1):]) if self.n > 1 else tuple()
        gram = ctx + (word,)
        num = self.counts.get(gram, 0) + 1
        den = self.context_counts.get(ctx, 0) + len(self.vocab) + 1
        return num / den

class SpellEngine:
    def __init__(self, max_workers: int = 4):
        self.trie = Trie()
        self.bk = BKTree()
        self.ngram = NGram(n=3)
        self.lock = threading.Lock()
        self.executor = ThreadPoolExecutor(max_workers=max_workers)

    def load_wordlist(self, words_freq: Dict[str, int]):
        for w, f in words_freq.items():
            self.trie.insert(w, f)
            for _ in range(min(f, 3)):
                self.bk.add(w)

    def train_corpus(self, sentences: List[str]):
        self.ngram.train(sentences)

    def persist(self, path: str):
        data = (self.trie, self.bk, self.ngram)
        with open(path, "wb") as f:
            pickle.dump(data, f)

    def load(self, path: str):
        with open(path, "rb") as f:
            t, b, n = pickle.load(f)
            self.trie = t
            self.bk = b
            self.ngram = n

    @lru_cache(maxsize=8192)
    def candidates_trie(self, word: str, max_dist: int):
        return trie_approx_search(self.trie, word, max_dist)

    def candidates_bk(self, word: str, max_dist: int):
        return self.bk.query(word, max_dist)

    def score_candidate(self, cand: Tuple[str, int, int], target: str, prev: str) -> Tuple[str, float]:
        w, dist, freq = cand
        edit = 1 / (1 + dist)
        freq_score = math.log(1 + freq)
        ctx = self.ngram.score((prev,), w) if prev else 1 / (len(self.ngram.vocab) + 1)
        score = edit * 0.5 + freq_score * 0.35 + math.log(1 + ctx) * 0.15
        return w, score

    def merge_and_rank(self, trie_res: List[Tuple[str, int, int]], bk_res: List[Tuple[str, int]], target: str, prev: str, k: int):
        seen = {}
        for w, d, f in trie_res:
            seen[w] = (d, f)
        for w, d in bk_res:
            if w in seen:
                continue
            seen[w] = (d, 1)
        tasks = []
        for w, (d, f) in seen.items():
            tasks.append((w, d, f))
        futures = [self.executor.submit(self.score_candidate, t, target, prev) for t in tasks]
        scored = []
        for fut in as_completed(futures):
            scored.append(fut.result())
        scored.sort(key=lambda x: (-x[1], x[0]))
        return [s[0] for s in scored[:k]]

    def suggest(self, word: str, prev_word: str = "", max_dist: int = 2, k: int = 6):
        if self.trie.contains(word):
            return [(word, 1.0)]
        t_res = self.candidates_trie(word, max_dist)
        bk_res = self.candidates_bk(word, max_dist + 1)
        ranked = self.merge_and_rank(t_res, bk_res, word, prev_word, k)
        return ranked

def demo():
    eng = SpellEngine(max_workers=8)
    freqs = {
        "hello": 120, "help": 85, "hell": 12, "helmet": 8, "held": 5,
        "world": 95, "word": 45, "would": 70, "wild": 25, "spell": 110,
        "spelling": 40, "spill": 18, "shell": 34, "helicopter": 9,
        "wonderful": 50, "wizard": 14, "welcome": 60, "wellcome": 1, "hellish": 3
    }
    eng.load_wordlist(freqs)
    corpus = [
        "hello world", "would you help me", "spell the word please",
        "welcome to the wonderful world", "the wizard is wonderful",
        "help me with the helmet", "the helicopter is loud"
    ]
    eng.train_corpus(corpus)
    tests = [
        ("helo", "hello"), ("wold", "welcome"), ("spelng", "spell"),
        ("welcom", "welcome"), ("hellp", "help"), ("spel", "")
    ]
    for wrong, prev in tests:
        out = eng.suggest(wrong, prev_word=prev, max_dist=2, k=6)
        print(wrong, "->", out)

if __name__ == "__main__":
    demo()
