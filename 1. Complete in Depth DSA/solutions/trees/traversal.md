# Binary Tree Inorder Traversal - Solution

## Problem Link
[LeetCode - Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)

## Problem Description
Given the root of a binary tree, return the inorder traversal of its nodes' values.

## Approach 1: Recursive
```python
def inorderTraversal(root: TreeNode) -> List[int]:
    def inorder(node, result):
        if not node:
            return
        inorder(node.left, result)
        result.append(node.val)
        inorder(node.right, result)
    
    result = []
    inorder(root, result)
    return result
```

## Approach 2: Iterative
```python
def inorderTraversal(root: TreeNode) -> List[int]:
    result = []
    stack = []
    current = root
    
    while current or stack:
        while current:
            stack.append(current)
            current = current.left
        
        current = stack.pop()
        result.append(current.val)
        current = current.right
    
    return result
```

### Time Complexity: O(n)
### Space Complexity: O(h) where h is the height of the tree

## Visual Example
```
Tree:
     1
    / \
   2   3
  / \
 4   5

Inorder traversal: [4, 2, 5, 1, 3]
```

## Common Patterns
1. Left subtree is processed first
2. Then the current node
3. Finally the right subtree
