/* =========================================
   0. MOBILE HAMBURGER MENU
   ========================================= */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
  hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', navMenu.classList.contains('active'));
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
   1. CONTACT FORM HANDLING
   ========================================= */
const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", async function(event) {
    event.preventDefault(); // Stop page reload
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
        statusMsg.style.display = "block"; // Show success message
        form.reset(); // Clear input fields
        setTimeout(() => {
          statusMsg.style.display = "none";
        }, 4000); // Hide after 4 seconds
      } else {
        alert("Oops! There was a problem submitting your form.");
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form.");
    }
  });
}

/* =========================================
   2. PROJECT MODAL & GALLERY CONFIGURATION
   ========================================= */
const projectsData = {
  'osTicket': {
    title: "Help Desk Ticketing System (osTicket)",
    description: "Implemented a fully functional, cloud-based ticketing system (osTicket).",
    video: "media/project1/video.mp4",
    images: [
      "Screens/media/project1/osTicket_login.png",
      "Screens/media/project1/php_manager.png",
      "Screens/media/project1/iis.png",
    ]
  },

  'homelab': {
    title: "Home Lab: Network-Wide DNS Sinkhole & Ad Blocker",
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
    images: [] // Add image paths here when ready
  },

  'active directory': {
    title: "Active Directory Project",
    description: "Description for your active directory project.",
    video: "",
    images: [] // Add image paths here when ready
  },
};

/* =========================================
   3. MODAL LOGIC (Do not edit below)
   ========================================= */
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDescription');
const modalVideo = document.getElementById('modalVideo');
const videoSource = document.getElementById('videoSource');
const modalImages = document.getElementById('modalImages');
const slideCounter = document.getElementById('slideCounter');

let currentSlideIndex = 0;
let totalSlides = 0;

function openModal(projectId) {
  const data = projectsData[projectId];
  if (!data) return;

  // 1. Set Title & Description
  modalTitle.innerText = data.title;
  modalDesc.innerText = data.description;

  // 2. Set Video
  if (data.video) {
    videoSource.src = data.video;
    modalVideo.parentElement.style.display = 'block';
    modalVideo.load();
  } else {
    modalVideo.parentElement.style.display = 'none';
  }

  // 3. Set Images
  modalImages.innerHTML = '';
  currentSlideIndex = 0;
  totalSlides = data.images.length;

  if (totalSlides > 0) {
    data.images.forEach((imgSrc, index) => {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = `Screenshot ${index + 1}`;
      if (index === 0) img.classList.add('active');
      modalImages.appendChild(img);
    });
    updateCounter();
    document.querySelector('.carousel-container').style.display = 'flex';
  } else {
    document.querySelector('.carousel-container').style.display = 'none';
  }

  // 4. Show Modal
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleKeyboardNav);
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  if (modalVideo) modalVideo.pause();
  document.removeEventListener('keydown', handleKeyboardNav);
}

function handleKeyboardNav(e) {
  if (e.key === 'ArrowLeft') changeSlide(-1);
  if (e.key === 'ArrowRight') changeSlide(1);
  if (e.key === 'Escape') closeModal();
}

function changeSlide(direction) {
  const images = modalImages.getElementsByTagName('img');
  if (images.length === 0) return;

  images[currentSlideIndex].classList.remove('active');
  currentSlideIndex += direction;

  if (currentSlideIndex >= totalSlides) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = totalSlides - 1;
  }

  images[currentSlideIndex].classList.add('active');
  updateCounter();
}

function updateCounter() {
  if (totalSlides > 0) {
    slideCounter.innerText = `${currentSlideIndex + 1} / ${totalSlides}`;
  } else {
    slideCounter.innerText = "";
  }
}

function closeModalOnOutsideClick(e) {
  if (e.target === modal) closeModal();
}