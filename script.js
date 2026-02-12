function loadHTML(elementId, filePath) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load " + filePath);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch(error => {
      console.error(error);
    });
}

// Load Header & Footer
document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header", "components/header.html");
  loadHTML("footer", "components/footer.html");
});






document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count");
  const statsSection = document.querySelector(".term-stats");

  if (!counters.length || !statsSection) return;

  let started = false;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        counters.forEach(counter => animateCounter(counter));
      }
    },
    { threshold: 0.5 } // 50% visible
  );

  observer.observe(statsSection);

  function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    let current = 0;

    const increment = Math.ceil(target / 120); // speed control

    const update = () => {
      current += increment;
      if (current < target) {
        counter.textContent = current;
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };

    update();
  }
});










document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("partnersSlider");
  const track = document.querySelector(".partners-track");
  let logos = Array.from(track.children);

  const intervalTime = 3000;
  let autoInterval;

  /* ===== AUTO REPLACE ===== */
  function startAuto() {
    autoInterval = setInterval(() => {
      const firstLogo = logos.shift();
      track.removeChild(firstLogo);
      track.appendChild(firstLogo);
      logos.push(firstLogo);
    }, intervalTime);
  }

  function stopAuto() {
    clearInterval(autoInterval);
  }

  startAuto();

  /* ===== PREVENT IMAGE DRAG PREVIEW ===== */
  slider.addEventListener("dragstart", (e) => e.preventDefault());

  /* ===== MANUAL DRAG REPLACE ===== */
  let startX = 0;
  let isDragging = false;
  const threshold = 50;

  slider.addEventListener("mousedown", (e) => {
    stopAuto();
    isDragging = true;
    startX = e.clientX;
  });

  slider.addEventListener("mouseup", (e) => {
    if (!isDragging) return;

    const diff = e.clientX - startX;

    // drag left → next logo
    if (diff < -threshold) {
      const firstLogo = logos.shift();
      track.removeChild(firstLogo);
      track.appendChild(firstLogo);
      logos.push(firstLogo);
    }

    // drag right → previous logo
    if (diff > threshold) {
      const lastLogo = logos.pop();
      track.removeChild(lastLogo);
      track.insertBefore(lastLogo, track.firstChild);
      logos.unshift(lastLogo);
    }

    isDragging = false;
    startAuto();
  });

  slider.addEventListener("mouseleave", () => {
    isDragging = false;
    startAuto();
  });
});











document.addEventListener("DOMContentLoaded", () => {
  const heroSlider = document.querySelector(".hero-slider");
  const slides = document.querySelectorAll(".hero-slider .slide");
  const dots = document.querySelectorAll(".dots .dot");
  const prevBtn = document.querySelector(".arrow.left");
  const nextBtn = document.querySelector(".arrow.right");

  if (!heroSlider || !slides.length) return;

  let currentIndex = 0;
  let startX = 0;
  let isDragging = false;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index]?.classList.add("active");
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex =
      (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  /* arrows */
  nextBtn?.addEventListener("click", nextSlide);
  prevBtn?.addEventListener("click", prevSlide);

  /* dots */
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

  /* mouse drag */
  heroSlider.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    isDragging = true;
  });

  heroSlider.addEventListener("mouseup", (e) => {
    if (!isDragging) return;

    const diff = e.clientX - startX;
    if (diff > 60) prevSlide();
    if (diff < -60) nextSlide();

    isDragging = false;
  });

  heroSlider.addEventListener("mouseleave", () => {
    isDragging = false;
  });

  /* touch swipe */
  heroSlider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  heroSlider.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff > 60) prevSlide();
    if (diff < -60) nextSlide();
  });
});
