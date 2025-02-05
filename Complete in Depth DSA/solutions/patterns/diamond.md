# Diamond Pattern

Print a diamond pattern using stars.

## Problem Description
Print a diamond pattern of height n using asterisks (*).

## Example
For n = 5:
```
  *  
 *** 
*****
 *** 
  *  
```

## Solution

### C++
```cpp
void printDiamond(int n) {
    // Upper half
    for(int i = 1; i <= n; i++) {
        // Spaces
        for(int j = 1; j <= n-i; j++)
            cout << " ";
        // Stars
        for(int j = 1; j <= 2*i-1; j++)
            cout << "*";
        cout << endl;
    }
    
    // Lower half
    for(int i = n-1; i >= 1; i--) {
        // Spaces
        for(int j = 1; j <= n-i; j++)
            cout << " ";
        // Stars
        for(int j = 1; j <= 2*i-1; j++)
            cout << "*";
        cout << endl;
    }
}
```

### Java
```java
void printDiamond(int n) {
    // Upper half
    for(int i = 1; i <= n; i++) {
        // Spaces
        for(int j = 1; j <= n-i; j++)
            System.out.print(" ");
        // Stars
        for(int j = 1; j <= 2*i-1; j++)
            System.out.print("*");
        System.out.println();
    }
    
    // Lower half
    for(int i = n-1; i >= 1; i--) {
        // Spaces
        for(int j = 1; j <= n-i; j++)
            System.out.print(" ");
        // Stars
        for(int j = 1; j <= 2*i-1; j++)
            System.out.print("*");
        System.out.println();
    }
}
```

## Explanation
1. Divide pattern into upper and lower half
2. For each row in upper half:
   - Print (n-i) spaces
   - Print (2*i-1) stars
3. For lower half, reverse the pattern
4. Use proper spacing for alignment

## Time Complexity
- Time: O(n²)
- Space: O(1)

## Tips
1. Always draw the pattern first
2. Identify the pattern in spaces and stars
3. Notice symmetry in the pattern
4. Break into smaller sub-patterns
