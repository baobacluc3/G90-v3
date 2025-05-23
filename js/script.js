window.addEventListener("load", function () {
  const loadingScreen = document.getElementById("loading-screen");
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 1000);
});

window.addEventListener("scroll", function () {
  const navbar = document.getElementById("mainNav");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      if (entry.target.classList.contains("hero-stats")) {
        animateCounters();
      }
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll("[data-aos]");
  animatedElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });
});

document
  .getElementById("contactForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
    submitBtn.disabled = true;

    setTimeout(() => {
      showNotification(
        "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.",
        "success"
      );

      this.reset();

      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add("show"), 100);

  setTimeout(() => hideNotification(notification), 5000);

  notification
    .querySelector(".notification-close")
    .addEventListener("click", () => {
      hideNotification(notification);
    });
}

function hideNotification(notification) {
  notification.classList.remove("show");
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

function getNotificationIcon(type) {
  switch (type) {
    case "success":
      return "check-circle";
    case "error":
      return "exclamation-circle";
    case "warning":
      return "exclamation-triangle";
    default:
      return "info-circle";
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

document.querySelectorAll(".team-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial-item");

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.style.display = i === index ? "block" : "none";
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}

if (testimonials.length > 0) {
  setInterval(nextTestimonial, 5000);
}

document
  .querySelectorAll(
    ".contact-form input, .contact-form textarea, .contact-form select"
  )
  .forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentNode.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentNode.classList.remove("focused");
      }
    });
  });

document.addEventListener("scroll", function () {
  const scrollPercent =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  const fabTop = document.querySelector(".fab-top");

  if (scrollPercent > 20) {
    fabTop.style.opacity = "1";
    fabTop.style.visibility = "visible";
  } else {
    fabTop.style.opacity = "0";
    fabTop.style.visibility = "hidden";
  }
});

let konamiCode = [];
const targetCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener("keydown", function (e) {
  konamiCode.push(e.keyCode);

  if (konamiCode.length > targetCode.length) {
    konamiCode.shift();
  }

  if (konamiCode.join(",") === targetCode.join(",")) {
    showNotification(
      "🎉 Bạn đã tìm ra Easter Egg! Nhận 10% giảm giá cho lần đặt lịch tiếp theo!",
      "success"
    );
    createConfetti();
  }
});

function createConfetti() {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDelay = Math.random() * 3 + "s";
    confetti.style.backgroundColor = getRandomColor();
    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}

function getRandomColor() {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log("ServiceWorker registration successful");
      })
      .catch(function (error) {
        console.log("ServiceWorker registration failed");
      });
  });
}

window.addEventListener("load", function () {
  setTimeout(function () {
    const perfData = performance.getEntriesByType("navigation")[0];
    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;

    if (loadTime > 3000) {
      console.warn("Page load time is slow:", loadTime + "ms");
    }
  }, 0);
});
