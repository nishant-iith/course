# Merge Sort Algorithm

## Intuition
Merge Sort is a **divide-and-conquer** sorting algorithm. It works by:
1. **Dividing** the array into two equal halves until each sub-array contains only one element.
2. **Merging** the sorted halves back together to form a fully sorted array.

The algorithm consists of two main functions:
- **`merge()`**: Merges two sorted halves into a single sorted array.
- **`mergeSort()`**: Recursively divides the array into halves and sorts them.

---

## Approach
1. **Divide the Array**:
   - Split the array into two halves: `low` to `mid` and `mid+1` to `high`.
   - Repeat this process recursively until the sub-arrays contain only one element.

2. **Merge the Sorted Halves**:
   - Use two pointers to compare elements from both halves.
   - Insert the smaller element into a temporary array.
   - Copy any remaining elements from either half into the temporary array.
   - Transfer the sorted elements back to the original array.

---

## Implementation

### C++
```java
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    void merge(vector<int>& arr, int low, int mid, int high) {
        vector<int> temp;
        int left = low, right = mid + 1;

        while (left <= mid && right <= high) {
            if (arr[left] <= arr[right]) temp.push_back(arr[left++]);
            else temp.push_back(arr[right++]);
        }

        while (left <= mid) temp.push_back(arr[left++]);
        while (right <= high) temp.push_back(arr[right++]);

        for (int i = low; i <= high; i++) arr[i] = temp[i - low];
    }

    void mergeSortHelper(vector<int>& arr, int low, int high) {
        if (low >= high) return;
        int mid = (low + high) / 2;
        mergeSortHelper(arr, low, mid);
        mergeSortHelper(arr, mid + 1, high);
        merge(arr, low, mid, high);
    }

    vector<int> mergeSort(vector<int>& nums) {
        mergeSortHelper(nums, 0, nums.size() - 1);
        return nums;
    }
};

int main() {
    vector<int> arr = {9, 4, 7, 6, 3, 1, 5};
    Solution sol;
    vector<int> sortedArr = sol.mergeSort(arr);

    cout << "Sorted Array: ";
    for (int num : sortedArr) cout << num << " ";
    return 0;
}
```

### Java
```java
import java.util.*;

class Solution {
    public void merge(int[] arr, int low, int mid, int high) {
        List<Integer> temp = new ArrayList<>();
        int left = low, right = mid + 1;

        while (left <= mid && right <= high) {
            if (arr[left] <= arr[right]) temp.add(arr[left++]);
            else temp.add(arr[right++]);
        }

        while (left <= mid) temp.add(arr[left++]);
        while (right <= high) temp.add(arr[right++]);

        for (int i = low; i <= high; i++) arr[i] = temp.get(i - low);
    }

    public void mergeSortHelper(int[] arr, int low, int high) {
        if (low >= high) return;
        int mid = (low + high) / 2;
        mergeSortHelper(arr, low, mid);
        mergeSortHelper(arr, mid + 1, high);
        merge(arr, low, mid, high);
    }

    public int[] mergeSort(int[] nums) {
        mergeSortHelper(nums, 0, nums.length - 1);
        return nums;
    }
}

public class Main {
    public static void main(String[] args) {
        int[] arr = {9, 4, 7, 6, 3, 1, 5};
        Solution sol = new Solution();
        int[] sortedArr = sol.mergeSort(arr);

        System.out.print("Sorted Array: ");
        for (int num : sortedArr) System.out.print(num + " ");
    }
}
```

### Python
```python
class Solution:
    def merge(self, arr, low, mid, high):
        temp = []
        left, right = low, mid + 1

        while left <= mid and right <= high:
            if arr[left] <= arr[right]:
                temp.append(arr[left])
                left += 1
            else:
                temp.append(arr[right])
                right += 1

        while left <= mid:
            temp.append(arr[left])
            left += 1

        while right <= high:
            temp.append(arr[right])
            right += 1

        for i in range(low, high + 1):
            arr[i] = temp[i - low]

    def mergeSortHelper(self, arr, low, high):
        if low >= high:
            return
        mid = (low + high) // 2
        self.mergeSortHelper(arr, low, mid)
        self.mergeSortHelper(arr, mid + 1, high)
        self.merge(arr, low, mid, high)

    def mergeSort(self, nums):
        self.mergeSortHelper(nums, 0, len(nums) - 1)
        return nums

if __name__ == "__main__":
    arr = [9, 4, 7, 6, 3, 1, 5]
    sol = Solution()
    sortedArr = sol.mergeSort(arr)
    print("Sorted Array:", sortedArr)
```

### JavaScript
```javascript
class Solution {
    merge(arr, low, mid, high) {
        let temp = [];
        let left = low, right = mid + 1;

        while (left <= mid && right <= high) {
            if (arr[left] <= arr[right]) temp.push(arr[left++]);
            else temp.push(arr[right++]);
        }

        while (left <= mid) temp.push(arr[left++]);
        while (right <= high) temp.push(arr[right++]);

        for (let i = low; i <= high; i++) arr[i] = temp[i - low];
    }

    mergeSortHelper(arr, low, high) {
        if (low >= high) return;
        let mid = Math.floor((low + high) / 2);
        this.mergeSortHelper(arr, low, mid);
        this.mergeSortHelper(arr, mid + 1, high);
        this.merge(arr, low, mid, high);
    }

    mergeSort(nums) {
        this.mergeSortHelper(nums, 0, nums.length - 1);
        return nums;
    }
}

const main = () => {
    let arr = [9, 4, 7, 6, 3, 1, 5];
    let sol = new Solution();
    let sortedArr = sol.mergeSort(arr);
    console.log("Sorted Array:", sortedArr.join(" "));
};

main();
```

---

## Complexity Analysis
- **Time Complexity**: `O(n log n)`  
  - The array is divided into halves (`log n` steps), and each merge step takes `O(n)` time.
- **Space Complexity**: `O(n)`  
  - A temporary array is used to store the merged elements.
