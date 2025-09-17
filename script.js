// Tab switching functionality
function switchTab(tabName) {
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabName + '-tab').classList.add('active');
}

// Expandable card functionality
function toggleCard(cardId) {
    const card = document.getElementById(cardId);
    const parentCard = card.closest('.expandable-card');
    const chevron = parentCard.querySelector('.chevron');
    
    if (card.classList.contains('active')) {
        card.classList.remove('active');
        parentCard.classList.remove('active');
        chevron.classList.remove('rotated');
    } else {
        card.classList.add('active');
        parentCard.classList.add('active');
        chevron.classList.add('rotated');
    }
}

// Simple scroll animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);
// To check the scroll position on page load
reveal();