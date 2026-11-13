/**
 * SmartEvent Presentation Deck Engine
 * Handles 100% viewport slide switching, 3D fan-out animations, keyboard/gesture navigation,
 * laser pointer effect, and fullscreen modal overview.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const slides = Array.from(document.querySelectorAll('.slide'));
  const totalSlides = slides.length;
  let currentSlide = 1;
  let isAnimating = false;

  // Header & Controls
  const progressBar = document.getElementById('progressBar');
  const currentSlideNumEl = document.getElementById('currentSlideNum');
  const totalSlidesNumEl = document.getElementById('totalSlidesNum');
  const hudSlideTitleEl = document.getElementById('hudSlideTitle');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const laserBtn = document.getElementById('laserBtn');
  const gridBtn = document.getElementById('gridBtn');
  const restartBtn = document.getElementById('restartBtn');
  const laserPointer = document.getElementById('laserPointer');
  
  // Modal Elements
  const slideGridModal = document.getElementById('slideGridModal');
  const closeGridBtn = document.getElementById('closeGridBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const gridCardsList = document.getElementById('gridCardsList');

  // Slide Titles Map for HUD & Grid (18 Slides)
  const slideTitles = [
    "SmartEvent: AI-Powered Platform",
    "Team Members",
    "Chapter 01: Introduction",
    "Project Summary & Ecosystem",
    "Challenge & AI Solution",
    "Chapter 02: Database & Analysis",
    "System Use Case Diagram",
    "System Activity Flow",
    "Entity Relationship Diagram (ERD)",
    "Chapter 03: UI/UX Design",
    "Chapter 04: Frontend Development",
    "Frontend Architecture & Dashboards",
    "Chapter 05: Backend Development",
    "Backend Architecture & Core Logic",
    "Chapter 06: Artificial Intelligence",
    "AI Microservice & Smart Logistics",
    "Conclusion & Future Outlook",
    "Thanks & Project Supervision"
  ];

  // Initialize presentation
  initPresentation();

  function initPresentation() {
    totalSlidesNumEl.textContent = String(totalSlides).padStart(2, '0');
    buildGridModalThumbs();
    goToSlide(1, false);
    setupEventListeners();
  }

  /**
   * Navigate to specific slide with smooth animations
   */
  function goToSlide(targetSlide, animate = true) {
    if (targetSlide < 1 || targetSlide > totalSlides || (targetSlide === currentSlide && animate)) return;
    if (isAnimating) return;

    isAnimating = true;
    const prevSlideIdx = currentSlide;
    currentSlide = targetSlide;

    // Update slides classes
    slides.forEach((slide, idx) => {
      const slideNum = idx + 1;
      slide.classList.remove('active', 'prev');

      if (slideNum === currentSlide) {
        slide.classList.add('active');
      } else if (slideNum === prevSlideIdx) {
        slide.classList.add('prev');
      }
    });

    // Special Trigger for Team Fan-out on Slide 2
    if (currentSlide === 2) {
      triggerTeamFanOut();
    }

    // Update HUD & Progress
    updateHUD();

    // Lock animation throttle
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }

  function nextSlide() {
    if (currentSlide < totalSlides) {
      goToSlide(currentSlide + 1);
    }
  }

  function prevSlide() {
    if (currentSlide > 1) {
      goToSlide(currentSlide - 1);
    }
  }

  /**
   * Update Progress Bar & HUD Counter
   */
  function updateHUD() {
    const progressPercent = (currentSlide / totalSlides) * 100;
    progressBar.style.width = `${progressPercent}%`;

    currentSlideNumEl.textContent = String(currentSlide).padStart(2, '0');
    hudSlideTitleEl.textContent = slideTitles[currentSlide - 1] || `Slide ${currentSlide}`;

    // Enable/Disable buttons
    prevBtn.disabled = currentSlide === 1;
    nextBtn.disabled = currentSlide === totalSlides;

    // Update current thumb in grid modal
    document.querySelectorAll('.grid-slide-thumb').forEach((thumb, idx) => {
      thumb.classList.toggle('current', idx + 1 === currentSlide);
    });
  }

  /**
   * Team Slide Fan-Out Re-trigger
   */
  function triggerTeamFanOut() {
    const teamGrid = document.getElementById('teamCardsGrid');
    if (!teamGrid) return;

    const cards = teamGrid.querySelectorAll('.team-member-card');
    cards.forEach(card => {
      card.style.animation = 'none';
      card.offsetHeight; /* trigger reflow */
      card.style.animation = null;
    });
  }

  /**
   * Build Thumbs for Grid Modal
   */
  function buildGridModalThumbs() {
    gridCardsList.innerHTML = '';
    slideTitles.forEach((title, idx) => {
      const slideNum = idx + 1;
      const thumb = document.createElement('div');
      thumb.className = `grid-slide-thumb ${slideNum === currentSlide ? 'current' : ''}`;
      thumb.innerHTML = `
        <div class="thumb-num">SLIDE ${String(slideNum).padStart(2, '0')}</div>
        <div class="thumb-title">${title}</div>
      `;
      thumb.addEventListener('click', () => {
        goToSlide(slideNum);
        closeGridModal();
      });
      gridCardsList.appendChild(thumb);
    });
  }

  function openGridModal() {
    slideGridModal.classList.add('open');
    gridBtn.classList.add('active');
  }

  function closeGridModal() {
    slideGridModal.classList.remove('open');
    gridBtn.classList.remove('active');
  }

  function toggleLaserPointer() {
    const isActive = document.body.classList.toggle('laser-active');
    laserBtn.classList.toggle('active', isActive);
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn('Fullscreen request failed:', err);
      });
      fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
    } else {
      document.exitFullscreen();
      fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
    }
  }

  /**
   * Event Listeners Setup
   */
  function setupEventListeners() {
    // Navigation Buttons
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    if (restartBtn) {
      restartBtn.addEventListener('click', () => goToSlide(1));
    }

    // Modal controls
    gridBtn.addEventListener('click', () => {
      if (slideGridModal.classList.contains('open')) {
        closeGridModal();
      } else {
        openGridModal();
      }
    });
    closeGridBtn.addEventListener('click', closeGridModal);
    modalBackdrop.addEventListener('click', closeGridModal);



    // ================= HIGH-RESOLUTION LIGHTBOX CONTROLLER =================
    const lightboxModal = document.getElementById('diagramLightboxModal');
    const lightboxBackdrop = document.getElementById('lightboxBackdrop');
    const closeLightboxBtn = document.getElementById('closeLightboxBtn');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');

    function openDiagramLightbox(imgSrc, title = 'High-Resolution Diagram Preview') {
      if (!lightboxModal || !lightboxImg) return;
      lightboxImg.src = imgSrc;
      if (lightboxTitle && title) {
        lightboxTitle.innerHTML = `<i class="fa-solid fa-expand text-indigo"></i> ${title}`;
      }
      lightboxModal.classList.add('open');
    }

    function closeDiagramLightbox() {
      if (lightboxModal) {
        lightboxModal.classList.remove('open');
      }
    }

    if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeDiagramLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeDiagramLightbox);

    // Bind Lightbox Zoom on all Diagrams, Figma Mockups, and Dashboards
    document.querySelectorAll('.mockup-screen-container, .diagram-img-wrapper, .fe-dashboard-preview-card, .fe-standalone-img-card, .be-dashboard-preview-card, .ai-dashboard-preview-card').forEach(container => {
      container.addEventListener('click', (e) => {
        const imgSrc = container.getAttribute('data-img');
        if (imgSrc) {
          const imgEl = container.querySelector('img');
          const title = imgEl?.alt || 'High-Resolution Preview';
          openDiagramLightbox(imgSrc, title);
        }
      });
    });

    // Laser & Fullscreen Buttons
    laserBtn.addEventListener('click', toggleLaserPointer);
    fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Keyboard Navigation
    window.addEventListener('keydown', (e) => {
      // Don't intercept if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          nextSlide();
          break;

        case 'ArrowLeft':
        case 'ArrowUp':
        case 'Backspace':
        case 'PageUp':
          e.preventDefault();
          prevSlide();
          break;

        case 'Home':
          e.preventDefault();
          goToSlide(1);
          break;

        case 'End':
          e.preventDefault();
          goToSlide(totalSlides);
          break;

        case 'l':
        case 'L':
          toggleLaserPointer();
          break;

        case 'g':
        case 'G':
          if (slideGridModal.classList.contains('open')) {
            closeGridModal();
          } else {
            openGridModal();
          }
          break;

        case 'f':
        case 'F':
          toggleFullscreen();
          break;

        case 'Escape':
          closeGridModal();
          closeDiagramLightbox();
          if (document.body.classList.contains('laser-active')) {
            toggleLaserPointer();
          }
          break;
      }
    });

    // Mouse Wheel Navigation (debounced)
    let wheelTimeout;
    window.addEventListener('wheel', (e) => {
      if (slideGridModal.classList.contains('open')) return; // Allow scroll in modal
      if (wheelTimeout) return;

      if (e.deltaY > 30) {
        nextSlide();
        wheelTimeout = setTimeout(() => { wheelTimeout = null; }, 600);
      } else if (e.deltaY < -30) {
        prevSlide();
        wheelTimeout = setTimeout(() => { wheelTimeout = null; }, 600);
      }
    }, { passive: true });

    // Touch Swipe Gestures
    let touchStartX = 0;
    let touchStartY = 0;

    window.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (slideGridModal.classList.contains('open')) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // Horizontal swipe detected
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          nextSlide(); // Swiped left -> next
        } else {
          prevSlide(); // Swiped right -> prev
        }
      }
    }, { passive: true });

    // Laser pointer mouse position tracking
    window.addEventListener('mousemove', (e) => {
      if (document.body.classList.contains('laser-active')) {
        laserPointer.style.left = `${e.clientX}px`;
        laserPointer.style.top = `${e.clientY}px`;
      }
    });

    // ================= DEVTOOLS & RIGHT-CLICK PROTECTION =================
    // Disable Right-Click Context Menu
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });

    // Disable DevTools Key Shortcuts
    document.addEventListener('keydown', (e) => {
      // F12
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Inspect Element)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        return false;
      }

      // Ctrl+U / Cmd+U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        return false;
      }

      // Ctrl+S / Cmd+S (Save Page)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        return false;
      }
    });

    // Disable Dragging of Images
    document.addEventListener('dragstart', (e) => {
      if (e.target.nodeName === 'IMG') {
        e.preventDefault();
        return false;
      }
    });
  }
});
