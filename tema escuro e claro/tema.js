// Elementos DOM
const lightThemeBtn = document.getElementById('light-theme');
const darkThemeBtn = document.getElementById('dark-theme');
const notification = document.getElementById('notification');

// Aplicar tema
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    showNotification(`Tema ${theme === 'light' ? 'Claro' : 'Escuro'} aplicado!`);
}

// Carregar tema salvo
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// Eventos dos botões
lightThemeBtn.addEventListener('click', () => applyTheme('light'));
darkThemeBtn.addEventListener('click', () => applyTheme('dark'));

// Detectar alterações entre abas
window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
        applyTheme(e.newValue);
        showNotification('Tema alterado em outra aba!');
    }
});

// Mostrar notificação
function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}