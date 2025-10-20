class Solution:
    def countKeyChanges(self, s: str) -> int:
        s1=s.lower()
        c=0
        for i in range(len(s1)-1):
            j=i+1
            if s1[i]!=s1[j]:
                c+=1
        return c