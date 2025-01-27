// Set the progress percentage (e.g., 75%)
const percentage = 75;
const circle = document.querySelector('.progress');
const radius = 45; // Same as `r` in the SVG
const circumference = 2 * Math.PI * radius;

// Calculate stroke-dashoffset based on the percentage
circle.style.strokeDasharray = `${circumference}`;
circle.style.strokeDashoffset = `${circumference - (percentage / 100) * circumference}`;

// Update the text inside the circle
document.querySelector('.percentage').textContent = `${percentage}%`;
