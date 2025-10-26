import heapq
import time
import random
from collections import defaultdict, deque
from threading import Thread, Lock

class Post:
    def __init__(self, post_id, content, timestamp=None):
        self.post_id = post_id
        self.content = content
        self.likes = 0
        self.comments = 0
        self.timestamp = timestamp or time.time()
        self.lock = Lock()

    def update_engagement(self, likes=0, comments=0):
        with self.lock:
            self.likes += likes
            self.comments += comments

    def score(self):
        age = time.time() - self.timestamp
        return self.likes * 3 + self.comments * 2 - age * 0.1

class SocialFeed:
    def __init__(self):
        self.posts = {}
        self.feed_heap = []
        self.feed_lock = Lock()
        self.recent_posts = deque(maxlen=1000)

    def add_post(self, post):
        self.posts[post.post_id] = post
        with self.feed_lock:
            heapq.heappush(self.feed_heap, (-post.score(), post.post_id))
            self.recent_posts.append(post.post_id)

    def update_post(self, post_id, likes=0, comments=0):
        if post_id in self.posts:
            post = self.posts[post_id]
            post.update_engagement(likes, comments)
            with self.feed_lock:
                heapq.heappush(self.feed_heap, (-post.score(), post.post_id))

    def get_top_posts(self, n=10):
        seen = set()
        top = []
        with self.feed_lock:
            while self.feed_heap and len(top) < n:
                score, pid = heapq.heappop(self.feed_heap)
                if pid not in seen:
                    top.append(self.posts[pid])
                    seen.add(pid)
        for post in top:
            heapq.heappush(self.feed_heap, (-post.score(), post.post_id))
        return top

    def simulate_scrolling(self, n=5, delay=1):
        for _ in range(n):
            top_posts = self.get_top_posts(10)
            for post in top_posts:
                print(f"Post {post.post_id}: Score={post.score():.2f}, Likes={post.likes}, Comments={post.comments}")
            time.sleep(delay)
            self.random_engagement()

    def random_engagement(self):
        for pid in random.sample(list(self.posts.keys()), min(5, len(self.posts))):
            self.update_post(pid, likes=random.randint(0,5), comments=random.randint(0,3))

def generate_posts(feed, count=50):
    for i in range(count):
        p = Post(i, f"Content of post {i}", time.time() - random.randint(0, 3600))
        feed.add_post(p)

feed = SocialFeed()
generate_posts(feed)
scroll_thread = Thread(target=feed.simulate_scrolling, args=(10, 2))
scroll_thread.start()
scroll_thread.join()
