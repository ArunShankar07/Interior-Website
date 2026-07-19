/**
 * Crayonz - Main JavaScript file
 * Contains scroll effects, mobile menu behavior, active page tracking,
 * and contact form validation and mock submission.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. SELECT DOM ELEMENTS
    // ==========================================
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    // ==========================================
    // 2. SCROLL EVENTS: STICKY NAV BACKGROUND
    // ==========================================
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    // Initialize sticky header state on page load
    handleScroll();
    // Watch for scroll events
    window.addEventListener('scroll', handleScroll);

    // ==========================================
    // 3. RESPONSIVE MOBILE NAVIGATION MENU
    // ==========================================
    const toggleMobileMenu = () => {
        navbar.classList.toggle('active');
        header.classList.toggle('nav-open');
        
        // Prevent body scrolling when menu is open on mobile
        if (navbar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    const closeMobileMenu = () => {
        navbar.classList.remove('active');
        header.classList.remove('nav-open');
        document.body.style.overflow = '';
    };

    navToggle.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            closeMobileMenu();
        });
    });

    // Close menu when clicking outside of the mobile drawer
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !navToggle.contains(e.target) && navbar.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ==========================================
    // 4. SCROLL SPY: ACTIVE SECTION LINK HIGHLIGHTING
    // ==========================================
    const sections = document.querySelectorAll('section');
    
    // Using Intersection Observer to dynamically change active link based on viewport scroll position
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the main center area of viewport
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    // ==========================================
    // 5. CONTACT FORM VALIDATION & MOCK SUBMISSION
    // ==========================================
    
    // Regular Expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation functions
    const validateField = (field, errorElementId, validationFn) => {
        const value = field.value.trim();
        const parent = field.parentElement;
        const isValid = validationFn(value);

        if (!isValid) {
            parent.classList.add('invalid');
            return false;
        } else {
            parent.classList.remove('invalid');
            return true;
        }
    };

    // Form submission event
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop default browser submission

        // Select form inputs
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const messageField = document.getElementById('message');

        // Reset previous feedback messages
        formStatus.style.display = 'none';
        formStatus.className = 'form-status';

        // Perform validations
        const isNameValid = validateField(nameField, 'nameError', (val) => val.length > 0);
        const isEmailValid = validateField(emailField, 'emailError', (val) => emailRegex.test(val));
        const isMessageValid = validateField(messageField, 'messageError', (val) => val.length > 0);

        // Check if all fields are valid
        if (isNameValid && isEmailValid && isMessageValid) {
            
            // Set mock loading state on submit button
            submitBtn.classList.add('loading');
            const submitText = submitBtn.querySelector('span');
            const originalText = submitText.innerText;
            submitText.innerText = 'Sending...';
            submitBtn.disabled = true;

            // Simulate server network request delay
            setTimeout(() => {
                // Reset loading state
                submitBtn.classList.remove('loading');
                submitText.innerText = originalText;
                submitBtn.disabled = false;

                // Show success status message
                formStatus.style.display = 'flex';
                formStatus.classList.add('success');
                formStatus.innerHTML = `
                    <svg style="width: 20px; height: 20px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Thank you! Your message has been sent successfully. We will get back to you shortly.</span>
                `;

                // Clear input values
                contactForm.reset();
                
                // Automatically hide success message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);

            }, 1500); // 1.5s simulated response delay
        } else {
            // If invalid, show general error header
            formStatus.style.display = 'flex';
            formStatus.classList.add('error');
            formStatus.innerHTML = `
                <svg style="width: 20px; height: 20px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Please fill out all fields correctly.</span>
            `;
        }
    });

    // Real-time error clearing when user types inside inputs
    const inputs = [document.getElementById('name'), document.getElementById('email'), document.getElementById('message')];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const parent = input.parentElement;
            if (parent.classList.contains('invalid')) {
                parent.classList.remove('invalid');
            }
        });
    });
});
