 const slider = document.querySelector(".hero-slider");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".arrow.left");
  const nextBtn = document.querySelector(".arrow.right");

  let currentIndex = 0;
  let startX = 0;
  let isDragging = false;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  /* Arrow buttons */
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  /* Dot click */
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

  /* ===== MOUSE DRAG (DESKTOP) ===== */
  slider.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    isDragging = true;
  });

  slider.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;

    if (diff > 80) prevSlide();       // drag right
    if (diff < -80) nextSlide();      // drag left

    isDragging = false;
  });

  slider.addEventListener("mouseleave", () => {
    isDragging = false;
  });

  /* ===== TOUCH SWIPE (MOBILE) ===== */
  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (diff > 60) prevSlide();       // swipe right
    if (diff < -60) nextSlide();      // swipe left
  });

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





function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");
  
  if (!hamburger || !menu) {
    console.log("Hamburger or menu not found");
    return;
  }
  
  hamburger.addEventListener("click", function () {
    menu.classList.toggle("active");
    const icon = hamburger.querySelector("i");
    
    if (menu.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });
}

// Load Header
fetch("/components/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
    initHamburger();
  })
  .catch(err => console.error("Header load failed:", err));

// Load Footer
fetch("/components/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  })
  .catch(err => console.error("Footer load failed:", err));


  document.addEventListener("DOMContentLoaded", () => {
  const counter = document.querySelector(".count-number");
  let started = false;

  function startCount() {
    if (!counter) return;

    const target = +counter.getAttribute("data-target");
    let count = 0;
    const speed = 130; // smaller = faster

    const updateCount = () => {
      const increment = Math.ceil(target / speed);

      count += increment;
      if (count < target) {
        counter.innerText = count;
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        startCount();
      }
    },
    { threshold: 0.6 }
  );

  observer.observe(counter);
});

if (window.innerWidth <= 480) {
  const track = document.querySelector(".partners-track");
  const logos = document.querySelectorAll(".partners-track img");

  let index = 0;
  const visible = 2;

  setInterval(() => {
    index += visible;

    if (index >= logos.length) {
      index = 0;
    }

    const slideWidth = logos[0].offsetWidth + 20;
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  }, 2500);
}