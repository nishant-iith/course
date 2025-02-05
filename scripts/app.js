// Toggle collapse/expand for a section
function toggleSection(headerElement) {
    var section = headerElement.parentElement;
    section.classList.toggle('active');
}

// Filter problems across all sections based on search input
function filterProblems() {
    var input = document.getElementById('searchInput');
    var filter = input.value.toLowerCase();
    var sections = document.getElementsByClassName('section');

    // Loop through each section
    for (var i = 0; i < sections.length; i++) {
        var sectionContent = sections[i].getElementsByClassName('section-content')[0];
        var listItems = sectionContent.getElementsByClassName('list-item');
        var sectionHasMatch = false;

        // Loop through each list item in the section
        for (var j = 0; j < listItems.length; j++) {
            var link = listItems[j].getElementsByTagName('a')[0];
            if (link.innerText.toLowerCase().indexOf(filter) > -1) {
                listItems[j].style.display = 'flex';
                sectionHasMatch = true;
            } else {
                listItems[j].style.display = 'none';
            }
        }

        // Hide entire section if no list items match
        sections[i].style.display = sectionHasMatch ? '' : 'none';
    }
}

// Add loading animation
function showLoading() {
    const courseSheet = document.getElementById('courseSheet');
    courseSheet.innerHTML = '<div class="loading">Loading problems...</div>';
}

// Update loadProblems to show loading state
async function loadProblems() {
    showLoading();
    try {
        const response = await fetch('assets/problems.csv');
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
                    <input type="checkbox" class="progress-checkbox">
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

// Function to load and display markdown content
async function showSolution(solutionPath) {
    try {
        document.getElementById('solutionContent').innerHTML = loadingTemplate;
        openModal();
        
        const response = await fetch(`solutions/${solutionPath}`);
        if (!response.ok) throw new Error('Failed to load solution');
        
        const markdown = await response.text();
        const cleanMarkdown = markdown.replace(/\/\/ filepath:.*\n/, '');
        const htmlContent = marked.parse(cleanMarkdown);
        
        document.getElementById('solutionContent').innerHTML = htmlContent;
        
        // Reset scroll position
        document.getElementById('solutionContent').scrollTop = 0;
        
    } catch (error) {
        console.error('Error showing solution:', error);
        document.getElementById('solutionContent').innerHTML = errorTemplate;
    }
}

// Remove JSON-related code and simplify initialization
document.addEventListener('DOMContentLoaded', loadProblems);