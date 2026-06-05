// 1. OBJETO DE VISTAS (SPA): Contiene el HTML modular de cada sección
const views = {
    home: `
        <section class="view-section home-section">
            <div class="hero-content">
                <h1>Bienvenido a ComicSansCon AI 🎭</h1>
                <p>La primera plataforma de asistencia inteligente diseñada con el carisma, la expresividad (y el diseño polémico) que tu rutina necesita.</p>
                <button id="start-btn" class="btn-primary">Empezar a Chatear 🚀</button>
            </div>
        </section>
    `,
    chat: `
        <section class="view-section chat-section">
            <div class="chat-container">
                <div class="chat-messages" id="chat-messages">
                    <div class="message system-message">¡Hola, Santiago! Soy tu asistente ComicSansCon. ¿En qué código o ruteo nos metemos hoy? 💻</div>
                </div>
                <div class="chat-input-area">
                    <input type="text" id="chat-input" placeholder="Escribí tu mensaje acá..." autocomplete="off">
                    <button id="send-btn" class="btn-primary">Enviar</button>
                </div>
            </div>
        </section>
    `,
    about: `
        <section class="view-section about-section">
            <h2>Acerca de Este Proyecto 📂</h2>
            <p>Este desarrollo es el Proyecto Integrador del Módulo 3 de la formación Full Stack de Henry.</p>
            <p>Implementa una SPA (Single Page Application) construida con <strong>JavaScript nativo (Vanilla JS)</strong>, ruteo dinámico mediante la API de History del navegador, y estilos estructurados en CSS moderno.</p>
            <div class="author-badge">
                <p><strong>Desarrollador:</strong> Santiago Chavez</p>
                <p><strong>Año:</strong> 2026</p>
            </div>
        </section>
    `
};

// El historial arranca vacío y vive en la memoria de la pestaña. 
// Si el usuario cambia de pestaña entre Home y Chat, los mensajes siguen acá adentro.
let chatSessionHistory = [];

// 2. ENRUTADOR PRINCIPAL: Controla qué vista se inyecta en el <main id="app">
function renderView(viewName) {
    console.log("1. Ruta original recibida:", viewName);

    // Limpiamos barras y espacios de la URL
    let cleanView = viewName.replace(/\//g, '').trim();
    
    console.log("2. Ruta limpia procesada:", `"${cleanView}"`);

    // Si la ruta queda vacía (raíz), o es index.html, la forzamos a 'home'
    if (cleanView === '' || cleanView === 'index.html') {
        cleanView = 'home';
        console.log("3. Ruta vacía. Forzada a:", cleanView);
    }

    // Capturamos el contenedor principal
    const appContainer = document.getElementById('app');

    // Renderizado dinámico con el innerHTML
    if (views[cleanView]) {
        console.log("4. Éxito: Renderizando vista ->", cleanView);
        appContainer.innerHTML = views[cleanView];
    } else {
        console.log("4. Alerta: Vista no encontrada. Renderizando Home por defecto.");
        appContainer.innerHTML = views['home'];
    }

    // Capturamos y actualizamos de forma segura los links de navegación activos
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').replace(/\//g, '').trim() || 'home';
        if (linkPath === cleanView) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Escuchador dinámico para el botón "Empezar a Chatear" del Home
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => handleNavigation('/chat'));
    }

    if (cleanView === 'chat') {
        setupChatLogic();
    }
}

// 3. CONTROLADOR DE NAVEGACIÓN: Cambia la URL sin recargar la página
function handleNavigation(path) {
    window.history.pushState({}, "", path);
    renderView(path);
}

// 4. INICIALIZACIÓN Y EVENTOS GLOBALES
document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos los clics en la barra de navegación superior
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Evita que la página se recargue por completo
            const path = link.getAttribute('href');
            handleNavigation(path);
        });
    });

    // Escuchamos el botón del logo para volver al inicio
    const brandLogo = document.querySelector('.brand-logo');
    if (brandLogo) {
        brandLogo.addEventListener('click', (event) => {
            event.preventDefault();
            handleNavigation('/');
        });
    }

    // Renderizamos la vista inicial según la URL actual al cargar la web
    renderView(window.location.pathname);
});

// Detectamos cuando el usuario usa las flechas de "Atrás" o "Adelante" del navegador
window.addEventListener("popstate", () => {
    renderView(window.location.pathname);
});

function setupChatLogic() {
    // 1. Capturamos los elementos del HTML que se acaban de renderizar
    const chatMessagesContainer = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    // Control de seguridad: Si por alguna razón no están en pantalla, frenamos la ejecución
    if (!chatMessagesContainer || !chatInput || !sendBtn) return;

    // 2. FUNCIÓN INTERNA: Se encarga de dibujar el array de mensajes en el HTML
    function renderMessages() {
        // Limpiamos el contenedor para no duplicar mensajes viejos
        chatMessagesContainer.innerHTML = '';

        // Recorremos el historial mensaje por mensaje usando un bucle forEach
        chatSessionHistory.forEach(msg => {
            // Creamos un elemento <div> en la memoria del navegador
            const messageDiv = document.createElement('div');
            
            // Le asignamos la clase base común de los globitos
            messageDiv.classList.add('message');

            // CONDICIONAL CLAVE: Evaluamos el rol para decidir qué clase visual de CSS inyectarle
            if (msg.role === 'user') {
                messageDiv.classList.add('user-message'); // CSS lo tira a la derecha y lo pinta de morado
            } else if (msg.role === 'character') {
                messageDiv.classList.add('character-message'); // CSS lo tira a la izquierda y lo pinta de gris
            } else {
                messageDiv.classList.add('system-message'); // Mensajes del sistema (centro y amarillo)
            }

            // Le metemos el texto sanitizado adentro del div
            messageDiv.textContent = msg.text;

            // Inyectamos el nuevo globito adentro del contenedor del chat en pantalla
            chatMessagesContainer.appendChild(messageDiv);
        });

        // REQUISITO UX DE LA RÚBRICA: Scroll automático al último mensaje recibido
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    // 3. FUNCIÓN INTERNA: Procesa el envío del texto
    function handleSendMessage() {
        const text = chatInput.value.trim(); // .trim() borra los espacios vacíos al principio y final
        
        if (text === '') return; // Si el usuario no escribió nada, no hacemos nada

        // Guardamos el mensaje del USUARIO en nuestro array en memoria
        chatSessionHistory.push({ role: 'user', text: text });

        // Limpiamos la cajita de texto del input para que quede lista para el próximo mensaje
        chatInput.value = '';

        // Renderizamos inmediatamente para que el usuario vea su propio globito en pantalla
        renderMessages();

        // SIMULACIÓN DE RESPUESTA (Mocked Data): 
        // Como todavía no conectamos la IA, simulamos un delay de red de 1 segundo (1000ms)
        setTimeout(() => {
            chatSessionHistory.push({ 
                role: 'character', 
                text: `[Mock AI] Recibí tu mensaje: "${text}". ¡Esta es una respuesta de prueba simulada en memoria!` 
            });
            
            // Volvemos a renderizar para que aparezca el globito del personaje a la izquierda
            renderMessages();
        }, 1000);
    }

    // 4. ESCUCHADORES DE EVENTOS (Listeners)
    // Escuchamos el clic del botón Enviar
    sendBtn.addEventListener('click', handleSendMessage);

    // EXTRA CREDIT UX: Permitir al usuario enviar presionando la tecla "Enter"
    chatInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    });

    // Al entrar a la pantalla, si ya había mensajes de antes de cambiar de pestaña, los dibujamos
    if (chatSessionHistory.length > 0) {
        renderMessages();
    }
}