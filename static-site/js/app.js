// Main application logic
let data = [];

// Initialize the application
function init() {
    // Generate initial data
    generateInitialData();
    
    // Set up routing
    setupRouting();
    
    // Set up event listeners
    setupEventListeners();
    
    // Render initial page
    renderPage(window.location.pathname);
}

// Generate initial data
function generateInitialData() {
    data = Array.from({ length: 670 }, generatePersonData);
    
    // Real-time updates every 2 seconds
    setInterval(() => {
        const newPerson = generatePersonData();
        data = [newPerson, ...data].slice(0, 10000);
        if (window.location.pathname === '/dashboard' || window.location.pathname === '/data-spreadsheet') {
            renderPage(window.location.pathname);
        }
    }, 2000);
}

// Set up routing
function setupRouting() {
    window.addEventListener('popstate', () => {
        renderPage(window.location.pathname);
    });
}

// Set up event listeners
function setupEventListeners() {
    // Mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Form submissions
    document.addEventListener('submit', (e) => {
        if (e.target.id === 'dataForm') {
            e.preventDefault();
            handleDataFormSubmit(e.target);
        } else if (e.target.id === 'contactForm') {
            e.preventDefault();
            handleContactFormSubmit(e.target);
        }
    });
}

// Handle data form submission
function handleDataFormSubmit(form) {
    const formData = new FormData(form);
    const newPerson = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        income: formData.get('income'),
        location: formData.get('location'),
        platform: generateRandomPlatform()
    };
    
    data = [newPerson, ...data].slice(0, 10000);
    showSuccessMessage('Data submitted successfully!');
    form.reset();
}

// Handle contact form submission
function handleContactFormSubmit(form) {
    const formData = new FormData(form);
    showSuccessMessage('Message sent successfully! We\'ll get back to you soon.');
    form.reset();
}

// Show success message
function showSuccessMessage(message) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = message;
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Render page based on route
function renderPage(path) {
    const pageContent = document.getElementById('page-content');
    if (!pageContent) return;
    
    let content = '';
    switch (path) {
        case '/':
            content = HomePage();
            break;
        case '/dashboard':
            content = Dashboard(data);
            break;
        case '/data-collection':
            content = DataCollection();
            break;
        case '/data-spreadsheet':
            content = DataSpreadsheet(data);
            break;
        case '/case-studies':
            content = CaseStudies();
            break;
        case '/contact':
            content = Contact();
            break;
        default:
            content = HomePage();
    }
    
    pageContent.innerHTML = content;
    
    // Initialize charts if on dashboard
    if (path === '/dashboard') {
        initializeCharts();
    }
}

// Initialize charts
function initializeCharts() {
    const platformData = calculatePlatformData(data);
    const incomeData = calculateIncomeData(data);
    
    // Platform distribution chart
    const platformCtx = document.getElementById('platformChart');
    if (platformCtx) {
        new Chart(platformCtx, {
            type: 'pie',
            data: platformData,
            options: chartOptions
        });
    }
    
    // Income distribution chart
    const incomeCtx = document.getElementById('incomeChart');
    if (incomeCtx) {
        new Chart(incomeCtx, {
            type: 'bar',
            data: incomeData,
            options: chartOptions
        });
    }
}

// Generate person data
function generatePersonData() {
    return {
        name: generateRandomName(),
        email: generateRandomEmail(),
        phone: generateRandomPhone(),
        income: generateRandomIncome(),
        location: generateRandomLocation(),
        platform: generateRandomPlatform()
    };
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 