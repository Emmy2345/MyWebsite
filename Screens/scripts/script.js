/* =========================================
   0. PROJECT CAROUSEL SCROLL ARROWS
   ========================================= */
document.addEventListener('DOMContentLoaded', function() {
  const projectScroller = document.getElementById('projectScroller');
  
  if (projectScroller) {
    // Create scroll arrow buttons
    const scrollLeftBtn = document.createElement('button');
    scrollLeftBtn.className = 'scroll-arrow scroll-left';
    scrollLeftBtn.innerHTML = '&#10094;';
    scrollLeftBtn.setAttribute('aria-label', 'Scroll projects left');
    
    const scrollRightBtn = document.createElement('button');
    scrollRightBtn.className = 'scroll-arrow scroll-right';
    scrollRightBtn.innerHTML = '&#10095;';
    scrollRightBtn.setAttribute('aria-label', 'Scroll projects right');
    
    // Append to the wrapper (parent of projectScroller)
    projectScroller.parentElement.appendChild(scrollLeftBtn);
    projectScroller.parentElement.appendChild(scrollRightBtn);
    
    // Scroll functionality
    const scrollAmount = 340; // Card width + gap
    
    scrollLeftBtn.addEventListener('click', function() {
      projectScroller.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    
    scrollRightBtn.addEventListener('click', function() {
      projectScroller.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    
    // Update arrow visibility
    function updateArrowVisibility() {
      const scrollLeft = projectScroller.scrollLeft;
      const scrollWidth = projectScroller.scrollWidth;
      const clientWidth = projectScroller.clientWidth;
      
      scrollLeftBtn.style.opacity = scrollLeft > 10 ? '1' : '0.3';
      scrollRightBtn.style.opacity = scrollLeft < scrollWidth - clientWidth - 10 ? '1' : '0.3';
    }
    
    projectScroller.addEventListener('scroll', updateArrowVisibility);
    window.addEventListener('resize', updateArrowVisibility);
    updateArrowVisibility(); // Initial check
  }
});

/* =========================================
   1. MOBILE HAMBURGER MENU
   ========================================= */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
  hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    const isActive = navMenu.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isActive);
  });

  // Close menu when a link is clicked
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('header')) {
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* =========================================
   2. CONTACT FORM HANDLING
   ========================================= */
const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", async function(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    try {
      const response = await fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        statusMsg.style.display = "block";
        form.reset();
        setTimeout(() => {
          statusMsg.style.display = "none";
        }, 4000);
      } else {
        alert("Oops! There was a problem submitting your form.");
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form.");
    }
  });
}

/* =========================================
   3. PROJECT DATA
   ========================================= */
const projectsData = {

'active directory': {
    title: "Active Directory Implementation",
    description: "Implemented a fully functional, local-based Active Directory environment using Windows Server.",
    video: "Screens/media/project0/active_directory.mp4",
    images: [
      "Screens/media/project0/ad_add_user.png",
      "Screens/media/project0/ad_domain_controller.png",
      "Screens/media/project0/ad_network_sharing.png",
      "Screens/media/project0/ad_rename.png",
    ]
  },

  'osTicket': {
    title: "Help Desk Ticketing System (osTicket)",
    description: "Implemented a fully functional, cloud-based ticketing system (osTicket).",
    video: "",
    images: [
      "Screens/media/project1/osTicket_login.png",
      "Screens/media/project1/php_manager.png",
      "Screens/media/project1/iis.png",
    ]
  },

  'homelab': {
    title: "Home Lab: Network-Wide DNS Sinkhole",
    description: "Built a custom dashboard to monitor home network, block ads, and automate routine tasks.",
    video: "",
    images: [
      "Screens/media/project2/pi_hole_blocker.png",
      "Screens/media/project2/pi_hole_install.png",
      "Screens/media/project2/pi_hole_dash.png",
      "Screens/media/project2/pi_hole_log.png",
      "Screens/media/project2/pi_vnc_viewer.png",
    ]
  },

  'siem server': {
    title: "SIEM Server Implementation (Wazuh)",
    description: "Configured Wazuh SIEM for real-time threat detection and vulnerability monitoring.",
    video: "",
    images: [
      "Screens/media/project3/wazuh_configuration.png",
      "Screens/media/project3/wazuh_dashboard.png",
      "Screens/media/project3/wazuh_discover.png",
      "Screens/media/project3/wazuh_main.png",
      "Screens/media/project3/wazuh_test.png",
    ]
  },

  'podcast website': {
    title: "Podcast Website",
    description: "Co-developed a centralized podcast discovery platform that allows users to create, curate, and share collaborative audio playlists using real-time cloud infrastructure.",
    video: "Screens/media/project4/podcast_website.mp4",
    images: [
      "Screens/media/project4/Analytics.png",
      "Screens/media/project4/Community-Sharing.png",
      "Screens/media/project4/Favorite.png",
      "Screens/media/project4/Homepage.png",
      "Screens/media/project4/Login.png",
      "Screens/media/project4/Search.png",
      "Screens/media/project4/Settings.png",
      "Screens/media/project4/Upload.png",
    ]
  },

 'policies and standards': {
    title: "Policies and Standards Implementation",
    description: "Implemented and maintained corporate policies and standards for IT operations and cybersecurity.",
    video: "",
    images: [], 
    pdfs: [
      "Screens/documents/Security-Plan.pdf",
      "Screens/documents/Change-Control-Management-Standard.pdf",
      "Screens/documents/Least-Privilege-Policy.pdf",
      "Screens/documents/Session-Termination-Policy.pdf",
    ]
  },
};

/* =========================================
   4. MODAL LOGIC
   ========================================= */
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDescription');
  const modalVideo = document.getElementById('modalVideo');
  const videoSource = document.getElementById('videoSource');
  const modalImages = document.getElementById('modalImages');
  const slideCounter = document.getElementById('slideCounter');

  let currentSlideIndex = 0;
  let totalSlides = 0;

  window.openModal = function(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    modalTitle.innerText = data.title;
    modalDesc.innerText = data.description;

    if (data.video) {
      videoSource.src = data.video;
      modalVideo.parentElement.style.display = 'block';
      modalVideo.load();
    } else {
      modalVideo.parentElement.style.display = 'none';
    }

    modalImages.innerHTML = '';
    currentSlideIndex = 0;

    const projectImages = data.images || [];
    const projectPdfs = data.pdfs || [];

    totalSlides = projectImages.length + projectPdfs.length;

    if (totalSlides > 0) {
      projectImages.forEach((imgSrc, index) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `Screenshot ${index + 1}`;
        if (index === 0) img.classList.add('active');
        modalImages.appendChild(img);
      });

      if (projectPdfs.length > 0) {
        projectPdfs.forEach((pdfSrc, index) => {
          const pdfContainer = document.createElement('div');
          pdfContainer.className = 'pdf-slide';
          if (projectImages.length === 0 && index === 0) pdfContainer.classList.add('active');
          pdfContainer.innerHTML = `<embed src="${pdfSrc}" type="application/pdf" style="width:100%;height:600px;">`;
          modalImages.appendChild(pdfContainer);
        });
      }

      updateCounter();
      document.querySelector('.carousel-container').style.display = 'flex';
    } else {
      document.querySelector('.carousel-container').style.display = 'none';
    }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyboardNav);
  };

  window.closeModal = function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    if (modalVideo) modalVideo.pause();
    document.removeEventListener('keydown', handleKeyboardNav);
  };

  window.changeSlide = function(direction) {
    const slides = modalImages.querySelectorAll('img, .pdf-slide');
    if (slides.length === 0) return;

    slides[currentSlideIndex].classList.remove('active');
    currentSlideIndex += direction;

    if (currentSlideIndex >= totalSlides) {
      currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
      currentSlideIndex = totalSlides - 1;
    }

    slides[currentSlideIndex].classList.add('active');
    updateCounter();
  };

  window.updateCounter = function() {
    if (totalSlides > 0) {
      slideCounter.innerText = `${currentSlideIndex + 1} / ${totalSlides}`;
    } else {
      slideCounter.innerText = "";
    }
  };

  window.closeModalOnOutsideClick = function(e) {
    if (e.target === modal) closeModal();
  };

  window.handleKeyboardNav = function(e) {
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
    if (e.key === 'Escape') closeModal();
  };
});