



document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     HERO SLIDER
  ========================== */
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const nextBtn = document.querySelector(".arrow.right");
  const prevBtn = document.querySelector(".arrow.left");

  let currentSlide = 0;

  if (slides.length) {
    function showSlide(index) {
      slides.forEach(s => s.classList.remove("active"));
      dots.forEach(d => d.classList.remove("active"));

      slides[index].classList.add("active");
      dots[index].classList.add("active");
    }

    nextBtn?.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });

    prevBtn?.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });

    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  }


  /* =========================
     PARTNERS LOGO SLIDER
  ========================== */
  const partnersTrack = document.querySelector(".partners-track");
  const logos = document.querySelectorAll(".partners-track img");

  if (partnersTrack && logos.length) {
    const visible = 4;
    const logoWidth = logos[0].offsetWidth + 40;
    let logoIndex = 0;

    setInterval(() => {
      logoIndex++;
      if (logoIndex > logos.length - visible) logoIndex = 0;
      partnersTrack.style.transform = `translateX(-${logoIndex * logoWidth}px)`;
    }, 2500);
  }


  /* =========================
     SINGLE COUNTER
  ========================== */
  const counter = document.getElementById("counter");

  if (counter) {
    const target = 13000;
    let started = false;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        animate();
      }
    }, { threshold: 0.5 });

    observer.observe(counter);

    function animate() {
      let current = 0;
      const increment = Math.ceil(target / 120);

      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        counter.textContent = current;
      }, 20);
    }
  }


  /* =========================
     MULTIPLE COUNTERS
  ========================== */
  const counters = document.querySelectorAll(".count");
  const statsSection = document.querySelector(".term-stats");

  if (counters.length && statsSection) {
    let started = false;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        counters.forEach(counter => animateCounter(counter));
      }
    }, { threshold: 0.4 });

    observer.observe(statsSection);

    function animateCounter(counter) {
      const target = +counter.dataset.target;
      let current = 0;
      const increment = Math.ceil(target / 120);

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = current;
      }, 20);
    }
  }


  /* =========================
     TESTIMONIAL SLIDER
  ========================== */
  const testimonialTrack = document.querySelector(".testimonial-track");
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const testimonialDots = document.querySelector(".testimonial-dots");

  if (testimonialTrack && testimonialCards.length && testimonialDots) {
    const perPage = 3;
    const pages = Math.ceil(testimonialCards.length / perPage);

    for (let i = 0; i < pages; i++) {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => slideTestimonials(i));
      testimonialDots.appendChild(dot);
    }

    function slideTestimonials(page) {
      const move = testimonialCards[0].offsetWidth * perPage * page;
      testimonialTrack.style.transform = `translateX(-${move}px)`;

      testimonialDots.querySelectorAll("span")
        .forEach(d => d.classList.remove("active"));

      testimonialDots.children[page].classList.add("active");
    }
  }

});



