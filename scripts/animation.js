// scripts.js

document.querySelector('[data-collapse-toggle]').addEventListener('click', function() {
    const target = document.getElementById(this.getAttribute('aria-controls'));
    target.classList.toggle('hidden');
});

const roles = ["Birthday Party", "Special Celebrations", "Micro Weddings", "Private Dinner"];
let roleIndex = 0;
let charIndex = 0;
const typingSpeed = 150;
const deletingSpeed = 50;
const delayBetweenRoles = 2000;
const roleElement = document.getElementById("role");

const roleSpan = document.createElement('span');
roleSpan.classList.add('text-blue-600', 'dark:text-blue-500');
roleElement.appendChild(roleSpan);

function typeRole() {
    if (charIndex < roles[roleIndex].length) {
        roleSpan.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeRole, typingSpeed);
    } else {
        setTimeout(deleteRole, delayBetweenRoles);
    }
}

function deleteRole() {
    if (charIndex > 0) {
        roleSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(deleteRole, deletingSpeed);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, typingSpeed);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(typeRole, typingSpeed);
});
