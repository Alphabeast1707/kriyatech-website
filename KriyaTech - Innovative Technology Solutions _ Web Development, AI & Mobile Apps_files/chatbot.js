// KriyaTech AI Chatbot - Clean and Robust Version

class KriyaTechChatbot {
    constructor() {
        // API key should be handled server-side for security
        this.apiUrl = '/api/chat'; // Proxy endpoint to hide API key
        this.conversationHistory = [];
        this.isTyping = false;
        this.isOpen = false;
        
        this.init();
    }

    init() {
        this.createChatbotHTML();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <div class="chatbot-container" id="kriya-chatbot">
                <button class="chatbot-toggle" id="chatbot-toggle">
                    <i class="fas fa-comments"></i>
                </button>
                
                <div class="chatbot-widget" id="chatbot-widget">
                    <div class="chatbot-header">
                        <h3><i class="fas fa-robot"></i> KriyaTech Assistant</h3>
                        <button class="chatbot-close" id="chatbot-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="chatbot-messages" id="chatbot-messages">
                        <!-- Messages will be added here -->
                    </div>
                    
                    <div class="typing-indicator" id="typing-indicator">
                        <i class="fas fa-circle-notch fa-spin"></i> Assistant is typing...
                    </div>
                    
                    <div class="quick-actions">
                        <button class="quick-action" data-message="What services do you offer?">Services</button>
                        <button class="quick-action" data-message="Tell me about your team">Team</button>
                        <button class="quick-action" data-message="Show me your portfolio">Portfolio</button>
                        <button class="quick-action" data-message="How can I contact you?">Contact</button>
                    </div>
                    
                    <div class="chatbot-input-container">
                        <input type="text" id="chatbot-input" placeholder="Type your message...">
                        <button id="chatbot-send">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Remove existing chatbot if any
        const existingChatbot = document.getElementById('kriya-chatbot');
        if (existingChatbot) {
            existingChatbot.remove();
        }

        // Add chatbot to page
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
        
        // Ensure DOM elements are available before attaching listeners
        setTimeout(() => {
            this.attachEventListeners();
            this.addWelcomeMessage();
        }, 100);
    }

    attachEventListeners() {
        // Toggle button
        const toggleBtn = document.getElementById('chatbot-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleChatbot());
        }

        // Close button
        const closeBtn = document.getElementById('chatbot-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeChatbot());
        }

        // Send button
        const sendBtn = document.getElementById('chatbot-send');
        if (sendBtn) {
            sendBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.sendMessage();
            });
        }

        // Input field
        const input = document.getElementById('chatbot-input');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    e.stopPropagation();
                    this.sendMessage();
                }
            });
            
            // Force placeholder styling via JavaScript
            this.forcePlaygroundStyling(input);
        }

        // Quick action buttons
        const quickActions = document.querySelectorAll('.quick-action');
        quickActions.forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.getAttribute('data-message');
                this.sendQuickMessage(message);
            });
        });
    }

    toggleChatbot() {
        console.log('Toggle chatbot called');
        const widget = document.getElementById('chatbot-widget');
        if (widget) {
            if (this.isOpen) {
                this.closeChatbot();
            } else {
                this.openChatbot();
            }
        }
    }

    openChatbot() {
        console.log('Opening chatbot');
        const widget = document.getElementById('chatbot-widget');
        if (widget) {
            widget.style.display = 'flex';
            this.isOpen = true;
        }
    }

    closeChatbot() {
        console.log('Closing chatbot');
        const widget = document.getElementById('chatbot-widget');
        if (widget) {
            widget.style.display = 'none';
            this.isOpen = false;
        }
    }

    forcePlaygroundStyling(input) {
        // Custom placeholder implementation - more reliable than CSS
        const createCustomPlaceholder = () => {
            // Remove the native placeholder to avoid conflicts
            input.removeAttribute('placeholder');
            
            // Create a custom placeholder element
            const placeholder = document.createElement('div');
            placeholder.className = 'custom-placeholder';
            placeholder.textContent = 'Type your message...';
            placeholder.style.cssText = `
                position: absolute;
                top: 50%;
                left: 20px;
                transform: translateY(-50%);
                color: rgba(255, 255, 255, 0.9);
                font-size: 14px;
                pointer-events: none;
                transition: opacity 0.2s ease;
                z-index: 2;
                font-family: inherit;
                white-space: nowrap;
                overflow: visible;
            `;
            
            // Position the input container relatively
            const container = input.parentElement;
            container.style.position = 'relative';
            
            // Insert placeholder before the input
            container.insertBefore(placeholder, input);
            
            // Handle placeholder visibility
            const togglePlaceholder = () => {
                placeholder.style.opacity = input.value.length > 0 ? '0' : '0.9';
            };
            
            // Add event listeners
            input.addEventListener('input', togglePlaceholder);
            input.addEventListener('focus', () => {
                placeholder.style.opacity = input.value.length > 0 ? '0' : '0.7';
            });
            input.addEventListener('blur', togglePlaceholder);
            
            // Initial state
            togglePlaceholder();
        };
        
        // Apply custom placeholder
        createCustomPlaceholder();
        
        // Also enhance the input styling
        input.style.cssText += `
            background: rgba(255, 255, 255, 0.15) !important;
            border: 2px solid rgba(0, 245, 255, 0.5) !important;
            color: #fff !important;
            position: relative;
            z-index: 2;
        `;
    }

    addWelcomeMessage() {
        const welcomeMessage = "👋 Welcome to KriyaTech! I'm your AI assistant, ready to help you explore our digital solutions and services. How can I assist you today?";
        this.addMessage(welcomeMessage, 'bot');
    }

    addMessage(message, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        
        if (!messagesContainer) {
            console.error('Chatbot messages container not found');
            return;
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = message;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    sendQuickMessage(message) {
        this.addMessage(message, 'user');
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000);
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        
        if (!input) {
            console.error('Chatbot input element not found');
            return;
        }
        
        if (!input.value.trim()) {
            return;
        }

        const message = input.value.trim();
        input.value = '';

        this.addMessage(message, 'user');
        
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000);
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Service-related responses
        if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('offerings')) {
            return `🚀 <strong>Our Core Services:</strong><br><br>
            <div class="feature-card">
                <div class="feature-header">
                    <span class="feature-icon">💻</span>
                    <span class="feature-title">Web Development</span>
                </div>
                <div class="feature-description">Custom websites, web applications, and e-commerce solutions</div>
            </div>
            <div class="feature-card">
                <div class="feature-header">
                    <span class="feature-icon">📱</span>
                    <span class="feature-title">Mobile App Development</span>
                </div>
                <div class="feature-description">iOS and Android apps with native and cross-platform solutions</div>
            </div>
            <div class="feature-card">
                <div class="feature-header">
                    <span class="feature-icon">🤖</span>
                    <span class="feature-title">AI & Machine Learning</span>
                </div>
                <div class="feature-description">Intelligent automation and data-driven solutions</div>
            </div>
            <div class="feature-card">
                <div class="feature-header">
                    <span class="feature-icon">☁️</span>
                    <span class="feature-title">Cloud Solutions</span>
                </div>
                <div class="feature-description">Scalable cloud infrastructure and migration services</div>
            </div>`;
        }

        // Team-related responses
        if (lowerMessage.includes('team') || lowerMessage.includes('about') || lowerMessage.includes('who are you')) {
            return `👥 <strong>Meet Our Expert Team:</strong><br><br>
            We're a passionate group of tech innovators, designers, and strategists dedicated to transforming your digital vision into reality.<br><br>
            <div class="section-header">
                <span class="section-icon">🎯</span>
                <h3>Our Expertise</h3>
            </div>
            <div class="bullet-point">Senior developers with 5+ years experience</div>
            <div class="bullet-point">UI/UX designers focused on user-centered design</div>
            <div class="bullet-point">Project managers ensuring timely delivery</div>
            <div class="bullet-point">QA specialists maintaining high code quality</div><br>
            We believe in collaboration, innovation, and delivering exceptional results for every client.`;
        }

        // Portfolio/Projects responses
        if (lowerMessage.includes('portfolio') || lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('example')) {
            return `🎨 <strong>Our Recent Projects:</strong><br><br>
            <div class="feature-card">
                <div class="feature-header">
                    <span class="feature-icon">🏪</span>
                    <span class="feature-title">E-Commerce Platform</span>
                </div>
                <div class="feature-description">Full-stack online marketplace with payment integration and admin dashboard</div>
            </div>
            <div class="feature-card">
                <div class="feature-header">
                    <span class="feature-icon">🏥</span>
                    <span class="feature-title">Healthcare Management System</span>
                </div>
                <div class="feature-description">Patient management system with appointment scheduling and medical records</div>
            </div>
            <div class="feature-card">
                <div class="feature-header">
                    <span class="feature-icon">📊</span>
                    <span class="feature-title">Analytics Dashboard</span>
                </div>
                <div class="feature-description">Real-time business intelligence dashboard with interactive visualizations</div>
            </div>
            <br>Visit our Projects page to see detailed case studies and live demos!`;
        }

        // Contact information
        if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
            return `📞 <strong>Get In Touch With Us:</strong><br><br>
            <div class="contact-item">
                <span class="contact-icon">📧</span>
                Email: <a href="mailto:kriyatechcreatives@gmail.com" class="contact-link">kriyatechcreatives@gmail.com</a>
            </div>
            <div class="contact-item">
                <span class="contact-icon">📱</span>
                Phone: <a href="tel:+919898238926" class="contact-link">+91 9898238926</a>
            </div>
            <div class="contact-item">
                <span class="contact-icon">🌐</span>
                Website: <a href="https://kriyatech.com" class="contact-link">www.kriyatech.com</a>
            </div>
            <div class="contact-item">
                <span class="contact-icon">📍</span>
                <span class="address-text">Diamond sky, Survey No:- 1058, near Balaji Kutir, Adalaj, Gujarat 382421</span>
            </div>
            <br>We're available to help you with your project needs. Feel free to reach out anytime!`;
        }

        // Technology responses
        if (lowerMessage.includes('technology') || lowerMessage.includes('tech stack') || lowerMessage.includes('tools')) {
            return `⚡ <strong>We work with cutting-edge technologies:</strong><br><br>
            <div class="section-header">
                <span class="section-icon">🖥️</span>
                <h3>Frontend Technologies</h3>
            </div>
            <div class="bullet-point">React, Vue.js, Angular</div>
            <div class="bullet-point">HTML5, CSS3, JavaScript (ES6+)</div>
            <div class="bullet-point">TypeScript, Sass, Tailwind CSS</div><br>
            <div class="section-header">
                <span class="section-icon">🔧</span>
                <h3>Backend & Database</h3>
            </div>
            <div class="bullet-point">Node.js, Python, Java, PHP</div>
            <div class="bullet-point">MongoDB, PostgreSQL, MySQL</div>
            <div class="bullet-point">Redis, Elasticsearch</div><br>
            <div class="section-header">
                <span class="section-icon">☁️</span>
                <h3>Cloud & DevOps</h3>
            </div>
            <div class="bullet-point">AWS, Azure, Google Cloud</div>
            <div class="bullet-point">Docker, Kubernetes</div>
            <div class="bullet-point">CI/CD, Git, Jenkins</div>`;
        }

        // Pricing/Cost responses
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget') || lowerMessage.includes('quote')) {
            return `💰 <strong>Our pricing is tailored to each project's specific requirements:</strong><br><br>
            <div class="value-item">
                <span class="value-label">📏 Project Scope:</span>
                <span class="value-description">Complexity and features needed</span>
            </div>
            <div class="value-item">
                <span class="value-label">⏱️ Timeline:</span>
                <span class="value-description">Urgency and delivery requirements</span>
            </div>
            <div class="value-item">
                <span class="value-label">🔧 Technology Stack:</span>
                <span class="value-description">Tools and frameworks required</span>
            </div>
            <div class="value-item">
                <span class="value-label">🎯 Features:</span>
                <span class="value-description">Functionality and integrations</span>
            </div><br>
            We offer competitive rates and flexible payment options. Contact us for a personalized quote based on your needs!`;
        }

        // Greeting responses
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "👋 Hello! Welcome to KriyaTech! I'm excited to help you explore our digital solutions. Whether you're interested in our services, want to know about our team, or have a specific project in mind, I'm here to assist you. What would you like to know?";
        }

        // Goodbye responses
        if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('thanks') || lowerMessage.includes('thank you')) {
            return "🙏 Thank you for your interest in KriyaTech! It was great chatting with you. Feel free to reach out anytime if you have more questions or want to discuss your project. Have a fantastic day! 🚀";
        }

        // Default response
        return `🤔 That's an interesting question! While I focus on helping with information about KriyaTech's services, team, and projects, I'd be happy to connect you with our experts who can provide more detailed assistance.<br><br>
        💡 <strong>Try asking about:</strong><br>
        <div class="bullet-point">Our services and solutions</div>
        <div class="bullet-point">Our team and expertise</div>
        <div class="bullet-point">Project examples and portfolio</div>
        <div class="bullet-point">How to get in touch</div><br>
        What would you like to know more about?`;
    }
}

// Initialize chatbot when DOM is loaded
function initChatbot() {
    console.log('Initializing KriyaTech Chatbot...');
    try {
        window.kriyaChatbot = new KriyaTechChatbot();
        console.log('Chatbot initialized successfully');
    } catch (error) {
        console.error('Error initializing chatbot:', error);
    }
}

// Multiple initialization strategies to ensure the chatbot loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    initChatbot();
}

// Fallback initialization
setTimeout(() => {
    if (!window.kriyaChatbot) {
        console.log('Fallback chatbot initialization...');
        initChatbot();
    }
}, 1000);

console.log('KriyaTech Chatbot script loaded');
