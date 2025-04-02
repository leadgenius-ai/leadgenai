import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import './App.css';
import MobileNav from './components/MobileNav';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

// Utility function to generate random data
const generatePersonData = () => {
  const firstNames = [
    'James', 'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia',
    'Michael', 'Isabella', 'Alexander', 'Mia', 'Daniel', 'Charlotte', 'David', 'Amelia',
    'Joseph', 'Harper', 'Lucas', 'Evelyn', 'Henry', 'Abigail', 'Sebastian', 'Emily',
    'Matthew', 'Elizabeth', 'Jackson', 'Sofia', 'Andrew', 'Avery', 'Christopher', 'Ella'
  ];

  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
    'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
    'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young'
  ];

  const jobs = [
    'Software Engineer', 'Data Scientist', 'Marketing Manager', 'Sales Executive',
    'Product Manager', 'UX Designer', 'Business Analyst', 'Financial Advisor',
    'HR Manager', 'Operations Director', 'Digital Marketer', 'Content Creator',
    'Startup Founder', 'Real Estate Agent', 'Healthcare Professional', 'Teacher',
    'Restaurant Owner', 'Fitness Trainer', 'Graphic Designer', 'Accountant',
    'Legal Professional', 'Construction Manager', 'Retail Manager', 'Chef',
    'Photographer', 'Insurance Agent', 'Web Developer', 'Interior Designer'
  ];
  
  const companies = [
    'TechCorp SD', 'Innovate Labs', 'Digital Dynamics', 'Future Solutions',
    'Ocean Analytics', 'Coastal Tech', 'San Diego Systems', 'Pacific Digital',
    'Sunset Realty', 'Health First', 'Creative Mind', 'Green Energy Co',
    'Urban Fitness', 'Legal Eagles', 'Build Right', 'Smart Finance',
    'Food Haven', 'Design Masters', 'Cloud Nine Tech', 'Education Plus'
  ];

  const interests = [
    'Technology', 'Travel', 'Fitness', 'Gaming', 'Food & Dining',
    'Home Improvement', 'Fashion', 'Outdoor Activities', 'Entertainment',
    'Investing', 'Photography', 'Music', 'Art', 'Books', 'Sports',
    'Cars', 'Cooking', 'Pets', 'Environment', 'Education'
  ];

  const emailDomains = ['gmail.com', 'icloud.com', 'yahoo.com', 'outlook.com'];

  // Helper function to randomly decide if data should be missing
  const shouldInclude = (probability = 0.9) => Math.random() < probability;

  // Generate US phone number
  const generatePhoneNumber = () => {
    if (shouldInclude(0.5)) { // 50% chance to have phone number
      const areaCode = Math.floor(Math.random() * 800) + 200;
      const firstPart = Math.floor(Math.random() * 900) + 100;
      const secondPart = Math.floor(Math.random() * 9000) + 1000;
      return `(${areaCode}) ${firstPart}-${secondPart}`;
    }
    return null;
  };

  // Generate more variable income with normal distribution and possible missing values
  const generateIncome = () => {
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
  };

  // Generate email with possible missing values
  const generateEmail = (firstName, lastName) => {
    if (shouldInclude(0.75)) { // 75% chance to have email (25% N/A)
      // Create email variations based on name
      const emailVariations = [
        `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
        `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
        `${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
        `${firstName.toLowerCase()}${lastName.charAt(0).toLowerCase()}`,
        `${firstName.charAt(0).toLowerCase()}${lastName.toLowerCase()}`
      ];
      const emailFormat = emailVariations[Math.floor(Math.random() * emailVariations.length)];
      const emailDomain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
      // Only add a number 20% of the time
      const shouldAddNumber = Math.random() < 0.2;
      const randomNum = shouldAddNumber ? Math.floor(Math.random() * 99) + 1 : '';
      return `${emailFormat}${randomNum}@${emailDomain}`;
    }
    return null;
  };

  // Add social media data with active time focus
  const socialPlatforms = {
    Facebook: {
      active: Math.random() > 0.3,
      activeTime: {
        weekday: Math.floor(Math.random() * 5) + 1 + ' hours/day',
        weekend: Math.floor(Math.random() * 8) + 2 + ' hours/day',
        peakHours: [
          Math.floor(Math.random() * 5) + 6 + ':00', // Morning peak
          Math.floor(Math.random() * 6) + 17 + ':00' // Evening peak
        ]
      },
      interests: ['News', 'Entertainment', 'Shopping'].slice(0, Math.floor(Math.random() * 3) + 1),
      pixelId: 'FB-' + Math.random().toString(36).substr(2, 9)
    },
    Instagram: {
      active: Math.random() > 0.4,
      activeTime: {
        weekday: Math.floor(Math.random() * 3) + 1 + ' hours/day',
        weekend: Math.floor(Math.random() * 6) + 2 + ' hours/day',
        peakHours: [
          Math.floor(Math.random() * 4) + 8 + ':00',
          Math.floor(Math.random() * 5) + 18 + ':00'
        ]
      },
      interests: ['Fashion', 'Food', 'Travel'].slice(0, Math.floor(Math.random() * 3) + 1),
      pixelId: 'IG-' + Math.random().toString(36).substr(2, 9)
    },
    LinkedIn: {
      active: Math.random() > 0.5,
      activeTime: {
        weekday: Math.floor(Math.random() * 2) + 1 + ' hours/day',
        weekend: Math.floor(Math.random() * 2) + 0.5 + ' hours/day',
        peakHours: [
          Math.floor(Math.random() * 3) + 9 + ':00',
          Math.floor(Math.random() * 3) + 14 + ':00'
        ]
      },
      interests: ['Business', 'Technology', 'Career'].slice(0, Math.floor(Math.random() * 3) + 1),
      pixelId: 'LI-' + Math.random().toString(36).substr(2, 9)
    },
    Twitter: {
      active: Math.random() > 0.6,
      activeTime: {
        weekday: Math.floor(Math.random() * 4) + 1 + ' hours/day',
        weekend: Math.floor(Math.random() * 6) + 1 + ' hours/day',
        peakHours: [
          Math.floor(Math.random() * 4) + 7 + ':00',
          Math.floor(Math.random() * 6) + 16 + ':00'
        ]
      },
      interests: ['News', 'Sports', 'Politics'].slice(0, Math.floor(Math.random() * 3) + 1),
      pixelId: 'TW-' + Math.random().toString(36).substr(2, 9)
    }
  };

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return {
    id: Date.now(),
    name: `${firstName} ${lastName}`,
    age: Math.floor(Math.random() * (65 - 22) + 22),
    location: 'San Diego, CA',
    job: jobs[Math.floor(Math.random() * jobs.length)],
    company: companies[Math.floor(Math.random() * companies.length)],
    income: generateIncome(),
    interests: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
      interests[Math.floor(Math.random() * interests.length)]),
    email: generateEmail(firstName, lastName),
    phone: generatePhoneNumber(),
    timestamp: new Date().toLocaleString(),
    socialMedia: socialPlatforms
  };
};

// Add platform-specific configurations
const PLATFORM_CONFIGS = {
  Facebook: {
    adTypes: ['Image Ad', 'Video Ad', 'Carousel Ad', 'Stories Ad'],
    objectives: ['Brand Awareness', 'Reach', 'Traffic', 'Engagement', 'Lead Generation', 'Conversions'],
    targetingOptions: ['Location', 'Age', 'Interests', 'Behaviors', 'Demographics'],
    pixelEvents: ['PageView', 'ViewContent', 'AddToCart', 'Purchase', 'Lead']
  },
  Instagram: {
    adTypes: ['Photo Ad', 'Video Ad', 'Carousel Ad', 'Stories Ad', 'Reels Ad'],
    objectives: ['Brand Awareness', 'Reach', 'Traffic', 'App Installs', 'Lead Generation'],
    targetingOptions: ['Location', 'Age', 'Interests', 'Behaviors', 'Demographics'],
    pixelEvents: ['PageView', 'ViewContent', 'AddToCart', 'Purchase']
  },
  LinkedIn: {
    adTypes: ['Single Image Ad', 'Carousel Ad', 'Message Ad', 'Text Ad'],
    objectives: ['Brand Awareness', 'Website Visits', 'Engagement', 'Lead Generation'],
    targetingOptions: ['Job Title', 'Company', 'Industry', 'Skills', 'Education'],
    pixelEvents: ['PageView', 'Lead', 'Purchase']
  },
  Twitter: {
    adTypes: ['Promoted Tweet', 'Image Ad', 'Video Ad', 'Carousel Ad'],
    objectives: ['Awareness', 'Consideration', 'Conversion'],
    targetingOptions: ['Location', 'Interests', 'Keywords', 'Followers', 'Behaviors'],
    pixelEvents: ['PageView', 'Content View', 'Lead', 'Purchase']
  }
};

// Add case studies data
const CASE_STUDIES = [
  {
    id: 1,
    name: "Civico 1845",
    type: "Italian Restaurant",
    location: "1845 India St, San Diego",
    adSpend: {
      monthly: 2500,
      platforms: {
        facebook: 1200,
        instagram: 800,
        google: 500
      }
    },
    results: {
      roas: 4.8,
      roi: 380,
      revenue: 12000,
      newCustomers: 450
    },
    metrics: {
      averageOrder: 85,
      repeatRate: "42%",
      peakHours: "6 PM - 9 PM"
    },
    testimonial: "LeadGenius helped us target food enthusiasts and tourists effectively, increasing our weekend bookings by 65%.",
    image: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=[reference]",
    rating: 4.7
  },
  {
    id: 2,
    name: "Pigment",
    type: "Home Decor & Gift Shop",
    location: "3827 30th St, San Diego",
    adSpend: {
      monthly: 3500,
      platforms: {
        facebook: 1500,
        instagram: 1500,
        pinterest: 500
      }
    },
    results: {
      roas: 5.2,
      roi: 420,
      revenue: 18200,
      newCustomers: 620
    },
    metrics: {
      averageOrder: 95,
      repeatRate: "58%",
      peakHours: "11 AM - 4 PM"
    },
    testimonial: "The targeted ads brought in exactly our ideal customer demographic, leading to higher average order values.",
    image: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=[reference]",
    rating: 4.8
  },
  {
    id: 3,
    name: "Bird Rock Coffee Roasters",
    type: "Coffee Shop",
    location: "5627 La Jolla Blvd, La Jolla",
    adSpend: {
      monthly: 1800,
      platforms: {
        instagram: 800,
        facebook: 600,
        google: 400
      }
    },
    results: {
      roas: 4.2,
      roi: 320,
      revenue: 7560,
      newCustomers: 380
    },
    metrics: {
      averageOrder: 22,
      repeatRate: "75%",
      peakHours: "7 AM - 11 AM"
    },
    testimonial: "Our morning rush increased by 45% after implementing LeadGenius's targeted advertising strategy.",
    image: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=[reference]",
    rating: 4.6
  },
  {
    id: 4,
    name: "Fitness Quest 10",
    type: "Fitness Center",
    location: "10001 Craftsman Way, San Diego",
    adSpend: {
      monthly: 4200,
      platforms: {
        facebook: 2000,
        instagram: 1500,
        google: 700
      }
    },
    results: {
      roas: 5.8,
      roi: 480,
      revenue: 24360,
      newCustomers: 185
    },
    metrics: {
      averageOrder: 150,
      repeatRate: "82%",
      peakHours: "6 AM - 8 AM, 5 PM - 7 PM"
    },
    testimonial: "LeadGenius helped us target fitness enthusiasts during their planning hours, leading to a 90% conversion rate on intro packages.",
    image: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=[reference]",
    rating: 4.9
  },
  {
    id: 5,
    name: "Warwick's",
    type: "Bookstore",
    location: "7812 Girard Ave, La Jolla",
    adSpend: {
      monthly: 2800,
      platforms: {
        facebook: 1200,
        instagram: 800,
        google: 800
      }
    },
    results: {
      roas: 4.5,
      roi: 350,
      revenue: 12600,
      newCustomers: 420
    },
    metrics: {
      averageOrder: 45,
      repeatRate: "65%",
      peakHours: "2 PM - 6 PM"
    },
    testimonial: "The AI-powered targeting helped us reach book lovers and increase our event attendance by 85%.",
    image: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=[reference]",
    rating: 4.7
  },
  {
    id: 6,
    name: "Bleu Bohème",
    type: "French Restaurant",
    location: "4090 Adams Ave, San Diego",
    adSpend: {
      monthly: 3000,
      platforms: {
        facebook: 1400,
        instagram: 1100,
        google: 500
      }
    },
    results: {
      roas: 5.1,
      roi: 410,
      revenue: 15300,
      newCustomers: 280
    },
    metrics: {
      averageOrder: 120,
      repeatRate: "48%",
      peakHours: "6:30 PM - 9:30 PM"
    },
    testimonial: "LeadGenius's platform helped us target special occasion diners, increasing our premium wine sales by 40%.",
    image: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=[reference]",
    rating: 4.6
  },
  {
    id: 7,
    name: "Vuori",
    type: "Athletic Apparel",
    location: "1091 S Coast Hwy 101, Encinitas",
    adSpend: {
      monthly: 5500,
      platforms: {
        instagram: 2500,
        facebook: 2000,
        google: 1000
      }
    },
    results: {
      roas: 6.2,
      roi: 520,
      revenue: 34100,
      newCustomers: 780
    },
    metrics: {
      averageOrder: 135,
      repeatRate: "72%",
      peakHours: "11 AM - 7 PM"
    },
    testimonial: "The targeted ads helped us reach active lifestyle enthusiasts, resulting in a 95% increase in online sales.",
    image: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=[reference]",
    rating: 4.8
  },
  {
    id: 8,
    name: "Bottlecraft",
    type: "Craft Beer Shop",
    location: "3007 University Ave, San Diego",
    adSpend: {
      monthly: 2200,
      platforms: {
        instagram: 900,
        facebook: 800,
        google: 500
      }
    },
    results: {
      roas: 4.7,
      roi: 370,
      revenue: 10340,
      newCustomers: 320
    },
    metrics: {
      averageOrder: 55,
      repeatRate: "68%",
      peakHours: "4 PM - 8 PM"
    },
    testimonial: "LeadGenius helped us target craft beer enthusiasts during peak shopping hours, increasing event attendance by 120%.",
    image: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=[reference]",
    rating: 4.7
  },
  {
    id: 9,
    name: "Saffron Thai",
    type: "Thai Restaurant",
    location: "3731 India St, San Diego",
    adSpend: {
      monthly: 2000,
      platforms: {
        facebook: 800,
        instagram: 700,
        google: 500
      }
    },
    results: {
      roas: 4.9,
      roi: 390,
      revenue: 9800,
      newCustomers: 410
    },
    metrics: {
      averageOrder: 42,
      repeatRate: "62%",
      peakHours: "11:30 AM - 2 PM, 5 PM - 8 PM"
    },
    testimonial: "The AI targeting helped us reach food enthusiasts and increase our lunch rush by 55%.",
    image: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=[reference]",
    rating: 4.6
  },
  {
    id: 10,
    name: "La Jolla Sports Club",
    type: "Fitness Center",
    location: "7825 Fay Ave, La Jolla",
    adSpend: {
      monthly: 3800,
      platforms: {
        facebook: 1800,
        instagram: 1400,
        google: 600
      }
    },
    results: {
      roas: 5.5,
      roi: 450,
      revenue: 20900,
      newCustomers: 145
    },
    metrics: {
      averageOrder: 180,
      repeatRate: "78%",
      peakHours: "6 AM - 9 AM, 4 PM - 7 PM"
    },
    testimonial: "LeadGenius's targeting brought in high-value clients, increasing our premium membership sign-ups by 75%.",
    image: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=[reference]",
    rating: 4.8
  }
];

function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    // Auto-advance slideshow every 5 seconds
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % CASE_STUDIES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % CASE_STUDIES.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(prev => (prev - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
  };

  return (
    <div className="home-page">
      <section className="hero">
        <h1>AI-Powered Precision Ad Targeting</h1>
        <p className="hero-subtitle">Revolutionary AI software that optimizes your ad spend with unprecedented accuracy. Built by industry experts in AI, data science, and digital marketing.</p>
        <div className="hero-cta">
          <Link to="/data-collection" className="cta-button" style={{ textDecoration: 'none' }}>Start Optimizing</Link>
        </div>
      </section>

      <section className="about-section">
        <div className="about-content">
          <div className="founder-info">
            <div className="founder-details">
              <h2>About the Founding Team</h2>
              <h3>Daniel Phan & Team</h3>
              <p className="founder-title">Senior Software Developers at Qualcomm</p>
              <ul className="founder-credentials">
                <li>Senior Software Developers at Qualcomm</li>
                <li>Expertise in AI and Machine Learning</li>
                <li>Data Science Background from UCSD</li>
                <li>Pioneers in Ad Targeting Technology</li>
              </ul>
            </div>
          </div>
          <div className="company-mission">
            <h3>Our Mission</h3>
            <p>LeadGenius represents the convergence of cutting-edge AI technology and digital marketing expertise. Born from years of experience in data science and software development, our platform leverages advanced machine learning algorithms to revolutionize how businesses target and engage their audience.</p>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="testimonial-container">
          <div className="testimonial-content">
            <div className="testimonial-header">
              <h2>Success Stories</h2>
              <div className="testimonial-nav">
                <button className="nav-button prev" onClick={prevTestimonial}>←</button>
                <span className="testimonial-counter">{currentTestimonial + 1} / {CASE_STUDIES.length}</span>
                <button className="nav-button next" onClick={nextTestimonial}>→</button>
              </div>
            </div>
            <div className="testimonial-story">
              <div className="business-meta">
                <h3>{CASE_STUDIES[currentTestimonial].name}</h3>
                <div className="business-info">
                  <span className="rating">⭐ {CASE_STUDIES[currentTestimonial].rating}</span>
                  <span className="type">{CASE_STUDIES[currentTestimonial].type}</span>
                  <span className="location">{CASE_STUDIES[currentTestimonial].location}</span>
                </div>
              </div>
              <div className="results-grid">
                <div className="result-card">
                  <h3>Return on Ad Spend</h3>
                  <div className="result-value">{CASE_STUDIES[currentTestimonial].results.roas}x</div>
                  <p>For every $1 spent on ads</p>
                </div>
                <div className="result-card">
                  <h3>ROI</h3>
                  <div className="result-value">{CASE_STUDIES[currentTestimonial].results.roi}%</div>
                  <p>Overall return on investment</p>
                </div>
                <div className="result-card">
                  <h3>New Customers</h3>
                  <div className="result-value">{CASE_STUDIES[currentTestimonial].results.newCustomers}+</div>
                  <p>First-time visitors acquired</p>
                </div>
                <div className="result-card">
                  <h3>Revenue Growth</h3>
                  <div className="result-value">${CASE_STUDIES[currentTestimonial].results.revenue}</div>
                  <p>Additional monthly revenue</p>
                </div>
              </div>
              <div className="strategy-breakdown">
                <h3>Campaign Strategy</h3>
                <div className="platform-distribution">
                  {Object.entries(CASE_STUDIES[currentTestimonial].adSpend.platforms).map(([platform, spend]) => (
                    <div key={platform} className="platform-spend">
                      <span className="platform-name">{platform}</span>
                      <div className="spend-bar">
                        <div 
                          className="spend-fill"
                          style={{ 
                            width: `${(spend / CASE_STUDIES[currentTestimonial].adSpend.monthly) * 100}%`,
                            backgroundColor: 
                              platform === 'facebook' ? '#1877F2' : 
                              platform === 'instagram' ? '#E4405F' : 
                              platform === 'google' ? 'var(--cyber-teal)' : 
                              platform === 'pinterest' ? '#E60023' : '#666'
                          }}
                        ></div>
                        <span className="spend-amount">${spend}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="metrics-summary">
                  <div className="metric">
                    <span className="label">Average Order</span>
                    <span className="value">${CASE_STUDIES[currentTestimonial].metrics.averageOrder}</span>
                  </div>
                  <div className="metric">
                    <span className="label">Repeat Rate</span>
                    <span className="value">{CASE_STUDIES[currentTestimonial].metrics.repeatRate}</span>
                  </div>
                  <div className="metric">
                    <span className="label">Peak Hours</span>
                    <span className="value">{CASE_STUDIES[currentTestimonial].metrics.peakHours}</span>
                  </div>
                </div>
              </div>
              <blockquote className="testimonial-quote">
                "{CASE_STUDIES[currentTestimonial].testimonial}"
                <cite>- {CASE_STUDIES[currentTestimonial].name} Management</cite>
              </blockquote>
              <div className="testimonial-dots">
                {CASE_STUDIES.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                    onClick={() => setCurrentTestimonial(index)}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose LeadGenius</h2>
        <div className="features-grid">
          <div className="feature-box">
            <div className="feature-icon">🎯</div>
            <h3>Precision Targeting</h3>
            <p>AI-powered algorithms that significantly improve ad spend efficiency</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon">🤖</div>
            <h3>Advanced AI</h3>
            <p>State-of-the-art machine learning for real-time optimization</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon">📈</div>
            <h3>ROI Focused</h3>
            <p>Maximize return on ad spend with intelligent data analysis</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon">⚡</div>
            <h3>Real-Time Processing</h3>
            <p>Instant insights and adjustments for optimal performance</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-highlight">
          <h4>85%</h4>
          <p>Improved Ad Efficiency</p>
        </div>
        <div className="stat-highlight">
          <h4>3x</h4>
          <p>ROI Increase</p>
        </div>
        <div className="stat-highlight">
          <h4>Real-Time</h4>
          <p>AI Optimization</p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Transform Your Ad Strategy?</h2>
        <p>Join innovative companies using LeadGenius's AI-powered platform to revolutionize their digital marketing</p>
        <Link to="/data-collection" className="cta-button large">Get Started Now</Link>
      </section>
    </div>
  );
}

function Dashboard({ data }) {
  const stats = {
    totalProfiles: data.length,
    avgAge: (data.reduce((acc, curr) => acc + curr.age, 0) / (data.length || 1)).toFixed(1),
    avgIncome: data.some(d => d.income) 
      ? `$${(data.reduce((acc, curr) => acc + (curr.income ? parseInt(curr.income.replace(/[^0-9]/g, ''), 10) : 0), 0) / (data.filter(d => d.income).length || 1)).toFixed(2)}k`
      : 'N/A',
    topInterests: [...new Set(data.flatMap(d => d.interests))].slice(0, 5)
  };

  // Chart options
  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: 'white',
          font: {
            size: 12,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'white',
          font: {
            size: 12,
            weight: 'bold'
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  const pieOptions = {
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      }
    }
  };

  // Prepare data for charts
  const ageGroups = {
    '18-25': data.filter(d => d.age >= 18 && d.age <= 25).length,
    '26-35': data.filter(d => d.age > 25 && d.age <= 35).length,
    '36-45': data.filter(d => d.age > 35 && d.age <= 45).length,
    '46-55': data.filter(d => d.age > 45 && d.age <= 55).length,
    '55+': data.filter(d => d.age > 55).length,
  };

  const jobCategories = {};
  data.forEach(d => {
    jobCategories[d.job] = (jobCategories[d.job] || 0) + 1;
  });

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
    '100k+': data.filter(d => d.income && parseInt(d.income.replace(/[^0-9]/g, '')) >= 100).length,
  };

  const pieData = {
    labels: Object.keys(ageGroups),
    datasets: [{
      data: Object.values(ageGroups),
      backgroundColor: [
        '#8A2BE2', '#00AEEF', '#14A098', '#FF00FF', '#4B0082'
      ],
      borderWidth: 2,
      borderColor: '#FFFFFF'
    }]
  };

  const incomeData = {
    labels: Object.keys(incomeRanges),
    datasets: [{
      label: 'Income Distribution',
      data: Object.values(incomeRanges),
      backgroundColor: '#8A2BE2',
      borderColor: '#FFFFFF',
      borderWidth: 2,
      barThickness: 40
    }]
  };

  const jobData = {
    labels: Object.keys(jobCategories).slice(0, 10),
    datasets: [{
      label: 'Top 10 Jobs',
      data: Object.values(jobCategories).slice(0, 10),
      backgroundColor: '#00AEEF',
      borderColor: '#FFFFFF',
      borderWidth: 2,
      barThickness: 30
    }]
  };

  return (
    <div className="dashboard">
      <h2>Real-Time Analytics Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Profiles</h3>
          <p className="stat-value">{stats.totalProfiles}</p>
        </div>
        <div className="stat-card">
          <h3>Average Age</h3>
          <p className="stat-value">{stats.avgAge}</p>
        </div>
        <div className="stat-card">
          <h3>Average Income</h3>
          <p className="stat-value">{stats.avgIncome}</p>
        </div>
        <div className="stat-card">
          <h3>Top Interests</h3>
          <div className="interests-list">
            {stats.topInterests.map((interest, index) => (
              <span key={index} className="interest-tag">{interest}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Age Distribution</h3>
          <div className="chart-container">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
        <div className="chart-card">
          <h3>Income Distribution</h3>
          <div className="chart-container">
            <Bar data={incomeData} options={chartOptions} />
          </div>
        </div>
        <div className="chart-card wide">
          <h3>Top 10 Jobs</h3>
          <div className="chart-container">
            <Bar data={jobData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PlatformAdTarget({ platform, data, pixelId, onClose }) {
  const [adConfig, setAdConfig] = useState({
    adType: PLATFORM_CONFIGS[platform].adTypes[0],
    objective: PLATFORM_CONFIGS[platform].objectives[0],
    budget: '50',
    duration: '7',
    targeting: {
      location: data.location,
      age: `${data.age - 5}-${data.age + 5}`,
      interests: [...data.interests, ...(data.socialMedia[platform].interests || [])],
      income: data.income ? data.income.replace('$', '').replace('k', '000') : 'Not Specified'
    }
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLaunchCampaign = () => {
    console.log(`Launching ${platform} campaign:`, {
      ...adConfig,
      pixelId,
      userData: data
    });
    setShowSuccess(true);
    // Close the modal after showing success message
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="platform-target-overlay">
      <div className="platform-target-modal">
        <button className="close-button" onClick={onClose}>×</button>
        
        {showSuccess ? (
          <div className="success-message">
            <div className="success-content">
              <div className="success-icon">✓</div>
              <h2>Campaign Launched Successfully!</h2>
              <p>Your campaign on {platform} is now being processed.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="platform-target-header">
              <h2>Launch {platform} Campaign</h2>
              <p className="pixel-id">Pixel ID: {pixelId}</p>
            </div>

            <div className="platform-target-content">
              <div className="target-section">
                <h3>Campaign Settings</h3>
                <div className="form-group">
                  <label>Ad Type</label>
                  <select 
                    value={adConfig.adType}
                    onChange={(e) => setAdConfig({...adConfig, adType: e.target.value})}
                  >
                    {PLATFORM_CONFIGS[platform].adTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Campaign Objective</label>
                  <select 
                    value={adConfig.objective}
                    onChange={(e) => setAdConfig({...adConfig, objective: e.target.value})}
                  >
                    {PLATFORM_CONFIGS[platform].objectives.map(obj => (
                      <option key={obj} value={obj}>{obj}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Daily Budget ($)</label>
                  <input 
                    type="number" 
                    value={adConfig.budget}
                    onChange={(e) => setAdConfig({...adConfig, budget: e.target.value})}
                    min="5"
                  />
                </div>

                <div className="form-group">
                  <label>Campaign Duration (days)</label>
                  <input 
                    type="number" 
                    value={adConfig.duration}
                    onChange={(e) => setAdConfig({...adConfig, duration: e.target.value})}
                    min="1"
                  />
                </div>
              </div>

              <div className="target-section">
                <h3>Audience Targeting</h3>
                <div className="targeting-details">
                  <p><strong>Location:</strong> {adConfig.targeting.location}</p>
                  <p><strong>Age Range:</strong> {adConfig.targeting.age}</p>
                  <p><strong>Income Level:</strong> {adConfig.targeting.income}</p>
                  <div className="targeting-interests">
                    <strong>Interests:</strong>
                    <div className="interests-tags">
                      {adConfig.targeting.interests.map((interest, index) => (
                        <span key={index} className="interest-tag">{interest}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="target-section">
                <h3>Tracking Events</h3>
                <div className="tracking-events">
                  {PLATFORM_CONFIGS[platform].pixelEvents.map(event => (
                    <div key={event} className="event-tag">
                      {event}
                    </div>
                  ))}
                </div>
              </div>

              <div className="target-section">
                <h3>Active Time Optimization</h3>
                <div className="time-optimization">
                  <p><strong>Peak Hours:</strong> {data.socialMedia[platform].activeTime.peakHours.join(' & ')}</p>
                  <p><strong>Weekday Activity:</strong> {data.socialMedia[platform].activeTime.weekday}</p>
                  <p><strong>Weekend Activity:</strong> {data.socialMedia[platform].activeTime.weekend}</p>
                </div>
              </div>

              <button 
                className="launch-campaign-btn"
                onClick={handleLaunchCampaign}
              >
                Launch Campaign
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function UserProfile({ person, onClose }) {
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const handlePixelTrack = (platform) => {
    setSelectedPlatform(platform);
  };

  return (
    <div className="user-profile-overlay">
      <div className="user-profile-modal">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="user-profile-header">
          <h2>{person.name}</h2>
          <p className="user-title">{person.job} at {person.company}</p>
        </div>

        <div className="user-profile-details">
          <div className="detail-group">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> {person.email || 'Not Available'}</p>
            <p><strong>Phone:</strong> {person.phone || 'Not Available'}</p>
            <p><strong>Location:</strong> {person.location}</p>
          </div>

          <div className="detail-group">
            <h3>Professional Details</h3>
            <p><strong>Age:</strong> {person.age}</p>
            <p><strong>Income:</strong> {person.income || 'Not Available'}</p>
            <p><strong>Company:</strong> {person.company}</p>
          </div>

          <div className="detail-group">
            <h3>Interests</h3>
            <div className="interests-tags">
              {person.interests.map((interest, index) => (
                <span key={index} className="interest-tag">{interest}</span>
              ))}
            </div>
          </div>

          <div className="detail-group">
            <h3>Social Media Activity</h3>
            <div className="social-platforms">
              {Object.entries(person.socialMedia).map(([platform, data]) => (
                data.active && (
                  <div key={platform} className="platform-card">
                    <h4>{platform}</h4>
                    <div className="active-time-info">
                      <p><strong>Weekday:</strong> {data.activeTime.weekday}</p>
                      <p><strong>Weekend:</strong> {data.activeTime.weekend}</p>
                      <p><strong>Peak Hours:</strong> {data.activeTime.peakHours.join(' & ')}</p>
                    </div>
                    <p><strong>Interests:</strong> {data.interests.join(', ')}</p>
                    <button 
                      className="pixel-track-btn"
                      onClick={() => handlePixelTrack(platform)}
                    >
                      Target on {platform}
                    </button>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedPlatform && (
        <PlatformAdTarget
          platform={selectedPlatform}
          data={person}
          pixelId={person.socialMedia[selectedPlatform].pixelId}
          onClose={() => setSelectedPlatform(null)}
        />
      )}
    </div>
  );
}

function DataCollection({ data }) {
  const [selectedPerson, setSelectedPerson] = useState(null);

  return (
    <div className="data-collection">
      <h2>Live Data Collection</h2>
      <div className="data-table">
        <div className="table-header">
          <div>Name</div>
          <div>Age</div>
          <div>Location</div>
          <div>Job</div>
          <div>Company</div>
          <div>Income</div>
          <div>Interests</div>
          <div>Email</div>
          <div>Timestamp</div>
          <div>Action</div>
        </div>
        <div className="table-body">
          {data.map((person, index) => (
            <div 
              key={person.id + '-' + person.timestamp} 
              className={`table-row ${index === 0 ? 'new-entry' : ''}`}
            >
              <div>{person.name}</div>
              <div>{person.age}</div>
              <div>{person.location}</div>
              <div>{person.job}</div>
              <div>{person.company}</div>
              <div>{person.income}</div>
              <div>{person.interests.join(', ')}</div>
              <div>{person.email}</div>
              <div>{person.timestamp}</div>
              <div>
                <button 
                  className="target-individual-btn"
                  onClick={() => setSelectedPerson(person)}
                >
                  Target Ad
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedPerson && (
        <UserProfile 
          person={selectedPerson} 
          onClose={() => setSelectedPerson(null)} 
        />
      )}
    </div>
  );
}

function DataSpreadsheet({ data }) {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  // Organize data by date
  const organizeDailyReports = () => {
    const reports = new Map();
    
    data.forEach(person => {
      const date = new Date(person.timestamp).toLocaleDateString();
      if (!reports.has(date)) {
        reports.set(date, []);
      }
      reports.get(date).push(person);
    });

    return Array.from(reports.entries()).map(([date, entries]) => ({
      date,
      data: entries
    })).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const dailyReports = organizeDailyReports();

  return (
    <div className="data-spreadsheet">
      <h2>Data Spreadsheet</h2>
      
      {/* Daily Reports Section */}
      <div className="daily-reports-section">
        <h3>Daily Reports</h3>
        
        {dailyReports.map((report, index) => (
          <div key={report.date} className="daily-report">
            <div className="report-header" onClick={() => setSelectedDate(selectedDate === report.date ? null : report.date)}>
              <h4>{report.date}</h4>
              <span className="data-count">{report.data.length} Entries</span>
              <span className="toggle-icon">{selectedDate === report.date ? '▼' : '▶'}</span>
            </div>
            
            {selectedDate === report.date && (
              <div className="spreadsheet-container">
                <div className="spreadsheet-header">
                  <div className="spreadsheet-cell">Timestamp</div>
                  <div className="spreadsheet-cell">Name</div>
                  <div className="spreadsheet-cell">Age</div>
                  <div className="spreadsheet-cell">Location</div>
                  <div className="spreadsheet-cell">Job</div>
                  <div className="spreadsheet-cell">Company</div>
                  <div className="spreadsheet-cell">Income</div>
                  <div className="spreadsheet-cell">Interests</div>
                  <div className="spreadsheet-cell">Email</div>
                  <div className="spreadsheet-cell">Action</div>
                </div>
                {report.data.map(person => (
                  <div key={person.id + '-' + person.timestamp} className="spreadsheet-row">
                    <div className="spreadsheet-cell">{person.timestamp}</div>
                    <div className="spreadsheet-cell">{person.name}</div>
                    <div className="spreadsheet-cell">{person.age}</div>
                    <div className="spreadsheet-cell">{person.location}</div>
                    <div className="spreadsheet-cell">{person.job}</div>
                    <div className="spreadsheet-cell">{person.company}</div>
                    <div className="spreadsheet-cell">{person.income}</div>
                    <div className="spreadsheet-cell">{person.interests.join(', ')}</div>
                    <div className="spreadsheet-cell">{person.email}</div>
                    <div className="spreadsheet-cell">
                      <button 
                        className="target-individual-btn"
                        onClick={() => setSelectedPerson(person)}
                      >
                        Target Ad
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedPerson && (
        <UserProfile 
          person={selectedPerson} 
          onClose={() => setSelectedPerson(null)} 
        />
      )}
    </div>
  );
}

function CaseStudies() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const handleBusinessClick = (business) => {
    setSelectedBusiness(business);
  };

  return (
    <div className="case-studies">
      <div className="case-studies-header">
        <h1>Success Stories</h1>
        <p className="subtitle">Real results from San Diego businesses using LeadGenius</p>
      </div>

      <div className="case-studies-grid">
        {CASE_STUDIES.map(business => (
          <div 
            key={business.id} 
            className="case-study-card"
            onClick={() => handleBusinessClick(business)}
          >
            <div className="business-header">
              <h2>{business.name}</h2>
              <div className="business-type">{business.type}</div>
              <div className="business-rating">
                ★ {business.rating} · {business.location}
              </div>
            </div>

            <div className="metrics-grid">
              <div className="metric-box">
                <h3>Ad Spend</h3>
                <div className="metric-value">${business.adSpend.monthly}</div>
                <div className="metric-label">Monthly</div>
              </div>
              <div className="metric-box highlight">
                <h3>ROAS</h3>
                <div className="metric-value">{business.results.roas}x</div>
                <div className="metric-label">Return on Ad Spend</div>
              </div>
              <div className="metric-box">
                <h3>ROI</h3>
                <div className="metric-value">{business.results.roi}%</div>
                <div className="metric-label">Return on Investment</div>
              </div>
              <div className="metric-box">
                <h3>Revenue</h3>
                <div className="metric-value">${business.results.revenue}</div>
                <div className="metric-label">Monthly from Ads</div>
              </div>
            </div>

            <div className="platform-distribution">
              <h3>Ad Spend Distribution</h3>
              <div className="platform-bars">
                {Object.entries(business.adSpend.platforms).map(([platform, spend]) => (
                  <div key={platform} className="platform-bar">
                    <div className="platform-name">{platform}</div>
                    <div className="bar-container">
                      <div 
                        className="bar" 
                        style={{ 
                          width: `${(spend / business.adSpend.monthly) * 100}%`,
                          backgroundColor: 
                            platform === 'facebook' ? '#1877F2' : 
                            platform === 'instagram' ? '#E4405F' : 
                            platform === 'google' ? 'var(--cyber-teal)' : 
                            platform === 'pinterest' ? '#E60023' : '#666'
                        }}
                      ></div>
                      <div className="spend-amount">${spend}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="business-metrics">
              <div className="metric-item">
                <span className="metric-label">Average Order:</span>
                <span className="metric-value">${business.metrics.averageOrder}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Repeat Rate:</span>
                <span className="metric-value">{business.metrics.repeatRate}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Peak Hours:</span>
                <span className="metric-value">{business.metrics.peakHours}</span>
              </div>
            </div>

            <div className="testimonial">
              "{business.testimonial}"
            </div>
          </div>
        ))}
      </div>

      {selectedBusiness && (
        <div className="expanded-case-study">
          <div className="expanded-content">
            <button 
              className="close-expanded"
              onClick={() => setSelectedBusiness(null)}
            >
              ×
            </button>

            <div className="business-header">
              <h2>{selectedBusiness.name}</h2>
              <div className="business-type">{selectedBusiness.type}</div>
              <div className="business-rating">
                ★ {selectedBusiness.rating} · {selectedBusiness.location}
              </div>
            </div>

            <div className="campaign-insights">
              <div className="insight-card">
                <div className="insight-header">
                  <div className="insight-icon">📊</div>
                  <h3 className="insight-title">Campaign Performance</h3>
                </div>
                <div className="campaign-metrics">
                  <div className="metric-detail">
                    <div className="value">{selectedBusiness.results.roas}x</div>
                    <div className="label">ROAS</div>
                  </div>
                  <div className="metric-detail">
                    <div className="value">{selectedBusiness.results.roi}%</div>
                    <div className="label">ROI</div>
                  </div>
                  <div className="metric-detail">
                    <div className="value">${selectedBusiness.results.revenue}</div>
                    <div className="label">Revenue</div>
                  </div>
                </div>
              </div>

              <div className="insight-card">
                <div className="insight-header">
                  <div className="insight-icon">👥</div>
                  <h3 className="insight-title">Customer Insights</h3>
                </div>
                <div className="campaign-metrics">
                  <div className="metric-detail">
                    <div className="value">{selectedBusiness.results.newCustomers}</div>
                    <div className="label">New Customers</div>
                  </div>
                  <div className="metric-detail">
                    <div className="value">${selectedBusiness.metrics.averageOrder}</div>
                    <div className="label">Avg. Order Value</div>
                  </div>
                  <div className="metric-detail">
                    <div className="value">{selectedBusiness.metrics.repeatRate}</div>
                    <div className="label">Repeat Rate</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="demographic-data">
              <h3>Customer Demographics</h3>
              <div className="demographic-grid">
                <div className="demographic-card">
                  <div className="demographic-value">25-34</div>
                  <div className="label">Primary Age Group</div>
                </div>
                <div className="demographic-card">
                  <div className="demographic-value">68%</div>
                  <div className="label">Local Customers</div>
                </div>
                <div className="demographic-card">
                  <div className="demographic-value">4.8/5</div>
                  <div className="label">Customer Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="campaign-timeline">
              <h3>Campaign Timeline</h3>
              <div className="timeline-events">
                <div className="timeline-event">
                  <div className="timeline-date">Month 1</div>
                  <div className="timeline-content">
                    <h4>Campaign Launch</h4>
                    <p>Initial targeting setup and audience research</p>
                  </div>
                </div>
                <div className="timeline-event">
                  <div className="timeline-date">Month 2</div>
                  <div className="timeline-content">
                    <h4>Optimization Phase</h4>
                    <p>AI-driven audience refinement and ad optimization</p>
                  </div>
                </div>
                <div className="timeline-event">
                  <div className="timeline-date">Month 3</div>
                  <div className="timeline-content">
                    <h4>Scale Up</h4>
                    <p>Increased budget allocation to top-performing channels</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="audience-insights">
              <h3>Audience Segments</h3>
              <div className="audience-segment">
                <div className="segment-header">
                  <div className="segment-title">Primary Segment</div>
                  <div className="segment-percentage">45%</div>
                </div>
                <p>Local professionals, age 25-34, high disposable income</p>
              </div>
              <div className="audience-segment">
                <div className="segment-header">
                  <div className="segment-title">Secondary Segment</div>
                  <div className="segment-percentage">35%</div>
                </div>
                <p>Tourists and visitors, age 30-45, experience seekers</p>
              </div>
              <div className="audience-segment">
                <div className="segment-header">
                  <div className="segment-title">Tertiary Segment</div>
                  <div className="segment-percentage">20%</div>
                </div>
                <p>Local students and young professionals, age 18-24</p>
              </div>
            </div>

            <div className="campaign-performance">
              <h3>Performance Trends</h3>
              <div className="roi-breakdown">
                <div className="roi-card">
                  <div className="roi-value">+85%</div>
                  <div className="roi-label">Website Traffic</div>
                </div>
                <div className="roi-card">
                  <div className="roi-value">+65%</div>
                  <div className="roi-label">Conversion Rate</div>
                </div>
                <div className="roi-card">
                  <div className="roi-value">-25%</div>
                  <div className="roi-label">Cost per Acquisition</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    setShowSuccess(true);
    setFormData({ name: '', email: '', company: '', message: '' });
    setTimeout(() => setShowSuccess(false), 5000); // Hide success message after 5 seconds
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-section">
      <h2>Contact Us</h2>
      <div className="contact-content">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>Have questions about LeadGenius? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          <div className="contact-details">
            <p><strong>Email:</strong> contact@leadgenius.ai</p>
            <p><strong>Phone:</strong> (858) 380-7148</p>
            <p><strong>Location:</strong> San Diego, CA</p>
          </div>
        </div>
        <div className="contact-form">
          {showSuccess && (
            <div className="success-message">
              <div className="success-content">
                <div className="success-icon">✓</div>
                <h3>Message Sent Successfully!</h3>
                <p>We'll get back to you as soon as possible.</p>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Company</label>
              <input 
                type="text" 
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your Company" 
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message" 
                rows="4" 
                required
              ></textarea>
            </div>
            <button type="submit" className="cta-button">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Initial data
    const initialData = Array.from({ length: 670 }, generatePersonData);
    setData(initialData);

    // Real-time updates every 2 seconds
    const interval = setInterval(() => {
      const newPerson = generatePersonData();
      setData(prevData => {
        // Add new entry at the beginning and keep only the last 10000 entries
        return [newPerson, ...prevData].slice(0, 10000);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="app">
        <nav className="nav-bar">
          <div className="logo">
            <Link to="/">LeadGenius</Link>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/data-collection">Data Collection</Link>
            <Link to="/data-spreadsheet">Data Spreadsheet</Link>
            <Link to="/case-studies">Case Studies</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <MobileNav />
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard data={data} />} />
            <Route path="/data-collection" element={<DataCollection data={data} />} />
            <Route path="/data-spreadsheet" element={<DataSpreadsheet data={data} />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
