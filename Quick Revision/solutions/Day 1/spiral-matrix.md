# Spiral Matrix

## Problem Statement
Given an `M x N` matrix, print the elements in a clockwise spiral manner. Return an array with the elements in the order of their appearance when printed in a spiral manner.

### Examples:
**Input:**  
`matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]`  
**Output:**  
`[1, 2, 3, 6, 9, 8, 7, 4, 5]`  
**Explanation:**  
The elements in the spiral order are `1, 2, 3 -> 6, 9 -> 8, 7 -> 4, 5`.

**Input:**  
`matrix = [[1, 2, 3, 4], [5, 6, 7, 8]]`  
**Output:**  
`[1, 2, 3, 4, 8, 7, 6, 5]`  
**Explanation:**  
The elements in the spiral order are `1, 2, 3, 4 -> 8, 7, 6, 5`.

### Constraints:
- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 100`
- `-100 <= matrix[i][j] <= 100`

---

## Approaches

<div class="code-switcher">
    <button class="code-btn active" data-method="approach1">Boundary Traversal</button>
</div>

<div class="implementation approach1 active">

### 1. Boundary Traversal
**Intuition:**  
The idea is to use four separate loops to print the array elements in a spiral.  
1. Traverse from **left to right** along the top boundary.  
2. Traverse from **top to bottom** along the right boundary.  
3. Traverse from **right to left** along the bottom boundary.  
4. Traverse from **bottom to top** along the left boundary.  
Repeat the process for the inner layers of the matrix.

**Time Complexity:**  
`O(M x N)`  
- All elements are traversed once.

**Space Complexity:**  
`O(1)`  
- Extra space is only used for the output array (not considered in space complexity).

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
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> ans;
        int n = matrix.size(), m = matrix[0].size();
        int top = 0, left = 0, bottom = n - 1, right = m - 1;

        while (top <= bottom && left <= right) {
            // Left to Right
            for (int i = left; i <= right; ++i) ans.push_back(matrix[top][i]);
            top++;

            // Top to Bottom
            for (int i = top; i <= bottom; ++i) ans.push_back(matrix[i][right]);
            right--;

            // Right to Left
            if (top <= bottom) {
                for (int i = right; i >= left; --i) ans.push_back(matrix[bottom][i]);
                bottom--;
            }

            // Bottom to Top
            if (left <= right) {
                for (int i = bottom; i >= top; --i) ans.push_back(matrix[i][left]);
                left++;
            }
        }
        return ans;
    }
};
```
</div>

<div class="code-block java">

```java
import java.util.*;

class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> ans = new ArrayList<>();
        int n = matrix.length, m = matrix[0].length;
        int top = 0, left = 0, bottom = n - 1, right = m - 1;

        while (top <= bottom && left <= right) {
            // Left to Right
            for (int i = left; i <= right; ++i) ans.add(matrix[top][i]);
            top++;

            // Top to Bottom
            for (int i = top; i <= bottom; ++i) ans.add(matrix[i][right]);
            right--;

            // Right to Left
            if (top <= bottom) {
                for (int i = right; i >= left; --i) ans.add(matrix[bottom][i]);
                bottom--;
            }

            // Bottom to Top
            if (left <= right) {
                for (int i = bottom; i >= top; --i) ans.add(matrix[i][left]);
                left++;
            }
        }
        return ans;
    }
}
```
</div>

<div class="code-block python">

```python
from typing import List

class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        ans = []
        n, m = len(matrix), len(matrix[0])
        top, left, bottom, right = 0, 0, n - 1, m - 1

        while top <= bottom and left <= right:
            # Left to Right
            for i in range(left, right + 1): ans.append(matrix[top][i])
            top += 1

            # Top to Bottom
            for i in range(top, bottom + 1): ans.append(matrix[i][right])
            right -= 1

            # Right to Left
            if top <= bottom:
                for i in range(right, left - 1, -1): ans.append(matrix[bottom][i])
                bottom -= 1

            # Bottom to Top
            if left <= right:
                for i in range(bottom, top - 1, -1): ans.append(matrix[i][left])
                left += 1

        return ans
```
</div>

<div class="code-block javascript">

```javascript
class Solution {
    spiralOrder(matrix) {
        let ans = [];
        let n = matrix.length, m = matrix[0].length;
        let top = 0, left = 0, bottom = n - 1, right = m - 1;

        while (top <= bottom && left <= right) {
            // Left to Right
            for (let i = left; i <= right; ++i) ans.push(matrix[top][i]);
            top++;

            // Top to Bottom
            for (let i = top; i <= bottom; ++i) ans.push(matrix[i][right]);
            right--;

            // Right to Left
            if (top <= bottom) {
                for (let i = right; i >= left; --i) ans.push(matrix[bottom][i]);
                bottom--;
            }

            // Bottom to Top
            if (left <= right) {
                for (let i = bottom; i >= top; --i) ans.push(matrix[i][left]);
                left++;
            }
        }
        return ans;
    }
}
```
</div>

</div>

---

## Complexity Analysis

| Approach       | Time Complexity | Space Complexity |
|----------------|-----------------|------------------|
| Boundary Traversal | O(M x N)      | O(1)             |

---

## Conclusion
The **Boundary Traversal** approach efficiently solves the problem by traversing the matrix layer by layer in a spiral manner. It ensures that all elements are visited exactly once, making it optimal for this problem.
