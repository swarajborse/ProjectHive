class Solution:
    def sumIndicesWithKSetBits(self, nums: List[int], k: int) -> int:
        l=len(nums)
        sum=0
        for i in range(l):
            b=str(bin(i))
            o=b.count("1")
            if o==k:
                sum+=nums[i]
        return sum