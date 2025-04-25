// Main JavaScript file for Wachau Vacation Planner

// Language switching functionality
function changeLanguage(lang) {
    // In a real implementation, this would load language-specific content
    console.log(`Changing language to ${lang}`);
    
    // For demonstration purposes, we'll just show an alert
    alert(`Language changed to ${lang === 'en' ? 'English' : 'German'}`);
    
    // Store language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Check for stored language preference on page load
document.addEventListener('DOMContentLoaded', function() {
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang) {
        // Apply stored language preference
        console.log(`Applying stored language: ${storedLang}`);
    }
    
    // Add fade-in animation to main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('fade-in');
    }
    
    // Initialize any page-specific functionality
    initPageSpecificFunctions();
});

// Initialize functionality based on current page
function initPageSpecificFunctions() {
    // Get current page filename
    const path = window.location.pathname;
    const page = path.split("/").pop();
    
    // Initialize page-specific functionality
    switch(page) {
        case "planner.html":
            initVacationPlanner();
            break;
        case "assistant.html":
            initAIAssistant();
            break;
        case "index.html":
        case "":
            initHomePage();
            break;
        case "terms.html":
            initTermsPage();
            break;
    }
}

// Home page specific functionality
function initHomePage() {
    console.log("Initializing home page");
    // Add any home page specific JavaScript here
}

// Vacation planner specific functionality
function initVacationPlanner() {
    console.log("Initializing vacation planner");
    
    // Get all form steps and navigation buttons
    const formSteps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const stepIndicators = document.querySelectorAll('.step-indicator-item');
    
    let currentStep = 0;
    
    // Initialize - show first step
    if (formSteps.length > 0) {
        formSteps[0].classList.add('active');
        stepIndicators[0].classList.add('active');
    }
    
    // Next button event listeners
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Validate current step (simplified for demo)
            const isValid = validateStep(currentStep);
            
            if (isValid) {
                // Hide current step
                formSteps[currentStep].classList.remove('active');
                stepIndicators[currentStep].classList.add('completed');
                stepIndicators[currentStep].classList.remove('active');
                
                // Show next step
                currentStep++;
                formSteps[currentStep].classList.add('active');
                stepIndicators[currentStep].classList.add('active');
                
                // Scroll to top of form
                window.scrollTo({
                    top: document.querySelector('.vacation-planner-form').offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Previous button event listeners
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Hide current step
            formSteps[currentStep].classList.remove('active');
            stepIndicators[currentStep].classList.remove('active');
            
            // Show previous step
            currentStep--;
            formSteps[currentStep].classList.add('active');
            stepIndicators[currentStep].classList.add('active');
            stepIndicators[currentStep].classList.remove('completed');
            
            // Scroll to top of form
            window.scrollTo({
                top: document.querySelector('.vacation-planner-form').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
    
    // Form submission
    const plannerForm = document.getElementById('vacation-planner-form');
    if (plannerForm) {
        plannerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(plannerForm);
            const planData = {};
            
            for (const [key, value] of formData.entries()) {
                planData[key] = value;
            }
            
            // In a real implementation, this would send data to a server
            console.log('Vacation plan data:', planData);
            
            // Show success message
            alert('Your vacation plan request has been submitted! We will contact you shortly.');
            
            // Reset form
            plannerForm.reset();
            
            // Return to first step
            formSteps.forEach(step => step.classList.remove('active'));
            stepIndicators.forEach(indicator => {
                indicator.classList.remove('active');
                indicator.classList.remove('completed');
            });
            
            currentStep = 0;
            formSteps[0].classList.add('active');
            stepIndicators[0].classList.add('active');
        });
    }
}

// Simple validation function (would be more comprehensive in a real implementation)
function validateStep(stepIndex) {
    // For demonstration purposes, we'll just return true
    // In a real implementation, this would check required fields, etc.
    return true;
}

// AI Assistant specific functionality
function initAIAssistant() {
    console.log("Initializing AI assistant");
    
    const chatContainer = document.querySelector('.chat-container');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    
    // Send message function
    function sendMessage(message) {
        if (!message.trim()) return;
        
        // Add user message to chat
        appendMessage('user', message);
        
        // Clear input
        messageInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate AI response after a delay
        setTimeout(() => {
            // Remove typing indicator
            removeTypingIndicator();
            
            // Generate and append AI response
            const response = generateResponse(message);
            appendMessage('assistant', response);
            
            // Scroll to bottom of chat
            scrollToBottom();
        }, 1500);
    }
    
    // Append message to chat
    function appendMessage(sender, content) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `message-${sender}`);
        messageElement.textContent = content;
        
        chatContainer.appendChild(messageElement);
        scrollToBottom();
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.classList.add('message', 'message-assistant', 'typing-indicator');
        typingElement.innerHTML = '<span>.</span><span>.</span><span>.</span>';
        
        chatContainer.appendChild(typingElement);
        scrollToBottom();
    }
    
    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Scroll to bottom of chat
    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // Generate response based on user message
    function generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('wine') || lowerMessage.includes('vineyard')) {
            return 'The Wachau region is famous for its vineyards and wine production, particularly Grüner Veltliner and Riesling varieties. I recommend visiting wineries in Dürnstein, Spitz, and Weißenkirchen. Many offer tastings and tours, and we can arrange these as part of your vacation package.';
        }
        
        if (lowerMessage.includes('bike') || lowerMessage.includes('cycling')) {
            return 'The Wachau Valley offers excellent biking opportunities along the Danube Cycle Path (Donauradweg). This well-maintained path runs on both sides of the Danube River, offering beautiful views of vineyards, castles, and charming villages. We can arrange bike rentals and suggest routes based on your experience level.';
        }
        
        if (lowerMessage.includes('hotel') || lowerMessage.includes('stay') || lowerMessage.includes('accommodation')) {
            return 'The Wachau region offers a variety of accommodations, from luxury hotels to cozy guesthouses. Popular options include Hotel Schloss Dürnstein, Hotel Richard Löwenherz, and Landhaus Bacher. We can book accommodations that match your preferences and budget as part of your vacation package.';
        }
        
        if (lowerMessage.includes('restaurant') || lowerMessage.includes('food') || lowerMessage.includes('eat')) {
            return 'The Wachau region offers excellent dining options, from traditional wine taverns (Heurigen) to fine dining restaurants. Local specialties include apricot dumplings (Marillenknödel) and river fish dishes. Some recommended restaurants include Landhaus Bacher in Mautern, Restaurant Loibnerhof in Dürnstein, and Gasthof Prankl in Spitz.';
        }
        
        if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('budget')) {
            return 'The cost of a vacation in the Wachau region varies depending on your preferences. A standard package including accommodation, some activities, and our service fee typically ranges from €1000-2000 per person for a 5-day trip. Premium and luxury options are also available. We can create a custom package that fits your budget.';
        }
        
        return 'Thank you for your question about the Wachau region. To provide you with the most helpful information, could you tell me more about what specific aspects of the region you\'re interested in? I can help with accommodations, activities, wine tours, biking routes, restaurants, or creating a complete vacation package.';
    }
    
    // Event listeners
    if (sendButton && messageInput) {
        // Send button click
        sendButton.addEventListener('click', function() {
            sendMessage(messageInput.value);
        });
        
        // Enter key press
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage(messageInput.value);
            }
        });
    }
    
    // Suggestion chips
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', function() {
            sendMessage(this.textContent);
        });
    });
}

// Terms page specific functionality
function initTermsPage() {
    console.log("Initializing terms page");
    
    // Add smooth scrolling to anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}
