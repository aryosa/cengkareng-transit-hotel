(function () {
  const data = window.CTH_DATA;
  const whatsappBase = `https://wa.me/${data.whatsappNumber}?text=`;
  const desktopBookButton = document.getElementById("desktop-book-button");
  const guestSummaryButton = document.getElementById("booking-guest-summary");
  const guestPanel = document.getElementById("guest-room-panel");
  const roomTypeSelect = document.getElementById("desktop-room-type");
  const backToTopButton = document.querySelector(".back-to-top");
  const reservationModal = document.getElementById("reservation-modal");
  const promoModal = document.getElementById("promo-modal");
  const reservationForm = document.getElementById("reservation-form");
  const reservationStatus = document.getElementById("reservation-status");
  const rangeInput = document.getElementById("booking-range-input");
  const heroTrack = document.getElementById("hero-slides");
  const heroDots = document.getElementById("hero-dots");
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.getElementById("site-nav");
  const footerYear = document.getElementById("footer-year");

  const state = {
    checkIn: startOfDay(new Date()),
    checkOut: addDays(startOfDay(new Date()), 1),
    rangeConfirmed: false,
    roomType: "Superior",
    guests: 1,
    rooms: 1,
    activeHero: 0
  };

  renderServices();
  renderRooms();
  renderMenu();
  renderReviews();
  initHeroSlider();
  initStickyBits();
  initGuestPanel();
  initRangePicker();
  initReservationModal();
  initPromoModal();
  initNav();
  renderFooterYear();
  renderState();

  function startOfDay(date) {
    const next = new Date(date);
    next.setHours(0, 0, 0, 0);
    return next;
  }

  function addDays(date, days) {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
  }

  function nightsBetween() {
    return Math.max(1, Math.round((state.checkOut - state.checkIn) / 86400000));
  }

  function getRoom(roomName) {
    return data.rooms.find((room) => room.name === roomName) || data.rooms[0];
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric"
    }).format(date);
  }

  function formatMoney(value) {
    return `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderServices() {
    document.getElementById("services-grid").innerHTML = data.services
      .map((service) => `
        <article class="service-card">
          <img class="service-card__icon" src="${service.image}" alt="${escapeHtml(service.title)}" loading="lazy">
          <h3>${escapeHtml(service.title)}</h3>
          <p>${escapeHtml(service.description)}</p>
        </article>
      `)
      .join("");
  }

  function renderRooms() {
    document.getElementById("rooms-list").innerHTML = data.rooms
      .map((room) => `
        <article class="room-card" id="room-${room.id}">
          <div class="room-card__gallery" data-room-gallery="${room.id}">
            <div class="room-card__main">
              <img src="${room.images[0]}" alt="${escapeHtml(room.title)}" data-room-main-image="${room.id}" loading="lazy">
            </div>
            <div class="room-card__thumbs">
              ${room.images
                .map((image, index) => `
                  <button class="room-card__thumb${index === 0 ? " is-active" : ""}" type="button" data-room-thumb="${room.id}" data-room-image="${image}" aria-label="Show ${escapeHtml(room.title)} image ${index + 1}">
                    <img src="${image}" alt="" loading="lazy">
                  </button>
                `)
                .join("")}
            </div>
          </div>

          <div class="room-card__body">
            <div class="room-card__header">
              <div>
                <h3>${escapeHtml(room.title)}</h3>
                <ul class="room-card__meta">
                  <li><span class="room-card__meta-icon room-card__meta-icon--size" aria-hidden="true"></span><span>${escapeHtml(room.roomSize)}</span></li>
                  <li><span class="room-card__meta-icon room-card__meta-icon--capacity" aria-hidden="true"></span><span>${escapeHtml(room.capacity)}</span></li>
                  <li><span class="room-card__meta-icon room-card__meta-icon--bed" aria-hidden="true"></span><span>${escapeHtml(room.bedType)}</span></li>
                  <li><span class="room-card__meta-icon room-card__meta-icon--checkin" aria-hidden="true"></span><span>${escapeHtml(room.checkIn)}</span></li>
                </ul>
              </div>

              <div class="room-card__rates">
                <span class="room-card__rates-label">Publish Rate</span>
                <span class="room-card__rate-from">${formatMoney(room.publishRate)}</span>
                <span class="room-card__rate">${formatMoney(room.bookingRate)}<small>/malam</small></span>
                <span class="room-card__rate-inline">(${escapeHtml(room.breakfastNote)})</span>
              </div>
            </div>

            <div class="room-card__detail-panels">
              <div class="room-card__detail-panel">
                <span class="room-card__section-title">Facilities</span>
                <ul class="pill-list">
                  ${room.facilities.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                </ul>
              </div>

              <div class="room-card__detail-panel">
                <span class="room-card__section-title">Compliment</span>
                <ul class="pill-list">
                  ${room.compliments.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                </ul>
              </div>
            </div>

            <div class="room-card__actions">
              <button class="button button--primary" type="button" data-room-book="${room.name}">Book Now</button>
              <span class="room-card__rate-inline" data-room-rate-inline="${room.name}">${formatMoney(room.bookingRate)} x ${nightsBetween()} malam</span>
            </div>
          </div>
        </article>
      `)
      .join("");

    document.querySelectorAll("[data-room-thumb]").forEach((button) => {
      button.addEventListener("click", () => {
        const roomId = button.getAttribute("data-room-thumb");
        const image = button.getAttribute("data-room-image");
        const mainImage = document.querySelector(`[data-room-main-image="${roomId}"]`);
        if (!mainImage) return;
        mainImage.src = image;
        document.querySelectorAll(`[data-room-thumb="${roomId}"]`).forEach((thumb) => thumb.classList.remove("is-active"));
        button.classList.add("is-active");
      });
    });

    document.querySelectorAll("[data-room-book]").forEach((button) => {
      button.addEventListener("click", () => {
        state.roomType = button.getAttribute("data-room-book");
        roomTypeSelect.value = state.roomType;
        renderState();
        openModal(reservationModal);
      });
    });
  }

  function renderMenu() {
    document.getElementById("menu-grid").innerHTML = data.menuItems
      .map((item) => `
        <article class="menu-card">
          <img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy">
          <div class="menu-card__body">
            <span class="menu-tag">Menu</span>
            <h3>${escapeHtml(item.title)}</h3>
          </div>
        </article>
      `)
      .join("");
  }

  function renderReviews() {
    document.getElementById("review-grid").innerHTML = data.reviews
      .map((review) => `
        <article class="review-card">
          <div class="review-card__head">
            <img class="review-card__avatar" src="${review.avatar}" alt="${escapeHtml(review.name)}" loading="lazy">
            <div>
              <strong class="review-card__name">${escapeHtml(review.name)}</strong>
              <span class="review-card__place">${escapeHtml(review.place)}</span>
            </div>
          </div>
          <p>&ldquo;${escapeHtml(review.quote)}&rdquo;</p>
        </article>
      `)
      .join("");
  }

  function renderState() {
    const room = getRoom(state.roomType);
    const nights = nightsBetween();
    const total = room.bookingRate * nights;

    document.querySelectorAll("[data-checkin-text]").forEach((node) => {
      node.textContent = formatDate(state.checkIn);
    });
    document.querySelectorAll("[data-checkout-text]").forEach((node) => {
      node.textContent = formatDate(state.checkOut);
    });
    document.querySelectorAll("[data-guest-summary]").forEach((node) => {
      node.textContent = `${state.guests} guest(s), ${state.rooms} room(s)`;
    });
    document.querySelectorAll('[data-counter-value="guests"]').forEach((node) => {
      node.textContent = String(state.guests);
    });
    document.querySelectorAll('[data-counter-value="rooms"]').forEach((node) => {
      node.textContent = String(state.rooms);
    });
    document.querySelectorAll("[data-duration-text]").forEach((node) => {
      node.textContent = state.rangeConfirmed
        ? `Duration: ${nights} ${nights === 1 ? "night" : "nights"}`
        : "Pilih tanggal menginap untuk melanjutkan.";
    });
    document.querySelectorAll("[data-room-rate-inline]").forEach((node) => {
      const rateRoom = getRoom(node.getAttribute("data-room-rate-inline"));
      node.textContent = `${formatMoney(rateRoom.bookingRate)} x ${nights} malam`;
    });

    desktopBookButton.disabled = !state.rangeConfirmed;

    const summaryCheckin = document.querySelector("[data-summary-checkin]");
    const summaryCheckout = document.querySelector("[data-summary-checkout]");
    const summaryRoom = document.querySelector("[data-summary-room]");
    const summaryGuests = document.querySelector("[data-summary-guests]");
    const summaryDuration = document.querySelector("[data-summary-duration]");
    const summaryRate = document.querySelector("[data-summary-rate]");

    summaryCheckin.textContent = formatDate(state.checkIn);
    summaryCheckout.textContent = formatDate(state.checkOut);
    summaryRoom.textContent = room.title;
    summaryGuests.textContent = `${state.guests} guest(s), ${state.rooms} room(s)`;
    summaryDuration.textContent = `${nights} ${nights === 1 ? "night" : "nights"}`;
    summaryRate.textContent = formatMoney(total);
  }

  function initHeroSlider() {
    const slides = Array.from(document.querySelectorAll(".hero-slide"));
    const dots = Array.from(document.querySelectorAll("[data-hero-dot]"));
    const prev = document.querySelector("[data-slider-prev]");
    const next = document.querySelector("[data-slider-next]");
    let intervalId = window.setInterval(() => setHero(state.activeHero + 1), 5000);

    function resetInterval() {
      window.clearInterval(intervalId);
      intervalId = window.setInterval(() => setHero(state.activeHero + 1), 5000);
    }

    function setHero(index) {
      state.activeHero = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === state.activeHero));
      dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === state.activeHero));
    }

    prev.addEventListener("click", () => {
      setHero(state.activeHero - 1);
      resetInterval();
    });

    next.addEventListener("click", () => {
      setHero(state.activeHero + 1);
      resetInterval();
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        setHero(Number(dot.getAttribute("data-hero-dot")));
        resetInterval();
      });
    });

    heroTrack.addEventListener("click", (event) => {
      const button = event.target.closest("[data-promo-index]");
      if (!button) return;
      const promoIndex = Number(button.getAttribute("data-promo-index"));
      openPromo(promoIndex);
    });
  }

  function initStickyBits() {
    window.addEventListener("scroll", () => {
      backToTopButton.classList.toggle("is-visible", window.scrollY > 240);
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function initNav() {
    navToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function renderFooterYear() {
    if (footerYear) footerYear.textContent = String(new Date().getFullYear());
  }

  function initGuestPanel() {
    guestSummaryButton.addEventListener("click", () => {
      const isExpanded = guestSummaryButton.getAttribute("aria-expanded") === "true";
      guestSummaryButton.setAttribute("aria-expanded", String(!isExpanded));
      guestPanel.hidden = isExpanded;
    });

    document.querySelector("[data-close-guest-panel]").addEventListener("click", () => {
      guestSummaryButton.setAttribute("aria-expanded", "false");
      guestPanel.hidden = true;
    });

    document.addEventListener("click", (event) => {
      if (guestPanel.hidden) return;
      if (guestPanel.contains(event.target) || guestSummaryButton.contains(event.target)) return;
      guestSummaryButton.setAttribute("aria-expanded", "false");
      guestPanel.hidden = true;
    });

    roomTypeSelect.addEventListener("change", () => {
      state.roomType = roomTypeSelect.value;
      renderState();
    });

    document.querySelectorAll("[data-counter]").forEach((counter) => {
      counter.addEventListener("click", (event) => {
        const button = event.target.closest("[data-counter-action]");
        if (!button) return;
        const counterName = counter.getAttribute("data-counter");
        const action = button.getAttribute("data-counter-action");
        const step = action === "increment" ? 1 : -1;

        if (counterName === "guests") {
          state.guests = clamp(state.guests + step, 1, state.rooms * 5);
          if (state.rooms < Math.ceil(state.guests / 5)) {
            state.rooms = Math.ceil(state.guests / 5);
          }
        } else {
          state.rooms = clamp(state.rooms + step, 1, 4);
          state.guests = clamp(state.guests, 1, state.rooms * 5);
        }

        renderState();
      });
    });
  }

  function initRangePicker() {
    const openButtons = document.querySelectorAll("[data-open-calendar]");
    const picker = window.flatpickr(rangeInput, {
      mode: "range",
      minDate: "today",
      defaultDate: [state.checkIn, state.checkOut],
      dateFormat: "Y-m-d",
      onClose(selectedDates) {
        if (selectedDates.length === 2) {
          state.checkIn = startOfDay(selectedDates[0]);
          state.checkOut = startOfDay(selectedDates[1]);
          state.rangeConfirmed = true;
          renderState();
        }
      }
    });

    openButtons.forEach((button) => {
      button.addEventListener("click", () => picker.open());
    });

    desktopBookButton.addEventListener("click", () => {
      if (!state.rangeConfirmed) {
        picker.open();
        return;
      }
      openModal(reservationModal);
    });
  }

  function initReservationModal() {
    document.querySelectorAll("[data-close-reservation]").forEach((button) => {
      button.addEventListener("click", () => closeModal(reservationModal));
    });

    reservationForm.addEventListener("submit", (event) => {
      event.preventDefault();
      clearErrors();

      const formData = new FormData(reservationForm);
      const fullName = String(formData.get("fullName") || "").trim();
      const phone = String(formData.get("phone") || "").trim();
      const email = String(formData.get("email") || "").trim();

      let hasError = false;

      if (!fullName) {
        setError("fullName", "Please enter your name");
        hasError = true;
      }
      if (!/^[0-9+()\-\s]{8,}$/.test(phone)) {
        setError("phone", "Please enter a valid mobile number");
        hasError = true;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError("email", "Please enter a valid email address");
        hasError = true;
      }
      if (hasError) return;

      const room = getRoom(state.roomType);
      const nights = nightsBetween();
      const total = room.bookingRate * nights;

      const lines = [
        "Halo Cengkareng Transit Hotel, saya ingin reservasi:",
        "",
        `Check-in: ${formatDate(state.checkIn)}`,
        `Check-out: ${formatDate(state.checkOut)}`,
        `Duration: ${nights} ${nights === 1 ? "night" : "nights"}`,
        `Room: ${room.title}`,
        `Guest & Room: ${state.guests} guest(s), ${state.rooms} room(s)`,
        `Rate: ${formatMoney(total)}`,
        "",
        `Nama Lengkap: ${fullName}`,
        `Nomor HP: ${phone}`,
        `Email: ${email}`
      ];

      reservationStatus.textContent = "Mengalihkan ke WhatsApp...";
      window.open(`${whatsappBase}${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
      window.setTimeout(() => {
        reservationStatus.textContent = "";
        closeModal(reservationModal);
        reservationForm.reset();
      }, 1200);
    });
  }

  function initPromoModal() {
    document.querySelectorAll("[data-close-modal]").forEach((button) => {
      button.addEventListener("click", () => closeModal(promoModal));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if (!promoModal.hidden) closeModal(promoModal);
      if (!reservationModal.hidden) closeModal(reservationModal);
    });
  }

  function openPromo(index) {
    const promo = data.promotions[index];
    if (!promo) return;
    document.getElementById("promo-modal-title").textContent = promo.title;
    document.getElementById("promo-modal-subtitle").textContent = promo.subtitle;
    document.getElementById("promo-modal-description").textContent = promo.description;
    document.getElementById("promo-modal-rules").innerHTML = promo.rules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join("");
    document.getElementById("promo-modal-subrules").innerHTML = promo.subrules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join("");
    document.getElementById("promo-modal-link").href = `${whatsappBase}${encodeURIComponent(`Halo! Saya tertarik dengan promo ${promo.title}.`)}`;
    openModal(promoModal);
  }

  function openModal(modal) {
    modal.hidden = false;
    document.body.classList.add("modal-open");
  }

  function closeModal(modal) {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  function clearErrors() {
    reservationStatus.textContent = "";
    reservationForm.querySelectorAll("[data-error-for]").forEach((node) => {
      node.textContent = "";
    });
  }

  function setError(name, message) {
    const errorNode = reservationForm.querySelector(`[data-error-for="${name}"]`);
    if (errorNode) errorNode.textContent = message;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }
})();
