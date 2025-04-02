// Utility functions
function shouldInclude(probability) {
    return Math.random() < probability;
}

function generateRandomString(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function generateRandomEmail() {
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const username = generateRandomString(8);
    return `${username}@${domain}`;
}

function generateRandomPhone() {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const prefix = Math.floor(Math.random() * 900) + 100;
    const lineNumber = Math.floor(Math.random() * 9000) + 1000;
    return `(${areaCode}) ${prefix}-${lineNumber}`;
}

function generateRandomIncome() {
    const variation = Math.random();
    
    let income;
    if (variation < 0.05) {
        // 5% chance of very high income outliers (100k-150k)
        income = Math.floor(Math.random() * 50 + 100);
    } else if (variation < 0.1) {
        // 5% chance of very low income (35-45k)
        income = Math.floor(Math.random() * 10 + 35);
    } else if (variation < 0.3) {
        // 20% chance of low income (45-60k)
        income = Math.floor(Math.random() * 15 + 45);
    } else if (variation < 0.7) {
        // 40% chance of middle income (60-70k)
        income = Math.floor(Math.random() * 10 + 60);
    } else if (variation < 0.9) {
        // 20% chance of high income (70-85k)
        income = Math.floor(Math.random() * 15 + 70);
    } else {
        // 10% chance of very high income (85-95k)
        income = Math.floor(Math.random() * 10 + 85);
    }
    
    return `$${income}k`;
}

function generateRandomName() {
    const firstNames = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Joseph', 'Thomas', 'Charles', 'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Nancy'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return `${firstName} ${lastName}`;
}

function generateRandomLocation() {
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
    const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA', 'TX', 'CA'];
    
    const index = Math.floor(Math.random() * cities.length);
    return `${cities[index]}, ${states[index]}`;
}

function generateRandomPlatform() {
    const platforms = ['facebook', 'instagram', 'google', 'linkedin', 'twitter'];
    return platforms[Math.floor(Math.random() * platforms.length)];
}

function generateRandomAdSpend() {
    return Math.floor(Math.random() * 5000) + 1000;
}

function generateRandomConversionRate() {
    return (Math.random() * 0.05 + 0.02).toFixed(2);
}

function generateRandomROI() {
    return (Math.random() * 2 + 1).toFixed(2);
}

// Chart configuration
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                color: '#ffffff'
            }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
                color: '#ffffff'
            }
        },
        x: {
            grid: {
                color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
                color: '#ffffff'
            }
        }
    }
}; 