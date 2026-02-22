/**
 * Ciph Creative Agency Chatbot - Simplified Version
 * Clear, direct conversation flow
 */

class CiphChatbot {
  constructor() {
    this.isOpen = false;
    this.conversationState = 'initial';
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
                <span class="status">Online • Responds instantly</span>
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
    const badge = tog