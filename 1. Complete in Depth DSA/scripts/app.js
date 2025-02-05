// Toggle collapse/expand for a section
function toggleSection(headerElement) {
    var section = headerElement.parentElement;
    section.classList.toggle('active');
}

// Filter problems across all sections based on search input
function filterProblems() {
    activeFilters.search = document.getElementById('searchInput').value;
    updateFilters();
}

// Add loading animation
function showLoading() {
    const courseSheet = document.getElementById('courseSheet');
    courseSheet.innerHTML = '<div class="loading">Loading problems...</div>';
}

// Update the loadProblems function to use the correct path
async function loadProblems() {
    showLoading();
    try {
        const response = await fetch('assets/problems.csv');
        if (!response.ok) throw new Error('Failed to load problems');
        
        const csvText = await response.text();
        const problems = parseCSV(csvText);
        generateSections(problems);
    } catch (error) {
        console.error('Error loading problems:', error);
        document.getElementById('courseSheet').innerHTML = 
            '<div class="error-message">Error loading problems. Please refresh the page.</div>';
    }
}

function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    const problems = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const values = lines[i].split(',');
        const problem = {};
        headers.forEach((header, index) => {
            problem[header.trim()] = values[index].trim();
        });
        problems.push(problem);
    }
    return problems;
}

function generateSections(problems) {
    const courseSheet = document.getElementById('courseSheet');
    const topics = [...new Set(problems.map(p => p.Topic))];
    
    courseSheet.innerHTML = ''; // Clear existing content
    
    topics.forEach(topic => {
        const topicProblems = problems.filter(p => p.Topic === topic);
        const section = createSection(topic, topicProblems);
        courseSheet.appendChild(section);
    });
}

// Modal handling
const modal = document.getElementById('solutionModal');
const closeButton = document.getElementsByClassName('close-button')[0];

// Enhanced modal handling with keyboard support
function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = 'auto'; // Re-enable body scroll
}

function openModal() {
    modal.style.display = "block";
    document.body.style.overflow = 'hidden'; // Prevent body scroll
}

// Update close button handlers
closeButton.onclick = closeModal;

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Add keyboard shortcut (Escape to close)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === "block") {
        closeModal();
    }
});

// Add loading states
const loadingTemplate = '<div class="loading"><div class="spinner"></div><p>Loading...</p></div>';
const errorTemplate = '<div class="error-message"><p>Error loading content. Please try again later.</p></div>';

// Modify createSection function to handle solution clicks
function createSection(topic, problems) {
    const section = document.createElement('div');
    section.className = 'section';
    section.innerHTML = `
        <div class="section-header" onclick="toggleSection(this)">${topic}</div>
        <div class="section-content">
            ${problems.map(problem => `
                <div class="list-item">
                    <div class="problem-info">
                        <a href="${problem['Problem Link']}" target="_blank">${problem['Problem Name']}</a>
                        <span class="difficulty ${problem.Difficulty.toLowerCase()}">${problem.Difficulty}</span>
                        <div class="problem-links">
                            <a href="#" onclick="showSolution('${problem['Solution Link']}'); return false;" class="solution-link">Solution</a>
                            <a href="${problem['Video Link']}" class="video-link" target="_blank">Video</a>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    return section;
}

// Update showSolution to load directly from solutions folder
async function showSolution(solutionPath) {
    try {
        document.getElementById('solutionContent').innerHTML = loadingTemplate;
        openModal();
        
        const response = await fetch(`solutions/${solutionPath}`);
        if (!response.ok) throw new Error('Failed to load solution');
        
        const markdown = await response.text();
        const cleanMarkdown = markdown
            .replace(/\r\n/g, '\n')
            .replace(/```(\w+)\s*\n/g, '```$1\n');
            
        const htmlContent = marked.parse(cleanMarkdown);
        document.getElementById('solutionContent').innerHTML = htmlContent;
        
        // Highlight code blocks after rendering
        Prism.highlightAll();
        
    } catch (error) {
        console.error('Error showing solution:', error);
        document.getElementById('solutionContent').innerHTML = errorTemplate;
    }
}

// Configure marked options
document.addEventListener('DOMContentLoaded', () => {
    marked.setOptions({
        highlight: function(code, lang) {
            if (Prism.languages[lang]) {
                return Prism.highlight(code, Prism.languages[lang], lang);
            }
            return code;
        },
        breaks: true,
        gfm: true
    });
    
    loadProblems();
    // Initialize modal close handlers
    const modal = document.getElementById('solutionModal');
    const closeButton = document.querySelector('.close-button');
    
    closeButton.onclick = closeModal;
    window.onclick = (event) => {
        if (event.target === modal) {
            closeModal();
        }
    };
});

// Dark mode toggle
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    // Set dark theme as default if no theme is saved
    if (!savedTheme) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    updateThemeIcon();

    // Add smooth transition for theme changes
    document.documentElement.style.setProperty('transition', 'background-color 0.3s ease, color 0.3s ease');
}

// Update theme toggle function
function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon();
    
    // Update Prism theme
    const prismTheme = next === 'dark' ? 'tomorrow' : 'default';
    const existingLink = document.querySelector('link[href*="prism-"]');
    if (existingLink) {
        existingLink.href = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism-${prismTheme}.min.css`;
    }
    
    // Reapply syntax highlighting
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
}

// Update theme icon with new emojis and titles
function updateThemeIcon() {
    const icon = document.getElementById('themeToggle');
    if (icon) {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        icon.textContent = isDark ? '🌞' : '🌚';
        icon.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        icon.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
}

// Enhanced filtering
let activeFilters = {
    difficulty: 'all',
    topics: new Set(),
    search: ''
};

function updateFilters() {
    const problems = document.querySelectorAll('.list-item');
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        let sectionHasVisibleProblems = false;
        
        const problemsInSection = section.querySelectorAll('.list-item');
        problemsInSection.forEach(problem => {
            const matchesDifficulty = activeFilters.difficulty === 'all' || 
                problem.querySelector('.difficulty').classList.contains(activeFilters.difficulty);
            const matchesTopic = activeFilters.topics.size === 0 || 
                activeFilters.topics.has(section.querySelector('.section-header').textContent);
            const matchesSearch = problem.textContent.toLowerCase().includes(activeFilters.search.toLowerCase());

            const isVisible = matchesDifficulty && matchesTopic && matchesSearch;
            problem.style.display = isVisible ? 'flex' : 'none';
            if (isVisible) sectionHasVisibleProblems = true;
        });

        section.style.display = sectionHasVisibleProblems ? 'block' : 'none';
    });

    updateStatistics();
}

function initializeFilters() {
    // Difficulty pills
    document.querySelectorAll('.difficulty-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.difficulty-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeFilters.difficulty = pill.dataset.difficulty;
            updateFilters();
        });
    });

    // Topic filters
    const topics = [...new Set(Array.from(document.querySelectorAll('.section-header')).map(h => h.textContent))];
    const topicFilters = document.getElementById('topicFilters');
    topics.forEach(topic => {
        const checkbox = document.createElement('label');
        checkbox.className = 'filter-option';
        checkbox.innerHTML = `
            <input type="checkbox" value="${topic}">
            <span>${topic}</span>
        `;
        checkbox.querySelector('input').addEventListener('change', (e) => {
            if (e.target.checked) {
                activeFilters.topics.add(topic);
            } else {
                activeFilters.topics.delete(topic);
            }
            updateFilters();
        });
        topicFilters.appendChild(checkbox);
    });
}

// Update statistics
function updateStatistics() {
    const problems = document.querySelectorAll('.list-item');
    const topics = new Set(Array.from(document.querySelectorAll('.section-header')).map(h => h.textContent));
    const easy = Array.from(problems).filter(p => p.querySelector('.difficulty.easy')).length;
    const medium = Array.from(problems).filter(p => p.querySelector('.difficulty.medium')).length;
    
    document.getElementById('totalProblems').textContent = problems.length;
    document.getElementById('totalTopics').textContent = topics.size;
    document.getElementById('easy').textContent = easy;
    document.getElementById('medium').textContent = medium;
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    marked.setOptions({
        highlight: function(code, lang) {
            if (Prism.languages[lang]) {
                return Prism.highlight(code, Prism.languages[lang], lang);
            }
            return code;
        },
        breaks: true,
        gfm: true
    });

    // Initialize theme
    initTheme();
    
    // Add theme toggle listener
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Initialize modal handlers
    const modal = document.getElementById('solutionModal');
    const closeButton = document.querySelector('.close-button');
    
    if (closeButton) {
        closeButton.onclick = closeModal;
    }

    if (modal) {
        window.onclick = (event) => {
            if (event.target === modal) {
                closeModal();
            }
        };
    }

    // Load problems and initialize filters
    loadProblems().then(() => {
        initializeFilters();
        updateStatistics();
    });
});