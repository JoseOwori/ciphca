/**
 * Ciph Creative Agency Chatbot - Simplified Version
 * Clear, direct conversation flow
 */

class CiphChatbot {
  constructor() {
    this.isOpen = false;
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
                <span class="status">Online</span>
              </div>
            </div>
            <button class="close-btn" id="chatbot-close">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          
          <div class="chatbot-messages" id="chatbot-messages"></div>
          
          <div class="chatbot-quick-replies" id="quick-replies"></div>
          
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
    document.getElementById('chatbot-toggle').addEventListener('click', () => this.toggleChatbot());
    document.getElementById('chatbot-close').addEventListener('click', () => this.toggleChatbot());
    document.getElementById('chatbot-send').addEventListener('click', () => this.handleUserMessage());
    
    document.getElementById('chatbot-input-field').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleUserMessage();
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
      this.addBotMessage("Hi! 👋 I'm here to help.\n\nWhat do you need?");
      
      setTimeout(() => {
        this.showOptions([
          { text: 'Build a Website', action: 'website' },
          { text: 'Design Services', action: 'design' },
          { text: 'Marketing Help', action: 'marketing' },
          { text: 'See All Services', action: 'services' }
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
    const lower = message.toLowerCase();
    
    this.showTyping();
    
    setTimeout(() => {
      this.hideTyping();
      
      if (lower.includes('website') || lower.includes('web') || lower.includes('build')) {
        this.handleWebsite();
      } else if (lower.includes('design') || lower.includes('logo') || lower.includes('brand')) {
        this.handleDesign();
      } else if (lower.includes('market') || lower.includes('seo') || lower.includes('social')) {
        this.handleMarketing();
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('quote')) {
        this.handleContact('quote');
      } else if (lower.includes('contact') || lower.includes('call') || lower.includes('email')) {
        this.handleContact('general');
      } else if (lower.includes('thank') || lower.includes('bye')) {
        this.handleGoodbye();
      } else {
        this.handleUnknown();
      }
    }, 1200);
  }

  // Service Handlers
  handleWebsite() {
    this.addBotMessage("Great! What type of website?\n\n🌐 Business Website\n🛒 Online Store\n📱 Custom Solution");
    
    setTimeout(() => {
      this.showOptions([
        { text: 'Business Website', action: 'contact-business' },
        { text: 'Online Store', action: 'contact-store' },
        { text: 'Custom Solution', action: 'contact-custom' },
        { text: 'Not Sure', action: 'contact-help' }
      ]);
    }, 800);
  }

  handleDesign() {
    this.addBotMessage("Perfect! What do you need?\n\n🎨 New Design\n🔄 Redesign\n🖼️ Logo & Branding");
    
    setTimeout(() => {
      this.showOptions([
        { text: 'New Design', action: 'contact-new-design' },
        { text: 'Redesign Site', action: 'contact-redesign' },
        { text: 'Logo & Branding', action: 'contact-branding' },
        { text: 'Talk to Designer', action: 'contact-designer' }
      ]);
    }, 800);
  }

  handleMarketing() {
    this.addBotMessage("Excellent! What's your goal?\n\n📈 Get More Customers\n🔍 Improve SEO\n📱 Social Media");
    
    setTimeout(() => {
      this.showOptions([
        { text: 'More Customers', action: 'contact-customers' },
        { text: 'SEO Help', action: 'contact-seo' },
        { text: 'Social Media', action: 'contact-social' },
        { text: 'Full Marketing', action: 'contact-marketing' }
      ]);
    }, 800);
  }

  handleContact(type) {
    let message = "Perfect! Let's connect. 🚀\n\n";
    
    if (type === 'quote') {
      message += "We'll send you a custom quote within 24 hours.\n\n";
    } else {
      message += "Our team will help you get started.\n\n";
    }
    
    message += "Choose how to reach us:";
    
    this.addBotMessage(message);
    
    setTimeout(() => {
      this.showOptions([
        { text: '📱 WhatsApp (Fast)', action: 'whatsapp' },
        { text: '📧 Email', action: 'email' },
        { text: '📅 Schedule Call', action: 'schedule' }
      ]);
    }, 800);
  }

  handleUnknown() {
    this.addBotMessage("I can help you with:\n\n🌐 Website Development\n🎨 Design Services\n📱 Marketing\n\nWhat interests you?");
    
    setTimeout(() => {
      this.showOptions([
        { text: 'Website', action: 'website' },
        { text: 'Design', action: 'design' },
        { text: 'Marketing', action: 'marketing' },
        { text: 'Talk to Us', action: 'contact-general' }
      ]);
    }, 800);
  }

  handleGoodbye() {
    this.addBotMessage(
      "Thank you! 🙏\n\n" +
      "Questions? Contact us:\n" +
      "📧 ciphcreativeagency@gmail.com\n" +
      "📱 +256 393 24 2000\n\n" +
      "Have a great day!"
    );
    
    setTimeout(() => {
      this.showOptions([
        { text: '🔄 Start Over', action: 'restart' },
        { text: '📱 Contact Us', action: 'contact-general' }
      ]);
    }, 1500);
  }

  // Action Handlers
  handleAction(action) {
    // Contact actions
    if (action.startsWith('contact-')) {
      this.handleContact('general');
      return;
    }

    // Direct actions
    switch(action) {
      case 'website':
        this.handleWebsite();
        break;
      case 'design':
        this.handleDesign();
        break;
      case 'marketing':
        this.handleMarketing();
        break;
      case 'services':
        this.showAllServices();
        break;
      case 'whatsapp':
        this.openWhatsApp();
        break;
      case 'email':
        this.openEmail();
        break;
      case 'schedule':
        this.openSchedule();
        break;
      case 'restart':
        this.restart();
        break;
      default:
        this.handleUnknown();
    }
  }

  showAllServices() {
    this.addBotMessage(
      "Here's what we do:\n\n" +
      "🌐 Website Development\n" +
      "🎨 Design & Branding\n" +
      "📱 Digital Marketing\n" +
      "🛒 E-commerce\n" +
      "☁️ Microsoft 365\n\n" +
      "What interests you?"
    );
    
    setTimeout(() => {
      this.showOptions([
        { text: 'Website', action: 'website' },
        { text: 'Design', action: 'design' },
        { text: 'Marketing', action: 'marketing' },
        { text: 'Let\'s Talk', action: 'contact-general' }
      ]);
    }, 1000);
  }

  // External Actions
  openWhatsApp() {
    window.open('https://wa.me/256393242000?text=Hi! I\'m interested in your services.', '_blank');
    this.addBotMessage("Opening WhatsApp... 💬\n\nWe'll respond shortly!");
    setTimeout(() => this.handleGoodbye(), 2000);
  }

  openEmail() {
    window.location.href = 'mailto:ciphcreativeagency@gmail.com?subject=Service Inquiry&body=Hi, I\'m interested in your services.';
    this.addBotMessage("Opening email... 📧\n\nWe respond within 2 hours!");
    setTimeout(() => this.handleGoodbye(), 2000);
  }

  openSchedule() {
    window.open('https://calendly.com/ciphcreativeagency/30min', '_blank');
    this.addBotMessage("Opening calendar... 📅\n\nPick your time!");
    setTimeout(() => this.handleGoodbye(), 2000);
  }

  restart() {
    document.getElementById('chatbot-messages').innerHTML = '';
    document.getElementById('quick-replies').innerHTML = '';
    this.showWelcomeMessage();
  }

  // UI Methods
  addUserMessage(message) {
    const html = `
      <div class="message user-message">
        <div class="message-content">${this.escapeHtml(message)}</div>
      </div>
    `;
    document.getElementById('chatbot-messages').insertAdjacentHTML('beforeend', html);
    this.scrollToBottom();
  }

  addBotMessage(message) {
    const formatted = message.replace(/\n/g, '<br>');
    const html = `
      <div class="message bot-message">
        <div class="message-avatar"><i class="bi bi-robot"></i></div>
        <div class="message-content">${formatted}</div>
      </div>
    `;
    document.getElementById('chatbot-messages').insertAdjacentHTML('beforeend', html);
    this.scrollToBottom();
  }

  showTyping() {
    const html = `
      <div class="message bot-message typing-indicator" id="typing">
        <div class="message-avatar"><i class="bi bi-robot"></i></div>
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    document.getElementById('chatbot-messages').insertAdjacentHTML('beforeend', html);
    this.scrollToBottom();
  }

  hideTyping() {
    const typing = document.getElementById('typing');
    if (typing) typing.remove();
  }

  showOptions(options) {
    const container = document.getElementById('quick-replies');
    container.innerHTML = '';
    
    options.forEach(option => {
      const button = document.createElement('button');
      button.className = 'quick-reply-btn';
      button.textContent = option.text;
      button.addEventListener('click', () => {
        this.addUserMessage(option.text);
        container.innerHTML = '';
        this.handleAction(option.action);
      });
      container.appendChild(button);
    });
  }

  scrollToBottom() {
    const container = document.getElementById('chatbot-messages');
    container.scrollTop = container.scrollHeight;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new CiphChatbot();
});
