// Initialize Lucide icons
// lucide.createIcons();

// Services data
const SERVICES = {
  'Revenue Department': [
    'Age Nationality Domicile',
    'Income Certificate',
    'Temporary Residence Certificate',
    'Senior Citizen Certificate',
    'Solvency Certificate',
    'Cultural Programme Permission',
    'Certified Copy',
    'Small Land Holder Farmer Certificate',
    'LandLess Certificate',
    'Agriculturist Certificate',
    'General Affidavit',
    'Certificate of Residence in Hilly Area',
  ],
};

// DOM Elements
const searchInput = document.getElementById('searchInput');
const servicesContainer = document.getElementById('servicesContainer');
const autoScrollBtn = document.getElementById('autoScrollBtn');

// State
let isAutoScrolling = false;

// Functions
function createServiceCard(title) {
  const card = document.createElement('button');
  card.className = 'service-card';
  card.innerHTML = `<h3>${title}</h3>`;
  card.onclick = () => console.log(`Selected: ${title}`);
  
  // Add entrance animation
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  
  requestAnimationFrame(() => {
    card.style.transition = 'all 0.3s ease-out';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  });
  
  return card;
}

function createServiceSection(category, services) {
  const section = document.createElement('div');
  section.className = 'service-section';
  
  const title = document.createElement('h2');
  title.textContent = category;
  section.appendChild(title);
  
  const grid = document.createElement('div');
  grid.className = 'services-grid';
  
  services.forEach((service, index) => {
    const card = createServiceCard(service);
    card.style.transitionDelay = `${index * 0.1}s`;
    grid.appendChild(card);
  });
  
  section.appendChild(grid);
  return section;
}

function renderServices(searchTerm = '') {
  servicesContainer.innerHTML = '';
  
  Object.entries(SERVICES).forEach(([category, services]) => {
    const filtered = services.filter(service =>
      service.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filtered.length > 0) {
      const section = createServiceSection(category, filtered);
      servicesContainer.appendChild(section);
    }
  });
}

// Optimized Auto Scroll with Smooth Reset and Smooth Scrolling
function toggleAutoScroll() {
  isAutoScrolling = !isAutoScrolling;
  autoScrollBtn.textContent = `Auto Scroll: ${isAutoScrolling ? 'ON' : 'OFF'}`;
  autoScrollBtn.classList.toggle('active', isAutoScrolling);

  let lastTimestamp = null;
  const initialScrollSpeed = 0.5;
  let scrollSpeed = initialScrollSpeed;
  let isResetting = false;

  function autoScroll(timestamp) {
    if (!isAutoScrolling) return;

    if (lastTimestamp !== null) {
      const progress = timestamp - lastTimestamp;

      if (isResetting) {
        servicesContainer.scrollTop -= scrollSpeed * progress * 2;
        scrollSpeed += 0.01; // Gradually increase speed during reset
        if (servicesContainer.scrollTop <= 0) {
          servicesContainer.scrollTop = 0;
          scrollSpeed = initialScrollSpeed;
          isResetting = false;
        }
      } else {
        servicesContainer.scrollTop += scrollSpeed * progress;
        if (servicesContainer.scrollTop + servicesContainer.clientHeight >= servicesContainer.scrollHeight) {
          isResetting = true;
          scrollSpeed = 0.1;  // Slow down reset start for smoother transition
        }
      }
    }

    lastTimestamp = timestamp;
    requestAnimationFrame(autoScroll);
  }

  if (isAutoScrolling) {
    requestAnimationFrame(autoScroll);
  }
}

// Event Listeners
searchInput.addEventListener('input', (e) => renderServices(e.target.value));
autoScrollBtn.addEventListener('click', toggleAutoScroll);

// Initial render
renderServices();