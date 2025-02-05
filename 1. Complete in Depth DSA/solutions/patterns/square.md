# Square Pattern

Print a square pattern of stars.

## Problem Description
Print a n×n square pattern using asterisks (*).

## Example
For n = 4:
```
* * * *
* * * *
* * * *
* * * *
```

## Solution

### C++
```cpp
void printSquare(int n) {
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < n; j++) {
            cout << "* ";
        }
        cout << endl;
    }
}
```

### Java
```java
void printSquare(int n) {
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < n; j++) {
            System.out.print("* ");
        }
        System.out.println();
    }
}
```

## Explanation
1. Use nested loops to create rows and columns
2. Outer loop for rows (i)
3. Inner loop for columns (j)
4. Print star with space in inner loop
5. Print newline after each row

## Time Complexity
- Time: O(n²)
- Space: O(1)

## Variations
1. Print hollow square
2. Use different characters
3. Alternate characters in checkboard pattern
