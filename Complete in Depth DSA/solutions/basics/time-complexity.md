# Time Complexity Analysis

## What is Time Complexity?
Time complexity is a measure of how the runtime of an algorithm increases with the size of the input.

## Common Time Complexities
1. O(1) - Constant Time
2. O(log n) - Logarithmic Time
3. O(n) - Linear Time
4. O(n log n) - Linearithmic Time
5. O(n²) - Quadratic Time
6. O(2ⁿ) - Exponential Time

## Examples

### Constant Time - O(1)
```cpp
int getFirst(vector<int>& arr) {
    return arr[0];  // Always one operation
}
```

### Linear Time - O(n)
```cpp
int findSum(vector<int>& arr) {
    int sum = 0;
    for(int num : arr) {  // n operations
        sum += num;
    }
    return sum;
}
```

### Quadratic Time - O(n²)
```cpp
void bubbleSort(vector<int>& arr) {
    for(int i = 0; i < arr.size(); i++) {      // n iterations
        for(int j = 0; j < arr.size()-1; j++) { // n iterations
            if(arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }
}
```

## How to Calculate Time Complexity
1. Count the basic operations
2. Express in terms of input size
3. Keep only the highest order term
4. Remove constants

## Common Rules
1. Drop Constants: O(2n) → O(n)
2. Drop Lower Terms: O(n² + n) → O(n²)
3. Different Inputs: O(n + m) stays as is
4. Multiplication Rule: Nested loops multiply
