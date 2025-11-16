document.addEventListener("DOMContentLoaded", () => {

    function createRipple(event, card) {
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");

        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

        card.appendChild(ripple);

        setTimeout(() => ripple.remove(), 500);
    }


    const expandCard = (card) => {
        const content = card.querySelector(".card-content");

        content.style.maxHeight = content.scrollHeight + "px";
        card.classList.add("active");

        const chevron = card.querySelector(".chevron");
        if (chevron) chevron.classList.add("rotated");

        card.setAttribute("aria-expanded", "true");
    };

    const collapseCard = (card) => {
        const content = card.querySelector(".card-content");

        content.style.maxHeight = "0px";
        card.classList.remove("active");

        const chevron = card.querySelector(".chevron");
        if (chevron) chevron.classList.remove("rotated");

        card.setAttribute("aria-expanded", "false");
    };

    const toggleCard = (card, event) => {
        const container = card.closest(".tab-content");
        const isActive = card.classList.contains("active");

        // Ripple
        if (event) createRipple(event, card);

        // Collapse others
        container.querySelectorAll(".expandable-card.active").forEach(other => {
            if (other !== card) collapseCard(other);
        });

        // Toggle clicked
        isActive ? collapseCard(card) : expandCard(card);
    };


    document.querySelectorAll(".expandable-card").forEach(card => {
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute("aria-expanded", "false");

        // CLICK
        card.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleCard(card, e);
        });

        // KEYBOARD
        card.addEventListener("keydown", (e) => {
            if (["Enter", " "].includes(e.key)) {
                e.preventDefault();
                toggleCard(card);
            }
        });
    });


    document.addEventListener("click", (e) => {
        if (!e.target.closest(".expandable-card")) {
            document.querySelectorAll(".expandable-card.active")
                .forEach(collapseCard);
        }
    });


    window.switchTab = (tabName, event) => {
        const buttons = document.querySelectorAll('.tab-button');
        const tabs = document.querySelectorAll('.tab-content');

        buttons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        tabs.forEach(tab => {
            const isTarget = tab.id === `${tabName}-tab`;
            tab.classList.toggle('active', isTarget);

            if (!isTarget)
                tab.querySelectorAll(".expandable-card.active").forEach(collapseCard);
        });
    };


    const hash = window.location.hash.replace("#", "");
    if (hash) {
        const card = document.getElementById(hash)?.closest(".expandable-card");
        if (card) expandCard(card);
    }


    function reveal() {
        document.querySelectorAll(".reveal").forEach(el => {
            const trigger = window.innerHeight - 150;
            el.classList.toggle("active", el.getBoundingClientRect().top < trigger);
        });
    }

    window.addEventListener("scroll", debounce(reveal, 80));
    reveal();
});

/* Debounce */
function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}
