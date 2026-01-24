/* =========================================
   PROJECT DATA CONFIGURATION
   ========================================= */
const projectsData = {
  'active directory': {
    title: "Active Directory Implementation",
    description: "Implemented a fully functional, local-based Active Directory environment using Windows Server.",
    video: "Screens/media/project0/active_directory.mp4",
    images:
      [
        "Screens/media/project0/ad_add_user.png",
        "Screens/media/project0/ad_domain_controller.png",
        "Screens/media/project0/ad_network_sharing.png",
        "Screens/media/project0/ad_rename.png"
      ]
  },
  'osTicket': {
    title: "Help Desk Ticketing System (osTicket)",
    description: "Implemented a fully functional, cloud-based ticketing system (osTicket).",
    images:
      [
        "Screens/media/project1/osTicket_login.png",
        "Screens/media/project1/php_manager.png",
        "Screens/media/project1/iis.png"
      ]
  },
  'homelab': {
    title: "Home Lab: Network-Wide DNS Sinkhole",
    description: "Built a custom dashboard to monitor home network, block ads, and automate routine tasks.",
    images:
      [
        "Screens/media/project2/pi_hole_blocker.png",
        "Screens/media/project2/pi_hole_install.png",
        "Screens/media/project2/pi_hole_dash.png",
        "Screens/media/project2/pi_hole_log.png",
        "Screens/media/project2/pi_vnc_viewer.png"
      ]
  },
  'siem server': {
    title: "SIEM Server Implementation (Wazuh)",
    description: "Configured Wazuh SIEM for real-time threat detection and vulnerability monitoring.",
    images:
      [
        "Screens/media/project3/wazuh_configuration.png",
        "Screens/media/project3/wazuh_dashboard.png",
        "Screens/media/project3/wazuh_discover.png",
        "Screens/media/project3/wazuh_main.png",
        "Screens/media/project3/wazuh_test.png"
      ]
  },
  'podcast website': {
    title: "Podcast Website",
    description: "Co-developed a centralized podcast discovery platform with real-time cloud infrastructure.",
    video: "Screens/media/project4/podcast_website.mp4",
    images:
      [
        "Screens/media/project4/Analytics.png",
        "Screens/media/project4/Community-Sharing.png",
        "Screens/media/project4/Favorite.png",
        "Screens/media/project4/Homepage.png",
        "Screens/media/project4/Login.png",
        "Screens/media/project4/Search.png",
        "Screens/media/project4/Settings.png",
        "Screens/media/project4/Upload.png"
      ]
  },
  'policies and standards': {
    title: "Policies and Standards Implementation",
    description: "Maintained corporate policies and standards for IT operations and cybersecurity.",
    pdfs:
      [
        "Screens/documents/Security-Plan.pdf",
        "Screens/documents/Change-Control-Management-Standard.pdf",
        "Screens/documents/Least-Privilege-Policy.pdf",
        "Screens/documents/Session-Termination-Policy.pdf"
      ]
  },
};

/* =========================================
   MAIN APPLICATION LOGIC
   ========================================= */
document.addEventListener('DOMContentLoaded', function () {

  // --- 1. PROJECT MODAL LOGIC ---
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDescription');
  const modalVideo = document.getElementById('modalVideo');
  const videoSource = document.getElementById('videoSource');
  const modalImages = document.getElementById('modalImages');
  const slideCounter = document.getElementById('slideCounter');
  const closeBtn = document.getElementById('closeModalBtn');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');

  let currentSlideIndex = 0;
  let totalSlides = 0;

  // Function to Open Modal
  function openModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    modalTitle.innerText = data.title;
    modalDesc.innerText = data.description;

    // Handle Video
    if (data.video) {
      videoSource.src = data.video;
      modalVideo.parentElement.style.display = 'block';
      modalVideo.load();
    } else {
      modalVideo.parentElement.style.display = 'none';
    }

    // Handle Images/PDFs
    modalImages.innerHTML = '';
    currentSlideIndex = 0;
    const projectImages = data.images || [];
    const projectPdfs = data.pdfs || [];
    totalSlides = projectImages.length + projectPdfs.length;

    if (totalSlides > 0) {
      // Add Images
      projectImages.forEach((imgSrc, index) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        if (index === 0) img.classList.add('active');
        modalImages.appendChild(img);
      });
      // Add PDFs - SWITCHED TO IFRAME FOR SECURITY POLICY COMPATIBILITY
      projectPdfs.forEach((pdfSrc, index) => {
        const div = document.createElement('div');
        div.className = 'pdf-slide';
        if (projectImages.length === 0 && index === 0) div.classList.add('active');
        // Switched from <embed> to <iframe>
        div.innerHTML = `<iframe src="${pdfSrc}" style="width:100%;height:600px;border:none;"></iframe>`;
        modalImages.appendChild(div);
      });
      updateCounter();
      document.querySelector('.carousel-container').style.display = 'flex';
    } else {
      document.querySelector('.carousel-container').style.display = 'none';
    }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Stop background scrolling
  }

  // Function to Close Modal
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    if (modalVideo) modalVideo.pause();
  }

  // Slide Navigation
  function changeSlide(direction) {
    const slides = modalImages.querySelectorAll('img, .pdf-slide');
    if (slides.length === 0) return;

    slides[currentSlideIndex].classList.remove('active');
    // Calculate new index with wrap-around logic
    currentSlideIndex = (currentSlideIndex + direction + totalSlides) % totalSlides;
    slides[currentSlideIndex].classList.add('active');
    updateCounter();
  }

  function updateCounter() {
    slideCounter.innerText = totalSlides > 0 ? `${currentSlideIndex + 1} / ${totalSlides}` : "";
  }

  // Attach Event Listeners to Buttons
  const projectButtons = document.querySelectorAll('.project-btn');
  projectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  // Attach Modal Control Listeners
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (prevBtn) prevBtn.addEventListener('click', () => changeSlide(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => changeSlide(1));

  // Close on Outside Click or Escape Key
  window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
      if (e.key === 'ArrowLeft') changeSlide(-1);
      if (e.key === 'ArrowRight') changeSlide(1);
      if (e.key === 'Escape') closeModal();
    }
  });


  // --- 2. PROJECT SCROLLER ARROWS ---
  const projectScroller = document.getElementById('projectScroller');
  if (projectScroller) {
    const scrollLeftBtn = document.createElement('button');
    scrollLeftBtn.className = 'scroll-arrow scroll-left';
    scrollLeftBtn.innerHTML = '&#10094;';

    const scrollRightBtn = document.createElement('button');
    scrollRightBtn.className = 'scroll-arrow scroll-right';
    scrollRightBtn.innerHTML = '&#10095;';

    projectScroller.parentElement.appendChild(scrollLeftBtn);
    projectScroller.parentElement.appendChild(scrollRightBtn);

    const scrollAmount = 340;

    scrollLeftBtn.addEventListener('click', () => {
      projectScroller.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    scrollRightBtn.addEventListener('click', () => {
      projectScroller.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Update Arrow Visibility
    function updateArrowVisibility() {
      const scrollLeft = projectScroller.scrollLeft;
      const scrollWidth = projectScroller.scrollWidth;
      const clientWidth = projectScroller.clientWidth;
      scrollLeftBtn.style.opacity = scrollLeft > 10 ? '1' : '0.3';
      scrollRightBtn.style.opacity = scrollLeft < scrollWidth - clientWidth - 10 ? '1' : '0.3';
    }

    projectScroller.addEventListener('scroll', updateArrowVisibility);
    window.addEventListener('resize', updateArrowVisibility);
    updateArrowVisibility();
  }


  // --- 3. HAMBURGER MENU ---
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('header')) {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }


  // --- 4. CONTACT FORM (AJAX) ---
  const form = document.getElementById("contactForm");
  const statusMsg = document.getElementById("formStatus");
  const submitBtn = document.getElementById("contactForm-button");

  if (form) {
    async function handleSubmit(event) {
      event.preventDefault();
      const data = new FormData(event.target);

      statusMsg.style.display = "block";
      statusMsg.style.color = "var(--muted)";
      statusMsg.innerHTML = "Sending...";
      if (submitBtn) submitBtn.disabled = true;

      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          statusMsg.style.color = "#4ade80";
          statusMsg.innerHTML = "✓ Message sent!";
          form.reset();
          setTimeout(() => { statusMsg.style.display = "none"; }, 5000);
        } else {
          response.json().then(data => {
            statusMsg.style.color = "#f87171";
            if (Object.hasOwn(data, 'errors')) {
              statusMsg.innerHTML = data["errors"].map(error => error["message"]).join(", ");
            } else {
              statusMsg.innerHTML = "Oops! Problem submitting form";
            }
          })
        }
      }).catch(error => {
        statusMsg.style.color = "#f87171";
        statusMsg.innerHTML = "Oops! Network error.";
      }).finally(() => {
        if (submitBtn) submitBtn.disabled = false;
      });
    }
    form.addEventListener("submit", handleSubmit);
  }

});