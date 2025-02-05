# C++ Setup Guide

## Prerequisites
1. Code Editor (VS Code recommended)
2. C++ Compiler (MinGW for Windows)

## Steps for Windows

### 1. Install VS Code
- Download from: https://code.visualstudio.com/
- Run installer and follow instructions

### 2. Install MinGW
```bash
1. Download MinGW Installer
2. Select gcc, g++ packages
3. Apply changes
```

### 3. Set Up Environment Variables
```bash
1. Open System Properties
2. Add MinGW\bin to Path
3. Verify with: g++ --version
```

### 4. VS Code Extensions
- C/C++
- Code Runner

## Your First C++ Program

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello World!" << endl;
    return 0;
}
```

## Running Your Program
1. Save as `hello.cpp`
2. Open terminal
3. Run:
```bash
g++ hello.cpp -o hello
./hello
```
