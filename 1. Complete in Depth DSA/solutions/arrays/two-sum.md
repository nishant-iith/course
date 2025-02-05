# Two Sum - Solution

## Problem Link
[LeetCode - Two Sum](https://leetcode.com/problems/two-sum/)

## Problem Description
Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

## Approach 1: Hash Map
```python
def twoSum(nums: List[int], target: int) -> List[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
```

### Time Complexity: O(n)
### Space Complexity: O(n)

## Explanation
1. Use a hash map to store number-index pairs
2. For each number, check if its complement exists in the hash map
3. If found, return the current index and the complement's index
4. If not found, add the current number and index to the hash map

## Common Pitfalls
- Don't forget to check if the complement exists before adding current number
- Remember you need to return indices, not the numbers themselves
- Be careful about using the same element twice
