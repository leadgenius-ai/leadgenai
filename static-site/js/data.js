// Platform configurations
const PLATFORM_CONFIGS = {
    facebook: {
        color: '#1877F2',
        icon: '📘',
        name: 'Facebook'
    },
    instagram: {
        color: '#E4405F',
        icon: '📸',
        name: 'Instagram'
    },
    google: {
        color: 'var(--cyber-teal)',
        icon: '🔍',
        name: 'Google'
    },
    linkedin: {
        color: '#0A66C2',
        icon: '💼',
        name: 'LinkedIn'
    },
    twitter: {
        color: '#1DA1F2',
        icon: '🐦',
        name: 'Twitter'
    }
};

// Case studies data
const CASE_STUDIES = [
    {
        company: "TechStart Inc.",
        industry: "SaaS",
        platform: "google",
        adSpend: 15000,
        conversionRate: 0.045,
        roi: 2.8,
        testimonial: "LeadGenius transformed our ad strategy. We saw a 180% increase in qualified leads while reducing our ad spend by 30%.",
        metrics: {
            leads: 450,
            costPerLead: 33.33,
            revenue: 42000
        }
    },
    {
        company: "FashionForward",
        industry: "E-commerce",
        platform: "instagram",
        adSpend: 8000,
        conversionRate: 0.038,
        roi: 2.2,
        testimonial: "The AI-powered targeting is incredible. We're reaching exactly the right customers at the right time.",
        metrics: {
            leads: 304,
            costPerLead: 26.32,
            revenue: 17600
        }
    },
    {
        company: "HealthCare Plus",
        industry: "Healthcare",
        platform: "facebook",
        adSpend: 12000,
        conversionRate: 0.042,
        roi: 2.5,
        testimonial: "LeadGenius helped us achieve 2.5x ROI while maintaining HIPAA compliance. Game-changing technology.",
        metrics: {
            leads: 504,
            costPerLead: 23.81,
            revenue: 30000
        }
    },
    {
        company: "EduTech Solutions",
        industry: "Education",
        platform: "linkedin",
        adSpend: 10000,
        conversionRate: 0.035,
        roi: 2.1,
        testimonial: "The platform's ability to identify high-intent prospects in the education sector is remarkable.",
        metrics: {
            leads: 350,
            costPerLead: 28.57,
            revenue: 21000
        }
    },
    {
        company: "RealEstate Pro",
        industry: "Real Estate",
        platform: "google",
        adSpend: 20000,
        conversionRate: 0.048,
        roi: 3.2,
        testimonial: "We're generating 3x more qualified leads than before. The ROI speaks for itself.",
        metrics: {
            leads: 960,
            costPerLead: 20.83,
            revenue: 64000
        }
    }
];

// Features data
const FEATURES = [
    {
        title: "AI-Powered Targeting",
        description: "Advanced machine learning algorithms analyze user behavior and demographics to identify high-value prospects.",
        icon: "🎯"
    },
    {
        title: "Real-Time Optimization",
        description: "Continuous monitoring and automatic adjustment of ad campaigns for maximum performance.",
        icon: "⚡"
    },
    {
        title: "Multi-Platform Integration",
        description: "Seamlessly manage campaigns across Facebook, Instagram, Google, LinkedIn, and Twitter.",
        icon: "🔄"
    },
    {
        title: "Advanced Analytics",
        description: "Comprehensive reporting and insights to track campaign performance and ROI.",
        icon: "📊"
    },
    {
        title: "Custom Audience Creation",
        description: "Build and target custom audiences based on behavior, interests, and demographics.",
        icon: "👥"
    },
    {
        title: "A/B Testing",
        description: "Test different ad variations to optimize performance and maximize conversions.",
        icon: "🔬"
    }
];

// Stats data
const STATS = [
    {
        label: "Average ROI",
        value: "2.5x",
        description: "Across all campaigns"
    },
    {
        label: "Cost Reduction",
        value: "30%",
        description: "In ad spend"
    },
    {
        label: "Lead Quality",
        value: "85%",
        description: "Qualified leads"
    },
    {
        label: "Conversion Rate",
        value: "4.2%",
        description: "Average across platforms"
    }
]; 