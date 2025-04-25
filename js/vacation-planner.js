// Vacation Planner JavaScript - Custom Plan Generator

// Database of activities, accommodations, and restaurants in the Wachau region
const wachauDatabase = {
    accommodations: {
        economy: [
            { name: "Gästehaus Krems", location: "Krems", pricePerNight: 85, amenities: ["Free WiFi", "Breakfast available", "Bicycle rental"], familyFriendly: true, image: "images/guesthouse.jpg" },
            { name: "Pension Alte Post", location: "Spitz", pricePerNight: 75, amenities: ["Free WiFi", "Free parking", "Garden"], familyFriendly: true, image: "images/guesthouse.jpg" },
            { name: "Gasthof Prankl", location: "Weißenkirchen", pricePerNight: 90, amenities: ["Restaurant", "Free parking", "Terrace"], familyFriendly: true, image: "images/guesthouse.jpg" }
        ],
        standard: [
            { name: "Hotel Zum Schwarzen Bären", location: "Emmersdorf", pricePerNight: 120, amenities: ["Restaurant", "Bar", "Free WiFi", "Breakfast included"], familyFriendly: true, image: "images/hotel.jpg" },
            { name: "Gartenhotel & Weingut Pfeffel", location: "Dürnstein", pricePerNight: 145, amenities: ["Pool", "Spa", "Restaurant", "Winery", "Free parking"], familyFriendly: true, image: "images/hotel.jpg" },
            { name: "Hotel Residenz Wachau", location: "Melk", pricePerNight: 135, amenities: ["Restaurant", "Bar", "Fitness center", "Free WiFi"], familyFriendly: true, image: "images/hotel.jpg" }
        ],
        premium: [
            { name: "Hotel Schloss Dürnstein", location: "Dürnstein", pricePerNight: 230, amenities: ["Luxury spa", "Gourmet restaurant", "River views", "Historic building"], familyFriendly: false, image: "images/luxury-hotel.jpg" },
            { name: "Landhaus Bacher", location: "Mautern", pricePerNight: 210, amenities: ["Gourmet restaurant", "Wine cellar", "Garden", "Cooking classes"], familyFriendly: false, image: "images/luxury-hotel.jpg" },
            { name: "Hotel Richard Löwenherz", location: "Dürnstein", pricePerNight: 195, amenities: ["Riverside terrace", "Gourmet restaurant", "Historic building", "Wine tastings"], familyFriendly: false, image: "images/luxury-hotel.jpg" }
        ],
        luxury: [
            { name: "Relais & Châteaux Hotel Wachau", location: "Dürnstein", pricePerNight: 350, amenities: ["5-star luxury", "Michelin-starred restaurant", "Exclusive spa", "Wine cellar", "Concierge service"], familyFriendly: false, image: "images/luxury-hotel.jpg" },
            { name: "Domäne Wachau Luxury Resort", location: "Dürnstein", pricePerNight: 380, amenities: ["Private vineyard tours", "Helicopter service", "Gourmet dining", "Exclusive wine tastings"], familyFriendly: false, image: "images/luxury-hotel.jpg" },
            { name: "Wachau Grand Hotel & Spa", location: "Krems", pricePerNight: 320, amenities: ["Luxury spa", "Indoor and outdoor pools", "Fine dining", "Concierge service"], familyFriendly: true, image: "images/luxury-hotel.jpg" }
        ]
    },
    
    activities: {
        wine: [
            { name: "Premium Wine Tasting at Domäne Wachau", location: "Dürnstein", duration: 2, price: 45, description: "Guided tasting of premium Grüner Veltliner and Riesling wines at one of Austria's most renowned wineries", image: "images/wachau-vineyard.jpg" },
            { name: "Vineyard Tour with Winemaker", location: "Weißenkirchen", duration: 3, price: 65, description: "Walk through the terraced vineyards with a local winemaker and taste wines directly from the barrel", image: "images/wachau-vineyard.jpg" },
            { name: "Wine and Apricot Pairing", location: "Spitz", duration: 2, price: 40, description: "Taste how the famous Wachau apricots pair with local wines, including apricot liqueurs and brandies", image: "images/wachau-vineyard.jpg" },
            { name: "Historic Wine Cellar Tour", location: "Krems", duration: 1.5, price: 35, description: "Explore centuries-old wine cellars and learn about traditional winemaking methods", image: "images/wachau-vineyard.jpg" },
            { name: "Wine Blending Workshop", location: "Dürnstein", duration: 2.5, price: 75, description: "Create your own wine blend under the guidance of a professional winemaker", image: "images/wachau-vineyard.jpg" }
        ],
        biking: [
            { name: "Danube Cycle Path Guided Tour", location: "Krems to Melk", duration: 4, price: 55, description: "Guided cycling tour along the famous Danube Cycle Path with stops at scenic viewpoints", image: "images/cycling-path.jpg" },
            { name: "E-Bike Vineyard Tour", location: "Dürnstein", duration: 3, price: 65, description: "Explore the steep vineyard terraces with ease on an electric bike with a knowledgeable guide", image: "images/cycling-path.jpg" },
            { name: "Full-Day Wachau Cycling Adventure", location: "Krems to Melk and back", duration: 7, price: 85, description: "Comprehensive cycling tour covering both banks of the Danube with lunch included", image: "images/cycling-path.jpg" },
            { name: "Family-Friendly Bike Tour", location: "Spitz area", duration: 2, price: 45, description: "Easy, flat routes suitable for families with children, including stops for refreshments", image: "images/cycling-path.jpg" },
            { name: "Mountain Biking in Jauerling Nature Park", location: "Jauerling", duration: 4, price: 70, description: "Off-road biking adventure in the hills above the Danube with spectacular views", image: "images/cycling-path.jpg" }
        ],
        hiking: [
            { name: "Wachau World Heritage Trail", location: "Various sections", duration: 4, price: 40, description: "Guided hike along sections of the famous trail with panoramic views of the Danube", image: "images/wachau-vineyard.jpg" },
            { name: "Dürnstein Castle Ruins Hike", location: "Dürnstein", duration: 2, price: 30, description: "Climb to the historic castle ruins where Richard the Lionheart was imprisoned", image: "images/durnstein-tower.jpg" },
            { name: "Vineyard Terraces Hike", location: "Spitz", duration: 3, price: 35, description: "Hike through the UNESCO-protected vineyard terraces with wine tasting", image: "images/wachau-vineyard.jpg" },
            { name: "Jauerling Mountain Summit Tour", location: "Jauerling", duration: 5, price: 50, description: "Challenging hike to the highest point in the Wachau with rewarding views", image: "images/wachau-vineyard.jpg" },
            { name: "Sunset Hike with Dinner", location: "Weißenkirchen", duration: 3, price: 65, description: "Evening hike ending with a traditional dinner at a local restaurant", image: "images/wachau-vineyard.jpg" }
        ],
        history: [
            { name: "Melk Abbey Guided Tour", location: "Melk", duration: 2, price: 35, description: "Expert-led tour of the magnificent Benedictine abbey, a masterpiece of Baroque architecture", image: "images/melk-abbey.jpg" },
            { name: "Medieval Dürnstein Walking Tour", location: "Dürnstein", duration: 1.5, price: 25, description: "Explore the charming medieval town with its blue church tower and historic buildings", image: "images/durnstein-tower.jpg" },
            { name: "Aggstein Castle Ruins Tour", location: "Aggstein", duration: 2, price: 30, description: "Visit the dramatic ruins of this 12th-century castle perched high above the Danube", image: "images/durnstein-tower.jpg" },
            { name: "Krems Old Town Tour", location: "Krems", duration: 2, price: 25, description: "Discover the historic center of Krems with its Gothic and Baroque architecture", image: "images/durnstein-tower.jpg" },
            { name: "Göttweig Abbey Visit", location: "Göttweig", duration: 2, price: 30, description: "Tour this impressive Benedictine monastery with its imperial staircase and panoramic views", image: "images/melk-abbey.jpg" }
        ],
        food: [
            { name: "Wachau Culinary Walking Tour", location: "Krems", duration: 3, price: 70, description: "Sample local specialties at various stops while learning about regional cuisine", image: "images/wachau-vineyard.jpg" },
            { name: "Austrian Cooking Class", location: "Mautern", duration: 4, price: 95, description: "Hands-on cooking experience learning to prepare traditional Austrian dishes", image: "images/wachau-vineyard.jpg" },
            { name: "Apricot Farm Visit & Tasting", location: "Spitz", duration: 2, price: 35, description: "Learn about the famous Wachau apricots and taste various apricot products", image: "images/wachau-vineyard.jpg" },
            { name: "Gourmet Dinner with Wine Pairing", location: "Dürnstein", duration: 3, price: 120, description: "Multi-course dinner at a top restaurant with expertly paired local wines", image: "images/wachau-vineyard.jpg" },
            { name: "Traditional Heurigen Experience", location: "Weißenkirchen", duration: 2, price: 45, description: "Visit a traditional wine tavern for authentic local wines and food", image: "images/wachau-vineyard.jpg" }
        ],
        relaxation: [
            { name: "Spa Day with Vineyard Views", location: "Dürnstein", duration: 4, price: 130, description: "Luxury spa treatments using local grape-based products with views of the vineyards", image: "images/danube-cruise.jpg" },
            { name: "Danube River Cruise", location: "Krems to Melk", duration: 3.5, price: 65, description: "Scenic cruise along the most beautiful stretch of the Danube", image: "images/danube-cruise.jpg" },
            { name: "Yoga in the Vineyards", location: "Spitz", duration: 2, price: 40, description: "Morning yoga session surrounded by vineyards followed by breakfast", image: "images/wachau-vineyard.jpg" },
            { name: "Thermal Spa Experience", location: "Krems", duration: 3, price: 85, description: "Access to thermal pools, saunas, and relaxation areas with one treatment included", image: "images/danube-cruise.jpg" },
            { name: "Sunset Danube Boat Trip with Dinner", location: "Dürnstein", duration: 2.5, price: 95, description: "Evening boat trip with dinner and wine as the sun sets over the valley", image: "images/danube-cruise.jpg" }
        ]
    },
    
    restaurants: {
        economy: [
            { name: "Heurigen Schmelz", location: "Dürnstein", cuisine: "Traditional", specialties: ["Cold cuts platters", "Local wines", "Homemade spreads"], priceRange: "€", image: "images/wachau-vineyard.jpg" },
            { name: "Gasthof Prankl", location: "Weißenkirchen", cuisine: "Austrian", specialties: ["Schnitzel", "Danube fish", "Homemade pastries"], priceRange: "€", image: "images/wachau-vineyard.jpg" },
            { name: "Wachauerstube", location: "Spitz", cuisine: "Regional", specialties: ["Daily specials", "Local wines", "Homestyle cooking"], priceRange: "€", image: "images/wachau-vineyard.jpg" }
        ],
        standard: [
            { name: "Restaurant Loibnerhof", location: "Dürnstein", cuisine: "Austrian", specialties: ["Seasonal menu", "Wine pairings", "Apricot dishes"], priceRange: "€€", image: "images/wachau-vineyard.jpg" },
            { name: "Restaurant Schlosskeller", location: "Dürnstein", cuisine: "Regional", specialties: ["Game dishes", "Fresh fish", "Local vegetables"], priceRange: "€€", image: "images/wachau-vineyard.jpg" },
            { name: "Kirchenwirt", location: "Weißenkirchen", cuisine: "Traditional", specialties: ["Wachau specialties", "Extensive wine list", "Seasonal menu"], priceRange: "€€", image: "images/wachau-vineyard.jpg" }
        ],
        premium: [
            { name: "Restaurant Richard Löwenherz", location: "Dürnstein", cuisine: "Gourmet Austrian", specialties: ["Tasting menus", "Fine dining", "Extensive wine cellar"], priceRange: "€€€", image: "images/wachau-vineyard.jpg" },
            { name: "Landhaus Bacher", location: "Mautern", cuisine: "Gourmet", specialties: ["Award-winning cuisine", "Seasonal tasting menus", "Wine pairings"], priceRange: "€€€", image: "images/wachau-vineyard.jpg" },
            { name: "Hofmeisterei Hirtzberger", location: "Wösendorf", cuisine: "Fine Dining", specialties: ["Innovative Austrian cuisine", "Wachau wines", "Elegant atmosphere"], priceRange: "€€€", image: "images/wachau-vineyard.jpg" }
        ],
        luxury: [
            { name: "La Cuisine", location: "Dürnstein", cuisine: "International Gourmet", specialties: ["Michelin-starred dining", "Chef's table experience", "Rare wines"], priceRange: "€€€€", image: "images/wachau-vineyard.jpg" },
            { name: "Gourmet Restaurant Wachau", location: "Krems", cuisine: "Modern Austrian", specialties: ["Innovative tasting menus", "Wine flights", "Molecular gastronomy"], priceRange: "€€€€", image: "images/wachau-vineyard.jpg" },
            { name: "Relais & Châteaux Restaurant", location: "Dürnstein", cuisine: "French-Austrian Fusion", specialties: ["Luxury dining experience", "Rare ingredients", "Sommelier service"], priceRange: "€€€€", image: "images/wachau-vineyard.jpg" }
        ]
    }
};

// Initialize the vacation planner when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initVacationPlannerEnhanced();
});

// Enhanced vacation planner initialization
function initVacationPlannerEnhanced() {
    console.log("Initializing enhanced vacation planner");
    
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
            // Validate current step
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
                // Handle multiple selections (checkboxes)
                if (key === 'interests' || key === 'amenities' || key === 'activities') {
                    if (!planData[key]) {
                        planData[key] = [];
                    }
                    planData[key].push(value);
                } else {
                    planData[key] = value;
                }
            }
            
            console.log('Vacation plan data:', planData);
            
            // Generate truly customized vacation plan
            generateCustomVacationPlan(planData);
        });
    }
}

// Validate form step
function validateStep(stepIndex) {
    const currentStep = document.querySelectorAll('.form-step')[stepIndex];
    const requiredFields = currentStep.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value) {
            isValid = false;
            field.classList.add('is-invalid');
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    // Special validation for checkboxes in step 2 (interests)
    if (stepIndex === 1) {
        const interestCheckboxes = currentStep.querySelectorAll('input[name="interests"]');
        let atLeastOneChecked = false;
        
        interestCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                atLeastOneChecked = true;
            }
        });
        
        if (!atLeastOneChecked) {
            isValid = false;
            // Add error message
            let errorMsg = currentStep.querySelector('.interest-error');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'alert alert-danger mt-3 interest-error';
                errorMsg.textContent = 'Please select at least one interest';
                currentStep.querySelector('.row').after(errorMsg);
            }
        } else {
            // Remove error message if exists
            const errorMsg = currentStep.querySelector('.interest-error');
            if (errorMsg) {
                errorMsg.remove();
            }
        }
    }
    
    return isValid;
}

// Generate a truly customized vacation plan based on user inputs
function generateCustomVacationPlan(planData) {
    console.log("Generating custom vacation plan based on user inputs");
    
    // Calculate trip duration
    const arrivalDate = new Date(planData.arrival_date);
    const departureDate = new Date(planData.departure_date);
    const tripDuration = Math.ceil((departureDate - arrivalDate) / (1000 * 60 * 60 * 24));
    
    // Select accommodation based on budget and number of travelers
    const budgetCategory = planData.budget || 'standard';
    const accommodations = wachauDatabase.accommodations[budgetCategory];
    
    // Check if family-friendly accommodation is needed
    const needsFamilyFriendly = planData.children && planData.children !== '0';
    
    // Filter accommodations based on family needs
    let suitableAccommodations = accommodations;
    if (needsFamilyFriendly) {
        suitableAccommodations = accommodations.filter(acc => acc.familyFriendly);
    }
    
    // Select a random accommodation from suitable options
    const selectedAccommodation = suitableAccommodations[Math.floor(Math.random() * suitableAccommodations.length)];
    
    // Calculate accommodation cost
    const totalTravelers = parseInt(planData.adults) + (planData.children !== '0' ? parseInt(planData.children) : 0);
    const roomsNeeded = Math.ceil(totalTravelers / 2); // Assume max 2 people per room
    const accommodationCost = selectedAccommodation.pricePerNight * tripDuration * roomsNeeded;
    
    // Generate activities based on interests
    const selectedActivities = [];
    const interests = planData.interests || [];
    
    // Ensure interests is an array
    const interestsArray = Array.isArray(interests) ? interests : [interests];
    
    // Select activities for each day based on interests
    for (let day = 0; day < tripDuration; day++) {
        // For each day, select 1-2 activities based on interests
        const dayInterests = interestsArray.slice(); // Copy interests array
        
        // If no interests selected, add some default ones
        if (dayInterests.length === 0) {
            dayInterests.push('wine', 'history');
        }
        
        // Shuffle interests for this day to vary the activities
        shuffleArray(dayInterests);
        
        // Select 1-2 activities for this day
        const numActivities = Math.min(2, dayInterests.length);
        for (let i = 0; i < numActivities; i++) {
            const interest = dayInterests[i];
            const activityPool = wachauDatabase.activities[interest] || wachauDatabase.activities.wine;
            
            // Find activities not already selected
            const availableActivities = activityPool.filter(activity => 
                !selectedActivities.some(selected => selected.name === activity.name)
            );
            
            if (availableActivities.length > 0) {
                // Select a random activity from available options
                const activity = availableActivities[Math.floor(Math.random() * availableActivities.length)];
                selectedActivities.push({
                    ...activity,
                    day: day + 1
                });
            }
        }
    }
    
    // Calculate activities cost
    const activitiesCost = selectedActivities.reduce((total, activity) => total + activity.price * totalTravelers, 0);
    
    // Select restaurants based on budget
    const selectedRestaurants = [];
    const restaurantCategories = ['economy', 'standard', 'premium', 'luxury'];
    const budgetIndex = restaurantCategories.indexOf(budgetCategory);
    
    // Select restaurants for each day
    for (let day = 0; day < tripDuration; day++) {
        // Vary restaurant category slightly based on budget
        let restaurantCategory = budgetCategory;
        
        // Occasionally upgrade or downgrade restaurant category for variety
        const variation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const variationIndex = Math.min(Math.max(0, budgetIndex + variation), 3);
        restaurantCategory = restaurantCategories[variationIndex];
        
        const restaurantPool = wachauDatabase.restaurants[restaurantCategory];
        
        // Find restaurants not already selected
        const availableRestaurants = restaurantPool.filter(restaurant => 
            !selectedRestaurants.some(selected => selected.name === restaurant.name)
        );
        
        if (availableRestaurants.length > 0) {
            // Select a random restaurant from available options
            const restaurant = availableRestaurants[Math.floor(Math.random() * availableRestaurants.length)];
            selectedRestaurants.push({
                ...restaurant,
                day: day + 1
            });
        }
    }
    
    // Estimate restaurant costs based on price range
    const restaurantCostMap = {
        '€': 25,
        '€€': 45,
        '€€€': 75,
        '€€€€': 120
    };
    
    const restaurantsCost = selectedRestaurants.reduce((total, restaurant) => 
        total + (restaurantCostMap[restaurant.priceRange] || 45) * totalTravelers, 0
    );
    
    // Calculate service fee (10-15% of total cost)
    const baseCost = accommodationCost + activitiesCost + restaurantsCost;
    const serviceFeePercentage = 0.12; // 12%
    const serviceFee = baseCost * serviceFeePercentage;
    
    // Calculate total cost
    const totalCost = baseCost + serviceFee;
    
    // Generate daily itinerary
    const dailyItinerary = [];
    
    for (let day = 1; day <= tripDuration; day++) {
        const currentDate = new Date(arrivalDate);
        currentDate.setDate(arrivalDate.getDate() + day - 1);
        
        const dayActivities = selectedActivities.filter(activity => activity.day === day);
        const dayRestaurant = selectedRestaurants.find(restaurant => restaurant.day === day);
        
        // Create morning, afternoon, and evening activities
        let morningActivity, afternoonActivity, eveningActivity;
        
        if (day === 1) {
            // First day - arrival
            morningActivity = "Arrival in the Wachau region";
            afternoonActivity = "Check-in at " + selectedAccommodation.name + " in " + selectedAccommodation.location;
            eveningActivity = dayRestaurant ? "Dinner at " + dayRestaurant.name + " in " + dayRestaurant.location : "Dinner at your accommodation";
        } else if (day === tripDuration) {
            // Last day - departure
            morningActivity = dayActivities.length > 0 ? dayActivities[0].name + " in " + dayActivities[0].location : "Free time to explore " + selectedAccommodation.location;
            afternoonActivity = "Check-out and departure from the Wachau region";
            eveningActivity = "Return journey";
        } else {
            // Regular days
            morningActivity = dayActivities.length > 0 ? dayActivities[0].name + " in " + dayActivities[0].location : "Free time to explore " + selectedAccommodation.location;
            afternoonActivity = dayActivities.length > 1 ? dayActivities[1].name + " in " + dayActivities[1].location : "Relaxation time at " + selectedAccommodation.name;
            eveningActivity = dayRestaurant ? "Dinner at " + dayRestaurant.name + " in " + dayRestaurant.location : "Dinner at your accommodation";
        }
        
        dailyItinerary.push({
            day,
            date: currentDate.toLocaleDateString(),
            morning: morningActivity,
            afternoon: afternoonActivity,
            evening: eveningActivity
        });
    }
    
    // Create the vacation plan object
    const vacationPlan = {
        tripDetails: {
            arrivalDate: arrivalDate.toLocaleDateString(),
            departureDate: departureDate.toLocaleDateString(),
            duration: tripDuration,
            travelers: {
                adults: parseInt(planData.adults),
                children: planData.children !== '0' ? parseInt(planData.children) : 0
            }
        },
        accommodation: selectedAccommodation,
        activities: selectedActivities,
        restaurants: selectedRestaurants,
        itinerary: dailyItinerary,
        costs: {
            accommodation: accommodationCost,
            activities: activitiesCost,
            restaurants: restaurantsCost,
            serviceFee: serviceFee,
            total: totalCost
        }
    };
    
    // Display the vacation plan
    displayVacationPlan(vacationPlan);
}

// Display the vacation plan in a modal
function displayVacationPlan(plan) {
    console.log("Displaying vacation plan:", plan);
    
    // Get the modal elements
    const modal = document.getElementById('vacationPlanModal');
    const modalContent = document.getElementById('vacation-plan-content');
    
    if (!modal || !modalContent) {
        console.error("Modal elements not found");
        return;
    }
    
    // Format currency
    const formatCurrency = (amount) => {
        return '€' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };
    
    // Create HTML content for the vacation plan
    let html = `
        <div class="vacation-plan">
            <div class="plan-header mb-4">
                <h3>Your Customized Wachau Vacation Plan</h3>
                <p class="text-muted">Generated on ${new Date().toLocaleDateString()}</p>
            </div>
            
            <div class="plan-summary mb-4">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Trip Summary</h4>
                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>Dates:</strong> ${plan.tripDetails.arrivalDate} to ${plan.tripDetails.departureDate}</p>
                                <p><strong>Duration:</strong> ${plan.tripDetails.duration} days</p>
                                <p><strong>Travelers:</strong> ${plan.tripDetails.travelers.adults} adults${plan.tripDetails.travelers.children > 0 ? ' and ' + plan.tripDetails.travelers.children + ' children' : ''}</p>
                            </div>
                            <div class="col-md-6">
                                <p><strong>Accommodation:</strong> ${plan.accommodation.name}, ${plan.accommodation.location}</p>
                                <p><strong>Room Type:</strong> Standard Double Room</p>
                                <p><strong>Total Cost:</strong> ${formatCurrency(plan.costs.total)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="daily-itinerary mb-4">
                <h4 class="mb-3">Daily Itinerary</h4>
                <div class="accordion" id="itineraryAccordion">
    `;
    
    // Add each day to the itinerary
    plan.itinerary.forEach((day, index) => {
        html += `
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#day${day.day}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="day${day.day}">
                        Day ${day.day}: ${day.date}
                    </button>
                </h2>
                <div id="day${day.day}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" data-bs-parent="#itineraryAccordion">
                    <div class="accordion-body">
                        <div class="day-schedule">
                            <div class="schedule-item">
                                <div class="schedule-time">Morning</div>
                                <div class="schedule-activity">${day.morning}</div>
                            </div>
                            <div class="schedule-item">
                                <div class="schedule-time">Afternoon</div>
                                <div class="schedule-activity">${day.afternoon}</div>
                            </div>
                            <div class="schedule-item">
                                <div class="schedule-time">Evening</div>
                                <div class="schedule-activity">${day.evening}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `
                </div>
            </div>
            
            <div class="accommodation-details mb-4">
                <h4 class="mb-3">Accommodation Details</h4>
                <div class="card">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${plan.accommodation.image}" class="img-fluid rounded-start" alt="${plan.accommodation.name}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${plan.accommodation.name}</h5>
                                <p class="card-text"><strong>Location:</strong> ${plan.accommodation.location}</p>
                                <p class="card-text"><strong>Price per night:</strong> ${formatCurrency(plan.accommodation.pricePerNight)}</p>
                                <p class="card-text"><strong>Amenities:</strong> ${plan.accommodation.amenities.join(', ')}</p>
                                <p class="card-text"><strong>Total accommodation cost:</strong> ${formatCurrency(plan.costs.accommodation)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="activities-details mb-4">
                <h4 class="mb-3">Included Activities</h4>
                <div class="row">
    `;
    
    // Add activities
    plan.activities.forEach(activity => {
        html += `
            <div class="col-md-6 mb-3">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${activity.name}</h5>
                        <p class="card-text"><strong>Location:</strong> ${activity.location}</p>
                        <p class="card-text"><strong>Duration:</strong> ${activity.duration} hours</p>
                        <p class="card-text"><strong>Day:</strong> Day ${activity.day}</p>
                        <p class="card-text">${activity.description}</p>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `
                </div>
            </div>
            
            <div class="restaurant-details mb-4">
                <h4 class="mb-3">Restaurant Reservations</h4>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Restaurant</th>
                                <th>Location</th>
                                <th>Cuisine</th>
                                <th>Specialties</th>
                            </tr>
                        </thead>
                        <tbody>
    `;
    
    // Add restaurants
    plan.restaurants.forEach(restaurant => {
        html += `
            <tr>
                <td>Day ${restaurant.day}</td>
                <td>${restaurant.name}</td>
                <td>${restaurant.location}</td>
                <td>${restaurant.cuisine}</td>
                <td>${restaurant.specialties.join(', ')}</td>
            </tr>
        `;
    });
    
    html += `
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="cost-breakdown mb-4">
                <h4 class="mb-3">Cost Breakdown</h4>
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <tbody>
                                    <tr>
                                        <td>Accommodation</td>
                                        <td class="text-end">${formatCurrency(plan.costs.accommodation)}</td>
                                    </tr>
                                    <tr>
                                        <td>Activities</td>
                                        <td class="text-end">${formatCurrency(plan.costs.activities)}</td>
                                    </tr>
                                    <tr>
                                        <td>Estimated Restaurant Costs</td>
                                        <td class="text-end">${formatCurrency(plan.costs.restaurants)}</td>
                                    </tr>
                                    <tr>
                                        <td>Service Fee (12%)</td>
                                        <td class="text-end">${formatCurrency(plan.costs.serviceFee)}</td>
                                    </tr>
                                    <tr class="table-primary">
                                        <th>Total Cost</th>
                                        <th class="text-end">${formatCurrency(plan.costs.total)}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="alert alert-info mt-3">
                            <i class="fas fa-info-circle me-2"></i> The total cost includes accommodation, activities, estimated restaurant costs, and our service fee. You'll pay one total amount for everything.
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="next-steps">
                <h4 class="mb-3">Next Steps</h4>
                <p>To confirm this vacation plan:</p>
                <ol>
                    <li>Click "Send to My Email" to receive a copy of this plan</li>
                    <li>Click "Proceed to Checkout" to confirm and pay for your booking</li>
                    <li>After payment, we'll handle all reservations and send you a comprehensive vacation document</li>
                </ol>
            </div>
        </div>
    `;
    
    // Set the HTML content
    modalContent.innerHTML = html;
    
    // Initialize the modal
    const bsModal = new bootstrap.Modal(modal);
    
    // Show the modal
    bsModal.show();
    
    // Add event listeners for the modal buttons
    const sendToEmailBtn = document.getElementById('send-to-email-btn');
    const proceedToCheckoutBtn = document.getElementById('proceed-to-checkout-btn');
    
    if (sendToEmailBtn) {
        sendToEmailBtn.addEventListener('click', function() {
            // In a real implementation, this would send the plan to the user's email
            alert('Your vacation plan has been sent to your email address.');
        });
    }
    
    if (proceedToCheckoutBtn) {
        proceedToCheckoutBtn.addEventListener('click', function() {
            // In a real implementation, this would redirect to a checkout page
            window.location.href = 'checkout.html';
        });
    }
}

// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
