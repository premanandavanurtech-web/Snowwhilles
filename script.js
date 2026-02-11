



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