# Best Time to Buy and Sell Stock - Solution

## Problem Link
[LeetCode - Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

## Problem Description
Given an array `prices` where `prices[i]` is the price of a stock on day i, find the maximum profit possible.

## Approach: One Pass
```python
def maxProfit(prices: List[int]) -> int:
    min_price = float('inf')
    max_profit = 0
    
    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    
    return max_profit
```

### Time Complexity: O(n)
### Space Complexity: O(1)

## Explanation
1. Keep track of minimum price seen so far
2. For each price, calculate potential profit
3. Update maximum profit if current profit is larger
4. Continue until end of array

## Visual Example
```
Prices: [7,1,5,3,6,4]

Day 1: min_price = 7, profit = 0
Day 2: min_price = 1, profit = 0
Day 3: min_price = 1, profit = 4 (5-1)
Day 4: min_price = 1, profit = 4
Day 5: min_price = 1, profit = 5 (6-1)
Day 6: min_price = 1, profit = 5

Result: 5
```
