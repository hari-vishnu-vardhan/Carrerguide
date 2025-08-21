document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const homeLink = document.getElementById('home-link');
    const engineeringLink = document.getElementById('engineering-link');
    const nonEngineeringLink = document.getElementById('non-engineering-link');
    const jobsLink = document.getElementById('jobs-link');
    
    // Get all content sections
    const homeSection = document.getElementById('home-section');
    const engineeringSection = document.getElementById('engineering-section');
    const nonEngineeringSection = document.getElementById('non-engineering-section');
    const jobsSection = document.getElementById('jobs-section');
    
    // Function to hide all sections with a fade-out effect
    function hideAllSections() {
        const sections = [homeSection, engineeringSection, nonEngineeringSection, jobsSection];
        sections.forEach(section => {
            if (section.style.display === 'block') {
                section.style.opacity = '0';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300); // Match this with CSS transition duration
            }
        });
    }
    
    // Function to show a section with a fade-in effect
    function showSection(section) {
        section.style.display = 'block';
        setTimeout(() => {
            section.style.opacity = '1';
        }, 10);
    }
    
    // Show home section by default
    hideAllSections();
    showSection(homeSection);
    
    // Add click event listeners to navigation links
    homeLink.addEventListener('click', function(e) {
        e.preventDefault();
        hideAllSections();
        showSection(homeSection);
    });
    
    engineeringLink.addEventListener('click', function(e) {
        e.preventDefault();
        hideAllSections();
        showSection(engineeringSection);
    });
    
    nonEngineeringLink.addEventListener('click', function(e) {
        e.preventDefault();
        hideAllSections();
        showSection(nonEngineeringSection);
    });
    
    jobsLink.addEventListener('click', function(e) {
        e.preventDefault();
        hideAllSections();
        showSection(jobsSection);
    });
});
