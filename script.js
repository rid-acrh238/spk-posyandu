// Sample data for demonstration
const sampleData = [
  { id: 1, nama: "Andi Pratama", usia: 24, statusGizi: "Gizi Kurang", beratBadan: 45, tinggiBadan: 165, skor: 85 },
  { id: 2, nama: "Sari Dewi", usia: 36, statusGizi: "Gizi Baik", beratBadan: 55, tinggiBadan: 160, skor: 65 },
  { id: 3, nama: "Budi Santoso", usia: 18, statusGizi: "Gizi Kurang", beratBadan: 40, tinggiBadan: 158, skor: 90 },
  { id: 4, nama: "Maya Sari", usia: 42, statusGizi: "Gizi Lebih", beratBadan: 75, tinggiBadan: 155, skor: 70 },
  { id: 5, nama: "Rudi Hermawan", usia: 28, statusGizi: "Gizi Baik", beratBadan: 65, tinggiBadan: 170, skor: 45 },
  { id: 6, nama: "Lina Wati", usia: 33, statusGizi: "Gizi Kurang", beratBadan: 48, tinggiBadan: 162, skor: 80 },
  { id: 7, nama: "Agus Setiawan", usia: 25, statusGizi: "Gizi Baik", beratBadan: 70, tinggiBadan: 175, skor: 40 },
  { id: 8, nama: "Rina Kusuma", usia: 39, statusGizi: "Gizi Lebih", beratBadan: 80, tinggiBadan: 158, skor: 75 },
]

// DOM Elements
const startAnalysisBtn = document.getElementById("startAnalysis")
const calculatePriorityBtn = document.getElementById("calculatePriority")
const resultsTable = document.getElementById("resultsTable")
const tableBody = document.getElementById("tableBody")

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the application
  initializeApp()

  // Add event listeners
  startAnalysisBtn.addEventListener("click", scrollToAnalysis)
  calculatePriorityBtn.addEventListener("click", calculateAndDisplayResults)

  // Add smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})

function initializeApp() {
  // Add fade-in animation to cards
  const cards = document.querySelectorAll(".bg-white.rounded-lg.shadow-md")
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("fade-in-up")
    }, index * 100)
  })

  // Update dashboard numbers with animation
  animateNumbers()
}

function scrollToAnalysis() {
  const analysisSection = document.getElementById("analysisSection")
  analysisSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

function calculateAndDisplayResults() {
  // Show loading state
  calculatePriorityBtn.innerHTML = '<span class="loading"></span> Menghitung...'
  calculatePriorityBtn.disabled = true

  // Simulate calculation delay
  setTimeout(() => {
    // Sort data by priority score (descending)
    const sortedData = [...sampleData].sort((a, b) => b.skor - a.skor)

    // Clear existing table data
    tableBody.innerHTML = ""

    // Populate table with results
    sortedData.forEach((item, index) => {
      const row = createTableRow(item, index + 1)
      tableBody.appendChild(row)
    })

    // Show results table
    resultsTable.classList.remove("hidden")
    resultsTable.classList.add("fade-in-up")

    // Reset button
    calculatePriorityBtn.innerHTML = '<i class="fas fa-calculator mr-2"></i> Hitung Prioritas'
    calculatePriorityBtn.disabled = false

    // Scroll to results
    resultsTable.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }, 2000)
}

function createTableRow(data, index) {
  const row = document.createElement("tr")
  row.className = "hover:bg-gray-50 transition-colors"

  const priority = getPriorityLevel(data.skor)
  const priorityClass = getPriorityClass(priority)

  row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${index}</td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-gray-900">${data.nama}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${data.usia} bulan</td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="text-sm text-gray-900">${data.statusGizi}</span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-semibold text-gray-900">${data.skor}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${priorityClass}">
                ${priority}
            </span>
        </td>
    `

  return row
}

function getPriorityLevel(score) {
  if (score >= 80) return "Tinggi"
  if (score >= 60) return "Sedang"
  return "Rendah"
}

function getPriorityClass(priority) {
  switch (priority) {
    case "Tinggi":
      return "bg-red-100 text-red-800"
    case "Sedang":
      return "bg-yellow-100 text-yellow-800"
    case "Rendah":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function animateNumbers() {
  const numbers = [
    { element: document.querySelector(".text-red-600.text-3xl"), target: 12, duration: 2000 },
    { element: document.querySelector(".text-yellow-600.text-3xl"), target: 25, duration: 2000 },
    { element: document.querySelector(".text-green-600.text-3xl"), target: 48, duration: 2000 },
    { element: document.querySelector(".text-blue-600.text-3xl"), target: 85, duration: 2000 },
  ]

  numbers.forEach(({ element, target, duration }) => {
    if (element) {
      animateNumber(element, 0, target, duration)
    }
  })
}

function animateNumber(element, start, end, duration) {
  const startTime = performance.now()

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    const current = Math.floor(start + (end - start) * easeOutQuart(progress))
    element.textContent = current

    if (progress < 1) {
      requestAnimationFrame(updateNumber)
    }
  }

  requestAnimationFrame(updateNumber)
}

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4)
}

// Mobile menu toggle (if needed)
const mobileMenuBtn = document.querySelector(".md\\:hidden button")
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    // Add mobile menu functionality here if needed
    console.log("Mobile menu clicked")
  })
}

// Form validation
function validateForm() {
  const inputs = document.querySelectorAll('input[type="number"], select')
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value) {
      input.classList.add("border-red-500")
      isValid = false
    } else {
      input.classList.remove("border-red-500")
    }
  })

  return isValid
}

// Export functionality (placeholder)
function exportResults() {
  // This would implement export functionality
  console.log("Exporting results...")
}

// Print functionality (placeholder)
function printResults() {
  window.print()
}
