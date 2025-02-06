# Quick Sort Algorithm

## Intuition
Quick Sort is a **divide-and-conquer** sorting algorithm. Unlike Merge Sort, it does not require extra space for merging (though it uses auxiliary stack space for recursion).

The algorithm works by:
1. **Select a Pivot**: Choose an element from the array (e.g., the first element).
2. **Partition the Array**: Rearrange the array so that elements smaller than the pivot are on the left, and elements greater than the pivot are on the right.
3. **Recursively Sort**: Repeat the process for the left and right subarrays.

The key idea is to place the pivot in its correct position in each recursive call.

---

## Approaches

<div class="code-switcher">
    <button class="code-btn active" data-method="implementation">Implementation</button>
</div>

<div class="implementation active">

### Implementation

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
    int partition(vector<int>& arr, int low, int high) {
        int pivot = arr[low];
        int i = low, j = high;

        while (i < j) {
            while (arr[i] <= pivot && i <= high - 1) i++;
            while (arr[j] > pivot && j >= low + 1) j--;
            if (i < j) swap(arr[i], arr[j]);
        }

        swap(arr[low], arr[j]);
        return j;
    }

    void quickSortHelper(vector<int>& arr, int low, int high) {
        if (low < high) {
            int pIndex = partition(arr, low, high);
            quickSortHelper(arr, low, pIndex - 1);
            quickSortHelper(arr, pIndex + 1, high);
        }
    }

    vector<int> quickSort(vector<int>& nums) {
        quickSortHelper(nums, 0, nums.size() - 1);
        return nums;
    }
};

int main() {
    vector<int> arr = {4, 6, 2, 5, 7, 9, 1, 3};
    Solution sol;
    vector<int> sortedArr = sol.quickSort(arr);

    cout << "Sorted Array: ";
    for (int num : sortedArr) cout << num << " ";
    return 0;
}
```
</div>

<div class="code-block java">

```java
import java.util.*;

class Solution {
    public int partition(int[] arr, int low, int high) {
        int pivot = arr[low];
        int i = low, j = high;

        while (i < j) {
            while (arr[i] <= pivot && i <= high - 1) i++;
            while (arr[j] > pivot && j >= low + 1) j--;
            if (i < j) {
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        int temp = arr[low];
        arr[low] = arr[j];
        arr[j] = temp;
        return j;
    }

    public void quickSortHelper(int[] arr, int low, int high) {
        if (low < high) {
            int pIndex = partition(arr, low, high);
            quickSortHelper(arr, low, pIndex - 1);
            quickSortHelper(arr, pIndex + 1, high);
        }
    }

    public int[] quickSort(int[] nums) {
        quickSortHelper(nums, 0, nums.length - 1);
        return nums;
    }
}

public class Main {
    public static void main(String[] args) {
        int[] arr = {4, 6, 2, 5, 7, 9, 1, 3};
        Solution sol = new Solution();
        int[] sortedArr = sol.quickSort(arr);

        System.out.print("Sorted Array: ");
        for (int num : sortedArr) System.out.print(num + " ");
    }
}
```
</div>

<div class="code-block python">

```python
class Solution:
    def partition(self, arr, low, high):
        pivot = arr[low]
        i, j = low, high

        while i < j:
            while arr[i] <= pivot and i <= high - 1:
                i += 1
            while arr[j] > pivot and j >= low + 1:
                j -= 1
            if i < j:
                arr[i], arr[j] = arr[j], arr[i]

        arr[low], arr[j] = arr[j], arr[low]
        return j

    def quickSortHelper(self, arr, low, high):
        if low < high:
            pIndex = self.partition(arr, low, high)
            self.quickSortHelper(arr, low, pIndex - 1)
            self.quickSortHelper(arr, pIndex + 1, high)

    def quickSort(self, nums):
        self.quickSortHelper(nums, 0, len(nums) - 1)
        return nums

if __name__ == "__main__":
    arr = [4, 6, 2, 5, 7, 9, 1, 3]
    sol = Solution()
    sortedArr = sol.quickSort(arr)
    print("Sorted Array:", sortedArr)
```
</div>

<div class="code-block javascript">

```javascript
class Solution {
    partition(arr, low, high) {
        let pivot = arr[low];
        let i = low, j = high;

        while (i < j) {
            while (arr[i] <= pivot && i <= high - 1) i++;
            while (arr[j] > pivot && j >= low + 1) j--;
            if (i < j) [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        [arr[low], arr[j]] = [arr[j], arr[low]];
        return j;
    }

    quickSortHelper(arr, low, high) {
        if (low < high) {
            let pIndex = this.partition(arr, low, high);
            this.quickSortHelper(arr, low, pIndex - 1);
            this.quickSortHelper(arr, pIndex + 1, high);
        }
    }

    quickSort(nums) {
        this.quickSortHelper(nums, 0, nums.length - 1);
        return nums;
    }
}

const main = () => {
    let arr = [4, 6, 2, 5, 7, 9, 1, 3];
    let sol = new Solution();
    let sortedArr = sol.quickSort(arr);
    console.log("Sorted Array:", sortedArr.join(" "));
};

main();
```
</div>

---

## Complexity Analysis
- **Time Complexity**:
  - **Best/Average Case**: `O(n log n)`  
    - The array is divided into halves (`log n` steps), and each partition step takes `O(n)` time.
  - **Worst Case**: `O(n^2)`  
    - Occurs when the pivot is the smallest or largest element in every partition (e.g., already sorted array).
- **Space Complexity**: `O(1)` (in-place sorting) + `O(n)` (auxiliary stack space for recursion).
