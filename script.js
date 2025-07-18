// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle")
const body = document.body

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem("theme") || "light"
body.setAttribute("data-theme", currentTheme)

// Update theme toggle icon
function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector("i")
  if (theme === "dark") {
    icon.className = "fas fa-sun"
  } else {
    icon.className = "fas fa-moon"
  }
}

updateThemeIcon(currentTheme)

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  body.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)
  updateThemeIcon(newTheme)
})

// Navigation Functionality
const navLinks = document.querySelectorAll(".nav-link")
const pages = document.querySelectorAll(".page")

function showPage(targetId) {
  // Hide all pages
  pages.forEach((page) => {
    page.classList.remove("active")
  })

  // Remove active class from all nav links
  navLinks.forEach((link) => {
    link.classList.remove("active")
  })

  // Show target page
  const targetPage = document.querySelector(targetId)
  if (targetPage) {
    targetPage.classList.add("active")
  }

  // Add active class to clicked nav link
  const activeLink = document.querySelector(`a[href="${targetId}"]`)
  if (activeLink) {
    activeLink.classList.add("active")
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// Handle navigation clicks
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    showPage(targetId)
    history.pushState(null, null, targetId)
  })
})

// Handle scroll links
document.querySelectorAll(".scroll-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()
    const targetId = this.getAttribute("href")
    if (targetId.startsWith("#")) {
      showPage(targetId)
      history.pushState(null, null, targetId)
    }
  })
})

// Enhanced Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle")
const navMenu = document.getElementById("navMenu")

mobileMenuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("mobile-active")
  mobileMenuToggle.classList.toggle("active")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("mobile-active")
    mobileMenuToggle.classList.remove("active")
  })
})

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
    navMenu.classList.remove("mobile-active")
    mobileMenuToggle.classList.remove("active")
  }
})

// Handle browser back/forward buttons
window.addEventListener("popstate", () => {
  const currentHash = window.location.hash || "#home"
  showPage(currentHash)
})

// Contact Form Functionality
const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    // Simple form validation
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields.")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.")
      return
    }

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
    submitBtn.disabled = true

    setTimeout(() => {
      alert("Thank you for your message! I'll get back to you soon.")
      contactForm.reset()
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }, 2000)
  })
}

// Enhanced Footer Links
document.querySelectorAll(".footer-links a").forEach((link) => {
  if (link.getAttribute("href").startsWith("#")) {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      showPage(targetId)
      history.pushState(null, null, targetId)
    })
  }
})

// Initialize page on load
document.addEventListener("DOMContentLoaded", () => {
  const currentHash = window.location.hash || "#home"
  showPage(currentHash)

  // Ensure home page is visible by default
  if (currentHash === "#home" || !currentHash) {
    const homePage = document.querySelector("#home")
    if (homePage) {
      homePage.classList.add("active")
    }
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Simple scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe project cards and other elements
document
  .querySelectorAll(
    ".project-card-modern, .bio-card, .detail-card, .academic-card, .project-item, .achievement-item, .contact-card",
  )
  .forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
