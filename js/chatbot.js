(function() {
    const chatbotMarkup = `
    <div class="chatbot-widget" aria-live="polite">
        <button class="chat-toggle" aria-label="Open chat">💬</button>
        <div class="chat-panel" role="dialog" aria-label="Back to Nature Yoga Chatbot">
            <div class="chat-header">
                <div>
                    <div class="chat-title">Back to Nature AI Yoga Guide</div>
                    <div class="chat-subtitle">Ask about classes, trainers, pricing, or joining.</div>
                </div>
                <div class="chat-actions">
                    <button class="chat-minimize" aria-label="Minimize chat">–</button>
                    <button class="chat-close" aria-label="Close chat">×</button>
                </div>
            </div>
            <div class="chat-body">
                <div class="chat-messages"></div>
                <div class="chat-input-area">
                    <input class="chat-input" type="text" placeholder="Type your question..." aria-label="Chat message input">
                    <button class="chat-send" type="button">Send</button>
                </div>
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotMarkup);

    const widget = document.querySelector('.chatbot-widget');
    const toggle = widget.querySelector('.chat-toggle');
    const panel = widget.querySelector('.chat-panel');
    const minimizeBtn = widget.querySelector('.chat-minimize');
    const closeBtn = widget.querySelector('.chat-close');
    const sendBtn = widget.querySelector('.chat-send');
    const input = widget.querySelector('.chat-input');
    const messages = widget.querySelector('.chat-messages');

    const faqResponses = [
        {
            keywords: ['classes', 'courses'],
            reply: 'We offer Beginner Yoga, Meditation Yoga, Power Yoga, and Family Yoga classes.'
        },
        {
            keywords: ['price', 'fees'],
            reply: 'Please submit the registration form or contact us for current pricing details.'
        },
        {
            keywords: ['trainers'],
            reply: 'Our certified trainers are Tahseen (Yoga & Meditation Expert) and Zeeshan (Fitness & Breathing Specialist).'
        },
        {
            keywords: ['benefits'],
            reply: 'Yoga improves flexibility, reduces stress, enhances breathing, improves posture, and promotes overall well-being.'
        },
        {
            keywords: ['contact'],
            reply: 'You can contact us through our registration form or email us for assistance.'
        },
        {
            keywords: ['location'],
            reply: 'Please contact us for the latest location and class details.'
        },
        {
            keywords: ['schedule', 'timings'],
            reply: 'Our team will share available class timings after registration.'
        },
        {
            keywords: ['join'],
            reply: 'Please complete the registration form on the Contact page to join Back to Nature Yoga.'
        }
    ];

    const welcomeMessage = '🌿 Welcome to Back to Nature Yoga!\nI\'m your virtual assistant. Ask me about yoga classes, trainers, pricing, schedules, benefits, or how to join.';
    const fallbackMessage = 'Thank you for your question. For detailed assistance, please submit the contact form and our team will get back to you.';

    function addMessage(text, type) {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${type}`;

        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.innerHTML = text.replace(/\n/g, '<br>');

        messageElement.appendChild(bubble);
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight;
    }

    function addTypingBubble() {
        const typingContainer = document.createElement('div');
        typingContainer.className = 'chat-message bot';

        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble typing';
        bubble.innerHTML = `Typing<div class="typing-dots"><span></span><span></span><span></span></div>`;

        typingContainer.appendChild(bubble);
        messages.appendChild(typingContainer);
        messages.scrollTop = messages.scrollHeight;
        return typingContainer;
    }

    function getBotReply(text) {
        const normalized = text.toLowerCase();
        for (const item of faqResponses) {
            if (item.keywords.some(keyword => normalized.includes(keyword))) {
                return item.reply;
            }
        }
        return fallbackMessage;
    }

    function sendMessage() {
        const value = input.value.trim();
        if (!value) return;
        addMessage(value, 'user');
        input.value = '';
        input.focus();

        const typingBubble = addTypingBubble();
        setTimeout(() => {
            typingBubble.remove();
            addMessage(getBotReply(value), 'bot');
        }, 900);
    }

    function openChat() {
        widget.classList.add('open');
        panel.setAttribute('aria-hidden', 'false');
        if (!messages.children.length) {
            addMessage(welcomeMessage, 'bot');
        }
        input.focus();
    }

    function closeChat() {
        widget.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
    }

    toggle.addEventListener('click', () => {
        if (widget.classList.contains('open')) {
            closeChat();
        } else {
            openChat();
        }
    });

    minimizeBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        closeChat();
    });

    closeBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        closeChat();
    });

    sendBtn.addEventListener('click', sendMessage);

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });
})();
