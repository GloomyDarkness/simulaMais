function toggleYear(year) {
    const button = document.querySelector(`.year-toggle[onclick="toggleYear(${year})"]`);
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !expanded);
    const rows = document.querySelectorAll(`.year-${year}`);
    rows.forEach(row => {
        row.style.display = expanded ? 'none' : 'table-row';
    });
}

// Tornar a função disponível globalmente
window.toggleYear = toggleYear;