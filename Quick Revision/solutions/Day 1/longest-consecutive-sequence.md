# Longest Consecutive Sequence

## Problem Statement
Given an array of integers `nums`, return the length of the longest sequence of consecutive integers. The sequence can appear in any order.

### Examples:
**Input:**  
`nums = [100, 4, 200, 1, 3, 2]`  
**Output:**  
`4`  
**Explanation:**  
The longest consecutive sequence is `[1, 2, 3, 4]`, which has a length of `4`.

**Input:**  
`nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]`  
**Output:**  
`9`  
**Explanation:**  
The longest consecutive sequence is `[0, 1, 2, 3, 4, 5, 6, 7, 8]`, which has a length of `9`.

### Constraints:
- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

---

## Approaches

<div class="code-switcher">
    <button class="code-btn active" data-method="brute">Brute Force</button>
    <button class="code-btn" data-method="sorting">Sorting</button>
    <button class="code-btn" data-method="optimal">Optimal</button>
</div>

<div class="implementation brute active">

### 1. Brute Force
**Intuition:**  
For each element in the array, check if the next consecutive number exists using linear search. Count the length of the sequence and keep track of the maximum length.

**Time Complexity:**  
`O(N^2)`  

**Space Complexity:**  
`O(1)`  

#### Implementation:

<div class="language-switcher">
    <button class="lang-btn active" data-lang="cpp">C++</button>
    <button class="lang-btn" data-lang="java">Java</button>
    <button class="lang-btn" data-lang="python">Python</button>
    <button class="lang-btn" data-lang="javascript">JavaScript</button>
</div>

<div class="code-block cpp active">

```java
#include <bits/stdc++.h>
using namespace std;

class Solution {
private:
    bool linearSearch(vector<int>& a, int num) {
        for (int i = 0; i < a.size(); i++) {
            if (a[i] == num) return true;
        }
        return false;
    }

public:
    int longestConsecutive(vector<int>& nums) {
        if (nums.size() == 0) return 0;
        int longest = 1;
        for (int i = 0; i < nums.size(); i++) {
            int x = nums[i], cnt = 1;
            while (linearSearch(nums, x + 1)) {
                x += 1;
                cnt += 1;
            }
            longest = max(longest, cnt);
        }
        return longest;
    }
};
```
</div>

<div class="code-block java">

```java
import java.util.*;

class Solution {
    private boolean linearSearch(int[] a, int num) {
        for (int i = 0; i < a.length; i++) {
            if (a[i] == num) return true;
        }
        return false;
    }

    public int longestConsecutive(int[] nums) {
        if (nums.length == 0) return 0;
        int longest = 1;
        for (int i = 0; i < nums.length; i++) {
            int x = nums[i], cnt = 1;
            while (linearSearch(nums, x + 1)) {
                x += 1;
                cnt += 1;
            }
            longest = Math.max(longest, cnt);
        }
        return longest;
    }
}
```
</div>

<div class="code-block python">

```python
class Solution:
    def linearSearch(self, nums, num):
        for i in range(len(nums)):
            if nums[i] == num:
                return True
        return False

    def longestConsecutive(self, nums):
        if len(nums) == 0:
            return 0
        longest = 1
        for i in range(len(nums)):
            x, cnt = nums[i], 1
            while self.linearSearch(nums, x + 1):
                x += 1
                cnt += 1
            longest = max(longest, cnt)
        return longest
```
</div>

<div class="code-block javascript">

```javascript
class Solution {
    linearSearch(nums, num) {
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] === num) return true;
        }
        return false;
    }

    longestConsecutive(nums) {
        if (nums.length === 0) return 0;
        let longest = 1;
        for (let i = 0; i < nums.length; i++) {
            let x = nums[i], cnt = 1;
            while (this.linearSearch(nums, x + 1)) {
                x += 1;
                cnt += 1;
            }
            longest = Math.max(longest, cnt);
        }
        return longest;
    }
}
```
</div>

</div>

<div class="implementation sorting">

### 2. Sorting
**Intuition:**  
Sort the array and find the longest consecutive sequence by iterating through the sorted array.

**Time Complexity:**  
`O(N log N)`  

**Space Complexity:**  
`O(1)`  

#### Implementation:

<div class="language-switcher">
    <button class="lang-btn active" data-lang="cpp">C++</button>
    <button class="lang-btn" data-lang="java">Java</button>
    <button class="lang-btn" data-lang="python">Python</button>
    <button class="lang-btn" data-lang="javascript">JavaScript</button>
</div>

<div class="code-block cpp active">

```java
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        if (nums.size() == 0) return 0;
        sort(nums.begin(), nums.end());
        int longest = 1, cnt = 1;
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] == nums[i - 1] + 1) cnt++;
            else if (nums[i] != nums[i - 1]) cnt = 1;
            longest = max(longest, cnt);
        }
        return longest;
    }
};
```
</div>

<div class="code-block java">

```java
import java.util.*;

class Solution {
    public int longestConsecutive(int[] nums) {
        if (nums.length == 0) return 0;
        Arrays.sort(nums);
        int longest = 1, cnt = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] == nums[i - 1] + 1) cnt++;
            else if (nums[i] != nums[i - 1]) cnt = 1;
            longest = Math.max(longest, cnt);
        }
        return longest;
    }
}
```
</div>

<div class="code-block python">

```python
class Solution:
    def longestConsecutive(self, nums):
        if len(nums) == 0:
            return 0
        nums.sort()
        longest, cnt = 1, 1
        for i in range(1, len(nums)):
            if nums[i] == nums[i - 1] + 1:
                cnt += 1
            elif nums[i] != nums[i - 1]:
                cnt = 1
            longest = max(longest, cnt)
        return longest
```
</div>

<div class="code-block javascript">

```javascript
class Solution {
    longestConsecutive(nums) {
        if (nums.length === 0) return 0;
        nums.sort((a, b) => a - b);
        let longest = 1, cnt = 1;
        for (let i = 1; i < nums.length; i++) {
            if (nums[i] === nums[i - 1] + 1) cnt++;
            else if (nums[i] !== nums[i - 1]) cnt = 1;
            longest = Math.max(longest, cnt);
        }
        return longest;
    }
}
```
</div>

</div>

<div class="implementation optimal">

### 3. Optimal (Using HashSet)
**Intuition:**  
Use a HashSet to store all elements. For each element, check if it is the starting element of a sequence (i.e., `x-1` does not exist in the set). If it is, count the length of the sequence.

**Time Complexity:**  
`O(N)`  

**Space Complexity:**  
`O(N)`  

#### Implementation:

<div class="language-switcher">
    <button class="lang-btn active" data-lang="cpp">C++</button>
    <button class="lang-btn" data-lang="java">Java</button>
    <button class="lang-btn" data-lang="python">Python</button>
    <button class="lang-btn" data-lang="javascript">JavaScript</button>
</div>

<div class="code-block cpp active">

```java
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        if (nums.size() == 0) return 0;
        unordered_set<int> st(nums.begin(), nums.end());
        int longest = 1;
        for (auto it : st) {
            if (st.find(it - 1) == st.end()) {
                int cnt = 1, x = it;
                while (st.find(x + 1) != st.end()) {
                    x += 1;
                    cnt += 1;
                }
                longest = max(longest, cnt);
            }
        }
        return longest;
    }
};
```
</div>

<div class="code-block java">

```java
import java.util.*;

class Solution {
    public int longestConsecutive(int[] nums) {
        if (nums.length == 0) return 0;
        Set<Integer> st = new HashSet<>();
        for (int num : nums) st.add(num);
        int longest = 1;
        for (int it : st) {
            if (!st.contains(it - 1)) {
                int cnt = 1, x = it;
                while (st.contains(x + 1)) {
                    x += 1;
                    cnt += 1;
                }
                longest = Math.max(longest, cnt);
            }
        }
        return longest;
    }
}
```
</div>

<div class="code-block python">

```python
class Solution:
    def longestConsecutive(self, nums):
        if len(nums) == 0:
            return 0
        st = set(nums)
        longest = 1
        for it in st:
            if it - 1 not in st:
                cnt, x = 1, it
                while x + 1 in st:
                    x += 1
                    cnt += 1
                longest = max(longest, cnt)
        return longest
```
</div>

<div class="code-block javascript">

```javascript
class Solution {
    longestConsecutive(nums) {
        if (nums.length === 0) return 0;
        const st = new Set(nums);
        let longest = 1;
        for (const it of st) {
            if (!st.has(it - 1)) {
                let cnt = 1, x = it;
                while (st.has(x + 1)) {
                    x += 1;
                    cnt += 1;
                }
                longest = Math.max(longest, cnt);
            }
        }
        return longest;
    }
}
```
</div>

</div>

---

## Complexity Analysis

| Approach       | Time Complexity | Space Complexity |
|----------------|-----------------|------------------|
| Brute Force    | O(N^2)          | O(1)             |
| Sorting        | O(N log N)      | O(1)             |
| Optimal (HashSet) | O(N)         | O(N)             |

---

## Conclusion
- **Brute Force** is simple but inefficient for large inputs.
- **Sorting** improves efficiency but still has a higher time complexity due to sorting.
- **Optimal (HashSet)** is the most efficient approach with linear time complexity.
