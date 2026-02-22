/**
 * Ciph Creative Agency Chatbot
 * Functional chatbot for free service offerings
 */

class CiphChatbot {
  constructor() {
    this.isOpen = false;
    this.conversationState = 'initial';
    this.userContext = {};
    this.init();
  }

  init() {
    this.createChatbotHTML();
    this.attachEventListeners();
    this.showWelcomeMessage();
  }

  createChatbotHTML() {
    const chatbotHTML = `
      <div id="ciph-chatbot" class="ciph-chatbot">
        <div class="chatbot-toggle" id="chatbot-toggle">
          <i class="bi bi-chat-dots"></i>
          <span class="notification-badge">1</span>
        </div>
        
        <div class="chatbot-window" id="chatbot-window">
          <div class="chatbot-header">
            <div class="header-content">
              <div class="avatar">
                <i class="bi bi-robot"></i>
              </div>
              <div class="header-text">
                <h4>Ciph Assistant</h4>
                <span class="status">Online • Responds in minutes</span>
              </div>
            </div>
            <button class="close-btn" id="chatbot-close">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          
          <div class="chatbot-messages" id="chatbot-messages">
            <!-- Messages will be inserted here -->
          </div>
          
          <div class="chatbot-quick-replies" id="quick-replies">
            <!-- Quick reply buttons will be inserted here -->
          </div>
          
          <div class="chatbot-input">
            <input 
              type="text" 
              id="chatbot-input-field" 
              placeholder="Type your message..."
              autocomplete="off"
            />
            <button id="chatbot-send" class="send-btn">
              <i class="bi bi-send-fill"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  }

  attachEventListeners() {
    const toggle = document.getElementById('chatbot-toggle');
    const close = document.getElementById('chatbot-close');
    const sendBtn = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input-field');

    toggle.addEventListener('click', () => this.toggleChatbot());
    close.addEventListener('click', () => this.toggleChatbot());
    sendBtn.addEventListener('click', () => this.handleUserMessage());
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleUserMessage();
      }
    });
  }

  toggleChatbot() {
    this.isOpen = !this.isOpen;
    const window = document.getElementById('chatbot-window');
    const toggle = document.getElementById('chatbot-toggle');
    const badge = toggle.querySelector('.notification-badge');
    
    if (this.isOpen) {
      window.classList.add('active');
      toggle.classList.add('active');
      if (badge) badge.style.display = 'none';
      document.getElementById('chatbot-input-field').focus();
    } else {
      window.classList.remove('active');
      toggle.classList.remove('active');
    }
  }

  showWelcomeMessage() {
    setTimeout(() => {
      this.addBotMessage(
        "Hi there! 👋 Welcome to Ciph Creative Agency!\n\nWe're a leading digital agency in East Africa specializing in web development, design, and digital marketing.",
        false
      );
      
      setTimeout(() => {
        this.addBotMessage("How can I help you today?");
        this.showQuickReplies([
          { text: '🌐 Web Development', value: 'web_dev' },
          { text: '🎨 Web Design', value: 'web_design' },
          { text: '📱 Digital Marketing', value: 'marketing' },
          { text: '💼 All Services', value: 'all_services' }
        ]);
      }, 1200);
    }, 1000);
  }

  handleUserMessage() {
    const input = document.getElementById('chatbot-input-field');
    const message = input.value.trim();
    
    if (!message) return;
    
    this.addUserMessage(message);
    input.value = '';
    
    this.processMessage(message);
  }

  processMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Show typing indicator
    this.showTypingIndicator();
    
    setTimeout(() => {
      this.hideTypingIndicator();
      
      // Route to appropriate response
      if (lowerMessage.includes('web dev') || lowerMessage.includes('development') || lowerMessage.includes('software') || lowerMessage.includes('backend') || lowerMessage.includes('frontend')) {
        this.handleWebDevelopment();
      } else if (lowerMessage.includes('web design') || lowerMessage.includes('design') || lowerMessage.includes('ui') || lowerMessage.includes('ux') || lowerMessage.includes('responsive')) {
        this.handleWebDesign();
      } else if (lowerMessage.includes('marketing') || lowerMessage.includes('seo') || lowerMessage.includes('digital') || lowerMessage.includes('campaign')) {
        this.handleMarketing();
      } else if (lowerMessage.includes('graphic') || lowerMessage.includes('branding') || lowerMessage.includes('logo')) {
        this.handleGraphicDesign();
      } else if (lowerMessage.includes('product') || lowerMessage.includes('management') || lowerMessage.includes('strategy')) {
        this.handleProductManagement();
      } else if (lowerMessage.includes('microsoft') || lowerMessage.includes('365') || lowerMessage.includes('office')) {
        this.handleMicrosoft365();
      } else if (lowerMessage.includes('ecommerce') || lowerMessage.includes('e-commerce') || lowerMessage.includes('shop') || lowerMessage.includes('store')) {
        this.handleEcommerce();
      } else if (lowerMessage.includes('pwa') || lowerMessage.includes('progressive') || lowerMessage.includes('app')) {
        this.handlePWA();
      } else if (lowerMessage.includes('all services') || lowerMessage.includes('services') || lowerMessage.includes('what do you')) {
        this.handleAllServices();
      } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote') || lowerMessage.includes('budget')) {
        this.handlePricingInquiry();
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
        this.handleContactInquiry();
      } else if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('projects') || lowerMessage.includes('examples')) {
        this.handlePortfolio();
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        this.handleGreeting();
      } else {
        this.handleUnknownQuery(message);
      }
    }, 1500);
  }

  handleWebDevelopment() {
    this.conversationState = 'web_dev';
    this.addBotMessage(
      "Excellent choice! 💻 Our Web Development services include:\n\n" +
      "✅ Custom Website Development\n" +
      "✅ Progressive Web Apps (PWAs)\n" +
      "✅ E-commerce Solutions\n" +
      "✅ Backend & Frontend Development\n" +
      "✅ Full Stack Development\n" +
      "✅ Website Maintenance & Support\n\n" +
      "We build scalable, secure, and high-performance websites!"
    );
    
    setTimeout(() => {
      this.addBotMessage("What type of web development do you need?");
      this.showQuickReplies([
        { text: 'Custom Website', value: 'custom_website' },
        { text: 'E-commerce Store', value: 'ecommerce' },
        { text: 'Progressive Web App', value: 'pwa' },
        { text: 'Get a Quote', value: 'quote' }
      ]);
    }, 1000);
  }

  handleWebDesign() {
    this.conversationState = 'web_design';
    this.addBotMessage(
      "Great! 🎨 Our Web Design services focus on:\n\n" +
      "✅ Responsive Web Design\n" +
      "✅ UX/UI Design\n" +
      "✅ Conversion-Focused Layouts\n" +
      "✅ Mobile-First Design\n" +
      "✅ Landing Page Design\n" +
      "✅ Website Redesign\n\n" +
      "We create designs that convert visitors into customers!"
    );
    
    setTimeout(() => {
      this.addBotMessage("What's your main goal?");
      this.showQuickReplies([
        { text: 'New Website Design', value: 'new_design' },
        { text: 'Redesign Existing Site', value: 'redesign' },
        { text: 'Landing Page', value: 'landing' },
        { text: 'View Portfolio', value: 'portfolio' }
      ]);
    }, 1000);
  }

  handleMarketing() {
    this.conversationState = 'marketing';
    this.addBotMessage(
      "Perfect! 📈 Our Digital Marketing services include:\n\n" +
      "✅ SEO Optimization\n" +
      "✅ Social Media Marketing\n" +
      "✅ Content Marketing\n" +
      "✅ Performance Marketing\n" +
      "✅ Campaign Strategy\n" +
      "✅ Analytics & Reporting\n\n" +
      "We help businesses grow their online presence!"
    );
    
    setTimeout(() => {
      this.addBotMessage("Which marketing service interests you most?");
      this.showQuickReplies([
        { text: 'SEO Services', value: 'seo' },
        { text: 'Social Media', value: 'social_media' },
        { text: 'Full Marketing', value: 'full_marketing' },
        { text: 'Free Consultation', value: 'consultation' }
      ]);
    }, 1000);
  }

  handleGraphicDesign() {
    this.conversationState = 'graphic';
    this.addBotMessage(
      "Awesome! 🎨 Our Graphic Design services include:\n\n" +
      "✅ Business Branding\n" +
      "✅ Logo Design\n" +
      "✅ Marketing Materials\n" +
      "✅ Social Media Graphics\n" +
      "✅ Brand Identity\n" +
      "✅ Print Design\n\n" +
      "We create visuals that make your brand memorable!"
    );
    
    setTimeout(() => {
      this.addBotMessage("What do you need designed?");
      this.showQuickReplies([
        { text: 'Logo & Branding', value: 'branding' },
        { text: 'Marketing Materials', value: 'marketing_materials' },
        { text: 'Social Graphics', value: 'social_graphics' },
        { text: 'Get Started', value: 'get_started' }
      ]);
    }, 1000);
  }

  handleProductManagement() {
    this.conversationState = 'product';
    this.addBotMessage(
      "Excellent! 💼 Our Product Management services help you:\n\n" +
      "✅ Define Product Strategy\n" +
      "✅ Create Roadmaps\n" +
      "✅ Validate Ideas\n" +
      "✅ Prioritize Features\n" +
      "✅ Improve Product-Market Fit\n" +
      "✅ Drive Growth\n\n" +
      "We turn ideas into successful products!"
    );
    
    setTimeout(() => {
      this.addBotMessage("Where are you in your product journey?");
      this.showQuickReplies([
        { text: 'New Product Idea', value: 'new_product' },
        { text: 'Existing Product', value: 'existing_product' },
        { text: 'Need Strategy', value: 'strategy' },
        { text: 'Talk to Expert', value: 'expert' }
      ]);
    }, 1000);
  }

  handleMicrosoft365() {
    this.conversationState = 'microsoft';
    this.addBotMessage(
      "Great! ☁️ Our Microsoft 365 Support includes:\n\n" +
      "✅ Setup & Configuration\n" +
      "✅ Migration Services\n" +
      "✅ Training & Support\n" +
      "✅ Security Setup\n" +
      "✅ Ongoing Maintenance\n" +
      "✅ Troubleshooting\n\n" +
      "We help teams work efficiently with Microsoft 365!"
    );
    
    setTimeout(() => {
      this.addBotMessage("What do you need help with?");
      this.showQuickReplies([
        { text: 'New Setup', value: 'm365_setup' },
        { text: 'Migration', value: 'm365_migration' },
        { text: 'Support', value: 'm365_support' },
        { text: 'Contact Us', value: 'contact' }
      ]);
    }, 1000);
  }

  handleEcommerce() {
    this.conversationState = 'ecommerce';
    this.addBotMessage(
      "Perfect for online selling! 🛒 Our E-commerce solutions include:\n\n" +
      "✅ Custom Online Stores\n" +
      "✅ Payment Gateway Integration\n" +
      "✅ Inventory Management\n" +
      "✅ Shopping Cart Development\n" +
      "✅ Mobile Commerce\n" +
      "✅ SEO for E-commerce\n\n" +
      "We build stores that drive sales!"
    );
    
    setTimeout(() => {
      this.addBotMessage("What platform are you interested in?");
      this.showQuickReplies([
        { text: 'Custom Solution', value: 'custom_ecommerce' },
        { text: 'Shopify', value: 'shopify' },
        { text: 'WooCommerce', value: 'woocommerce' },
        { text: 'Not Sure', value: 'ecommerce_help' }
      ]);
    }, 1000);
  }

  handlePWA() {
    this.conversationState = 'pwa';
    this.addBotMessage(
      "Excellent choice! 📱 Progressive Web Apps offer:\n\n" +
      "✅ App-like Experience\n" +
      "✅ Works Offline\n" +
      "✅ Fast Loading\n" +
      "✅ Push Notifications\n" +
      "✅ Installable on Devices\n" +
      "✅ Cross-Platform\n\n" +
      "PWAs combine the best of web and mobile apps!"
    );
    
    setTimeout(() => {
      this.addBotMessage("Want to learn more or get started?");
      this.showQuickReplies([
        { text: 'Learn More', value: 'pwa_info' },
        { text: 'Get a Quote', value: 'quote' },
        { text: 'See Examples', value: 'portfolio' },
        { text: 'Talk to Expert', value: 'expert' }
      ]);
    }, 1000);
  }

  handleAllServices() {
    this.addBotMessage(
      "Here's everything we offer! 🌟\n\n" +
      "🌐 Web Development\n" +
      "🎨 Web Design\n" +
      "📱 Digital Marketing\n" +
      "🖼️ Graphic Design & Branding\n" +
      "💼 Product Management\n" +
      "☁️ Microsoft 365 Support\n" +
      "🛒 E-commerce Solutions\n" +
      "📲 Progressive Web Apps\n" +
      "🔧 Website Maintenance\n\n" +
      "We serve businesses across East Africa!"
    );
    
    setTimeout(() => {
      this.addBotMessage("Which service interests you most?");
      this.showMainMenu();
    }, 1500);
  }

  handlePricingInquiry() {
    this.addBotMessage(
      "Great question! 💰\n\n" +
      "Our pricing is customized based on your specific needs. We offer:\n\n" +
      "✅ Flexible payment plans\n" +
      "✅ Competitive rates for East Africa\n" +
      "✅ No hidden fees\n" +
      "✅ FREE consultation\n" +
      "✅ Custom quotes within 24 hours\n\n" +
      "Every project is unique, so let's discuss your requirements!"
    );
    
    setTimeout(() => {
      this.addBotMessage("Would you like to:");
      this.showQuickReplies([
        { text: 'Get a Quote', value: 'quote' },
        { text: 'Schedule Call', value: 'schedule' },
        { text: 'View Services', value: 'all_services' },
        { text: 'Contact Us', value: 'contact' }
      ]);
    }, 1500);
  }

  handlePortfolio() {
    this.addBotMessage(
      "Check out our work! 🎨\n\n" +
      "We've completed 5,000+ successful campaigns and projects across:\n\n" +
      "✅ Web Development\n" +
      "✅ E-commerce Stores\n" +
      "✅ Branding Projects\n" +
      "✅ Marketing Campaigns\n" +
      "✅ Progressive Web Apps\n\n" +
      "Visit our portfolio page to see case studies and results!"
    );
    
    setTimeout(() => {
      this.showQuickReplies([
        { text: '👀 View Portfolio', value: 'view_portfolio' },
        { text: '📞 Discuss My Project', value: 'contact' },
        { text: '🔙 Back to Services', value: 'all_services' }
      ]);
    }, 1000);
  }

  handleContactInquiry() {
    this.addBotMessage(
      "Let's connect! 📞\n\n" +
      "📧 Email: ciphcreativeagency@gmail.com\n" +
      "📱 Phone/WhatsApp: +256 393 24 2000\n" +
      "🌐 Website: https://ciphca.com\n" +
      "📍 Location: Upper Kauga, Mukono, Uganda\n\n" +
      "⏰ Hours:\n" +
      "Sun-Fri: 9 AM - 6 PM\n" +
      "Sat: 9 AM - 4 PM\n\n" +
      "We respond within 2 hours! 🚀"
    );
    
    setTimeout(() => {
      this.showQuickReplies([
        { text: '📧 Send Email', value: 'send_email' },
        { text: '📱 WhatsApp Us', value: 'whatsapp' },
        { text: '📅 Schedule Meeting', value: 'schedule' },
        { text: '🔙 Back to Services', value: 'all_services' }
      ]);
    }, 1000);
  }

  handleGreeting() {
    this.addBotMessage(
      "Hello! 👋 Welcome to Ciph Creative Agency!\n\n" +
      "We're a leading digital agency in East Africa (Uganda, Kenya, Tanzania, Rwanda) specializing in:\n\n" +
      "🌐 Web Development & Design\n" +
      "📱 Digital Marketing\n" +
      "🎨 Branding & Graphics\n" +
      "💼 Product Management\n\n" +
      "How can we help your business grow?"
    );
    
    setTimeout(() => {
      this.showMainMenu();
    }, 1200);
  }

  handleUnknownQuery(message) {
    this.addBotMessage(
      "I want to make sure I understand you correctly! 🤔\n\n" +
      "I can help you with:\n\n" +
      "🌐 Web Development\n" +
      "🎨 Web Design\n" +
      "📱 Digital Marketing\n" +
      "🖼️ Graphic Design\n" +
      "💼 Product Management\n" +
      "☁️ Microsoft 365\n" +
      "🛒 E-commerce\n\n" +
      "Which service are you interested in?"
    );
    
    setTimeout(() => {
      this.showMainMenu();
    }, 800);
  }

  showMainMenu() {
    this.showQuickReplies([
      { text: '🌐 Web Development', value: 'web_dev' },
      { text: '🎨 Web Design', value: 'web_design' },
      { text: '📱 Marketing', value: 'marketing' },
      { text: '💼 All Services', value: 'all_services' }
    ]);
  }

  handleQuickReply(value) {
    // Handle specific quick reply actions
    if (value === 'send_email') {
      window.location.href = 'mailto:ciphcreativeagency@gmail.com?subject=Inquiry from Website Chatbot&body=Hi, I\'m interested in your services. Please contact me.';
    } else if (value === 'whatsapp') {
      window.open('https://wa.me/256393242000?text=Hi, I\'m interested in Ciph Creative Agency services!', '_blank');
    } else if (value === 'schedule') {
      window.open('https://calendly.com/ciphcreativeagency/30min', '_blank');
      this.addBotMessage("Opening our calendar... You can schedule a free 30-minute consultation! 📅");
    } else if (value === 'quote') {
      this.addBotMessage(
        "Great! To provide an accurate quote, I'll connect you with our team.\n\n" +
        "Please reach out via:\n" +
        "📱 WhatsApp: +256 393 24 2000\n" +
        "📧 Email: ciphcreativeagency@gmail.com\n\n" +
        "We'll respond with a custom quote within 24 hours!"
      );
      setTimeout(() => {
        this.showQuickReplies([
          { text: '📱 WhatsApp Now', value: 'whatsapp' },
          { text: '📧 Send Email', value: 'send_email' }
        ]);
      }, 1000);
    } else if (value === 'consultation') {
      this.addBotMessage(
        "Perfect! Let's schedule your FREE consultation! 🎯\n\n" +
        "During the call, we'll:\n" +
        "✅ Discuss your goals\n" +
        "✅ Review your current situation\n" +
        "✅ Recommend solutions\n" +
        "✅ Answer all your questions\n\n" +
        "Book your slot now!"
      );
      setTimeout(() => {
        this.showQuickReplies([
          { text: '📅 Schedule Now', value: 'schedule' },
          { text: '📱 WhatsApp Instead', value: 'whatsapp' }
        ]);
      }, 1000);
    } else if (value === 'portfolio' || value === 'view_portfolio') {
      window.open('https://ciphca.com/portfolio-details.html', '_blank');
      this.addBotMessage("Opening our portfolio in a new tab... Check out our work! 🎨");
    } else if (value === 'expert' || value === 'get_started') {
      this.addBotMessage(
        "Let's get you started! 🚀\n\n" +
        "Our team is ready to help. Choose your preferred contact method:"
      );
      setTimeout(() => {
        this.showQuickReplies([
          { text: '📱 WhatsApp Chat', value: 'whatsapp' },
          { text: '📧 Email Us', value: 'send_email' },
          { text: '📅 Schedule Call', value: 'schedule' }
        ]);
      }, 800);
    } else if (value === 'all_services' || value === 'main_menu') {
      this.handleAllServices();
    } else {
      // Route back to main handlers
      this.processMessage(value);
    }
  }

  addUserMessage(message) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageHTML = `
      <div class="message user-message">
        <div class="message-content">${this.escapeHtml(message)}</div>
      </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    this.scrollToBottom();
  }

  addBotMessage(message, showAvatar = true) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const formattedMessage = message.replace(/\n/g, '<br>');
    const messageHTML = `
      <div class="message bot-message">
        ${showAvatar ? '<div class="message-avatar"><i class="bi bi-robot"></i></div>' : ''}
        <div class="message-content">${formattedMessage}</div>
      </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    this.scrollToBottom();
  }

  showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingHTML = `
      <div class="message bot-message typing-indicator" id="typing-indicator">
        <div class="message-avatar"><i class="bi bi-robot"></i></div>
        <div class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  showQuickReplies(replies) {
    const container = document.getElementById('quick-replies');
    container.innerHTML = '';
    
    replies.forEach(reply => {
      const button = document.createElement('button');
      button.className = 'quick-reply-btn';
      button.textContent = reply.text;
      button.addEventListener('click', () => {
        this.addUserMessage(reply.text);
        container.innerHTML = '';
        this.handleQuickReply(reply.value);
      });
      container.appendChild(button);
    });
  }

  scrollToBottom() {
    const messagesContainer = document.getElementById('chatbot-messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new CiphChatbot();
});
