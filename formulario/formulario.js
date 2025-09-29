const contactForm = document.getElementById('contact-form');
const clearFormBtn = document.getElementById('clear-form');
const savedDataContainer = document.getElementById('saved-data');
const notification = document.getElementById('notification');


function saveFormData() {
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    localStorage.setItem('contactForm', JSON.stringify(formData));
}


function loadFormData() {
    const savedFormData = localStorage.getItem('contactForm');
    
    if (savedFormData) {
        const formData = JSON.parse(savedFormData);
        document.getElementById('name').value = formData.name || '';
        document.getElementById('email').value = formData.email || '';
        document.getElementById('message').value = formData.message || '';
    }
}


contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
    
    
    sessionStorage.setItem('submittedForm', JSON.stringify(formData));
    
    
    contactForm.reset();
    localStorage.removeItem('contactForm');
    
    
    displaySavedData();
    
    showNotification('Formulário enviado com sucesso!');
});


clearFormBtn.addEventListener('click', () => {
    contactForm.reset();
    localStorage.removeItem('contactForm');
    showNotification('Formulário limpo!');
});


document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(element => {
    element.addEventListener('input', saveFormData);
});


function displaySavedData() {
    const submittedForm = sessionStorage.getItem('submittedForm');
    
    if (submittedForm) {
        const formData = JSON.parse(submittedForm);
        savedDataContainer.innerHTML = `
            <div class="saved-data">
                <h3>Último formulário enviado:</h3>
                <p><strong>Nome:</strong> ${formData.name}</p>
                <p><strong>E-mail:</strong> ${formData.email}</p>
                <p><strong>Mensagem:</strong> ${formData.message}</p>
                <p><strong>Enviado em:</strong> ${new Date(formData.timestamp).toLocaleString('pt-BR')}</p>
            </div>
        `;
    } else {
        savedDataContainer.innerHTML = '<div class="no-data">Nenhum formulário foi enviado ainda.</div>';
    }
}


window.addEventListener('storage', (e) => {
    if (e.key === 'contactForm') {
        loadFormData();
        showNotification('Formulário atualizado em outra aba!');
    }
});


function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}


loadFormData();
displaySavedData();