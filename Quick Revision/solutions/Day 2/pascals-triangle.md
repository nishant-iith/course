# Pascal's Triangle

## Problem Statement
We have three related problems concerning Pascal’s Triangle:

1. **Variety 1: Element Lookup**  
   Given two integers `r` (row number) and `c` (column number), find the element at position `(r, c)` in Pascal’s Triangle. The element is computed using the combination formula (nCr) with `n = r - 1` and `r = c - 1`.

2. **Variety 2: Nth Row**  
   Given an integer `n`, print the `n`th row of Pascal’s Triangle. Each element in this row is computed using the combination formula as described above.

3. **Variety 3: Full Triangle**  
   Given an integer `n`, generate and print the complete Pascal’s Triangle up to `n` rows.  
   
In Pascal’s Triangle:
- The first row is `[1]`.
- Each subsequent row starts and ends with `1`.
- Every interior element is the sum of the two elements directly above it.

### Examples

**Variety 1: Element Lookup**  
- **Input:**  
  `r = 5, c = 3`  
- **Output:**  
  `The element at position (5,3) is: 6`  
- **Explanation:**  
  The 5th row of Pascal's Triangle is `[1, 4, 6, 4, 1]`. The 3rd element (1-indexed) is `6`.

---

**Variety 2: Nth Row**  
- **Input:**  
  `n = 5`  
- **Output:**  
  `1 4 6 4 1`  
- **Explanation:**  
  The 5th row of Pascal's Triangle is printed directly.

---

**Variety 3: Full Triangle**  
- **Input:**  
  `n = 5`  
- **Output:**  
  ```
  1
  1 1
  1 2 1
  1 3 3 1
  1 4 6 4 1
  ```  
- **Explanation:**  
  The complete Pascal's Triangle is generated for 5 rows.

### Constraints
- For generating the triangle: `1 <= n <= 30`
- For element lookup: Ensure `r >= c > 0`

---

## Approaches

<div class="code-switcher">
    <button class="code-btn active" data-method="approach1">Variety 1: Element Lookup</button>
    <button class="code-btn" data-method="approach2">Variety 2: Nth Row</button>
    <button class="code-btn" data-method="approach3">Variety 3: Full Triangle</button>
</div>

---

<div class="implementation approach1 active">

### 1. Variety 1: Element Lookup Using nCr

**Intuition:**  
Use the combination formula `nCr` where the desired element at position `(r, c)` equals `nCr(r - 1, c - 1)`. This is computed iteratively by taking advantage of the property that  
\[ \binom{n}{r} = \frac{n \times (n-1) \times \cdots \times (n-r+1)}{r \times (r-1) \times \cdots \times 1} \]

**Time Complexity:**  
`O(c)` for computing the combination.

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
    // Function to calculate nCr (combinations)
    int nCr(int n, int r) {
        if (r > n - r)
            r = n - r;
        long long res = 1;
        for (int i = 0; i < r; i++) {
            res = res * (n - i);
            res = res / (i + 1);
        }
        return (int)res;
    }
public:
    // Generate the triangle up to 'numRows'
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> triangle(numRows);
        for (int i = 0; i < numRows; i++) {
            triangle[i].resize(i + 1);
            for (int j = 0; j <= i; j++) {
                triangle[i][j] = nCr(i, j);
            }
        }
        return triangle;
    }
};

int main() {
    int r = 5, c = 3;
    Solution sol;
    vector<vector<int>> pascalTriangle = sol.generate(r);
    if (r >= c && c > 0) {
        int element = pascalTriangle[r - 1][c - 1];
        cout << "The element at position (" << r << "," << c << ") is: " << element << "\n";
    } else {
        cout << "Invalid column number!\n";
    }
    return 0;
}
```
</div>

<div class="code-block java">

```java
import java.util.*;

class Solution {
    // Function to calculate nCr (combinations)
    private int nCr(int n, int r) {
        if (r > n - r)
            r = n - r;
        long res = 1;
        for (int i = 0; i < r; i++) {
            res = res * (n - i);
            res = res / (i + 1);
        }
        return (int) res;
    }
    
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> triangle = new ArrayList<>();
        for (int i = 0; i < numRows; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j <= i; j++) {
                row.add(nCr(i, j));
            }
            triangle.add(row);
        }
        return triangle;
    }
    
    public static void main(String[] args) {
        int r = 5, c = 3;
        Solution sol = new Solution();
        List<List<Integer>> pascalTriangle = sol.generate(r);
        if (r >= c && c > 0) {
            int element = pascalTriangle.get(r - 1).get(c - 1);
            System.out.println("The element at position (" + r + "," + c + ") is: " + element);
        } else {
            System.out.println("Invalid column number!");
        }
    }
}
```
</div>

<div class="code-block python">

```python
from typing import List

class Solution:
    def nCr(self, n: int, r: int) -> int:
        if r > n - r:
            r = n - r
        res = 1
        for i in range(r):
            res = res * (n - i)
            res //= (i + 1)
        return res
    
    def generate(self, numRows: int) -> List[List[int]]:
        triangle = []
        for i in range(numRows):
            row = []
            for j in range(i + 1):
                row.append(self.nCr(i, j))
            triangle.append(row)
        return triangle

if __name__ == "__main__":
    r, c = 5, 3
    sol = Solution()
    pascalTriangle = sol.generate(r)
    if r >= c > 0:
        element = pascalTriangle[r - 1][c - 1]
        print(f"The element at position ({r},{c}) is: {element}")
    else:
        print("Invalid column number!")
```
</div>

<div class="code-block javascript">

```javascript
class Solution {
    nCr(n, r) {
        if (r > n - r) {
            r = n - r;
        }
        let res = 1;
        for (let i = 0; i < r; i++) {
            res = res * (n - i);
            res = Math.floor(res / (i + 1));
        }
        return res;
    }

    generate(numRows) {
        let triangle = [];
        for (let i = 0; i < numRows; i++) {
            let row = [];
            for (let j = 0; j <= i; j++) {
                row.push(this.nCr(i, j));
            }
            triangle.push(row);
        }
        return triangle;
    }
}

function main() {
    const r = 5, c = 3;
    const sol = new Solution();
    const pascalTriangle = sol.generate(r);
    if (r >= c && c > 0) {
        const element = pascalTriangle[r - 1][c - 1];
        console.log(`The element at position (${r},${c}) is: ${element}`);
    } else {
        console.log("Invalid column number!");
    }
}

main();
```
</div>
</div>


<div class="implementation approach2">

### 2. Variety 2: Generating the Nth Row

**Intuition:**  
Directly compute each element of the nth row using the combination formula. For each column `c` (from 1 to n), calculate the element as `nCr(n - 1, c - 1)`.

**Time Complexity:**  
While each element is computed in `O(c)` time, the overall time is roughly `O(n^2)` in the worst-case scenario (though the inner loop runs over a small range relative to `n`).

**Space Complexity:**  
`O(1)` extra space aside from the output.

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
    int nCr(int n, int r) {
        long long res = 1;
        for (int i = 0; i < r; i++) {
            res = res * (n - i);
            res = res / (i + 1);
        }
        return (int)res;
    }
public:
    // Print the nth row of Pascal's Triangle
    void generate(int n) {
        for (int c = 1; c <= n; c++) {
            cout << nCr(n - 1, c - 1) << " ";
        }
        cout << endl;
    }
};

int main() {
    int n = 5;
    Solution sol;
    sol.generate(n);
    return 0;
}
```
</div>

<div class="code-block java">

```java
import java.util.*;

class Solution {
    private long nCr(int n, int r) {
        long res = 1;
        for (int i = 0; i < r; i++) {
            res = res * (n - i);
            res = res / (i + 1);
        }
        return res;
    }
    
    public void generate(int n) {
        for (int c = 1; c <= n; c++) {
            System.out.print(nCr(n - 1, c - 1) + " ");
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
        int n = 5;
        Solution sol = new Solution();
        sol.generate(n);
    }
}
```
</div>

<div class="code-block python">

```python
class Solution:
    def nCr(self, n: int, r: int) -> int:
        res = 1
        for i in range(r):
            res = res * (n - i)
            res //= (i + 1)
        return res

    def generate(self, n: int) -> None:
        for c in range(1, n + 1):
            print(self.nCr(n - 1, c - 1), end=" ")
        print()

if __name__ == "__main__":
    n = 5
    sol = Solution()
    sol.generate(n)
```
</div>

<div class="code-block javascript">

```javascript
class Solution {
    nCr(n, r) {
        let res = 1;
        for (let i = 0; i < r; i++) {
            res = res * (n - i);
            res = Math.floor(res / (i + 1));
        }
        return res;
    }
    
    generate(n) {
        let row = "";
        for (let c = 1; c <= n; c++) {
            row += this.nCr(n - 1, c - 1) + " ";
        }
        console.log(row.trim());
    }
}

function main() {
    const n = 5;
    const sol = new Solution();
    sol.generate(n);
}

main();
```
</div>
</div>


<div class="implementation approach3">

### 3. Variety 3: Generating the Full Pascal's Triangle

**Intuition:**  
Build the triangle row by row. Each row always starts and ends with `1`. For the inner elements, use the relation:  
\[ \text{triangle}[i][j] = \text{triangle}[i-1][j-1] + \text{triangle}[i-1][j] \]  
Alternatively, you can use the nCr-based approach to directly compute each element.

**Time Complexity:**  
`O(n^2)` because there are `n` rows and each row has up to `n` elements.

**Space Complexity:**  
`O(n^2)` for storing all the triangle rows.

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
    // Generate a single row using the combination approach
    vector<int> generateRow(int row) {
        long long ans = 1;
        vector<int> ansRow;
        ansRow.push_back(1);
        for (int col = 1; col < row; col++) {
            ans = ans * (row - col);
            ans = ans / col;
            ansRow.push_back(ans);
        }
        return ansRow;
    }
public:
    // Generate the full Pascal's Triangle up to n rows
    vector<vector<int>> pascalTriangle(int n) {
        vector<vector<int>> triangle;
        for (int row = 1; row <= n; row++) {
            triangle.push_back(generateRow(row));
        }
        return triangle;
    }
};

int main() {
    int n = 5;
    Solution sol;
    vector<vector<int>> triangle = sol.pascalTriangle(n);
    for (auto& row : triangle) {
        for (auto& element : row) {
            cout << element << " ";
        }
        cout << "\n";
    }
    return 0;
}
```
</div>

<div class="code-block java">

```java
import java.util.*;

class Solution {
    // Generate a single row of Pascal's Triangle
    private List<Integer> generateRow(int row) {
        long ans = 1;
        List<Integer> ansRow = new ArrayList<>();
        ansRow.add(1);
        for (int col = 1; col < row; col++) {
            ans = ans * (row - col);
            ans = ans / col;
            ansRow.add((int) ans);
        }
        return ansRow;
    }
    
    public List<List<Integer>> pascalTriangle(int n) {
        List<List<Integer>> triangle = new ArrayList<>();
        for (int row = 1; row <= n; row++) {
            triangle.add(generateRow(row));
        }
        return triangle;
    }
    
    public static void main(String[] args) {
        int n = 5;
        Solution sol = new Solution();
        List<List<Integer>> triangle = sol.pascalTriangle(n);
        for (List<Integer> row : triangle) {
            for (int element : row) {
                System.out.print(element + " ");
            }
            System.out.println();
        }
    }
}
```
</div>

<div class="code-block python">

```python
from typing import List

class Solution:
    def generateRow(self, row: int) -> List[int]:
        ans = 1
        ansRow = [1]
        for col in range(1, row):
            ans = ans * (row - col)
            ans //= col
            ansRow.append(ans)
        return ansRow

    def pascalTriangle(self, n: int) -> List[List[int]]:
        triangle = []
        for row in range(1, n + 1):
            triangle.append(self.generateRow(row))
        return triangle

if __name__ == "__main__":
    n = 5
    sol = Solution()
    triangle = sol.pascalTriangle(n)
    for row in triangle:
        print(" ".join(map(str, row)))
```
</div>

<div class="code-block javascript">

```javascript
class Solution {
    generateRow(row) {
        let ans = 1;
        let ansRow = [];
        ansRow.push(1);
        for (let col = 1; col < row; col++) {
            ans = ans * (row - col);
            ans = Math.floor(ans / col);
            ansRow.push(ans);
        }
        return ansRow;
    }
    
    pascalTriangle(n) {
        let triangle = [];
        for (let row = 1; row <= n; row++) {
            triangle.push(this.generateRow(row));
        }
        return triangle;
    }
}

function main() {
    const n = 5;
    const sol = new Solution();
    const triangle = sol.pascalTriangle(n);
    triangle.forEach(row => console.log(row.join(" ")));
}

main();
```
</div>
</div>
---

## Complexity Analysis

| Approach                        | Time Complexity | Space Complexity |
|---------------------------------|-----------------|------------------|
| Variety 1 (Element Lookup)      | O(c)            | O(1)             |
| Variety 2 (Nth Row)             | ~O(n²)⁽¹⁾       | O(1)             |
| Variety 3 (Full Triangle)       | O(n²)           | O(n²)            |

*⁽¹⁾ Although each element is computed in O(c) time, summing over all elements in the nth row yields approximately O(n²) in the worst-case.

---

## Conclusion
We have explored three variations for working with Pascal's Triangle:
- **Variety 1** retrieves a specific element using an optimal nCr formula.
- **Variety 2** generates only the nth row by computing each element individually.
- **Variety 3** builds the complete Pascal's Triangle up to a given number of rows.
