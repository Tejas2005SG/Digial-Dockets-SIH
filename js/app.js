document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.slider-dots');
    const totalSlides = slides.length;

    // Initially show the first slide
    slides[0].classList.add('active');

    // Create dots
    function createDots() {
        dotsContainer.innerHTML = ''; // Clear existing dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentSlide) dot.classList.add('active');
            
            // Add click event to each dot
            dot.addEventListener('click', () => {
                currentSlide = i;
                updateSlides();
                resetTimer();
            });
            
            dotsContainer.appendChild(dot);
        }
    }

    function updateSlides() {
        // Hide all slides
        slides.forEach((slide) => {
            slide.style.opacity = '0';
            slide.style.visibility = 'hidden';
            slide.classList.remove('active');
        });
        
        // Show current slide
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].style.visibility = 'visible';
        slides[currentSlide].classList.add('active');

        // Update dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentSlide++;
        if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }
        updateSlides();
    }

    function prevSlide() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = totalSlides - 1;
        }
        updateSlides();
    }

    // Initialize dots
    createDots();

    // Event Listeners
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        prevSlide();
        resetTimer();
    });

    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        nextSlide();
        resetTimer();
    });

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active'); // Remove active class from all slides
            if (i === index) {
                slide.classList.add('active'); // Add active class to the current slide
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides; // Move to the next slide
        showSlide(currentSlide); // Show the current slide
    }

    // Automatically change slides every 5 seconds
    setInterval(nextSlide, 3000); // Change the interval time as needed

    // Initial call to display the first slide
    showSlide(currentSlide);

});
