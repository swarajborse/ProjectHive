class Solution:
    def maxDepth(self, s: str) -> int:
        max_depth=0
        for i in range(len(s)):
            l=s.count("(",0,i)
            r=s.count(")",0,i)
            depth=l-r
            if depth>=max_depth:
                max_depth=depth
        return max_depth