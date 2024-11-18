function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
        // Esperar um pouco e tentar novamente
        setTimeout(initTheme, 100);
        return;
    }

    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    let currentTheme = localStorage.getItem('theme') || 
                      (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Aplicar tema inicial
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Garantir que temos apenas um listener
    const newToggle = themeToggle.cloneNode(true);
    themeToggle.parentNode.replaceChild(newToggle, themeToggle);
    
    newToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
    });
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}

// Remover observer antigo se existir
if (window.themeObserver) {
    window.themeObserver.disconnect();
}

// Criar novo observer
window.themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            const hasNewToggle = Array.from(mutation.addedNodes).some(node => 
                node.id === 'theme-toggle' || 
                (node.querySelector && node.querySelector('#theme-toggle'))
            );
            if (hasNewToggle) {
                initTheme();
            }
        }
    });
});

window.themeObserver.observe(document.body, { childList: true, subtree: true });