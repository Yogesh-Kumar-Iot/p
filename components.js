// Function to load navbar and footer components
async function loadComponents() {
  try {
    // Load navbar
    const navbarResponse = await fetch("navbar-component.html")
    if (!navbarResponse.ok) throw new Error("Navbar not found")
    const navbarHTML = await navbarResponse.text()

    // Load footer
    const footerResponse = await fetch("footer-component.html")
    if (!footerResponse.ok) throw new Error("Footer not found")
    const footerHTML = await footerResponse.text()

    // Insert navbar at the beginning of body
    document.body.insertAdjacentHTML("afterbegin", navbarHTML)

    // Insert footer before the script tag
    const scriptTag = document.querySelector('script[src="components.js"]')
    if (scriptTag) {
      scriptTag.insertAdjacentHTML("beforebegin", footerHTML)
    } else {
      document.body.insertAdjacentHTML("beforeend", footerHTML)
    }

    // Initialize components after loading
    initializeComponents()
  } catch (error) {
    console.error("Error loading components:", error)
    // Fallback: create basic navbar and footer if loading fails
    createFallbackComponents()
  }
}

// Initialize component functionality
function initializeComponents() {
  // Set active nav link based on current page
  setActiveNavLink()

  // Initialize theme toggle
  initializeThemeToggle()

  // Initialize mobile menu
  initializeMobileMenu()

  // Initialize contact form if it exists
  initializeContactForm()

  // Initialize scroll animations
  initializeScrollAnimations()
}

// Set active navigation link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "home.html"
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.classList.remove("active")
    const href = link.getAttribute("href")
    if (href === currentPage || (currentPage === "" && href === "home.html")) {
      link.classList.add("active")
    }
  })
}

// Theme Toggle Functionality
function initializeThemeToggle() {
  const themeToggle = document.getElementById("themeToggle")
  if (!themeToggle) return

  const body = document.body

  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem("theme") || "light"
  body.setAttribute("data-theme", currentTheme)

  // Update theme toggle icon
  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector("i")
    if (icon) {
      if (theme === "dark") {
        icon.className = "fas fa-sun"
      } else {
        icon.className = "fas fa-moon"
      }
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
}

// Mobile Menu Functionality
function initializeMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle")
  const navMenu = document.getElementById("navMenu")

  if (!mobileMenuToggle || !navMenu) return

  mobileMenuToggle.addEventListener("click", (e) => {
    e.stopPropagation()
    navMenu.classList.toggle("mobile-active")
    mobileMenuToggle.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link")
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
}

// Contact Form Functionality
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm")

  if (!contactForm) return

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

// Fallback function to create basic components if loading fails
function createFallbackComponents() {
  // Create basic navbar
  const navbar = `
        <header class="header">
            <nav class="nav">
                <div class="nav-brand">
                    <h2>Yogesh Kumar</h2>
                </div>
                <ul class="nav-menu" id="navMenu">
                    <li><a href="home.html" class="nav-link">Home</a></li>
                    <li><a href="about.html" class="nav-link">About</a></li>
                    <li><a href="academy.html" class="nav-link">Academy</a></li>
                    <li><a href="contact.html" class="nav-link">Contact</a></li>
                </ul>
                <div class="nav-actions">
                    <button class="theme-toggle" id="themeToggle">
                        <i class="fas fa-moon"></i>
                    </button>
                    <button class="mobile-menu-toggle" id="mobileMenuToggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>
        </header>
    `

  // Create basic footer
  const footer = `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <div class="footer-brand">
                            <h3>Yogesh Kumar</h3>
                            <p>B.Tech IoT Student & Developer</p>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <div class="footer-bottom-content">
                        <p>&copy; 2024 Yogesh Kumar. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    `

  document.body.insertAdjacentHTML("afterbegin", navbar)
  document.body.insertAdjacentHTML("beforeend", footer)

  initializeComponents()
}

// Initialize scroll animations
function initializeScrollAnimations() {
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

  // Wait for elements to be available
  setTimeout(() => {
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
  }, 100)
}

// Load components when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  loadComponents()
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})
