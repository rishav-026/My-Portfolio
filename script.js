// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize the page
    initTypingEffect();
    initScrollAnimation();
    initHeaderScroll();
    initMobileMenu();
    initNavigation();
    initProjectTabs();
    initContactForm();
    initBackToTop();
  });
  
  // Typing effect for the hero section
  function initTypingEffect() {
    const roles = ["Student", "Developer", "Problem Solver", "Creator"];
    const typingText = document.querySelector('.typing-text');
    const typingCursor = document.querySelector('.typing-cursor');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let pauseDuration = 2000; // How long to pause after typing a word
    
    function type() {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        // Deleting text
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50; // Faster when deleting
      } else {
        // Typing text
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100; // Slower when typing
      }
      
      // Check if word is complete
      if (!isDeleting && charIndex === currentRole.length) {
        // Pause at the end of the word
        isDeleting = true;
        typingSpeed = pauseDuration;
      } else if (isDeleting && charIndex === 0) {
        // Move to next word
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
      
      setTimeout(type, typingSpeed);
    }
    
    // Start the typing effect
    setTimeout(type, 1000);
    
    // Blinking cursor effect
    setInterval(() => {
      typingCursor.style.opacity = typingCursor.style.opacity === '0' ? '1' : '0';
    }, 500);
  }
  
  // Scroll animation for sections
  function initScrollAnimation() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const sections = document.querySelectorAll('section .container');
    sections.forEach(section => {
      observer.observe(section);
    });
  }
  
  // Header scroll effect
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Mobile menu toggle
  function initMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuIcon = menuButton.querySelector('i');
    
    menuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      
      if (mobileMenu.classList.contains('active')) {
        menuIcon.setAttribute('data-lucide', 'x');
      } else {
        menuIcon.setAttribute('data-lucide', 'menu');
      }
      
      lucide.createIcons();
    });
  }
  
  // Smooth scrolling navigation
  function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const ctaButton = document.querySelector('.cta-button');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        
        if (section) {
          // Close mobile menu if open
          document.querySelector('.mobile-menu').classList.remove('active');
          document.querySelector('.mobile-menu-button i').setAttribute('data-lucide', 'menu');
          lucide.createIcons();
          
          // Scroll to section
          window.scrollTo({
            top: section.offsetTop - 80, // Offset for header
            behavior: 'smooth'
          });
        }
      });
    });

    navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('data-section');
    console.log("Clicked nav for section:", sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
      console.log("Scrolling to:", sectionId);
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    } else {
      console.warn("Section not found for id:", sectionId);
    }
  });
});

    
    // CTA button scroll
    if (ctaButton) {
      ctaButton.addEventListener('click', () => {
        const sectionId = ctaButton.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        
        if (section) {
          window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    }
    
    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
      let currentSection = '';
      const sections = document.querySelectorAll('section');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          currentSection = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSection) {
          link.classList.add('active');
        }
      });
    });
  }
  
  // Project tabs functionality
  function initProjectTabs() {
  const projectTabs = document.querySelectorAll('.project-tab');
  const projectContents = document.querySelectorAll('.project-content');

  projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const projectIndex = tab.getAttribute('data-project');

      // remove previous actives
      projectTabs.forEach(t => t.classList.remove('active'));
      projectContents.forEach(c => c.classList.remove('active'));

      // set new active
      tab.classList.add('active');
      document.querySelector(`.project-content-${projectIndex}`).classList.add('active');
    });
  });
}

  
  // Contact form submission
  function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
      }).then(response => {
        if (response.ok) {
          contactForm.style.display = 'none';
          successMessage.classList.add('active');
          contactForm.reset();
          setTimeout(() => {
            successMessage.classList.remove('active');
            contactForm.style.display = 'block';
          }, 5000);
        } else {
          alert("Oops! There was a problem submitting your form");
        }
      }).catch(error => {
        alert("Oops! There was a problem submitting your form");
      });
    });
  }
}
  
  // Back to top button
  function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
      backToTopButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }
  
  // Add animated class to element when in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }
function toggleVideoDemo(id) {
  const videoDiv = document.getElementById(id);
  if (!videoDiv) return;
  if (videoDiv.style.display === "none" || videoDiv.style.display === "") {
    videoDiv.style.display = "block";
  } else {
    videoDiv.style.display = "none";
    const video = videoDiv.querySelector("video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }
}








// --- Animated stars and falling meteors on a fullscreen canvas ---
const canvas = document.getElementById('stars-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Star particle system
const stars = [];
for(let i=0; i<160; i++){
  stars.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*1.5+0.2,
    speed: 0.2+Math.random()*0.4,
    alpha: 0.4+Math.random()*0.6
  });
}

// Meteor particle system
const meteors = [];
function spawnMeteor() {
  if(Math.random() < 0.025) { // spawn probability
    meteors.push({
      x: Math.random()*canvas.width,
      y: -20,
      vx: 4+Math.random()*4,
      vy: 8+Math.random()*5,
      len: 80+Math.random()*60,
      width: 2+Math.random()*2,
      alpha: 0.8+Math.random()*0.4,
      life: 0
    });
  }
}
function drawMeteor(meteor) {
  ctx.save();
  ctx.globalAlpha = meteor.alpha;
  ctx.strokeStyle = 'rgba(255,255,255,1)';
  ctx.shadowColor = 'rgba(255,255,255,0.7)';
  ctx.shadowBlur = 12;
  ctx.lineWidth = meteor.width;
  ctx.beginPath();
  ctx.moveTo(meteor.x, meteor.y);
  ctx.lineTo(meteor.x-meteor.vx*meteor.len/meteor.vy, meteor.y-meteor.len);
  ctx.stroke();
  ctx.restore();
}

function animateBG(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw stars
  for(let s of stars){
    ctx.save();
    ctx.globalAlpha = s.alpha;
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
    s.y += s.speed;
    if(s.y > canvas.height) s.y = 0;
  }

  // Animate and draw meteors
  spawnMeteor();
  for(let m of meteors){
    drawMeteor(m);
    m.x += m.vx;
    m.y += m.vy;
    m.life++;
  }
  // Remove off-screen meteors
  while (meteors.length && (meteors[0].y > canvas.height || meteors[0].x > canvas.width || meteors[0].life > 48)) {
    meteors.shift();
  }

  requestAnimationFrame(animateBG);
}
animateBG();





