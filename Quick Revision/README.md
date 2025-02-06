# DSA Course Sheet

An interactive web-based Data Structures and Algorithms problem sheet tracker.

## Features

- Problems organized by topics
- Difficulty indicators
- Search functionality
- Progress tracking with checkboxes
- Links to problems, solutions, and video explanations
- CSV-based data management

## Structure

```
dsa-course/
├── assets/
│   └── problems.csv    # Problem data
├── scripts/
│   └── app.js         # JavaScript functionality
├── styles/
│   └── style.css      # Styling
├── index.html         # Main page
└── README.md
```

## Adding Problems

To add new problems, simply update the `problems.csv` file in the assets folder with the following format:

```csv
Topic,Problem Name,Difficulty,Problem Link,Solution Link,Video Link
```

## Development

1. Clone the repository
2. Add problems to `problems.csv`
3. Open `index.html` in a browser
