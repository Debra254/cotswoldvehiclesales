// Vehicle Data Array - All stock vehicles
const vehicles = [
    {
        id: 1,
        title: "2024 Renault Trafic 2.0 LL30 Blue dCi 170 Auto",
        year: "2024/74",
        yearNum: 2024,
        fuel: "Diesel",
        transmission: "Auto",
        mileage: "11,000 Miles",
        price: "£24,995 + VAT",
        priceNum: 24995,
        description: "9 Seats | Grey | Minibus",
        category: "Minibus",
        color: "Grey",
        seats: "9 Seats",
        engine: "2.0L",
        image: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800",
        fullDescription: "Premium 9-seater minibus with automatic transmission. Perfect for families or businesses requiring spacious and reliable transportation.",
        features: ["Bluetooth", "Parking Sensors", "Cruise Control", "Air Conditioning", "Satellite Navigation"]
    },
    {
        id: 2,
        title: "2025 Renault Trafic 2.0 LL30 Blue dCi 150 Extra",
        year: "2025/25",
        yearNum: 2025,
        fuel: "Diesel",
        transmission: "Manual",
        mileage: "11,000 Miles",
        price: "£21,995 + VAT",
        priceNum: 21995,
        description: "9 Seats | Grey | Minibus",
        category: "Minibus",
        color: "Grey",
        seats: "9 Seats",
        engine: "2.0L",
        image: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800",
        fullDescription: "Spacious 9-seater minibus with manual transmission. Ideal for commercial use or large families.",
        features: ["Bluetooth", "Parking Sensors", "Cruise Control", "Air Conditioning"]
    },
    {
        id: 3,
        title: "2023 Audi A1 1.0 TFSI 30 S Line",
        year: "2023/73",
        yearNum: 2023,
        fuel: "Petrol",
        transmission: "Manual",
        mileage: "18,300 Miles",
        price: "£18,990",
        priceNum: 18990,
        description: "Silver | Hatchback | 1 Former Keeper",
        category: "Hatchback",
        color: "Silver",
        seats: "5 Seats",
        engine: "1.0L",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
        fullDescription: "Stylish Audi A1 S Line with premium features. Low mileage with only 1 former keeper.",
        features: ["S Line Interior", "Virtual Cockpit", "Apple CarPlay", "Android Auto", "LED Headlights"]
    },
    {
        id: 4,
        title: "2022 Jeep Compass 1.3 S 240hp AT6 EAWD",
        year: "2022/72",
        yearNum: 2022,
        fuel: "Plug-in Hybrid",
        transmission: "Auto",
        mileage: "17,800 Miles",
        price: "£18,990",
        priceNum: 18990,
        description: "Black | SUV | Inc VAT",
        category: "SUV",
        color: "Black",
        seats: "5 Seats",
        engine: "1.3L",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800",
        fullDescription: "Premium SUV with advanced eAWD system. Excellent fuel economy with plug-in hybrid technology.",
        features: ["Panoramic Roof", "Leather Seats", "Adaptive Cruise Control", "Lane Keep Assist", "360 Camera"]
    },
    {
        id: 5,
        title: "2021 Toyota Hilux 2.4 D-4D Invincible",
        year: "2021/70",
        yearNum: 2021,
        fuel: "Diesel",
        transmission: "Auto",
        mileage: "108,000 Miles",
        price: "£16,995 + VAT",
        priceNum: 16995,
        description: "Grey | Pickup | 1 Owner From New",
        category: "Pickup",
        color: "Grey",
        seats: "5 Seats",
        engine: "2.4L",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
        fullDescription: "Rugged and reliable Toyota Hilux Invincible. 1 owner from new with full service history.",
        features: ["Towing Pack", "Bull Bar", "LED Light Bar", "Rubber Floor Mats", "Rock Slider"]
    },
    {
        id: 6,
        title: "2024 Mini Hatch 1.5 5-Door Cooper Classic",
        year: "2024/73",
        yearNum: 2024,
        fuel: "Petrol",
        transmission: "Manual",
        mileage: "18,000 Miles",
        price: "£16,490",
        priceNum: 16490,
        description: "Blue | Hatchback | Inc VAT",
        category: "Hatchback",
        color: "Blue",
        seats: "5 Seats",
        engine: "1.5L",
        image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800",
        fullDescription: "Practical 5-door Mini Hatch Cooper Classic. Perfect blend of style and functionality.",
        features: ["Mini Connected", "Apple CarPlay", "Parking Assistant", "Climate Control", "Heated Seats"]
    },
    {
        id: 7,
        title: "2022 Toyota Corolla 1.8 VVT-h Icon Tech",
        year: "2022",
        yearNum: 2022,
        fuel: "Hybrid",
        transmission: "Auto",
        mileage: "60,000 Miles",
        price: "£14,990",
        priceNum: 14990,
        description: "Grey | Estate | Inc VAT",
        category: "Estate",
        color: "Grey",
        seats: "5 Seats",
        engine: "1.8L",
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
        fullDescription: "Economical Toyota Corolla Hybrid. Excellent fuel economy and low running costs.",
        features: ["Toyota Safety Sense", "Hybrid System", "Smart Entry", "Push Button Start", "Adaptive Cruise Control"]
    },
    {
        id: 8,
        title: "2020 Seat Arona 1.0 TSI FR",
        year: "2020/20",
        yearNum: 2020,
        fuel: "Petrol",
        transmission: "Manual",
        mileage: "39,000 Miles",
        price: "£10,990",
        priceNum: 10990,
        description: "Black | SUV | 2 Former Keepers",
        category: "SUV",
        color: "Black",
        seats: "5 Seats",
        engine: "1.0L",
        image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
        fullDescription: "Sporty Seat Arona FR with panoramic roof. Great value compact SUV.",
        features: ["Panoramic Roof", "FR Styling", "Digital Cockpit", "Wireless Charging", "Beat Audio"]
    }
];

// Load vehicle details based on URL parameter
function loadVehicleDetails() {
    const params = new URLSearchParams(window.location.search);
    const vehicleId = params.get('id');
    
    if (!vehicleId) return;
    
    const vehicle = vehicles.find(v => v.id == vehicleId);
    
    if (!vehicle) {
        document.querySelector('.vehicle-details').innerHTML = `
            <div class="container" style="padding: 120px 20px; text-align: center;">
                <h2>Vehicle not found</h2>
                <p>The vehicle you're looking for doesn't exist or has been sold.</p>
                <a href="inventory.html" class="btn-primary" style="display: inline-block; margin-top: 20px;">Back to Stocklist</a>
            </div>
        `;
        return;
    }
    
    // Update breadcrumb
    const breadcrumbTitle = document.getElementById('breadcrumb-title');
    if (breadcrumbTitle) {
        breadcrumbTitle.textContent = vehicle.title;
    }
    
    // Update image
    const galleryImg = document.getElementById('vehicle-image');
    if (galleryImg) {
        galleryImg.src = vehicle.image.replace('w=800', 'w=1200');
        galleryImg.alt = vehicle.title;
    }
    
    // Update title
    const titleEl = document.getElementById('vehicle-title');
    if (titleEl) {
        titleEl.textContent = vehicle.title;
    }
    
    // Update price
    const priceEl = document.getElementById('vehicle-price');
    if (priceEl) {
        priceEl.textContent = vehicle.price;
    }
    
    // Update description
    const descEl = document.getElementById('vehicle-description');
    if (descEl) {
        descEl.textContent = vehicle.description;
    }
    
    // Update full description
    const fullDescEl = document.getElementById('vehicle-full-description');
    if (fullDescEl) {
        fullDescEl.textContent = vehicle.fullDescription;
    }
    
    // Update specs table using IDs
    document.getElementById('spec-year').textContent = vehicle.year;
    document.getElementById('spec-mileage').textContent = vehicle.mileage;
    document.getElementById('spec-engine').textContent = vehicle.engine;
    document.getElementById('spec-fuel').textContent = vehicle.fuel;
    document.getElementById('spec-transmission').textContent = vehicle.transmission;
    document.getElementById('spec-category').textContent = vehicle.category;
    document.getElementById('spec-color').textContent = vehicle.color;
    document.getElementById('spec-seats').textContent = vehicle.seats;
    
    // Update features if exists
    const featuresContainer = document.getElementById('vehicle-features');
    if (featuresContainer && vehicle.features) {
        featuresContainer.innerHTML = vehicle.features.map(f => `
            <div class="feature-tag">
                <span>✓</span> ${f}
            </div>
        `).join('');
    }
}

// Toggle Wishlist
function toggleWishlist(btn) {
    btn.classList.toggle('active');
    if (btn.classList.contains('active')) {
        btn.style.color = '#FFF';
    } else {
        btn.style.color = '';
    }
}

// Quick View Modal
function quickView(vehicleId) {
    const vehicle = vehicles.find(v => v.id == vehicleId);
    if (!vehicle) return;
    
    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');
    
    content.innerHTML = `
        <div class="quick-view-grid">
            <div class="quick-view-image">
                <img src="${vehicle.image.replace('w=800', 'w=800')}" alt="${vehicle.title}">
            </div>
            <div class="quick-view-details">
                <h3>${vehicle.title}</h3>
                <div class="price">${vehicle.price}</div>
                <div class="quick-specs">
                    <span>📅 ${vehicle.year}</span>
                    <span>⛽ ${vehicle.fuel}</span>
                    <span>⚙ ${vehicle.transmission}</span>
                    <span>🚗 ${vehicle.mileage}</span>
                </div>
                <p class="description">${vehicle.description}</p>
                <div class="quick-features">
                    ${vehicle.features.slice(0, 4).map(f => `<span class="feature-tag"><span>✓</span> ${f}</span>`).join('')}
                </div>
                <a href="vehicle-details.html?id=${vehicle.id}" class="btn-view">View Full Details</a>
            </div>
    `;
    
    modal.style.display = 'flex';
}

function closeQuickView() {
    document.getElementById('quickViewModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('quickViewModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Back to Top Button
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show/hide back to top button
window.addEventListener('scroll', () => {
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

// Finance Calculator Mini
function calculateMonthlyPayment() {
    const priceInput = document.getElementById('calc-price');
    const depositInput = document.getElementById('calc-deposit');
    const termInput = document.getElementById('calc-term');
    const resultDiv = document.getElementById('calc-result');
    
    if (!priceInput || !depositInput || !termInput || !resultDiv) return;
    
    const price = parseFloat(priceInput.value) || 0;
    const deposit = parseFloat(depositInput.value) || 0;
    const term = parseInt(termInput.value) || 48;
    const interestRate = 0.075; // 7.5% APR
    
    const amount = price - deposit;
    const monthlyRate = interestRate / 12;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    
    if (monthlyPayment > 0) {
        resultDiv.innerHTML = `
            <div class="result-amount">£${monthlyPayment.toFixed(2)}</div>
            <div class="result-label">per month (${term} months)</div>
        `;
        resultDiv.classList.add('show');
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    loadVehicleDetails();
});

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.vehicle-card, .why-card, .testimonial-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

function showTab(tabId, event) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => tab.style.display = 'none');
    buttons.forEach(btn => {
        btn.style.background = '#1A1A1A';
        btn.style.border = '1px solid #2A2A2A';
        btn.classList.remove('active');
    });
    
    document.getElementById(tabId).style.display = 'block';
    if (event) {
        event.target.style.background = '#007BFF';
        event.target.style.border = 'none';
        event.target.classList.add('active');
    }
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Build query string
            const params = new URLSearchParams(data);
            const queryString = params.toString();
            
            // Show confirmation (in production, send to backend)
            alert('Thank you for your enquiry! We will contact you shortly.\n\nForm data: ' + queryString);
            
            // Reset form
            form.reset();
        });
    });
});

// Inventory filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterSearchBtn = document.querySelector('.filters .btn-primary');
    const categoryFilter = document.querySelector('.filters select:nth-of-type(1)');
    const fuelFilter = document.querySelector('.filters select:nth-of-type(2)');
    const transmissionFilter = document.querySelector('.filters select:nth-of-type(3)');
    const priceFilter = document.querySelector('.filters select:nth-of-type(4)');
    
    if (filterSearchBtn) {
        filterSearchBtn.addEventListener('click', function() {
            const vehicleCards = document.querySelectorAll('.vehicle-card');
            const category = categoryFilter ? categoryFilter.value : '';
            const fuel = fuelFilter ? fuelFilter.value : '';
            const transmission = transmissionFilter ? transmissionFilter.value : '';
            const price = priceFilter ? priceFilter.value : '';
            
            let visibleCount = 0;
            
            vehicleCards.forEach(vehicle => {
                let show = true;
                
                // Filter logic
                if (category && category !== 'All Categories' && !vehicle.textContent.toLowerCase().includes(category.toLowerCase())) {
                    show = false;
                }
                
                if (show) {
                    vehicle.style.display = 'block';
                    visibleCount++;
                } else {
                    vehicle.style.display = 'none';
                }
            });
            
            // Update count display
            const countDisplay = document.querySelector('.vehicle-count-display span');
            if (countDisplay) {
                countDisplay.textContent = visibleCount;
            }
        });
    }
});
