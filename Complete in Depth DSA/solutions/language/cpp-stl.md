# C++ STL Basics

## Standard Template Library Components
1. Containers
2. Algorithms
3. Iterators
4. Functions

## Common Containers

### Vector
```cpp
vector<int> vec = {1, 2, 3};
vec.push_back(4);      // Add element
vec.pop_back();        // Remove last
vec[0];               // Access element
vec.size();           // Get size
```

### Set
```cpp
set<int> s;
s.insert(1);          // Add element
s.erase(1);           // Remove element
s.find(1);            // Find element
s.count(1);           // Count occurrences
```

### Map
```cpp
map<string, int> mp;
mp["one"] = 1;        // Insert/Update
mp.erase("one");      // Remove
mp.find("one");       // Find key
mp.count("one");      // Check existence
```

## Basic Algorithms
```cpp
// Sorting
sort(vec.begin(), vec.end());

// Binary Search
binary_search(vec.begin(), vec.end(), value);

// Min/Max
*min_element(vec.begin(), vec.end());
*max_element(vec.begin(), vec.end());
```

## Time Complexities
- Vector: Access O(1), Insert/Delete at end O(1)
- Set: Insert/Delete/Find O(log n)
- Map: Insert/Delete/Find O(log n)
