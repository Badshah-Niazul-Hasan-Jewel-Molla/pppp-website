// ==========================
// PPPP WEBSITE SCRIPT.JS
// ==========================

// 🟢 1. Smooth scroll (nav links থাকলে smooth হবে)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))?.scrollIntoView({
      behavior: "smooth"
    });
  });
});

// 🟢 2. Simple button click animation (PPPP buttons)
document.querySelectorAll(".pppp-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);
  });
});

// 🟢 3. Page load animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "0.5s ease-in-out";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// 🟢 4. Simple alert system (future use)
function ppppAlert(message) {
  alert("PPPP Message: " + message);
}

// 🟢 5. Console branding
console.log("%cPPPP Bangladesh Website Loaded", "color: green; font-size: 16px;");
