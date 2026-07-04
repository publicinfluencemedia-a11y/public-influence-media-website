const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const interactiveElements = document.querySelectorAll("a, button, input, textarea");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

window.addEventListener("mousemove", (event) => {
  document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
  document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
});

interactiveElements.forEach((element) => {
  element.addEventListener("mouseenter", () => document.body.classList.add("cursor-active"));
  element.addEventListener("mouseleave", () => document.body.classList.remove("cursor-active"));
});

window.addEventListener("scroll", () => {
  const movement = Math.min(window.scrollY * 0.05, 34);
  document.documentElement.style.setProperty("--scroll-lift", `${movement}px`);
});

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();
  const whatsappNumber = "917228853849";
  const text = `Hello Public Influence Media, my name is ${name}. Phone: ${phone}. Requirement: ${message}`;

  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
});
