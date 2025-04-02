// Components
function HomePage() {
    return `
        <section class="hero">
            <h1>AI-Powered Precision Ad Targeting</h1>
            <p class="hero-subtitle">Revolutionary AI software that optimizes your ad spend with unprecedented accuracy. Built by industry experts in AI, data science, and digital marketing.</p>
            <div class="hero-cta">
                <a href="/data-collection" class="cta-button">Start Optimizing</a>
            </div>
        </section>

        <section class="features-section">
            <div class="container">
                <h2>Why Choose LeadGenius?</h2>
                <div class="features-grid">
                    ${FEATURES.map(feature => `
                        <div class="feature-card">
                            <div class="feature-icon">${feature.icon}</div>
                            <h3>${feature.title}</h3>
                            <p>${feature.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <section class="testimonial-section">
            <div class="container">
                <h2>Success Stories</h2>
                <div class="testimonial-grid">
                    ${CASE_STUDIES.map(study => `
                        <div class="testimonial-card">
                            <div class="testimonial-header">
                                <span class="platform-icon" style="color: ${PLATFORM_CONFIGS[study.platform].color}">
                                    ${PLATFORM_CONFIGS[study.platform].icon}
                                </span>
                                <h3>${study.company}</h3>
                            </div>
                            <p class="testimonial-text">${study.testimonial}</p>
                            <div class="testimonial-metrics">
                                <div class="metric">
                                    <span class="metric-value">${(study.roi * 100).toFixed(0)}%</span>
                                    <span class="metric-label">ROI</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-value">${(study.conversionRate * 100).toFixed(1)}%</span>
                                    <span class="metric-label">Conversion Rate</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-value">$${study.metrics.revenue.toLocaleString()}</span>
                                    <span class="metric-label">Revenue</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <section class="stats-section">
            <div class="container">
                <div class="stats-grid">
                    ${STATS.map(stat => `
                        <div class="stat-card">
                            <h3>${stat.label}</h3>
                            <p class="stat-value">${stat.value}</p>
                            <p class="stat-description">${stat.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <section class="cta-section">
            <div class="container">
                <h2>Ready to Transform Your Ad Strategy?</h2>
                <p>Join innovative companies using LeadGenius's AI-powered platform to revolutionize their digital marketing</p>
                <a href="/data-collection" class="cta-button large">Get Started Now</a>
            </div>
        </section>
    `;
}

function Dashboard(data) {
    const stats = calculateStats(data);
    const platformData = calculatePlatformData(data);
    const incomeData = calculateIncomeData(data);

    return `
        <div class="dashboard-container">
            <div class="container">
                <h1>Dashboard</h1>
                <div class="dashboard-grid">
                    <div class="stat-card">
                        <h3>Total Leads</h3>
                        <p class="stat-value">${stats.totalLeads}</p>
                    </div>
                    <div class="stat-card">
                        <h3>Average Income</h3>
                        <p class="stat-value">${stats.avgIncome}</p>
                    </div>
                    <div class="stat-card">
                        <h3>Platform Distribution</h3>
                        <canvas id="platformChart"></canvas>
                    </div>
                    <div class="stat-card">
                        <h3>Income Distribution</h3>
                        <canvas id="incomeChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function DataCollection() {
    return `
        <div class="data-collection-container">
            <div class="container">
                <h1>Data Collection</h1>
                <div class="form-container">
                    <form id="dataForm">
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" required>
                        </div>
                        <div class="form-group">
                            <label for="income">Annual Income</label>
                            <input type="text" id="income" name="income" required>
                        </div>
                        <div class="form-group">
                            <label for="location">Location</label>
                            <input type="text" id="location" name="location" required>
                        </div>
                        <button type="submit" class="cta-button">Submit Data</button>
                    </form>
                </div>
            </div>
        </div>
    `;
}

function DataSpreadsheet(data) {
    return `
        <div class="spreadsheet-container">
            <div class="container">
                <h1>Data Spreadsheet</h1>
                <div class="spreadsheet-header">
                    <div class="spreadsheet-cell">Name</div>
                    <div class="spreadsheet-cell">Email</div>
                    <div class="spreadsheet-cell">Phone</div>
                    <div class="spreadsheet-cell">Income</div>
                    <div class="spreadsheet-cell">Location</div>
                </div>
                <div class="spreadsheet-body">
                    ${data.map(person => `
                        <div class="spreadsheet-row">
                            <div class="spreadsheet-cell">${person.name}</div>
                            <div class="spreadsheet-cell">${person.email}</div>
                            <div class="spreadsheet-cell">${person.phone}</div>
                            <div class="spreadsheet-cell">${person.income}</div>
                            <div class="spreadsheet-cell">${person.location}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function CaseStudies() {
    return `
        <div class="case-studies-container">
            <div class="container">
                <h1>Case Studies</h1>
                <div class="case-studies-grid">
                    ${CASE_STUDIES.map(study => `
                        <div class="case-study-card">
                            <div class="case-study-header">
                                <h3>${study.company}</h3>
                                <span class="industry-tag">${study.industry}</span>
                            </div>
                            <div class="case-study-content">
                                <div class="metrics-grid">
                                    <div class="metric">
                                        <span class="metric-value">${(study.roi * 100).toFixed(0)}%</span>
                                        <span class="metric-label">ROI</span>
                                    </div>
                                    <div class="metric">
                                        <span class="metric-value">${(study.conversionRate * 100).toFixed(1)}%</span>
                                        <span class="metric-label">Conversion Rate</span>
                                    </div>
                                    <div class="metric">
                                        <span class="metric-value">$${study.metrics.revenue.toLocaleString()}</span>
                                        <span class="metric-label">Revenue</span>
                                    </div>
                                </div>
                                <p class="testimonial">${study.testimonial}</p>
                                <div class="platform-info">
                                    <span class="platform-icon" style="color: ${PLATFORM_CONFIGS[study.platform].color}">
                                        ${PLATFORM_CONFIGS[study.platform].icon}
                                    </span>
                                    <span>${PLATFORM_CONFIGS[study.platform].name}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function Contact() {
    return `
        <div class="contact-container">
            <div class="container">
                <h1>Contact Us</h1>
                <div class="form-container">
                    <form id="contactForm">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea id="message" name="message" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="cta-button">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    `;
}

// Helper functions for data calculations
function calculateStats(data) {
    return {
        totalLeads: data.length,
        avgIncome: data.some(d => d.income)
            ? `$${(data.reduce((acc, curr) => acc + (curr.income ? parseInt(curr.income.replace(/[^0-9]/g, ''), 10) : 0), 0) / (data.filter(d => d.income).length || 1)).toFixed(2)}k`
            : 'N/A'
    };
}

function calculatePlatformData(data) {
    const platformCounts = {};
    data.forEach(person => {
        if (person.platform) {
            platformCounts[person.platform] = (platformCounts[person.platform] || 0) + 1;
        }
    });

    return {
        labels: Object.keys(platformCounts),
        datasets: [{
            label: 'Platform Distribution',
            data: Object.values(platformCounts),
            backgroundColor: Object.keys(platformCounts).map(platform => PLATFORM_CONFIGS[platform].color)
        }]
    };
}

function calculateIncomeData(data) {
    const incomeRanges = {
        'No Data': data.filter(d => !d.income).length,
        '<50k': data.filter(d => d.income && parseInt(d.income.replace(/[^0-9]/g, '')) < 50).length,
        '50k-75k': data.filter(d => {
            if (!d.income) return false;
            const inc = parseInt(d.income.replace(/[^0-9]/g, ''));
            return inc >= 50 && inc < 75;
        }).length,
        '75k-100k': data.filter(d => {
            if (!d.income) return false;
            const inc = parseInt(d.income.replace(/[^0-9]/g, ''));
            return inc >= 75 && inc < 100;
        }).length,
        '100k+': data.filter(d => d.income && parseInt(d.income.replace(/[^0-9]/g, '')) >= 100).length
    };

    return {
        labels: Object.keys(incomeRanges),
        datasets: [{
            label: 'Income Distribution',
            data: Object.values(incomeRanges),
            backgroundColor: [
                'rgba(255, 255, 255, 0.1)',
                'rgba(0, 255, 157, 0.2)',
                'rgba(0, 184, 255, 0.2)',
                'rgba(255, 0, 255, 0.2)',
                'rgba(255, 255, 255, 0.2)'
            ]
        }]
    };
} 