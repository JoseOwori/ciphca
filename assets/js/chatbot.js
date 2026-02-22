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
        "Hi there! 👋 I'm here to help you with our FREE services!",
        false
      );
      
      setTimeout(() => {
        this.showQuickReplies([
          { text: '📧 Email Notifications', value: 'email' },
          { text: '📱 Social Media Auto-Post', value: 'social' },
          { text: '🔍 Market Research AI', value: 'research' },
          { text: '💻 GitHub Setup', value: 'github' }
        ]);
      }, 800);
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
      if (lowerMessage.includes('email') || lowerMessage.includes('notification')) {
        this.handleEmailInquiry();
      } else if (lowerMessage.includes('social') || lowerMessage.includes('post') || lowerMessage.includes('facebook') || lowerMessage.includes('instagram')) {
        this.handleSocialMediaInquiry();
      } else if (lowerMessage.includes('research') || lowerMessage.includes('market') || lowerMessage.includes('competitor')) {
        this.handleMarketResearchInquiry();
      } else if (lowerMessage.includes('github') || lowerMessage.includes('technical') || lowerMessage.includes('setup') || lowerMessage.includes('deploy')) {
        this.handleGithubInquiry();
      } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('free')) {
        this.handlePricingInquiry();
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('phone')) {
        this.handleContactInquiry();
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        this.handleGreeting();
      } else {
        this.handleUnknownQuery(message);
      }
    }, 1500);
  }

  handleEmailInquiry() {
    this.conversationState = 'email';
    this.addBotMessage(
      "Great choice! 📧 Our FREE email notification setup includes:\n\n" +
      "✅ Contact form notifications\n" +
      "✅ Order confirmations\n" +
      "✅ Customer welcome emails\n" +
      "✅ Status updates\n\n" +
      "This is 100% FREE for East African businesses!"
    );
    
    setTimeout(() => {
      this.addBotMessage("What type of notifications do you need?");
      this.showQuickReplies([
        { text: 'Contact Form Alerts', value: 'contact_form' },
        { text: 'E-commerce Orders', value: 'ecommerce' },
        { text: 'Customer Emails', value: 'customer' },
        { text: 'All of the Above', value: 'all_email' }
      ]);
    }, 1000);
  }

  handleSocialMediaInquiry() {
    this.conversationState = 'social';
    this.addBotMessage(
      "Awesome! 🎉 Let's automate your social media!\n\n" +
      "With our FREE setup, you can:\n" +
      "📱 Auto-post to Facebook, Instagram, Twitter/X, LinkedIn\n" +
      "⏰ Schedule posts in advance\n" +
      "🔄 Cross-post to multiple platforms\n" +
      "📊 Track basic analytics"
    );
    
    setTimeout(() => {
      this.addBotMessage("Which platforms do you want to connect?");
      this.showQuickReplies([
        { text: 'Facebook', value: 'facebook' },
        { text: 'Instagram', value: 'instagram' },
        { text: 'Twitter/X', value: 'twitter' },
        { text: 'All Platforms', value: 'all_social' }
      ]);
    }, 1000);
  }

  handleMarketResearchInquiry() {
    this.conversationState = 'research';
    this.addBotMessage(
      "Excellent! 🎯 Our FREE Market Research AI provides:\n\n" +
      "🔍 Competitor analysis\n" +
      "📊 Target audience insights\n" +
      "📈 Market trends in East Africa\n" +
      "💰 Pricing strategies\n" +
      "🎁 Growth opportunities\n\n" +
      "You'll get a detailed PDF report worth $500+ for FREE!"
    );
    
    setTimeout(() => {
      this.addBotMessage("To get started, I need a few details:");
      this.showQuickReplies([
        { text: 'Share My Business Info', value: 'business_info' },
        { text: 'Learn More First', value: 'learn_more' },
        { text: 'Talk to Human', value: 'human' }
      ]);
    }, 1000);
  }

  handleGithubInquiry() {
    this.conversationState = 'github';
    this.addBotMessage(
      "Nice! 💻 Our FREE Advanced Technical Setup includes:\n\n" +
      "🔧 GitHub repository setup\n" +
      "🚀 CI/CD pipeline automation\n" +
      "☁️ Cloud infrastructure\n" +
      "🔐 Security best practices\n\n" +
      "⚠️ This is slightly technical but we'll guide you!"
    );
    
    setTimeout(() => {
      this.addBotMessage("What's your technical level?");
      this.showQuickReplies([
        { text: 'Beginner', value: 'beginner' },
        { text: 'Intermediate', value: 'intermediate' },
        { text: 'Advanced', value: 'advanced' }
      ]);
    }, 1000);
  }

  handlePricingInquiry() {
    this.addBotMessage(
      "Great question! 💰\n\n" +
      "These services are 100% FREE:\n" +
      "✅ Email notification setup\n" +
      "✅ Social media auto-posting\n" +
      "✅ Market research AI report\n" +
      "✅ GitHub & technical setup\n\n" +
      "Why FREE? We believe in supporting East African businesses! 🌍"
    );
    
    setTimeout(() => {
      this.addBotMessage("Which FREE service interests you?");
      this.showMainMenu();
    }, 1500);
  }

  handleContactInquiry() {
    this.addBotMessage(
      "Happy to connect! 📞\n\n" +
      "📧 Email: ciphcreativeagency@gmail.com\n" +
      "📱 Phone/WhatsApp: +256 393 24 2000\n" +
      "🌐 Website: https://ciphca.com\n\n" +
      "⏰ Hours: Sun-Fri 9AM-6PM, Sat 9AM-4PM\n\n" +
      "We respond within 2 hours! 🚀"
    );
    
    setTimeout(() => {
      this.showQuickReplies([
        { text: '📧 Send Email', value: 'send_email' },
        { text: '📱 WhatsApp Us', value: 'whatsapp' },
        { text: '🔙 Back to Services', value: 'main_menu' }
      ]);
    }, 1000);
  }

  handleGreeting() {
    this.addBotMessage(
      "Hello! 👋 Welcome to Ciph Creative Agency!\n\n" +
      "I can help you with our FREE services for East African businesses."
    );
    
    setTimeout(() => {
      this.showMainMenu();
    }, 800);
  }

  handleUnknownQuery(message) {
    this.addBotMessage(
      "I want to make sure I understand correctly! 🤔\n\n" +
      "I can help you with these FREE services:"
    );
    
    setTimeout(() => {
      this.showMainMenu();
    }, 800);
  }

  showMainMenu() {
    this.showQuickReplies([
      { text: '📧 Email Setup', value: 'email' },
      { text: '📱 Social Media', value: 'social' },
      { text: '🔍 Market Research', value: 'research' },
      { text: '💻 GitHub Setup', value: 'github' }
    ]);
  }

  handleQuickReply(value) {
    // Handle specific quick reply actions
    if (value === 'send_email') {
      window.location.href = 'mailto:ciphcreativeagency@gmail.com?subject=Inquiry from Website Chatbot';
    } else if (value === 'whatsapp') {
      window.open('https://wa.me/256393242000?text=Hi, I\'m interested in your free services!', '_blank');
    } else if (value === 'main_menu') {
      this.showMainMenu();
    } else if (value === 'human') {
      this.addBotMessage(
        "I'll connect you with our team! 🤝\n\n" +
        "Best ways to reach us:\n" +
        "📱 WhatsApp: +256 393 24 2000\n" +
        "📧 Email: ciphcreativeagency@gmail.com\n\n" +
        "We'll respond within 2 hours!"
      );
      setTimeout(() => {
        this.showQuickReplies([
          { text: '📱 WhatsApp Now', value: 'whatsapp' },
          { text: '📧 Send Email', value: 'send_email' }
        ]);
      }, 1000);
    } else if (value === 'business_info' || value === 'all_email' || value === 'all_social') {
      this.addBotMessage(
        "Perfect! Let's get you set up! 🚀\n\n" +
        "To proceed, please contact us:\n" +
        "📱 WhatsApp: +256 393 24 2000\n" +
        "📧 Email: ciphcreativeagency@gmail.com\n\n" +
        "We'll start your FREE setup within 24 hours!"
      );
      setTimeout(() => {
        this.showQuickReplies([
          { text: '📱 WhatsApp Us', value: 'whatsapp' },
          { text: '📧 Send Email', value: 'send_email' }
        ]);
      }, 1000);
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
