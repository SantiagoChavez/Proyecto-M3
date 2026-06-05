/* ==========================================
   SPA ARCHITECTURE - PROYECTO CALCIFER
   ComicSansCon AI - Santiago Chavez
   ========================================== */

// --- 1. HISTORIAL Y ESTADO EN MEMORIA ---
let chatSessionHistory = [];
let isTyping = false; 

// --- 2. OBJETO DE VISTAS ---
const views = {
    home: `
        <section class="view-section home-section">
            <div class="hero-content">
                <img src="./assets/AvatarCalcifer.jpg" alt="Calcifer" class="home-avatar">
                <h1>¡Cuidado, quema! Estás ante Calcifer 🔥</h1>
                <p>El demonio del fuego más poderoso y carismático de todo Ingary está listo para charlar con vos... siempre y cuando le des de comer unos buenos cascarones de huevo.</p>
                <p class="warning-text">⚠️ Regla de oro: No se aceptan cubos de agua en esta pestaña.</p>
                <button id="start-btn" class="btn-primary">Alimentar el Fuego (Chatear) 🚀</button>
            </div>
        </section>
    `,
    chat: `
        <section class="view-section chat-section">
            <div class="chat-container">
                <div class="chat-messages" id="chat-messages">
                    <div class="message system-message">Conexión mágica establecida con el hogar del castillo vagabundo. 🔥</div>
                </div>
                <div class="chat-input-area">
                    <input type="text" id="chat-input" placeholder="Escribí tu mensaje acá o tírale un leño..." autocomplete="off">
                    <button id="send-btn" class="btn-primary">Enviar</button>
                </div>
            </div>
        </section>
    `,
    about: `
        <section class="view-section about-section">
            <div class="hero-content author-badge">
                <h2>Sobre la POC: Proyecto Calcifer 📂</h2>
                <p>Esta es una Prueba de Concepto (POC) desarrollada para la agencia digital ComicSansCon.</p>
                <p><strong>Objetivo:</strong> Demostrar la viabilidad de una SPA responsive con ruteo nativo, simulando la personalidad de Calcifer en memoria.</p>
                <p>Desarrollador: <strong>Santiago Chavez</strong></p>
                <p>Año: 2026</p>
            </div>
        </section>
    `
};

// --- 3. LÓGICA DEL CHAT ---
function setupChatLogic() {
    const chatMessagesContainer = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    if (!chatMessagesContainer || !chatInput || !sendBtn) return;

    function renderMessages() {
        chatMessagesContainer.innerHTML = ''; 

        chatSessionHistory.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.textContent = msg.text;

            if (msg.role === 'user') {
                messageDiv.classList.add('user-message');
                chatMessagesContainer.appendChild(messageDiv);
                
            } else if (msg.role === 'character') {
                messageDiv.classList.add('character-message');

                const wrapper = document.createElement('div');
                wrapper.classList.add('character-msg-wrapper');

                const avatarImg = document.createElement('img');
                avatarImg.src = './assets/AvatarCalcifer.jpg'; 
                avatarImg.alt = 'Calcifer';
                avatarImg.classList.add('chat-avatar');

                wrapper.appendChild(avatarImg);
                wrapper.appendChild(messageDiv);
                chatMessagesContainer.appendChild(wrapper);
            } else {
                messageDiv.classList.add('system-message');
                chatMessagesContainer.appendChild(messageDiv);
            }
        });

        // INDICADOR DE "ESCRIBIENDO..."
        if (isTyping) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('character-msg-wrapper');

            const avatarImg = document.createElement('img');
            avatarImg.src = './assets/AvatarCalcifer.jpg'; 
            avatarImg.alt = 'Calcifer';
            avatarImg.classList.add('chat-avatar');

            const typingDiv = document.createElement('div');
            typingDiv.classList.add('message', 'character-message', 'typing-indicator');
            typingDiv.innerHTML = '<span></span><span></span><span></span>';

            wrapper.appendChild(avatarImg);
            wrapper.appendChild(typingDiv);
            chatMessagesContainer.appendChild(wrapper);
        }

        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    function handleSendMessage() {
        const text = chatInput.value.trim();
        if (text === '') return;

        chatSessionHistory.push({ role: 'user', text: text });
        chatInput.value = '';
        
        isTyping = true;
        renderMessages();

        setTimeout(() => {
            isTyping = false; 
            chatSessionHistory.push({ 
                role: 'character', 
                text: `🔥 [Calcifer Mock]: ¡No me des órdenes! Soy un demonio del fuego, no le sirvo a nadie... Pero bueno, leí tu mensaje: "${text}". ¡Más vale que me traigas más leña si querés que te siga contestando!` 
            });
            renderMessages();
        }, 1500); 
    }

    sendBtn.addEventListener('click', handleSendMessage);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });

    renderMessages();
}

// --- 4. ENRUTADOR NATIVO ---
function renderView(viewName) {
    const appContainer = document.getElementById('app');
    
    let cleanView = viewName.replace(/^\//, '').replace(/\/$/, '').toLowerCase();
    if (cleanView === 'inicio' || cleanView === '') cleanView = 'home';
    if (cleanView === 'acerca de' || cleanView === 'about') cleanView = 'about';
    
    appContainer.innerHTML = views[cleanView] || `<h2>4.04: Not Found ⚠️</h2>`;

    if (cleanView === 'chat') {
        setupChatLogic();
    }

    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
        link.classList.remove('active');
        let linkPath = link.getAttribute('href').replace(/^\//, '').toLowerCase();
        if (linkPath === 'inicio') linkPath = 'home';
        if (linkPath === 'acerca de') linkPath = 'about';
        if (linkPath === cleanView) {
            link.classList.add('active');
        }
    });
}

// --- 5. INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    const headerNav = document.querySelector('.nav-links');
    headerNav.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-item')) {
            e.preventDefault();
            const path = e.target.getAttribute('href');
            
            // CORREGIDO DEFINITIVAMENTE: history.pushState
            history.pushState({}, "", path);
            renderView(path);
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target.id === 'start-btn') {
            e.preventDefault();
            const path = '/chat';
            history.pushState({}, "", path);
            renderView(path);
        }
    });

    window.addEventListener('popstate', () => {
        renderView(location.pathname);
    });

    renderView(location.pathname);
});