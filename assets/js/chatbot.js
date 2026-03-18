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
        <div class="chatbot-toggle" id="chatbot-toggle" aria-label="Open Ciph Creative Agency Assistant Chatbot" aria-expanded="false" role="button" tabindex="0">
          <i class="bi bi-chat-dots"></i>
          <span class="notification-badge">1</span>
        </div>
        
        <div class="chatbot-window" id="chatbot-window" aria-hidden="true" role="dialog" aria-label="Chatbot Window">
          <div class="chatbot-header">
            <div class="header-content">
              <div class="avatar">
                <img src="assets/img/file.webp" alt="Ciph Creative Agency Assistant" class="avatar-img">
              </div>
              <div class="header-text">
                <h4>Ciph Creative Agency Assistant</h4>
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
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleChatbot();
      }
    });

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
      window.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      if (badge) badge.style.display = 'none';
      setTimeout(() => document.getElementById('chatbot-input-field').focus(), 400);
    } else {
      window.classList.remove('active');
      toggle.classList.remove('active');
      window.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  showWelcomeMessage() {
    setTimeout(() => {
      this.addBotMessage(
        "Hi, I'm here to help you find the right service.\n\n" +
        "What brings you here today?",
        false
      );

      setTimeout(() => {
        this.showQuickReplies([
          { text: 'Build a Website', value: 'web_dev' },
          { text: 'Improve My Design', value: 'web_design' },
          { text: 'Grow My Business', value: 'marketing' },
          { text: 'See All Services', value: 'all_services' }
        ]);
      }, 800);
    }, 1000);
  }

  handleUserMessage() {
    const input = document.getElementById('chatbot-input-field');
    const message = input.value.trim();

    if (!message) return;

    if (this.conversationState === 'awaiting_email') {
      this.handleEmailInput(message);
      input.value = '';
      return;
    }

    this.addUserMessage(message);
    input.value = '';

    this.processMessage(message);
  }

  handleEmailInput(message) {
    this.addUserMessage(message);

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(message) || message.toLowerCase() === 'skip') {
      if (message.toLowerCase() !== 'skip') {
        this.userContext.userEmail = message;
      }

      this.showTypingIndicator();
      setTimeout(() => {
        this.hideTypingIndicator();
        this.addBotMessage("Got it! Thank you. \n\nHow would you like to connect with our team?");
        this.showContactOptions();
      }, 800);
    } else {
      this.addBotMessage("That doesn't look like a valid email. Please try again or type 'skip' to continue.");
    }
  }

  showContactOptions() {
    this.conversationState = 'contact_options';
    this.showQuickReplies([
      { text: '📱 WhatsApp (Fastest)', value: 'whatsapp' },
      { text: '📧 Email', value: 'send_email' },
      { text: '📅 Schedule Call', value: 'schedule' },
      { text: '❌ Close', value: 'close' }
    ]);
  }

  promptForEmail() {
    this.conversationState = 'awaiting_email';
    this.showTypingIndicator();
    setTimeout(() => {
      this.hideTypingIndicator();
      this.addBotMessage(
        "Perfect! Before we connect, could you please share your **email address**?\n\n" +
        "This helps us follow up with you quickly. (Or type 'skip')"
      );
    }, 800);
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
        this.userContext.lastSelectionText = 'Web Design';
        this.handleWebDesign();
      } else if (lowerMessage.includes('marketing') || lowerMessage.includes('seo') || lowerMessage.includes('digital') || lowerMessage.includes('campaign')) {
        this.userContext.lastSelectionText = 'Digital Marketing';
        this.handleMarketing();
      } else if (lowerMessage.includes('graphic') || lowerMessage.includes('branding') || lowerMessage.includes('logo')) {
        this.userContext.lastSelectionText = 'Graphic Design';
        this.handleGraphicDesign();
      } else if (lowerMessage.includes('product') || lowerMessage.includes('management') || lowerMessage.includes('strategy')) {
        this.userContext.lastSelectionText = 'Product Management';
        this.handleProductManagement();
      } else if (lowerMessage.includes('microsoft') || lowerMessage.includes('365') || lowerMessage.includes('office')) {
        this.userContext.lastSelectionText = 'Microsoft 365';
        this.handleMicrosoft365();
      } else if (lowerMessage.includes('ecommerce') || lowerMessage.includes('e-commerce') || lowerMessage.includes('shop') || lowerMessage.includes('store')) {
        this.handleEcommerce();
      } else if (lowerMessage.includes('pwa') || lowerMessage.includes('progressive') || lowerMessage.includes('app')) {
        this.handlePWA();
      } else if (lowerMessage.includes('all services') || lowerMessage.includes('services') || lowerMessage.includes('what do you')) {
        this.handleAllServices();
      } else if (lowerMessage.includes('more services')) {
        this.handleMoreServices();
      } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote') || lowerMessage.includes('budget')) {
        this.handlePricingInquiry();
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
        this.handleContactInquiry();
      } else if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('projects') || lowerMessage.includes('examples')) {
        this.handlePortfolio();
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        this.handleGreeting();
      } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
        this.closeConversation();
      } else {
        this.handleUnknownQuery(message);
      }
    }, 1500);
  }

  handleWebDevelopment() {
    this.conversationState = 'web_dev';
    this.addBotMessage(
      "Great, I can help you build a website. 💻\n\n" +
      "What type of website do you need?"
    );

    setTimeout(() => {
      this.showQuickReplies([
        { text: 'Business Website', value: 'business_website' },
        { text: 'Online Store', value: 'ecommerce' },
        { text: 'Custom Solution', value: 'custom_solution' },
        { text: 'Not Sure Yet', value: 'consultation' }
      ]);
    }, 800);
  }

  handleWebDesign() {
    this.conversationState = 'web_design';
    this.addBotMessage(
      "Perfect, Let's improve your design. 🎨\n\n" +
      "What do you need help with?"
    );

    setTimeout(() => {
      this.showQuickReplies([
        { text: 'New Design', value: 'new_design' },
        { text: 'Redesign Current Site', value: 'redesign' },
        { text: 'Logo & Branding', value: 'branding' },
        { text: 'Talk to Designer', value: 'expert' }
      ]);
    }, 800);
  }

  handleMarketing() {
    this.conversationState = 'marketing';
    this.addBotMessage(
      "Excellent, Let's grow your business. 📈\n\n" +
      "What's your main goal?"
    );

    setTimeout(() => {
      this.showQuickReplies([
        { text: 'Get More Customers', value: 'get_customers' },
        { text: 'Improve SEO', value: 'seo' },
        { text: 'Social Media Help', value: 'social_media' },
        { text: 'Full Marketing Plan', value: 'full_marketing' }
      ]);
    }, 800);
  }

  handleGraphicDesign() {
    this.conversationState = 'graphic';
    this.addBotMessage(
      "Awesome, 🎨 Our Graphic Design services include:\n\n" +
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
        { text: 'Get Started', value: 'get_started' },
        { text: '❌ Close', value: 'close' }
      ]);
    }, 1000);
  }

  handleProductManagement() {
    this.conversationState = 'product';
    this.addBotMessage(
      "Excellent, 💼 Our Product Management services help you:\n\n" +
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
        { text: 'Talk to Expert', value: 'expert' },
        { text: '❌ Close', value: 'close' }
      ]);
    }, 1000);
  }

  handleMicrosoft365() {
    this.conversationState = 'microsoft';
    this.addBotMessage(
      "Great, Our Microsoft 365 Support includes:\n\n" +
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
        { text: 'Contact Us', value: 'contact' },
        { text: '❌ Close', value: 'close' }
      ]);
    }, 1000);
  }

  handleEcommerce() {
    this.conversationState = 'ecommerce';
    this.addBotMessage(
      "Perfect for online selling, 🛒 Our E-commerce solutions include:\n\n" +
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
        { text: 'Not Sure', value: 'ecommerce_help' },
        { text: '❌ Close', value: 'close' }
      ]);
    }, 1000);
  }

  handlePWA() {
    this.conversationState = 'pwa';
    this.addBotMessage(
      "Excellent choice, 📱 Progressive Web Apps offer:\n\n" +
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
        { text: 'Talk to Expert', value: 'expert' },
        { text: '❌ Close', value: 'close' }
      ]);
    }, 1000);
  }

  handleAllServices() {
    this.addBotMessage(
      "Here's what we do best! 🌟\n\n" +
      "🌐 Website Development\n" +
      "🎨 Design & Branding\n" +
      "📱 Digital Marketing\n" +
      "🛒 E-commerce Stores\n" +
      "☁️ Microsoft 365 Support\n\n" +
      "What interests you?"
    );

    setTimeout(() => {
      this.showQuickReplies([
        { text: 'Build Website', value: 'web_dev' },
        { text: 'Design Help', value: 'web_design' },
        { text: 'Marketing', value: 'marketing' },
        { text: 'Talk to Us', value: 'consultation' }
      ]);
    }, 1000);
  }


  handlePricingInquiry() {
    this.addBotMessage(
      "Great question, 💰\n\n" +
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
      "Check out our work, 🎨\n\n" +
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
        { text: '❌ Close Chat', value: 'close' }
      ]);
    }, 1000);
  }

  handleGreeting() {
    this.addBotMessage(
      "Hello, Welcome to Ciph Creative Agency!\n\n" +
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

  handleMoreServices() {
    this.addBotMessage(
      "Here are more services we offer! 🎯\n\n" +
      "🖼️ Graphic Design & Branding\n" +
      "💼 Product Management\n" +
      "☁️ Microsoft 365 Support\n" +
      "🛒 E-commerce Solutions\n" +
      "📲 Progressive Web Apps\n" +
      "🔧 Website Maintenance\n\n" +
      "Which one interests you?"
    );

    setTimeout(() => {
      this.showQuickReplies([
        { text: '🖼️ Graphic Design', value: 'graphic' },
        { text: '💼 Product Mgmt', value: 'product' },
        { text: '☁️ Microsoft 365', value: 'microsoft' },
        { text: '🛒 E-commerce', value: 'ecommerce' },
        { text: '❌ Close', value: 'close' }
      ]);
    }, 1000);
  }

  handleQuickReply(value) {
    // Handle specific quick reply actions
    if (value === 'send_email') {
      const selectedService = this.userContext.lastSelectionText || 'your services';
      const emailSubject = encodeURIComponent(`Inquiry: ${selectedService}`);
      const emailBody = encodeURIComponent(`Hi Ciph Team,\n\nI'm interested in ${selectedService}. Please get back to me with more information.\n\nThank you.`);
      window.location.href = `mailto:ciphcreativeagency@gmail.com?subject=${emailSubject}&body=${emailBody}`;
      this.addBotMessage(
        "Opening your email client... 📧\n\n" +
        "We'll respond within 2 hours during business hours!"
      );
      setTimeout(() => {
        this.closeConversation();
      }, 2000);
    } else if (value === 'whatsapp') {
      const selectedService = this.userContext.lastSelectionText || 'your services';
      const userEmail = this.userContext.userEmail ? ` (Email: ${this.userContext.userEmail})` : '';
      const whatsappMsg = encodeURIComponent(`Hi, I'm interested in ${selectedService}!${userEmail}`);
      window.open(`https://wa.me/256393242000?text=${whatsappMsg}`, '_blank');
      this.addBotMessage(
        "Opening WhatsApp... 💬\n\n" +
        "Our team will respond to you shortly!"
      );
      setTimeout(() => {
        this.closeConversation();
      }, 2000);
    } else if (value === 'schedule') {
      window.open('https://calendly.com/ciphcreativeagency/30min', '_blank');
      this.addBotMessage(
        "Opening our calendar... 📅\n\n" +
        "Pick a time that works best for you!"
      );
      setTimeout(() => {
        this.closeConversation();
      }, 2000);
    } else if (value === 'business_website' || value === 'custom_solution' || value === 'new_design' ||
      value === 'redesign' || value === 'branding' || value === 'get_customers' ||
      value === 'seo' || value === 'social_media' || value === 'full_marketing' ||
      value === 'ecommerce' || value === 'consultation' || value === 'expert' || value === 'quote') {
      // All specific service requests lead to email prompt
      this.promptForEmail();
    } else if (value === 'consultation' || value === 'expert') {
      this.addBotMessage(
        "Smart move! Let's schedule a FREE consultation. 🎯\n\n" +
        "We'll discuss:\n" +
        "✅ Your goals\n" +
        "✅ Best solutions\n" +
        "✅ Timeline & budget\n" +
        "✅ Next steps\n\n" +
        "Choose your preferred way to connect:"
      );
      setTimeout(() => {
        this.showQuickReplies([
          { text: '📅 Book a Call', value: 'schedule' },
          { text: '📱 WhatsApp Chat', value: 'whatsapp' },
          { text: '📧 Email Instead', value: 'send_email' }
        ]);
      }, 1000);
    } else if (value === 'portfolio' || value === 'view_portfolio') {
      window.open('https://ciphca.com/portfolio-details.html', '_blank');
      this.addBotMessage(
        "Opening our portfolio... 🎨\n\n" +
        "Check out our work!"
      );
      setTimeout(() => {
        this.addBotMessage("Like what you see?");
        this.showQuickReplies([
          { text: '✅ Yes, Let\'s Talk', value: 'consultation' },
          { text: '🔙 See Services', value: 'all_services' },
          { text: '❌ Close', value: 'close' }
        ]);
      }, 2000);
    } else if (value === 'all_services') {
      this.handleAllServices();
    } else if (value === 'more_services') {
      this.handleMoreServices();
    } else if (value === 'contact') {
      this.handleContactInquiry();
    } else if (value === 'close') {
      this.closeConversation();
    } else if (value === 'restart') {
      this.restartConversation();
    } else {
      // Route back to main handlers
      this.processMessage(value);
    }
  }

  closeConversation() {
    this.addBotMessage(
      "Thank you for chatting with us 🙏\n\n" +
      "We're excited to help your business grow!\n\n" +
      "If you have any more questions, feel free to:\n" +
      "📧 Email: ciphcreativeagency@gmail.com\n" +
      "📱 Call/WhatsApp: +256 393 24 2000\n\n" +
      "Have a wonderful day! ✨"
    );

    setTimeout(() => {
      this.showQuickReplies([
        { text: '🔄 Start New Chat', value: 'restart' },
        { text: '📱 Contact Us', value: 'contact' }
      ]);
    }, 1500);
  }

  restartConversation() {
    this.conversationState = 'initial';
    this.userContext = {};

    // Clear messages except system messages
    const messagesContainer = document.getElementById('chatbot-messages');
    messagesContainer.innerHTML = '';

    // Clear quick replies
    const quickReplies = document.getElementById('quick-replies');
    quickReplies.innerHTML = '';

    // Show welcome message again
    this.addBotMessage(
      "Welcome back\n\n" +
      "How can I help you today?"
    );

    setTimeout(() => {
      this.showMainMenu();
    }, 800);
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
        ${showAvatar ? '<div class="message-avatar"><img src="assets/img/file.webp" alt="Bot" class="avatar-img"></div>' : ''}
        <div class="message-content">${formattedMessage}</div>
      </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    this.scrollToBottom();

    // Subtle bounce animation for toggle if received while closed
    if (!this.isOpen) {
      const toggle = document.getElementById('chatbot-toggle');
      toggle.style.animation = 'none';
      toggle.offsetHeight; // trigger reflow
      toggle.style.animation = 'pulse 1s 2';
    }
  }

  showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingHTML = `
      <div class="message bot-message typing-indicator" id="typing-indicator">
        <div class="message-avatar"><img src="assets/img/file.webp" alt="Bot" class="avatar-img"></div>
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
        // Track the selection text for context (e.g., for WhatsApp messages)
        if (reply.value !== 'whatsapp' && reply.value !== 'send_email' && reply.value !== 'schedule') {
          this.userContext.lastSelectionText = reply.text;
        }

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
