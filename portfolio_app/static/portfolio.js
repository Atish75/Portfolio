// ============================================
// INITIALIZE LUCIDE ICONS
// ============================================
// This function loads all the icons from Lucide library
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});

// ============================================
// SMOOTH SCROLL TO SECTION
// ============================================
// Function to scroll smoothly to a section when clicking links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ============================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ============================================
// This watches when elements come into view and triggers animations

// Create an observer that watches when elements enter the viewport
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -100px 0px' // Start animation slightly before element is fully visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add 'visible' class when element comes into view
            entry.target.classList.add('visible');
            
            // Animate skill bars when they come into view
            if (entry.target.classList.contains('skill-category')) {
                animateSkillBars(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all elements with fade-in animations
const elementsToAnimate = document.querySelectorAll(
    '.fade-in, .fade-in-left, .fade-in-right, .fade-in-up, .skill-category'
);

elementsToAnimate.forEach(element => {
    observer.observe(element);
});

// ============================================
// ANIMATE SKILL BARS
// ============================================
// Function to animate the skill progress bars
function animateSkillBars(skillCategory) {
    const skillBars = skillCategory.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        // Get the target percentage from data attribute
        const targetWidth = bar.getAttribute('data-progress');
        
        // Animate the bar after a small delay for staggered effect
        setTimeout(() => {
            bar.style.width = targetWidth + '%';
        }, index * 100); // 100ms delay between each bar
    });
}

// ============================================
// CONTACT FORM HANDLING
// ============================================
// Handle form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual form submission
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Log form data (in a real application, you would send this to a server)
        console.log('Form Submitted:');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Subject:', subject);
        console.log('Message:', message);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// ============================================
// SCROLL PROGRESS INDICATOR (OPTIONAL)
// ============================================
// Shows scroll progress at the top of the page
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    // You can use this to show a progress bar if you want
    // Example: document.getElementById('progressBar').style.width = scrollPercent + '%';
});

// ============================================
// NAVBAR SCROLL EFFECT (OPTIONAL)
// ============================================
// Add a class to navbar when scrolling (if you add a navbar later)
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Detect scroll direction
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        document.body.classList.add('scrolling-down');
        document.body.classList.remove('scrolling-up');
    } else {
        // Scrolling up
        document.body.classList.add('scrolling-up');
        document.body.classList.remove('scrolling-down');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

// ============================================
// KEYBOARD NAVIGATION
// ============================================
// Allow keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    // Press '1' to go to Hero
    if (e.key === '1') scrollToSection('hero');
    // Press '2' to go to About
    if (e.key === '2') scrollToSection('about');
    // Press '3' to go to Skills
    if (e.key === '3') scrollToSection('skills');
    // Press '4' to go to Projects
    if (e.key === '4') scrollToSection('projects');
    // Press '5' to go to Contact
    if (e.key === '5') scrollToSection('contact');
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Lazy load images when they come into view
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ============================================
// CONSOLE MESSAGE (OPTIONAL)
// ============================================
// Fun message in the console
console.log('%c👋 Hello Developer!', 'font-size: 20px; color:rgb(174, 112, 236); font-weight: italic;');

