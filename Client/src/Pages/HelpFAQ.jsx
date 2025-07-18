import {
    AlertCircle,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    FileText,
    Mail,
    MessageCircle,
    Phone,
    Search,
    Shield,
    User
} from 'lucide-react';
import React, { useState } from 'react';
import '../Styles/HelpFAQ.css';

const faqData = [
  {
    id: '1',
    question: 'How do I report a lost item?',
    answer: 'To report a lost item, click on "Report Lost Item" on the homepage, fill out the detailed form with item description, location where it was lost, date, and any identifying features. Include photos if available. The more details you provide, the higher the chance of recovery.',
    category: 'Lost Items'
  },
  {
    id: '2',
    question: 'How do I report a found item?',
    answer: 'Click "Report Found Item" and provide a detailed description of the item, where you found it, and when. Please include clear photos from multiple angles. We recommend not including all identifying details publicly for security reasons.',
    category: 'Found Items'
  },
  {
    id: '3',
    question: 'How long do items stay in the system?',
    answer: 'Lost item reports remain active for 90 days by default, but can be extended. Found items are typically held for 30 days before being donated to charity, depending on local regulations.',
    category: 'General'
  },
  {
    id: '4',
    question: 'How do I search for my lost item?',
    answer: 'Use the search bar on the homepage or browse by category. You can filter by location, date range, item type, and color. Set up alerts to be notified when matching items are reported.',
    category: 'Search'
  },
  {
    id: '5',
    question: 'What should I do if I find a match?',
    answer: 'If you find a potential match, click "Claim Item" and provide proof of ownership. This may include photos, receipts, or detailed descriptions of non-visible identifying features.',
    category: 'Claims'
  },
  {
    id: '6',
    question: 'Is there a fee for using this service?',
    answer: 'Our basic service is completely free. Premium features like extended listing duration and priority support are available with our paid plans.',
    category: 'Account'
  },
  {
    id: '7',
    question: 'How do I verify my identity?',
    answer: 'Account verification requires a valid email address and phone number. For high-value item claims, additional ID verification may be required.',
    category: 'Account'
  },
  {
    id: '8',
    question: 'What safety measures should I take when meeting someone?',
    answer: 'Always meet in public places, bring a friend, and meet during daylight hours. We recommend police station parking lots or busy shopping centers. Never share personal information beyond what\'s necessary.',
    category: 'Safety'
  },
  {
    id: '9',
    question: 'Can I edit or delete my listing?',
    answer: 'Yes, you can edit or delete your listings anytime from your account dashboard. We recommend updating your listing if you find your item or if details change.',
    category: 'Account'
  },
  {
    id: '10',
    question: 'How do I contact support?',
    answer: 'You can reach our support team through the contact form below, email us at support@lostandfound.com, or call our helpline during business hours.',
    category: 'Support'
  }
];

const categories = ['All', 'Lost Items', 'Found Items', 'Search', 'Claims', 'Account', 'Safety', 'Support', 'General'];

const HelpFAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeLink, setActiveLink] = useState('faq');

  const handleNavClick = (section) => {
    setActiveLink(section);
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // For Account Help, filter FAQs
    if (section === 'account') {
      setSelectedCategory('Account');
    }
  };

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="help-faq">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>Help & FAQ</h1>
            <p>Find answers to common questions about our lost and found service</p>
          </div>
        </div>
      </div>

      <div className="main-container">
        <div className="content-grid">
          {/* Sidebar */}
          <div className="sidebar">
            <div className="sidebar-content">
              <h2>Quick Links</h2>
              <nav className="nav-links">
                <a
                  href="#faq"
                  className={`nav-link${activeLink === 'faq' ? ' active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick('faq'); }}
                >
                  <FileText className="nav-icon" />
                  FAQ
                </a>
                <a
                  href="#contact"
                  className={`nav-link${activeLink === 'contact' ? ' active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
                >
                  <Mail className="nav-icon" />
                  Contact Support
                </a>
                <a
                  href="#safety"
                  className={`nav-link${activeLink === 'safety' ? ' active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick('safety'); }}
                >
                  <Shield className="nav-icon" />
                  Safety Guidelines
                </a>
                <a
                  href="#account"
                  className={`nav-link${activeLink === 'account' ? ' active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick('account'); }}
                >
                  <User className="nav-icon" />
                  Account Help
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-content">
            {/* Search and Filter */}
            <div className="search-filter-section">
              <div className="search-filter-content">
                {/* Search Bar */}
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search FAQ..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Category Filter */}
                <div className="category-filters">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div id="faq" className="faq-section">
              <div className="faq-header">
                <h2>Frequently Asked Questions</h2>
                <p>
                  {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
                </p>
              </div>

              <div className="faq-list">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="faq-item">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="faq-question-btn"
                    >
                      <div className="faq-question-content">
                        <span className="faq-question-text">{faq.question}</span>
                        <span className="faq-category-badge">
                          {faq.category}
                        </span>
                      </div>
                      {openFAQ === faq.id ? (
                        <ChevronUp className="faq-chevron" />
                      ) : (
                        <ChevronDown className="faq-chevron" />
                      )}
                    </button>
                    
                    {openFAQ === faq.id && (
                      <div className="faq-answer">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <div className="no-results">
                  <Search className="no-results-icon" />
                  <h3>No results found</h3>
                  <p>Try adjusting your search terms or browse all categories</p>
                </div>
              )}
            </div>

            {/* Safety Guidelines */}
            <div id="safety" className="safety-section">
              <div className="safety-header">
                <h2>
                  <Shield className="safety-icon" />
                  Safety Guidelines
                </h2>
              </div>
              
              <div className="safety-content">
                <div className="safety-grid">
                  <div className="safety-column">
                    <div className="safety-item">
                      <CheckCircle className="safety-check-icon" />
                      <div>
                        <h3>Meet in Public Places</h3>
                        <p>Always arrange meetings in well-lit, populated areas</p>
                      </div>
                    </div>
                    
                    <div className="safety-item">
                      <CheckCircle className="safety-check-icon" />
                      <div>
                        <h3>Bring a Friend</h3>
                        <p>Consider bringing someone with you to item exchanges</p>
                      </div>
                    </div>
                    
                    <div className="safety-item">
                      <CheckCircle className="safety-check-icon" />
                      <div>
                        <h3>Verify Identity</h3>
                        <p>Ask for proof of ownership before handing over items</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="safety-column">
                    <div className="safety-item">
                      <AlertCircle className="safety-alert-icon" />
                      <div>
                        <h3>Don't Share Personal Info</h3>
                        <p>Only share necessary contact information</p>
                      </div>
                    </div>
                    
                    <div className="safety-item">
                      <AlertCircle className="safety-alert-icon" />
                      <div>
                        <h3>Trust Your Instincts</h3>
                        <p>If something feels wrong, don't proceed with the meeting</p>
                      </div>
                    </div>
                    
                    <div className="safety-item">
                      <AlertCircle className="safety-alert-icon" />
                      <div>
                        <h3>Report Suspicious Activity</h3>
                        <p>Contact us immediately if you encounter any issues</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div id="contact" className="contact-section">
              <div className="contact-header">
                <h2>Contact Support</h2>
                <p>Still need help? Our support team is here to assist you</p>
              </div>
              
              <div className="contact-content">
                <div className="contact-methods">
                  <div className="contact-method">
                    <Mail className="contact-icon email" />
                    <h3>Email Support</h3>
                    <p>support@lostandfound.com</p>
                    <span>Response within 24 hours</span>
                  </div>
                  
                  <div className="contact-method">
                    <Phone className="contact-icon phone" />
                    <h3>Phone Support</h3>
                    <p>1-800-LOST-123</p>
                    <span>Mon-Fri 9AM-5PM EST</span>
                  </div>
                  
                  <div className="contact-method">
                    <MessageCircle className="contact-icon chat" />
                    <h3>Live Chat</h3>
                    <p>Available 24/7</p>
                    <button className="chat-btn">Start Chat</button>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="contact-form-container">
                  <h3>Send us a message</h3>
                  <form className="contact-form">
                    <div className="form-row">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="form-input"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="form-input"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Subject"
                      className="form-input full-width"
                    />
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="form-textarea"
                    />
                    <button
                      type="submit"
                      className="form-submit-btn"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpFAQ;
