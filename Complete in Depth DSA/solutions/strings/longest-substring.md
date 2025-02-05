# Longest Substring Without Repeating Characters - Solution

## Problem Link
[LeetCode - Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

## Problem Description
Find the length of the longest substring without repeating characters.

## Approach: Sliding Window
```python
def lengthOfLongestSubstring(s: str) -> int:
    char_index = {}
    max_length = 0
    start = 0
    
    for end, char in enumerate(s):
        if char in char_index and char_index[char] >= start:
            start = char_index[char] + 1
        else:
            max_length = max(max_length, end - start + 1)
        char_index[char] = end
    
    return max_length
```

### Time Complexity: O(n)
### Space Complexity: O(min(m,n)) where m is the size of the character set

## Explanation
1. Use sliding window technique with two pointers
2. Keep track of character positions in a hash map
3. When finding a repeat, move start pointer to after the first occurrence
4. Update max length when finding a valid window

## Example
```
Input: "abcabcbb"
Window progression:
a -> ab -> abc -> [move start] -> bca -> [move start] -> cab -> ...
Max length = 3
