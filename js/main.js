// Main JavaScript file for Wachau Vacation Planner

// Current language
let currentLanguage = 'en';

// Language switching functionality
function changeLanguage(lang) {
    // Set current language
    currentLanguage = lang;
    console.log(`Changing language to ${lang}`);
    
    // Store language preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Update all translatable elements on the page
    updatePageTranslations();
}

// Update all translatable elements on the page
function updatePageTranslations() {
    // Get all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Update placeholders
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });
    
    // Update buttons
    const buttons = document.querySelectorAll('button[data-i18n], input[type="submit"][data-i18n]');
    buttons.forEach(button => {
        const key = button.getAttribute('data-i18n');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            button.value = translations[currentLanguage][key];
        }
    });
}

// Check for stored language preference on page load
document.addEventListener('DOMContentLoaded', function() {
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang) {
        // Apply stored language preference
        currentLanguage = storedLang;
        console.log(`Applying stored language: ${storedLang}`);
        updatePageTranslations();
    }
    
    // Add fade-in animation to main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.classList.add('fade-in');
    }
    
    // Initialize any page-specific functionality
    initPageSpecificFunctions();
    
    // Add data-i18n attributes to elements if not already present
    addI18nAttributes();
    
    // Update translations on page
    updatePageTranslations();
});

// Add data-i18n attributes to elements if not already present
function addI18nAttributes() {
    // This function would normally be more comprehensive
    // For demonstration, we'll just add a few key elements
    
    // Navigation
    const navHome = document.querySelector('.navbar-nav .nav-link[href="index.html"]');
    if (navHome && !navHome.hasAttribute('data-i18n')) {
        navHome.setAttribute('data-i18n', 'nav_home');
    }
    
    const navPlanner = document.querySelector('.navbar-nav .nav-link[href="planner.html"]');
    if (navPlanner && !navPlanner.hasAttribute('data-i18n')) {
        navPlanner.setAttribute('data-i18n', 'nav_planner');
    }
    
    const navAssistant = document.querySelector('.navbar-nav .nav-link[href="assistant.html"]');
    if (navAssistant && !navAssistant.hasAttribute('data-i18n')) {
        navAssistant.setAttribute('data-i18n', 'nav_assistant');
    }
    
    const navTerms = document.querySelector('.navbar-nav .nav-link[href="terms.html"]');
    if (navTerms && !navTerms.hasAttribute('data-i18n')) {
        navTerms.setAttribute('data-i18n', 'nav_terms');
    }
    
    // Language dropdown
    const langDropdown = document.querySelector('#languageDropdown');
    if (langDropdown && !langDropdown.hasAttribute('data-i18n')) {
        langDropdown.setAttribute('data-i18n', 'nav_language');
    }
    
    // Home page specific elements
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && !heroTitle.hasAttribute('data-i18n')) {
        heroTitle.setAttribute('data-i18n', 'hero_title');
    }
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle && !heroSubtitle.hasAttribute('data-i18n')) {
        heroSubtitle.setAttribute('data-i18n', 'hero_subtitle');
    }
    
    // Add more elements as needed for each page
}

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
            
            // Generate vacation plan immediately
            generateVacationPlan(planData);
        });
    }
}

// Generate vacation plan based on form data
function generateVacationPlan(planData) {
    // Create a modal to display the vacation plan
    const modal = document.createElement('div');
    modal.classList.add('vacation-plan-modal');
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.classList.add('vacation-plan-modal-content');
    
    // Create close button
    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // Create plan header
    const planHeader = document.createElement('div');
    planHeader.classList.add('plan-header');
    planHeader.innerHTML = `
        <h2>${translations[currentLanguage]['planner_title'] || 'Your Wachau Vacation Plan'}</h2>
        <p>${translations[currentLanguage]['generated_on'] || 'Generated on'} ${new Date().toLocaleDateString()}</p>
    `;
    
    // Create plan details
    const planDetails = document.createElement('div');
    planDetails.classList.add('plan-details');
    
    // Get dates from form data or use defaults
    const startDate = planData.startDate || '2025-05-15';
    const duration = planData.duration || 5;
    const endDate = new Date(new Date(startDate).getTime() + (duration - 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    // Create summary section
    const summarySection = document.createElement('div');
    summarySection.classList.add('plan-section');
    summarySection.innerHTML = `
        <h3>${translations[currentLanguage]['trip_summary'] || 'Trip Summary'}</h3>
        <p><strong>${translations[currentLanguage]['dates'] || 'Dates'}:</strong> ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()} (${duration} ${translations[currentLanguage]['days'] || 'days'})</p>
        <p><strong>${translations[currentLanguage]['travelers'] || 'Travelers'}:</strong> ${planData.travelers || 2} ${translations[currentLanguage]['persons'] || 'person(s)'}</p>
        <p><strong>${translations[currentLanguage]['accommodation'] || 'Accommodation'}:</strong> ${planData.accommodation || 'Hotel Schloss Dürnstein'}</p>
        <p><strong>${translations[currentLanguage]['interests'] || 'Interests'}:</strong> ${planData.interests || 'Wine, Biking, Culture'}</p>
    `;
    
    // Create itinerary section
    const itinerarySection = document.createElement('div');
    itinerarySection.classList.add('plan-section');
    itinerarySection.innerHTML = `
        <h3>${translations[currentLanguage]['daily_itinerary'] || 'Daily Itinerary'}</h3>
    `;
    
    // Generate daily itinerary based on interests
    const interests = (planData.interests || 'Wine, Biking, Culture').toLowerCase();
    const days = [];
    
    // Day 1
    days.push(`
        <div class="itinerary-day">
            <h4>${translations[currentLanguage]['day'] || 'Day'} 1: ${new Date(startDate).toLocaleDateString()}</h4>
            <p><strong>${translations[currentLanguage]['morning'] || 'Morning'}:</strong> ${translations[currentLanguage]['arrival'] || 'Arrival and check-in at'} ${planData.accommodation || 'Hotel Schloss Dürnstein'}</p>
            <p><strong>${translations[currentLanguage]['afternoon'] || 'Afternoon'}:</strong> ${translations[currentLanguage]['welcome_tour'] || 'Welcome tour of Dürnstein village'}</p>
            <p><strong>${translations[currentLanguage]['evening'] || 'Evening'}:</strong> ${translations[currentLanguage]['welcome_dinner'] || 'Welcome dinner at Restaurant Loibnerhof with wine pairing'}</p>
        </div>
    `);
    
    // Day 2
    let day2Activities = '';
    if (interests.includes('wine')) {
        day2Activities = `
            <p><strong>${translations[currentLanguage]['morning'] || 'Morning'}:</strong> ${translations[currentLanguage]['wine_tour_morning'] || 'Guided tour of Domäne Wachau winery with premium tasting'}</p>
            <p><strong>${translations[currentLanguage]['afternoon'] || 'Afternoon'}:</strong> ${translations[currentLanguage]['wine_tour_afternoon'] || 'Visit to family-owned vineyard in Weißenkirchen'}</p>
            <p><strong>${translations[currentLanguage]['evening'] || 'Evening'}:</strong> ${translations[currentLanguage]['wine_tour_evening'] || 'Dinner at Heurigen Schmelz with local specialties'}</p>
        `;
    } else if (interests.includes('bike') || interests.includes('cycling')) {
        day2Activities = `
            <p><strong>${translations[currentLanguage]['morning'] || 'Morning'}:</strong> ${translations[currentLanguage]['bike_morning'] || 'Bike rental and guided cycling tour along the Danube Cycle Path to Spitz'}</p>
            <p><strong>${translations[currentLanguage]['afternoon'] || 'Afternoon'}:</strong> ${translations[currentLanguage]['bike_afternoon'] || 'Lunch in Spitz and return ride via the north bank'}</p>
            <p><strong>${translations[currentLanguage]['evening'] || 'Evening'}:</strong> ${translations[currentLanguage]['bike_evening'] || 'Relaxing dinner at your accommodation'}</p>
        `;
    } else {
        day2Activities = `
            <p><strong>${translations[currentLanguage]['morning'] || 'Morning'}:</strong> ${translations[currentLanguage]['culture_morning'] || 'Guided historical tour of Dürnstein Castle ruins'}</p>
            <p><strong>${translations[currentLanguage]['afternoon'] || 'Afternoon'}:</strong> ${translations[currentLanguage]['culture_afternoon'] || 'Visit to Melk Abbey'}</p>
            <p><strong>${translations[currentLanguage]['evening'] || 'Evening'}:</strong> ${translations[currentLanguage]['culture_evening'] || 'Dinner at Restaurant Schlosskeller'}</p>
        `;
    }
    
    days.push(`
        <div class="itinerary-day">
            <h4>${translations[currentLanguage]['day'] || 'Day'} 2: ${new Date(new Date(startDate).getTime() + 1 * 24 * 60 * 60 * 1000).toLocaleDateString()}</h4>
            ${day2Activities}
        </div>
    `);
    
    // Day 3
    let day3Activities = '';
    if (interests.includes('culture')) {
        day3Activities = `
            <p><strong>${translations[currentLanguage]['morning'] || 'Morning'}:</strong> ${translations[currentLanguage]['culture_day3_morning'] || 'Visit to Krems and the Kunsthalle Krems art museum'}</p>
            <p><strong>${translations[currentLanguage]['afternoon'] || 'Afternoon'}:</strong> ${translations[currentLanguage]['culture_day3_afternoon'] || 'Guided tour of the historic center of Krems'}</p>
            <p><strong>${translations[currentLanguage]['evening'] || 'Evening'}:</strong> ${translations[currentLanguage]['culture_day3_evening'] || 'Classical music concert at Göttweig Abbey (seasonal)'}</p>
        `;
    } else if (interests.includes('wine')) {
        day3Activities = `
            <p><strong>${translations[currentLanguage]['morning'] || 'Morning'}:</strong> ${translations[currentLanguage]['wine_day3_morning'] || 'Wine tasting workshop with a local sommelier'}</p>
            <p><strong>${translations[currentLanguage]['afternoon'] || 'Afternoon'}:</strong> ${translations[currentLanguage]['wine_day3_afternoon'] || 'Visit to the Wachau Wine Experience Center'}</p>
            <p><strong>${translations[currentLanguage]['evening'] || 'Evening'}:</strong> ${translations[currentLanguage]['wine_day3_evening'] || 'Wine pairing dinner at Landhaus Bacher'}</p>
        `;
    } else {
        day3Activities = `
            <p><strong>${translations[currentLanguage]['morning'] || 'Morning'}:</strong> ${translations[currentLanguage]['general_day3_morning'] || 'Boat cruise on the Danube through the Wachau Valley'}</p>
            <p><strong>${translations[currentLanguage]['afternoon'] || 'Afternoon'}:</strong> ${translations[currentLanguage]['general_day3_afternoon'] || 'Visit to the ruins of Aggstein Castle'}</p>
            <p><strong>${translations[currentLanguage]['evening'] || 'Evening'}:</strong> ${translations[currentLanguage]['general_day3_evening'] || 'Traditional Austrian dinner at Gasthof Prankl'}</p>
        `;
    }
    
    days.push(`
        <div class="itinerary-day">
            <h4>${translations[currentLanguage]['day'] || 'Day'} 3: ${new Date(new Date(startDate).getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()}</h4>
            ${day3Activities}
        </div>
    `);
    
    // Day 4
    let day4Activities = '';
    if (interests.includes('bike') || interests.includes('cycling')) {
        day4Activities = `
            <p><strong>${translations[currentLanguage]['morning'] || 'Morning'}:</strong> ${translations[currentLanguage]['bike_day4_morning'] || 'Cycling tour through the vineyards with stops for photos'}</p>
            <p><strong>${translations[currentLanguage]['afternoon'] || 'Afternoon'}:</strong> ${translations[currentLanguage]['bike_day4_afternoon'] || 'Visit to Dürnstein Abbey'}</p>
            <p><strong>${translations[currentLanguage]['evening'] || 'Evening'}:</strong> ${translations[currentLanguage]['bike_day4_evening'] || 'Barbecue dinner at a local vineyard (seasonal)'}</p>
        `;
    } else if (interests.includes('culture')) {
        day4Activities = `
            <p><strong>${translations[currentLanguage]['morning'] || 'Morning'}:</strong> ${translations[currentLanguage]['culture_day4_morning'] || 'Visit to Schallaburg Castle and its exhibitions'}</p>
            <p><strong>${translations[currentLanguage]['afternoon'] || 'Afternoon'}:</strong> ${translations[currentLanguage]['culture_day4_afternoon'] || 'Guided tour of Göttweig Abbey'}</p>
            <p><strong>${translations[currentLanguage]['evening'] || 'Evening'}:</strong> ${translations[currentLanguage]['culture_day4_evening'] || 'Dinner at the historic Klostergasthof'}</p>
        `;
    } else {
        day4Activities = `
            <p><strong>${translations[currentLanguage]['morning'] || 'Morning'}:</strong> ${translations[currentLanguage]['general_day4_morning'] || 'Apricot farm visit with tasting (seasonal)'}</p>
            <p><strong>${translations[currentLanguage]['afternoon'] || 'Afternoon'}:</strong> ${translations[currentLanguage]['general_day4_afternoon'] || 'Relaxing spa treatment at your hotel'}</p>
            <p><strong>${translations[currentLanguage]['evening'] || 'Evening'}:</strong> ${translations[currentLanguage]['general_day4_evening'] || 'Sunset dinner cruise on the Danube'}</p>
        `;
    }
    
    days.push(`
        <div class="itinerary-day">
            <h4>${translations[currentLanguage]['day'] || 'Day'} 4: ${new Date(new Date(startDate).getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}</h4>
            ${day4Activities}
        </div>
    `);
    
    // Day 5
    days.push(`
        <div class="itinerary-day">
            <h4>${translations[currentLanguage]['day'] || 'Day'} 5: ${new Date(new Date(startDate).getTime() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString()}</h4>
            <p><strong>${translations[currentLanguage]['morning'] || 'Morning'}:</strong> ${translations[currentLanguage]['departure_morning'] || 'Farewell breakfast at your accommodation'}</p>
            <p><strong>${translations[currentLanguage]['afternoon'] || 'Afternoon'}:</strong> ${translations[currentLanguage]['departure_afternoon'] || 'Final shopping for local products and souvenirs'}</p>
            <p><strong>${translations[currentLanguage]['evening'] || 'Evening'}:</strong> ${translations[currentLanguage]['departure_evening'] || 'Departure'}</p>
        </div>
    `);
    
    // Add days to itinerary section
    itinerarySection.innerHTML += days.join('');
    
    // Create cost summary section
    const costSection = document.createElement('div');
    costSection.classList.add('plan-section');
    
    // Calculate approximate costs based on preferences
    const accommodationCost = planData.accommodation === 'Luxury Hotel' ? 200 : (planData.accommodation === 'Mid-range Hotel' ? 120 : 80);
    const dailyActivityCost = 60;
    const mealCost = 50;
    const transportCost = 30;
    const serviceFee = 0.15; // 15% service fee
    
    const dailyCost = accommodationCost + dailyActivityCost + mealCost + transportCost;
    const totalBaseCost = dailyCost * duration * (planData.travelers || 2);
    const totalServiceFee = totalBaseCost * serviceFee;
    const totalCost = totalBaseCost + totalServiceFee;
    
    costSection.innerHTML = `
        <h3>${translations[currentLanguage]['cost_summary'] || 'Cost Summary'}</h3>
        <p><strong>${translations[currentLanguage]['accommodation'] || 'Accommodation'}:</strong> €${accommodationCost} ${translations[currentLanguage]['per_person_night'] || 'per person per night'}</p>
        <p><strong>${translations[currentLanguage]['activities'] || 'Activities'}:</strong> €${dailyActivityCost} ${translations[currentLanguage]['per_person_day'] || 'per person per day'}</p>
        <p><strong>${translations[currentLanguage]['meals'] || 'Meals'}:</strong> €${mealCost} ${translations[currentLanguage]['per_person_day'] || 'per person per day'}</p>
        <p><strong>${translations[currentLanguage]['transportation'] || 'Transportation'}:</strong> €${transportCost} ${translations[currentLanguage]['per_person_day'] || 'per person per day'}</p>
        <p><strong>${translations[currentLanguage]['base_cost'] || 'Base Cost'}:</strong> €${totalBaseCost.toFixed(2)}</p>
        <p><strong>${translations[currentLanguage]['service_fee'] || 'Service Fee'} (15%):</strong> €${totalServiceFee.toFixed(2)}</p>
        <p class="total-cost"><strong>${translations[currentLanguage]['total_cost'] || 'Total Cost'}:</strong> €${totalCost.toFixed(2)}</p>
    `;
    
    // Create email form section
    const emailSection = document.createElement('div');
    emailSection.classList.add('plan-section');
    emailSection.innerHTML = `
        <h3>${translations[currentLanguage]['send_plan_email'] || 'Send Plan to Email'}</h3>
        <form id="email-form" class="email-form">
            <div class="form-group">
                <label for="email">${translations[currentLanguage]['email_address'] || 'Email Address'}:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <button type="submit" class="btn btn-primary">${translations[currentLanguage]['send_plan'] || 'Send Plan'}</button>
        </form>
    `;
    
    // Append all sections to modal content
    modalContent.appendChild(closeButton);
    modalContent.appendChild(planHeader);
    modalContent.appendChild(summarySection);
    modalContent.appendChild(itinerarySection);
    modalContent.appendChild(costSection);
    modalContent.appendChild(emailSection);
    
    // Append modal content to modal
    modal.appendChild(modalContent);
    
    // Append modal to body
    document.body.appendChild(modal);
    
    // Add event listener to email form
    const emailForm = document.getElementById('email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            
            // In a real implementation, this would send the plan to the email address
            console.log(`Sending vacation plan to ${email}`);
            
            // Show success message
            alert(`${translations[currentLanguage]['plan_sent'] || 'Your vacation plan has been sent to'} ${email}. ${translations[currentLanguage]['check_inbox'] || 'Please check your inbox!'}`);
            
            // Close modal
            document.body.removeChild(modal);
            
            // Reset planner form
            const plannerForm = document.getElementById('vacation-planner-form');
            if (plannerForm) {
                plannerForm.reset();
                
                // Return to first step
                const formSteps = document.querySelectorAll('.form-step');
                const stepIndicators = document.querySelectorAll('.step-indicator-item');
                
                formSteps.forEach(step => step.classList.remove('active'));
                stepIndicators.forEach(indicator => {
                    indicator.classList.remove('active');
                    indicator.classList.remove('completed');
                });
                
                formSteps[0].classList.add('active');
                stepIndicators[0].classList.add('active');
            }
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
        }, 1000); // Reduced delay for faster response
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
        
        // Wine-related questions
        if (lowerMessage.includes('wine') || lowerMessage.includes('vineyard') || lowerMessage.includes('winery')) {
            if (lowerMessage.includes('best') || lowerMessage.includes('top') || lowerMessage.includes('recommend')) {
                return 'The top wineries to visit in the Wachau region include Domäne Wachau in Dürnstein, FX Pichler in Oberloiben, Knoll in Unterloiben, and Hirtzberger in Spitz. Each offers unique wine tasting experiences and showcases the exceptional Grüner Veltliner and Riesling varieties that the region is famous for.';
            }
            
            if (lowerMessage.includes('tour') || lowerMessage.includes('tasting')) {
                return 'Wine tours in the Wachau typically include visits to 2-3 wineries with guided tastings. Most tours last 3-4 hours and cost €60-120 per person depending on the exclusivity. The best time for wine tours is late spring through fall. We can arrange private or group tours as part of your vacation package.';
            }
            
            if (lowerMessage.includes('grüner') || lowerMessage.includes('gruner') || lowerMessage.includes('veltliner')) {
                return 'Grüner Veltliner is the signature white grape variety of Austria and the Wachau region. It produces crisp, mineral-driven wines with notes of green apple, white pepper, and sometimes peach. The Wachau classification system includes Steinfeder (light), Federspiel (medium-bodied), and Smaragd (full-bodied) styles of Grüner Veltliner.';
            }
            
            if (lowerMessage.includes('riesling')) {
                return 'Wachau Riesling is known for its exceptional quality and distinctive character. Unlike German Rieslings, Austrian versions are typically dry with vibrant acidity, mineral notes, and stone fruit flavors. The steep terraced vineyards along the Danube provide ideal growing conditions for this noble grape variety.';
            }
            
            if (lowerMessage.includes('festival') || lowerMessage.includes('event')) {
                return 'The Wachau hosts several wine festivals throughout the year. The most notable is the Wachau Gourmet Festival in spring, featuring top chefs and winemakers. In autumn, many villages hold harvest festivals (Weinherbst) with new wine tastings, traditional food, and cultural events. These festivals offer an authentic experience of local wine culture.';
            }
            
            return 'The Wachau region is famous for its vineyards and wine production, particularly Grüner Veltliner and Riesling varieties. The unique microclimate and terraced vineyards along the Danube create ideal conditions for viticulture. I recommend visiting wineries in Dürnstein, Spitz, and Weißenkirchen. Many offer tastings and tours, and we can arrange these as part of your vacation package.';
        }
        
        // Biking-related questions
        if (lowerMessage.includes('bike') || lowerMessage.includes('cycling') || lowerMessage.includes('bicycle')) {
            if (lowerMessage.includes('rent') || lowerMessage.includes('rental')) {
                return 'Bike rentals are available in several towns throughout the Wachau, including Krems, Dürnstein, and Melk. Prices range from €15-30 per day for standard bikes and €40-60 for e-bikes. Most rental shops provide helmets, locks, and repair kits. We can arrange bike rentals for your entire stay as part of your vacation package.';
            }
            
            if (lowerMessage.includes('route') || lowerMessage.includes('trail') || lowerMessage.includes('path')) {
                return 'The main cycling route in the Wachau is the Danube Cycle Path (Donauradweg), which runs on both sides of the river. The south bank is generally flatter and more popular, while the north bank offers more challenging terrain with rewarding views. A popular route is from Krems to Melk (approximately 40km) with stops in picturesque villages along the way.';
            }
            
            if (lowerMessage.includes('difficulty') || lowerMessage.includes('hard') || lowerMessage.includes('easy')) {
                return 'The Danube Cycle Path in the Wachau is mostly flat and suitable for cyclists of all levels, including families with children. The main route follows the river and is well-maintained with clear signage. For more experienced cyclists, there are challenging side routes into the hills and vineyards that offer spectacular views but require good fitness levels.';
            }
            
            if (lowerMessage.includes('tour') || lowerMessage.includes('guided')) {
                return 'Guided cycling tours in the Wachau range from half-day excursions to multi-day adventures. A typical guided day tour costs €60-90 per person and includes bike rental, a knowledgeable guide, and often a wine tasting or lunch stop. These tours provide historical context and take you to hidden gems that might be missed when cycling independently.';
            }
            
            if (lowerMessage.includes('distance') || lowerMessage.includes('long') || lowerMessage.includes('km')) {
                return 'The Wachau Valley section of the Danube Cycle Path is approximately 40km long from Krems to Melk. Most cyclists complete this distance in one day with stops along the way. For a more relaxed experience, we recommend splitting this into two days with an overnight stay in Dürnstein or Spitz. The entire Austrian Danube Cycle Path runs for about 380km from Passau to Vienna.';
            }
            
            return 'The Wachau Valley offers excellent biking opportunities along the Danube Cycle Path (Donauradweg). This well-maintained path runs on both sides of the Danube River, offering beautiful views of vineyards, castles, and charming villages. The route is mostly flat and suitable for all skill levels. E-bikes are also available for those who prefer assistance on longer rides. We can arrange bike rentals and suggest routes based on your experience level.';
        }
        
        // Accommodation-related questions
        if (lowerMessage.includes('hotel') || lowerMessage.includes('stay') || lowerMessage.includes('accommodation') || lowerMessage.includes('room')) {
            if (lowerMessage.includes('luxury') || lowerMessage.includes('best') || lowerMessage.includes('5 star')) {
                return 'For luxury accommodations in the Wachau, Hotel Schloss Dürnstein offers elegant rooms in a historic castle setting with panoramic river views and a spa. Richard Löwenherz in Dürnstein provides upscale rooms in a former monastery with a gourmet restaurant. Landhaus Bacher in Mautern is renowned for its exceptional restaurant and comfortable rooms. All luxury options range from €200-350 per night.';
            }
            
            if (lowerMessage.includes('budget') || lowerMessage.includes('cheap') || lowerMessage.includes('affordable')) {
                return 'Budget-friendly accommodations in the Wachau include Gästezimmer (guest rooms) in family homes and small pensions, typically costing €60-90 per night. Gasthof Prankl in Spitz and Pension Alte Post in Dürnstein offer good value. For the most economical option, consider the youth hostel in Melk or camping sites along the Danube during summer months.';
            }
            
            if (lowerMessage.includes('family') || lowerMessage.includes('kid') || lowerMessage.includes('children')) {
                return 'Family-friendly accommodations in the Wachau include Steigenberger Hotel & Spa Krems with family rooms and a pool, Gasthof Prankl in Spitz with spacious rooms and a playground, and various vacation apartments that offer kitchen facilities and multiple bedrooms. Many accommodations can provide cribs, high chairs, and recommendations for family activities in the region.';
            }
            
            if (lowerMessage.includes('view') || lowerMessage.includes('scenic') || lowerMessage.includes('panorama')) {
                return 'For the best views in the Wachau, choose accommodations in Dürnstein or Spitz that face the Danube. Hotel Schloss Dürnstein, Richard Löwenherz, and Sänger Blondel all offer rooms with stunning river and vineyard views. In Spitz, Hotel-Restaurant Mariandl and Gasthof Prankl have select rooms with panoramic vistas of the river and surrounding landscape.';
            }
            
            if (lowerMessage.includes('breakfast') || lowerMessage.includes('half board') || lowerMessage.includes('meal')) {
                return 'Most accommodations in the Wachau offer breakfast included in the room rate. Traditional Austrian breakfast typically features fresh bread, cold cuts, cheeses, jams, and eggs. Some hotels like Landhaus Bacher and Hotel Schloss Dürnstein offer half-board options with gourmet dinners. For the best culinary experience, consider hotels with their own restaurants that showcase regional cuisine.';
            }
            
            return 'The Wachau region offers a variety of accommodations, from luxury hotels to cozy guesthouses. Popular options include Hotel Schloss Dürnstein (luxury castle hotel with river views), Hotel Richard Löwenherz (historic hotel in Dürnstein), and Landhaus Bacher (renowned for its restaurant). Mid-range options include Gasthof Prankl in Spitz and Hotel-Restaurant Mariandl. For budget travelers, there are numerous guesthouses and pensions throughout the valley. We can book accommodations that match your preferences and budget as part of your vacation package.';
        }
        
        // Restaurant-related questions
        if (lowerMessage.includes('restaurant') || lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('dining')) {
            if (lowerMessage.includes('best') || lowerMessage.includes('top') || lowerMessage.includes('gourmet')) {
                return 'The top restaurants in the Wachau include Landhaus Bacher in Mautern (2 Gault Millau toques), Restaurant Loibnerhof in Dürnstein for refined Austrian cuisine, and Hofmeisterei Hirtzberger in Wösendorf for seasonal menus with wine pairings. For a special dining experience, the restaurant at Hotel Schloss Dürnstein offers elegant cuisine with panoramic river views.';
            }
            
            if (lowerMessage.includes('traditional') || lowerMessage.includes('local') || lowerMessage.includes('austrian')) {
                return 'For authentic Austrian cuisine in the Wachau, visit Heurigen (wine taverns) like Heuriger Schmelz in Dürnstein or Heuriger Jamek in Joching. These serve traditional dishes like Schweinsbraten (roast pork), Tafelspitz (boiled beef), and Wiener Schnitzel. Gasthof Prankl in Spitz and Gasthof Goldenes Schiff in Spitz offer hearty local specialties in a cozy atmosphere.';
            }
            
            if (lowerMessage.includes('heurigen') || lowerMessage.includes('tavern') || lowerMessage.includes('wine tavern')) {
                return 'Heurigen are traditional Austrian wine taverns where winemakers serve their own wines along with simple food. In the Wachau, recommended Heurigen include Heuriger Schmelz in Dürnstein, Heuriger Jamek in Joching, and Heuriger Denk in Unterloiben. They typically offer cold plates with meats and cheeses, spreads, and sometimes hot dishes. The atmosphere is casual and convivial, perfect for experiencing local culture.';
            }
            
            if (lowerMessage.includes('vegetarian') || lowerMessage.includes('vegan') || lowerMessage.includes('plant')) {
                return 'While traditional Austrian cuisine is meat-heavy, most restaurants in the Wachau now offer vegetarian options. Restaurant Loibnerhof in Dürnstein and Landhaus Bacher in Mautern have excellent vegetarian dishes. For more casual options, Café Heinemann in Krems and Weltcafé in Krems offer several vegetarian and vegan choices. It\'s advisable to call ahead for vegan meals at traditional establishments.';
            }
            
            if (lowerMessage.includes('reservation') || lowerMessage.includes('book')) {
                return 'Reservations are highly recommended for dining in the Wachau, especially for dinner at popular restaurants like Landhaus Bacher, Restaurant Loibnerhof, and hotel restaurants. During peak tourist season (May-October), it\'s advisable to book at least a week in advance, particularly for weekend dining. We can handle all restaurant reservations as part of your vacation package.';
            }
            
            return 'The Wachau region offers excellent dining options, from traditional wine taverns (Heurigen) to fine dining restaurants. Local specialties include apricot dumplings (Marillenknödel), river fish dishes, and seasonal game. Some recommended restaurants include Landhaus Bacher in Mautern (gourmet cuisine), Restaurant Loibnerhof in Dürnstein (refined Austrian dishes), and Gasthof Prankl in Spitz (traditional fare). Heurigen like Schmelz in Dürnstein offer authentic experiences with house wines and cold plates. We can make reservations for you as part of your vacation package.';
        }
        
        // Activities and attractions
        if (lowerMessage.includes('activity') || lowerMessage.includes('attraction') || lowerMessage.includes('see') || lowerMessage.includes('visit')) {
            if (lowerMessage.includes('castle') || lowerMessage.includes('fortress') || lowerMessage.includes('ruin')) {
                return 'The Wachau is home to several impressive castles. Dürnstein Castle ruins (where Richard the Lionheart was imprisoned) offer panoramic views after a 20-minute hike. Aggstein Castle ruins perch dramatically on a cliff 300m above the Danube. Schallaburg Castle near Melk features Renaissance architecture and cultural exhibitions. Most castles charge €5-10 entrance fees and can be visited year-round, though some have limited winter hours.';
            }
            
            if (lowerMessage.includes('abbey') || lowerMessage.includes('monastery') || lowerMessage.includes('melk')) {
                return 'Melk Abbey is the most famous religious site in the region - a magnificent Baroque monastery overlooking the Danube. Guided tours (€14) showcase the marble hall, library with medieval manuscripts, and ornate church. Göttweig Abbey offers similar grandeur with fewer crowds. Dürnstein Abbey with its blue tower is a landmark visible throughout the valley. These sites provide insights into the region\'s religious and cultural history.';
            }
            
            if (lowerMessage.includes('cruise') || lowerMessage.includes('boat') || lowerMessage.includes('ship')) {
                return 'Danube cruises are a popular way to experience the Wachau\'s beauty from the water. DDSG Blue Danube operates regular services between Krems and Melk (€23 one-way, €29 return) from April to October. The journey takes about 1.5 hours each way. Themed cruises including wine tastings or dinner are also available. We recommend combining a cruise one way with cycling back for a perfect day excursion.';
            }
            
            if (lowerMessage.includes('hike') || lowerMessage.includes('hiking') || lowerMessage.includes('walk')) {
                return 'The Wachau offers excellent hiking opportunities on the World Heritage Trail (Welterbesteig), a 180km route divided into 14 stages. Popular day hikes include the climb to Dürnstein Castle ruins (1 hour round trip), the panoramic trail from Spitz to Mühldorf (3 hours), and the vineyard paths above Weißenkirchen (2 hours). These trails offer stunning views of the Danube and vineyards, with varying difficulty levels to suit all hikers.';
            }
            
            if (lowerMessage.includes('museum') || lowerMessage.includes('art') || lowerMessage.includes('exhibition')) {
                return 'Cultural attractions in the Wachau include the Krems Art Mile with the Kunsthalle Krems (contemporary art) and the Karikaturmuseum (caricature museum). The Wachau Wine Experience Center in Spitz offers interactive exhibits about viticulture. Smaller museums include the Shipping Museum in Spitz and the Apricot Museum in Krems. Most museums charge €7-12 entrance fees and offer insights into the region\'s cultural and historical significance.';
            }
            
            return 'The Wachau Valley offers numerous attractions and activities. Must-see sites include Melk Abbey (Baroque monastery), Dürnstein Castle ruins (where Richard the Lionheart was imprisoned), and the charming villages of Spitz, Weißenkirchen, and Dürnstein. Activities include Danube river cruises, hiking in the vineyards, cycling along the Danube path, wine tastings, and cultural tours. Seasonal activities include apricot festivals in July, harvest celebrations in autumn, and Christmas markets in December. We can arrange guided tours and activity bookings as part of your vacation package.';
        }
        
        // Transportation-related questions
        if (lowerMessage.includes('transport') || lowerMessage.includes('travel') || lowerMessage.includes('get around') || lowerMessage.includes('bus') || lowerMessage.includes('train')) {
            if (lowerMessage.includes('vienna') || lowerMessage.includes('airport')) {
                return 'From Vienna International Airport to the Wachau, you have several options: 1) Train: Take the S7 to Vienna main station, then a regional train to Krems (total 1.5-2 hours, €25-30); 2) Rental car: The drive takes about 1 hour via the A1 and S5 highways; 3) Private transfer: We can arrange door-to-door service for €120-150. From Vienna city center, direct trains to Krems run hourly (1 hour journey, €15).';
            }
            
            if (lowerMessage.includes('train') || lowerMessage.includes('rail')) {
                return 'Trains connect the Wachau to major cities, with Krems being the main rail hub. Direct trains run hourly from Vienna to Krems (1 hour, €15). The train line continues along the south bank of the Danube to Melk. For villages on the north bank (Dürnstein, Spitz), you\'ll need to combine train with bus or taxi. The Wachau ticket (€19) offers unlimited train and bus travel in the region for one day.';
            }
            
            if (lowerMessage.includes('bus')) {
                return 'The WL1 bus connects villages along the north bank of the Danube, running between Krems and Melk with stops in Dürnstein, Weißenkirchen, and Spitz. Buses run approximately hourly (less frequent on weekends) and cost €2-8 depending on distance. The Wachau ticket (€19) offers unlimited bus and train travel for one day. During summer, some buses are equipped with bike trailers for cyclists.';
            }
            
            if (lowerMessage.includes('car') || lowerMessage.includes('drive') || lowerMessage.includes('parking')) {
                return 'Driving in the Wachau gives you flexibility to explore at your own pace. The main roads (B3 on south bank, B33 on north bank) follow the Danube and are well-maintained. Most villages have paid parking (€1-3 per hour). Note that some village centers have limited vehicle access. Rental cars are available in Krems and at Vienna Airport. We recommend compact cars as some village streets are narrow.';
            }
            
            if (lowerMessage.includes('taxi')) {
                return 'Taxis are available in the Wachau but should be booked in advance, especially in smaller villages. A taxi from Krems to Dürnstein costs approximately €25, while Krems to Spitz is about €40. Some taxi companies offer wine tour services where they can drive you between wineries. We can arrange taxi services as needed during your stay.';
            }
            
            return 'Getting around the Wachau Valley is possible through various transportation options. Trains connect Krems and Melk along the south bank of the Danube. Buses (WL1 line) serve villages on the north bank including Dürnstein and Spitz. For flexibility, renting a car is recommended, though parking in villages can be limited. Cycling is very popular along the Danube Cycle Path. Danube river cruises also connect major towns from April to October. The Wachau ticket (€19) offers unlimited train and bus travel for one day. We can arrange transportation as part of your vacation package.';
        }
        
        // Weather and best time to visit
        if (lowerMessage.includes('weather') || lowerMessage.includes('climate') || lowerMessage.includes('season') || lowerMessage.includes('when to visit')) {
            if (lowerMessage.includes('summer') || lowerMessage.includes('june') || lowerMessage.includes('july') || lowerMessage.includes('august')) {
                return 'Summer (June-August) in the Wachau brings warm temperatures averaging 22-28°C (72-82°F), perfect for outdoor activities. This is peak tourist season with all attractions open and river cruises operating at full schedule. Summer highlights include swimming in the Danube, outdoor concerts, and dining in garden restaurants. July features apricot festivals when the region\'s famous Wachauer Marille is harvested and celebrated.';
            }
            
            if (lowerMessage.includes('spring') || lowerMessage.includes('march') || lowerMessage.includes('april') || lowerMessage.includes('may')) {
                return 'Spring (March-May) is a beautiful time to visit the Wachau as vineyards turn green and apricot trees blossom in April. Temperatures range from 10-20°C (50-68°F). This shoulder season offers fewer crowds and lower accommodation rates. The Wachau Gourmet Festival typically takes place in spring, and it\'s an excellent time for hiking and cycling before summer heat arrives.';
            }
            
            if (lowerMessage.includes('fall') || lowerMessage.includes('autumn') || lowerMessage.includes('september') || lowerMessage.includes('october')) {
                return 'Autumn (September-October) is harvest season in the Wachau, with vineyards turning golden and bustling with activity. Temperatures range from 10-20°C (50-68°F). This is an ideal time for wine enthusiasts to visit, with many harvest festivals (Weinherbst) in villages throughout the region. The changing colors of the vineyards make this a particularly scenic time for photography and hiking.';
            }
            
            if (lowerMessage.includes('winter') || lowerMessage.includes('november') || lowerMessage.includes('december') || lowerMessage.includes('january')) {
                return 'Winter (November-February) in the Wachau is quiet with temperatures between 0-8°C (32-46°F). Many attractions have limited hours or close entirely, and river cruises don\'t operate. However, this season offers a peaceful atmosphere, Christmas markets in December, and the opportunity to experience the region like a local. Winter is ideal for visiting museums, enjoying hearty Austrian cuisine, and finding bargain accommodation rates.';
            }
            
            if (lowerMessage.includes('rain') || lowerMessage.includes('rainy')) {
                return 'The Wachau has a relatively dry climate compared to other parts of Austria. May and June typically see the most rainfall, often as afternoon thunderstorms. The driest months are typically September and October. Even during rainier periods, precipitation is usually short-lived rather than all-day downpours. We recommend packing a light rain jacket regardless of when you visit.';
            }
            
            return 'The best time to visit the Wachau Valley is from April to October when the weather is pleasant for outdoor activities. Spring (April-May) offers apricot blossoms and fewer crowds. Summer (June-August) is warmest with temperatures around 25°C (77°F), perfect for swimming in the Danube and outdoor dining. Autumn (September-October) brings harvest festivals and colorful vineyards. Winter is quieter with some attractions closed, but offers Christmas markets and a peaceful atmosphere. The region has a relatively dry climate with most rainfall in May and June.';
        }
        
        // Cost-related questions
        if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('budget') || lowerMessage.includes('expensive')) {
            if (lowerMessage.includes('accommodation') || lowerMessage.includes('hotel') || lowerMessage.includes('stay')) {
                return 'Accommodation costs in the Wachau vary by type and season. Luxury hotels like Schloss Dürnstein or Richard Löwenherz range from €180-350 per night. Mid-range hotels and guesthouses cost €90-180 per night. Budget options like pensions and private rooms start around €60-90 per night. Prices increase by 20-30% during peak season (July-August) and special events. Most accommodations include breakfast in the rate.';
            }
            
            if (lowerMessage.includes('food') || lowerMessage.includes('restaurant') || lowerMessage.includes('meal')) {
                return 'Dining costs in the Wachau range from budget to high-end. A meal at a gourmet restaurant like Landhaus Bacher will cost €60-100 per person without wine. Mid-range restaurants average €25-40 per main course. Lunch at a Heurigen (wine tavern) with a plate of cold cuts and cheese costs €12-18. For budget options, bakeries offer sandwiches for €4-6. A glass of local wine typically costs €3-5, while a tasting flight at a winery ranges from €15-30.';
            }
            
            if (lowerMessage.includes('activity') || lowerMessage.includes('attraction') || lowerMessage.includes('entrance')) {
                return 'Activity costs in the Wachau: Melk Abbey entrance fee is €14 per adult. Danube river cruises cost €23-29 for a one-way journey between Krems and Melk. Wine tastings range from €15-30 depending on the winery and number of wines. Bike rentals cost €15-30 per day for standard bikes, €40-60 for e-bikes. Guided tours start at €60 per person for group tours, while private tours cost €150-250 depending on duration and inclusions.';
            }
            
            if (lowerMessage.includes('transport') || lowerMessage.includes('travel') || lowerMessage.includes('train')) {
                return 'Transportation costs in the Wachau: Train tickets from Vienna to Krems cost €15 one-way. The Wachau ticket offering unlimited train and bus travel in the region costs €19 per day. Local bus fares range from €2-8 depending on distance. Taxis charge approximately €2-3 per kilometer. Rental cars cost €40-80 per day depending on the vehicle type. Fuel prices are similar to other European countries, currently around €1.50-1.70 per liter for gasoline.';
            }
            
            if (lowerMessage.includes('total') || lowerMessage.includes('average') || lowerMessage.includes('typical')) {
                return 'For a 5-day trip to the Wachau, budget approximately €150-200 per person per day for mid-range travel, including accommodation, meals, activities, and local transportation. Budget travelers can manage with €100-120 per day staying in pensions, eating at Heurigen, and using public transportation. Luxury travelers should budget €300-400+ per day for high-end hotels, gourmet dining, and private tours. Our service fee is 15% of the total package cost, which includes all bookings and a personalized itinerary.';
            }
            
            return 'The cost of a vacation in the Wachau region varies depending on your preferences. A standard package including accommodation, some activities, and our service fee typically ranges from €1000-2000 per person for a 5-day trip. Accommodation costs range from €60-350 per night depending on the category. Meals average €25-40 per person for dinner at mid-range restaurants, while wine tastings cost €15-30. Activities like Danube cruises (€23-29) and bike rentals (€15-30 per day) add to the experience. Our service fee is 15% of the total package cost, covering all bookings and personalized planning. We can create a custom package that fits your specific budget.';
        }
        
        // Family-friendly questions
        if (lowerMessage.includes('family') || lowerMessage.includes('kid') || lowerMessage.includes('children')) {
            if (lowerMessage.includes('activity') || lowerMessage.includes('do with')) {
                return 'Family-friendly activities in the Wachau include: 1) Boat cruises on the Danube with commentary suitable for all ages; 2) Cycling along the flat Danube path with child seats or trailer attachments available for rent; 3) The adventure playground in Rossatz with views of Dürnstein; 4) The Apricot Mile in Krems with interactive exhibits about the region\'s famous fruit; 5) Melk Abbey\'s garden and park; 6) Swimming in designated areas of the Danube during summer. Most attractions offer family tickets and children under 6 often enter free.';
            }
            
            if (lowerMessage.includes('accommodation') || lowerMessage.includes('hotel') || lowerMessage.includes('stay')) {
                return 'Family-friendly accommodations in the Wachau include Steigenberger Hotel & Spa Krems with family rooms and a pool, Gasthof Prankl in Spitz with spacious rooms and a playground, and various vacation apartments that offer kitchen facilities and multiple bedrooms. Many accommodations can provide cribs, high chairs, and recommendations for family activities in the region. Family rooms typically cost €150-250 per night depending on the property.';
            }
            
            if (lowerMessage.includes('restaurant') || lowerMessage.includes('eat') || lowerMessage.includes('food')) {
                return 'Family-friendly dining options in the Wachau include: 1) Heurigen (wine taverns) like Schmelz in Dürnstein which have casual atmospheres and outdoor spaces where children can move around; 2) Gasthof Prankl in Spitz with a children\'s menu and play area; 3) Café Heinemann in Krems for pastries and ice cream; 4) Restaurant Kirchenwirt in Weißenkirchen with a garden and simple Austrian dishes. Most restaurants can provide high chairs and will accommodate special requests for children\'s portions.';
            }
            
            if (lowerMessage.includes('transport') || lowerMessage.includes('stroller') || lowerMessage.includes('travel')) {
                return 'Traveling with children in the Wachau: Trains and buses are stroller-friendly, though some smaller village streets have cobblestones that can be challenging. Danube cruises welcome families and offer reduced fares for children. For cycling, rental shops provide child seats, trailers, and children\'s bikes. If driving, car seats are mandatory for children under 14 who are shorter than 150cm. Most attractions and restaurants are accommodating to families, though some historic sites have limited stroller access.';
            }
            
            return 'The Wachau Valley is very family-friendly with activities suitable for all ages. Children particularly enjoy boat cruises on the Danube, cycling along the flat riverside paths, exploring castle ruins like Dürnstein and Aggstein, and visiting the interactive exhibits at the Apricot Mile in Krems. During summer, swimming in the Danube is popular. Family-friendly accommodations include Steigenberger Hotel & Spa Krems and Gasthof Prankl in Spitz. Most restaurants welcome children, with Heurigen (wine taverns) being particularly suitable with their casual atmosphere and outdoor spaces. We can create a family-focused itinerary with appropriate activities and accommodations for your vacation.';
        }
        
        // Accessibility questions
        if (lowerMessage.includes('accessibility') || lowerMessage.includes('wheelchair') || lowerMessage.includes('disabled') || lowerMessage.includes('mobility')) {
            if (lowerMessage.includes('hotel') || lowerMessage.includes('accommodation') || lowerMessage.includes('stay')) {
                return 'Wheelchair-accessible accommodations in the Wachau include Steigenberger Hotel & Spa Krems and Hotel Schloss Dürnstein, which have elevator access and adapted rooms. When booking, specifically request an accessible room as availability is limited. Many smaller guesthouses and historic properties have steps or no elevators, so it\'s essential to confirm accessibility features before booking. We can research and arrange suitable accommodations based on your specific mobility requirements.';
            }
            
            if (lowerMessage.includes('transport') || lowerMessage.includes('travel') || lowerMessage.includes('get around')) {
                return 'For accessible transportation in the Wachau: Modern trains between Vienna, Krems, and Melk are wheelchair-accessible with ramps or lifts at stations. The WL1 buses connecting villages have low-floor access, but not all bus stops are fully accessible. Danube cruises can accommodate wheelchairs but require advance notice. For maximum flexibility, we recommend arranging a private accessible van with a driver, which we can organize as part of your vacation package.';
            }
            
            if (lowerMessage.includes('attraction') || lowerMessage.includes('visit') || lowerMessage.includes('site')) {
                return 'Regarding accessibility at attractions: Melk Abbey has elevator access to most areas, though some parts remain inaccessible. The main streets of Dürnstein, Spitz, and Weißenkirchen are relatively flat, but have cobblestones that can be challenging. Many wineries have ground-floor tasting rooms with accessible entrances. Castle ruins like Dürnstein and Aggstein are unfortunately not wheelchair-accessible due to their hillside locations and medieval construction. The Danube promenade in Krems offers a smooth, accessible path with river views.';
            }
            
            return 'The Wachau Valley has varying levels of accessibility. Modern hotels like Steigenberger in Krems offer fully accessible rooms, while historic properties may have limitations. Trains and most buses are wheelchair-accessible, and Danube cruises can accommodate mobility devices with advance notice. Some attractions like Melk Abbey have elevator access to most areas, while medieval sites like castle ruins are unfortunately not accessible. Village centers have charming cobblestone streets that can be challenging for wheelchairs. Many wineries have ground-floor tasting rooms with accessible entrances. We can create a customized itinerary taking your specific mobility requirements into account, focusing on accessible attractions, restaurants, and accommodations.';
        }
        
        // Default response for other questions
        return 'Thank you for your question about the Wachau region. To provide you with the most helpful information, could you tell me more about what specific aspects of the region you\'re interested in? I can help with accommodations, activities, wine tours, biking routes, restaurants, or creating a complete vacation package. Feel free to ask about any aspect of planning your Wachau vacation, and I\'ll be happy to assist you.';
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
    
    // Add initial welcome message
    setTimeout(() => {
        const welcomeMessage = translations[currentLanguage]['assistant_welcome'] || 
            'Hello! I\'m your Wachau Valley vacation assistant. I can help you with information about wine tours, biking routes, accommodations, restaurants, and activities in the region. What would you like to know about planning your trip to the Wachau?';
        
        appendMessage('assistant', welcomeMessage);
    }, 500);
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
