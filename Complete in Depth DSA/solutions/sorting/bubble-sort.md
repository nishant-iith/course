# Bubble Sort

## Algorithm Overview
Repeatedly step through the list, compare adjacent elements and swap them if they are in the wrong order.

## Time Complexity
- Best Case: O(n) - When array is already sorted
- Average Case: O(n²)
- Worst Case: O(n²)

## Space Complexity
- O(1) - In-place sorting algorithm

## Code Implementation

### C++
```cpp
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    bool swapped;
    
    for(int i = 0; i < n-1; i++) {
        swapped = false;
        for(int j = 0; j < n-i-1; j++) {
            if(arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
                swapped = true;
            }
        }
        // If no swapping occurred, array is sorted
        if(!swapped) break;
    }
}
```

### Java
```java
void bubbleSort(int[] arr) {
    int n = arr.length;
    boolean swapped;
    
    for(int i = 0; i < n-1; i++) {
        swapped = false;
        for(int j = 0; n-i-1; j++) {
            if(arr[j] > arr[j+1]) {
                // Swap arr[j] and arr[j+1]
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                swapped = true;
            }
        }
        if(!swapped) break;
    }
}
```

## Step-by-Step Explanation
1. Start with first element
2. Compare with next element
3. Swap if current > next
4. Move to next pair
5. After each pass, largest element reaches end
6. Optimization: If no swaps in a pass, array is sorted

## Visualization
```
Initial: [5, 3, 8, 4, 2]
Pass 1:  [3, 5, 4, 2, 8]
Pass 2:  [3, 4, 2, 5, 8]
Pass 3:  [3, 2, 4, 5, 8]
Pass 4:  [2, 3, 4, 5, 8]
```

## Advantages
1. Simple to understand and implement
2. No extra space needed
3. Stable sorting algorithm

## Disadvantages
1. Poor time complexity O(n²)
2. Not suitable for large datasets

## When to Use
- Small datasets
- Almost sorted arrays
- Limited memory constraints
- Need for stable sorting
