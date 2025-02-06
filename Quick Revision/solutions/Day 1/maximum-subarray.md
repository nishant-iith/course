# Maximum Subarray (Kadane's Algorithm)

## Problem Statement
Given an integer array `nums`, find the subarray with the largest sum and return the sum of the elements present in that subarray.

A **subarray** is a contiguous non-empty sequence of elements within an array.

### Examples:
**Input:**  
`nums = [2, 3, 5, -2, 7, -4]`  
**Output:**  
`15`  
**Explanation:**  
The subarray from index `0` to index `4` has the largest sum = `15`.

**Input:**  
`nums = [-2, -3, -7, -2, -10, -4]`  
**Output:**  
`-2`  
**Explanation:**  
The element on index `0` or index `3` makes up the largest sum when taken as a subarray.

### Constraints:
- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

---

## Approaches

<div class="code-switcher">
    <button class="code-btn active" data-method="brute">Brute Force</button>
    <button class="code-btn" data-method="better">Better Approach</button>
    <button class="code-btn" data-method="optimal">Optimal (Kadane's Algorithm)</button>
    <button class="code-btn" data-method="followup">Print Subarray</button>
</div>

<div class="implementation brute active">

### 1. Brute Force
**Intuition:**  
The idea is to find all possible subarrays of the given array and calculate the sum of each subarray. Finally, return the maximum sum among them.

**Approach:**  
1. Use three nested loops:
   - The outer loop selects the starting index of the subarray.
   - The middle loop selects the ending index of the subarray.
   - The inner loop calculates the sum of the subarray.
2. Track the maximum sum found.

**Time Complexity:**  
`O(N^3)`  
- Three nested loops, each running approximately `N` times.

**Space Complexity:**  
`O(1)`  
- No extra space is used.

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
    int maxSubArray(vector<int>& nums) {
        int maxi = INT_MIN;
        for (int i = 0; i < nums.size(); i++) {
            for (int j = i; j < nums.size(); j++) {
                int sum = 0;
                for (int k = i; k <= j; k++) {
                    sum += nums[k];
                }
                maxi = max(maxi, sum);
            }
        }
        return maxi;
    }
};
```
</div>

<div class="code-block java">

```java
import java.util.*;

class Solution {
    public int maxSubArray(int[] nums) {
        int maxi = Integer.MIN_VALUE;
        for (int i = 0; i < nums.length; i++) {
            for (int j = i; j < nums.length; j++) {
                int sum = 0;
                for (int k = i; k <= j; k++) {
                    sum += nums[k];
                }
                maxi = Math.max(maxi, sum);
            }
        }
        return maxi;
    }
}
```
</div>

<div class="code-block python">

```python
from typing import List

class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        maxi = float('-inf')
        for i in range(len(nums)):
            for j in range(i, len(nums)):
                sum = 0
                for k in range(i, j + 1):
                    sum += nums[k]
                maxi = max(maxi, sum)
        return maxi
```
</div>

<div class="code-block javascript">

```javascript
class Solution {
    maxSubArray(nums) {
        let maxi = -Infinity;
        for (let i = 0; i < nums.length; i++) {
            for (let j = i; j < nums.length; j++) {
                let sum = 0;
                for (let k = i; k <= j; k++) {
                    sum += nums[k];
                }
                maxi = Math.max(maxi, sum);
            }
        }
        return maxi;
    }
}
```
</div>

</div>

<div class="implementation better">

### 2. Better Approach
**Intuition:**  
Instead of using a third loop to calculate the sum of each subarray, we can optimize by maintaining a running sum.

**Approach:**  
1. Use two nested loops:
   - The outer loop selects the starting index of the subarray.
   - The inner loop calculates the sum of the subarray starting from the current index.
2. Track the maximum sum found.

**Time Complexity:**  
`O(N^2)`  
- Two nested loops, each running approximately `N` times.

**Space Complexity:**  
`O(1)`  
- No extra space is used.

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
    int maxSubArray(vector<int>& nums) {
        int maxi = INT_MIN;
        for (int i = 0; i < nums.size(); i++) {
            int sum = 0;
            for (int j = i; j < nums.size(); j++) {
                sum += nums[j];
                maxi = max(maxi, sum);
            }
        }
        return maxi;
    }
};
```
</div>

<div class="code-block java">

```java
import java.util.*;

class Solution {
    public int maxSubArray(int[] nums) {
        int maxi = Integer.MIN_VALUE;
        for (int i = 0; i < nums.length; i++) {
            int sum = 0;
            for (int j = i; j < nums.length; j++) {
                sum += nums[j];
                maxi = Math.max(maxi, sum);
            }
        }
        return maxi;
    }
}
```
</div>

<div class="code-block python">

```python
from typing import List

class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        maxi = float('-inf')
        for i in range(len(nums)):
            sum = 0
            for j in range(i, len(nums)):
                sum += nums[j]
                maxi = max(maxi, sum)
        return maxi
```
</div>

<div class="code-block javascript">

```javascript
class Solution {
    maxSubArray(nums) {
        let maxi = -Infinity;
        for (let i = 0; i < nums.length; i++) {
            let sum = 0;
            for (let j = i; j < nums.length; j++) {
                sum += nums[j];
                maxi = Math.max(maxi, sum);
            }
        }
        return maxi;
    }
}
```
</div>

</div>

<div class="implementation optimal">

### 3. Optimal (Kadane's Algorithm)
**Intuition:**  
The idea is to avoid considering subarrays with a sum less than 0, as they will always reduce the overall sum.

**Approach:**  
1. Use a single loop to iterate through the array.
2. Maintain a running sum and reset it to 0 if it becomes negative.
3. Track the maximum sum found.

**Time Complexity:**  
`O(N)`  
- Single traversal of the array.

**Space Complexity:**  
`O(1)`  
- No extra space is used.

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
    int maxSubArray(vector<int>& nums) {
        int maxi = INT_MIN, sum = 0;
        for (int i = 0; i < nums.size(); i++) {
            sum += nums[i];
            maxi = max(maxi, sum);
            if (sum < 0) sum = 0;
        }
        return maxi;
    }
};
```
</div>

<div class="code-block java">

```java
import java.util.*;

class Solution {
    public int maxSubArray(int[] nums) {
        int maxi = Integer.MIN_VALUE, sum = 0;
        for (int i = 0; i < nums.length; i++) {
            sum += nums[i];
            maxi = Math.max(maxi, sum);
            if (sum < 0) sum = 0;
        }
        return maxi;
    }
}
```
</div>

<div class="code-block python">

```python
from typing import List

class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        maxi, sum = float('-inf'), 0
        for num in nums:
            sum += num
            maxi = max(maxi, sum)
            if sum < 0: sum = 0
        return maxi
```
</div>

<div class="code-block javascript">

```javascript
class Solution {
    maxSubArray(nums) {
        let maxi = -Infinity, sum = 0;
        for (let num of nums) {
            sum += num;
            maxi = Math.max(maxi, sum);
            if (sum < 0) sum = 0;
        }
        return maxi;
    }
}
```
</div>

</div>

<div class="implementation followup">

### 4. Print Maximum Subarray (Follow-up)
**Intuition:**  
While finding the maximum sum is useful, often we need to know which elements make up this maximum subarray. We can modify Kadane's algorithm to track the starting and ending indices of the maximum subarray while maintaining the same time complexity.

**Key Insights:**
1. Track starting index when resetting sum to 0
2. Update ending index when finding a new maximum sum
3. Handle edge cases for negative numbers correctly

**Time Complexity:**  
`O(N)` - Single pass through the array

**Space Complexity:**  
`O(1)` - Only storing indices and sum variables

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
    // Function to find maximum sum of subarrays and print the subarray having maximum sum
    int maxSubArray(vector<int>& nums) {
        
        // maximum sum
        long long maxi = LLONG_MIN; 
        
        // current sum of subarray
        long long sum = 0;
        
        // starting index of current subarray
        int start = 0; 
        
        // indices of the maximum sum subarray
        int ansStart = -1, ansEnd = -1; 
        
        // Iterate through the array
        for (int i = 0; i < nums.size(); i++) {
            
            // update starting index if sum is reset
            if (sum == 0) {
                start = i;
            }
            
            // add current element to the sum
            sum += nums[i]; 
            
            /* Update maxi and subarray indice
            s if current sum is greater*/
            if (sum > maxi) {
                maxi = sum;
                ansStart = start;
                ansEnd = i;
            }
            
            // Reset sum to 0 if it becomes negative
            if (sum < 0) {
                sum = 0;
            }
        }
        
        // Printing the subarray
        cout << "The subarray is: [";
        for (int i = ansStart; i <= ansEnd; i++) {
            cout << nums[i] << " ";
        }
        cout << "]" << endl;
        
        // Return the maximum subarray sum found
        return maxi;
    }
};

int main() {
    vector<int> arr = { -2, 1, -3, 4, -1, 2, 1, -5, 4 };

    // Create an instance of Solution class
    Solution sol;

    int maxSum = sol.maxSubArray(arr);

    // Print the max subarray sum
    cout << "The maximum subarray sum is: " << maxSum << endl;

    return 0;
}

```
</div>

<div class="code-block java">

```java
import java.util.*;

class Solution {
   // Function to find maximum sum of subarrays and print the subarray having maximum sum
    public int maxSubArray(int[] nums) {
        
        // maximum sum
        long maxi = Long.MIN_VALUE; 
        
        // current sum of subarray
        long sum = 0; 
        
        // starting index of current subarray
        int start = 0; 
        
        // indices of the maximum sum subarray
        int ansStart = -1, ansEnd = -1; 
        
        // Iterate through the array
        for (int i = 0; i < nums.length; i++) {
            
            // update starting index if sum is reset
            if (sum == 0) {
                start = i;
            }
            
            // add current element to the sum
            sum += nums[i]; 
            
            /* Update maxi and subarray indices
            if current sum is greater */
            if (sum > maxi) {
                maxi = sum;
                ansStart = start;
                ansEnd = i;
            }
            
            // Reset sum to 0 if it becomes negative
            if (sum < 0) {
                sum = 0;
            }
        }
        
        // Printing the subarray
        System.out.print("The subarray is: [");
        for (int i = ansStart; i <= ansEnd; i++) {
            System.out.print(nums[i] + " ");
        }
        System.out.println("]");

        // Return the maximum subarray sum found
        return (int) maxi;
    }

    public static void main(String[] args) {
        int[] arr = { -2, 1, -3, 4, -1, 2, 1, -5, 4 };

        // Create an instance of Solution class
        Solution sol = new Solution();

        int maxSum = sol.maxSubArray(arr);

        // Print the max subarray sum
        System.out.println("The maximum subarray sum is: " + maxSum);
    }
}

```
</div>

<div class="code-block python">

```python
from typing import List

class Solution:
    # Function to find maximum sum of subarrays and print the subarray having maximum sum
    def maxSubArray(self, nums: List[int]) -> int:
        
        # maximum sum
        maxi = float('-inf') 
        
        # current sum of subarray
        sum = 0 
        
        # starting index of current subarray
        start = 0 
        
        # indices of the maximum sum subarray
        ansStart = -1
        ansEnd = -1
        
        # Iterate through the array
        for i in range(len(nums)):
            
            # update starting index if sum is reset
            if sum == 0:
                start = i
            
            # add current element to the sum
            sum += nums[i] 
            
            """ Update maxi and subarray indices
            if current sum is greater """
            if sum > maxi:
                maxi = sum
                ansStart = start
                ansEnd = i
            
            # Reset sum to 0 if it becomes negative
            if sum < 0:
                sum = 0
        
        # Printing the subarray
        print("The subarray is: [", end="")
        for i in range(ansStart, ansEnd + 1):
            print(nums[i], end=" ")
        print("]")

        # Return the maximum subarray sum found
        return maxi

if __name__ == "__main__":
    arr = [ -2, 1, -3, 4, -1, 2, 1, -5, 4 ]

    # Create an instance of Solution class
    sol = Solution()

    maxSum = sol.maxSubArray(arr)

    # Print the max subarray sum
    print(f"The maximum subarray sum is: {maxSum}")

```
</div>

<div class="code-block javascript">

```javascript
class Solution {
   // Function to find maximum sum of subarrays and print the subarray having maximum sum
    maxSubArray(nums) {
        
        // maximum sum
        let maxi = -Infinity; 
        
        // current sum of subarray
        let sum = 0; 
        
        // starting index of current subarray
        let start = 0; 
        
        // indices of the maximum sum subarray
        let ansStart = -1, ansEnd = -1; 
        
        // Iterate through the array
        for (let i = 0; i < nums.length; i++) {
            
            // update starting index if sum is reset
            if (sum === 0) {
                start = i;
            }
            
            // add current element to the sum
            sum += nums[i]; 
            
            /* Update maxi and subarray indices
            if current sum is greater */
            if (sum > maxi) {
                maxi = sum;
                ansStart = start;
                ansEnd = i;
            }
            
            // Reset sum to 0 if it becomes negative
            if (sum < 0) {
                sum = 0;
            }
        }
        
        // Printing the subarray
        process.stdout.write("The subarray is: [");
        for (let i = ansStart; i <= ansEnd; i++) {
            process.stdout.write(nums[i] + " ");
        }
        console.log("]");

        // Return the maximum subarray sum found
        return maxi;
    }
}

function main() {
    let arr = [ -2, 1, -3, 4, -1, 2, 1, -5, 4 ];

    // Create an instance of Solution class
    let sol = new Solution();

    let maxSum = sol.maxSubArray(arr);

    // Print the max subarray sum
    console.log("The maximum subarray sum is: " + maxSum);
}

// Execute the main function
main();

```
</div>

</div>

---

## Complexity Analysis

| Approach       | Time Complexity | Space Complexity |
|----------------|-----------------|------------------|
| Brute Force    | O(N^3)          | O(1)             |
| Better Approach| O(N^2)          | O(1)             |
| Optimal (Kadane's Algorithm) | O(N) | O(1)             |
| Print Maximum Subarray (Follow-up) | O(N) | O(1) |

---

## Conclusion
- **Brute Force** is simple but inefficient for large inputs.
- **Better Approach** reduces the time complexity by avoiding the third loop.
- **Optimal (Kadane's Algorithm)** is the most efficient approach with linear time complexity.
- **Print Maximum Subarray (Follow-up)** extends Kadane's Algorithm to also print the subarray with the maximum sum.
