/**
 * RetreatX Costa Rica — Main JavaScript
 */

// ─── Navigation ───────────────────────────────────────────────────────────────
(function initNav() {
  const hamburger = document.querySelector('.nav__hamburger');
  const navLinks  = document.querySelector('.nav__links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // Highlight active nav link by current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();


// ─── Scroll-reveal ────────────────────────────────────────────────────────────
(function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach(el => observer.observe(el));
})();


// ─── Magic-Link Registration Form ─────────────────────────────────────────────
(function initMagicLinkForm() {
  const forms = document.querySelectorAll('.magic-link-form');

  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const emailInput = form.querySelector('input[type="email"]');
      const successBox = form.closest('.register__form-card, .login-card')
        ?.querySelector('.form-success');

      if (!emailInput) return;

      const email = emailInput.value.trim();
      if (!email || !isValidEmail(email)) {
        emailInput.style.borderColor = '#ff4444';
        emailInput.focus();
        return;
      }

      emailInput.style.borderColor = '';

      // Simulate sending magic link
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending…';
      }

      setTimeout(() => {
        form.style.display = 'none';
        if (successBox) {
          successBox.classList.add('active');
          successBox.innerHTML =
            '✔ Magic Link sent to <strong>' +
            escapeHtml(email) +
            '</strong>.<br>Check your inbox to access your secure vault.';
        }
      }, 1200);
    });
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();


// ─── Retreat Map ──────────────────────────────────────────────────────────────
(function initRetreatMap() {
  const mapContainer = document.getElementById('retreat-map');
  if (!mapContainer) return;

  const retreats = [
    {
      id: 'nosara',
      name: 'Nosara',
      tagline: 'The Yoga Capital',
      description: 'Immerse yourself in Vinyasa & Detox programmes amid pristine jungle and Pacific beaches. A sanctuary for mindful movement.',
      price: 'from $1,890 / week',
      emoji: '🧘',
      // Approximate position as % of map container (left, top)
      left: '24%',
      top:  '48%',
    },
    {
      id: 'santa-teresa',
      name: 'Santa Teresa',
      tagline: 'Surf & Soul',
      description: 'A perfect blend of world-class surfing and deep meditation. Ride the waves by day, heal your spirit by night.',
      price: 'from $2,150 / week',
      emoji: '🏄',
      left: '18%',
      top:  '58%',
    },
    {
      id: 'puerto-viejo',
      name: 'Puerto Viejo (Wolaba)',
      tagline: 'Deep Transformation',
      description: 'Home of the XScouts. Plant Medicine & Sound Healing ceremonies guided by expert practitioners in an electric jungle setting.',
      price: 'from $2,490 / week',
      emoji: '🌿',
      left: '74%',
      top:  '52%',
    },
    {
      id: 'osa',
      name: 'Osa Peninsula',
      tagline: 'Wildlife Immersion',
      description: 'Lose yourself in the world\'s most biodiverse jungle. Deep eco-retreats surrounded by scarlet macaws, sloths, and ancient trees.',
      price: 'from $3,200 / week',
      emoji: '🦜',
      left: '30%',
      top:  '72%',
    },
  ];

  // Build SVG Costa Rica outline + pins
  const mapHTML = `
    <div class="map-placeholder">
      <div class="map-placeholder__bg"></div>
      <div class="map-hotspot-container" id="map-hotspots">
        ${retreats.map(r => `
          <button
            class="map-pin"
            style="left:${r.left}; top:${r.top};"
            data-retreat="${r.id}"
            aria-label="Open details for ${r.name}"
          >
            <div class="map-pin__pulse"></div>
            <div class="map-pin__dot"></div>
            <span class="map-pin__label">📍 ${r.name}</span>
          </button>
        `).join('')}
      </div>

      <!-- SVG Costa Rica silhouette (simplified) -->
      <svg
        viewBox="0 0 400 300"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style="position:absolute;inset:0;width:100%;height:100%;opacity:0.18;pointer-events:none;"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M 85 80 L 100 72 L 120 68 L 145 65 L 170 60 L 195 58 L 215 62 L 240 60
             L 265 65 L 285 72 L 295 80 L 300 90 L 305 105 L 308 118 L 305 130
             L 295 145 L 280 158 L 265 168 L 250 175 L 235 185 L 225 198 L 215 210
             L 200 220 L 185 228 L 170 232 L 155 230 L 142 222 L 130 212 L 118 200
             L 108 188 L 100 175 L 90 162 L 80 148 L 74 135 L 72 120 L 75 105 Z"
          fill="none"
          stroke="#39FF14"
          stroke-width="2"
        />
        <!-- Pacific label -->
        <text x="40" y="160" fill="#39FF14" font-size="10" opacity="0.5" font-family="monospace">PACIFIC</text>
        <!-- Caribbean label -->
        <text x="310" y="130" fill="#39FF14" font-size="10" opacity="0.5" font-family="monospace">CARIBBEAN</text>
      </svg>

      <div class="map-placeholder__text" style="position:relative;z-index:2;">
        <span class="icon" aria-hidden="true">🗺️</span>
        <p style="color:#555;font-size:0.75rem;max-width:240px;margin:0 auto;">
          Interactive Google Maps integration available.<br>
          Click a pin to explore a retreat location.
        </p>
      </div>
    </div>

    <!-- Popups -->
    ${retreats.map(r => `
      <div class="map-popup" id="popup-${r.id}" role="dialog" aria-label="${r.name} retreat details">
        <button class="map-popup__close" data-close="${r.id}" aria-label="Close popup">✕</button>
        <div class="map-popup__img" aria-hidden="true">${r.emoji}</div>
        <div class="map-popup__location">📍 ${r.name}</div>
        <h4>${r.tagline}</h4>
        <p>${r.description}</p>
        <div class="map-popup__price">${r.price}</div>
        <button class="btn btn-primary map-popup__book-btn" data-retreat="${r.id}" style="width:100%;justify-content:center;">
          🗓 Register & Book
        </button>
      </div>
    `).join('')}
  `;

  mapContainer.innerHTML = mapHTML;

  // Attach pin click listeners
  document.querySelectorAll('.map-pin').forEach(pin => {
    pin.addEventListener('click', () => {
      const id = pin.dataset.retreat;
      openPopup(id);
    });
  });

  // Attach close button listeners
  document.querySelectorAll('.map-popup__close').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.close;
      closePopup(id);
    });
  });

  // Attach book / register button listeners
  document.querySelectorAll('.map-popup__book-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.retreat;
      const retreat = retreats.find(r => r.id === id);
      closePopup(id);
      if (retreat) selectRetreatForBooking(retreat);
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('.map-popup') && !e.target.closest('.map-pin')) {
      document.querySelectorAll('.map-popup.active').forEach(p => p.classList.remove('active'));
    }
  });

  // Keyboard ESC to close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.map-popup.active').forEach(p => p.classList.remove('active'));
    }
  });

  function openPopup(id) {
    // Close all others first
    document.querySelectorAll('.map-popup.active').forEach(p => p.classList.remove('active'));

    const popup = document.getElementById('popup-' + id);
    if (!popup) return;

    // Position popup near the pin
    const pin = document.querySelector(`[data-retreat="${id}"]`);
    if (pin) {
      const mapRect = mapContainer.getBoundingClientRect();
      const pinRect  = pin.getBoundingClientRect();
      const relLeft  = pinRect.left - mapRect.left;
      const relTop   = pinRect.top  - mapRect.top;

      // Position popup to the right of pin, or left if near edge
      let popupLeft = relLeft + 20;
      const popupWidth = 300;
      if (popupLeft + popupWidth > mapRect.width - 20) {
        popupLeft = relLeft - popupWidth - 20;
      }
      let popupTop = relTop - 40;
      if (popupTop < 10) popupTop = 10;

      popup.style.left = popupLeft + 'px';
      popup.style.top  = popupTop + 'px';
    }

    popup.classList.add('active');
  }

  function closePopup(id) {
    const popup = document.getElementById('popup-' + id);
    if (popup) popup.classList.remove('active');
  }

  function selectRetreatForBooking(retreat) {
    // Show banner with retreat details above the registration form
    const banner = document.getElementById('booking-retreat-banner');
    if (banner) {
      banner.innerHTML = `
        <div class="booking-retreat-banner__inner">
          <div class="booking-retreat-banner__emoji" aria-hidden="true">${retreat.emoji}</div>
          <div class="booking-retreat-banner__info">
            <div class="booking-retreat-banner__label">Selected Retreat</div>
            <h4 class="booking-retreat-banner__name">${retreat.name}</h4>
            <div class="booking-retreat-banner__tagline">${retreat.tagline}</div>
            <p class="booking-retreat-banner__desc">${retreat.description}</p>
            <div class="booking-retreat-banner__price">${retreat.price}</div>
          </div>
          <button class="booking-retreat-banner__clear" aria-label="Clear retreat selection">✕</button>
        </div>
      `;
      banner.style.display = 'block';
      banner.style.animation = 'fadeIn 0.35s ease';
      banner.querySelector('.booking-retreat-banner__clear').addEventListener('click', () => {
        banner.style.display = 'none';
        resetBookingForm();
      });
    }

    // Update form card heading and subtitle
    const formCard = document.querySelector('.register__form-card');
    if (formCard) {
      const heading = formCard.querySelector('h3');
      if (heading) heading.textContent = 'Book ' + retreat.name;
      const subtitle = formCard.querySelector('.subtitle');
      if (subtitle) subtitle.textContent =
        'Enter your email to secure your spot at ' + retreat.name + '. You will receive a Magic Link to confirm your booking.';
    }

    // Track selected retreat in a hidden form input
    const form = document.querySelector('.magic-link-form');
    if (form) {
      let hiddenInput = form.querySelector('input[name="retreat"]');
      if (!hiddenInput) {
        hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'retreat';
        form.appendChild(hiddenInput);
      }
      hiddenInput.value = retreat.id;
    }

    // Smooth-scroll to the register section
    const registerSection = document.getElementById('register');
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function resetBookingForm() {
    const formCard = document.querySelector('.register__form-card');
    if (formCard) {
      const heading = formCard.querySelector('h3');
      if (heading) heading.textContent = 'Join the Elite';
      const subtitle = formCard.querySelector('.subtitle');
      if (subtitle) subtitle.textContent =
        'Enter your email to receive a secure Magic Link and access your personal transformation portal.';
    }
    const form = document.querySelector('.magic-link-form');
    if (form) {
      const hiddenInput = form.querySelector('input[name="retreat"]');
      if (hiddenInput) hiddenInput.remove();
    }
  }
})();


// ─── Google Maps loader (called by Maps API callback) ─────────────────────────
/* global google */
function initGoogleMap() {
  const el = document.getElementById('retreat-map');
  if (!el || typeof google === 'undefined') return;

  const map = new google.maps.Map(el, {
    center: { lat: 9.748917, lng: -83.753428 },
    zoom: 8,
    styles: [
      { elementType: 'geometry',        stylers: [{ color: '#0d1a0d' }] },
      { elementType: 'labels.text.fill',stylers: [{ color: '#39FF14' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#000' }] },
      { featureType: 'road',            elementType: 'geometry', stylers: [{ color: '#1a2a1a' }] },
      { featureType: 'water',           elementType: 'geometry', stylers: [{ color: '#051a05' }] },
      { featureType: 'poi.park',        elementType: 'geometry', stylers: [{ color: '#0f2a0f' }] },
    ],
    disableDefaultUI: true,
    zoomControl: true,
  });

  const retreatLocations = [
    { lat: 9.9784,  lng: -85.6633, name: 'Nosara',           tagline: 'The Yoga Capital',     emoji: '🧘', description: 'Immerse yourself in Vinyasa & Detox programmes.', price: 'from $1,890 / week', id: 'nosara' },
    { lat: 9.6501,  lng: -85.1695, name: 'Santa Teresa',     tagline: 'Surf & Soul',           emoji: '🏄', description: 'Surfing and deep meditation in a Pacific paradise.', price: 'from $2,150 / week', id: 'santa-teresa' },
    { lat: 9.6559,  lng: -82.7527, name: 'Puerto Viejo',     tagline: 'Deep Transformation',   emoji: '🌿', description: 'Plant Medicine & Sound Healing. Home of the XScouts.', price: 'from $2,490 / week', id: 'puerto-viejo' },
    { lat: 8.5380,  lng: -83.4974, name: 'Osa Peninsula',    tagline: 'Wildlife Immersion',    emoji: '🦜', description: 'Deep Jungle Eco-Retreats in the world\'s most biodiverse area.', price: 'from $3,200 / week', id: 'osa' },
  ];

  retreatLocations.forEach(loc => {
    const marker = new google.maps.Marker({
      position: { lat: loc.lat, lng: loc.lng },
      map,
      title: loc.name,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#39FF14',
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 2,
      },
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="background:#111;color:#f0f0f0;padding:1rem;min-width:220px;border-left:3px solid #39FF14;font-family:Arial,sans-serif;">
          <div style="font-size:1.8rem;margin-bottom:0.5rem;">${loc.emoji}</div>
          <div style="font-size:0.7rem;color:#39FF14;letter-spacing:.1em;text-transform:uppercase;margin-bottom:0.3rem;">📍 ${loc.name}</div>
          <strong style="font-size:0.95rem;">${loc.tagline}</strong>
          <p style="font-size:0.8rem;color:#888;margin:.5rem 0;">${loc.description}</p>
          <div style="font-size:1.1rem;color:#39FF14;font-weight:bold;margin-bottom:.75rem;">${loc.price}</div>
          <a href="https://mycompany.retreatx.com/book?location=${loc.id}"
             style="display:inline-block;background:#39FF14;color:#000;padding:0.4rem 1rem;font-size:0.8rem;font-weight:bold;text-decoration:none;"
             target="_blank" rel="noopener noreferrer">
            Book Now via MyCompany
          </a>
        </div>
      `,
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  });
}
