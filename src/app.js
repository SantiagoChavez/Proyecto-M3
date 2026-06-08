// --- 1. BASE DE DATOS LOCAL DE PERSONAJES ---
const CHARACTERS_DB = {
    calcifer: { id: "calcifer", name: "Calcifer 🔥" },
    goku: { id: "goku", name: "Son Goku 🥋" },
    snape: { id: "snape", name: "Severus Snape 🧪" },
    leon: { id: "leon", name: "Leon S. Kennedy 🔫" }
};

// Variable global para mantener el personaje activo en el chat
let activeCharacter = CHARACTERS_DB.calcifer;

// ==========================================
// 2. VISTAS DE LA SPA (HTML TEMPLATES)
// ==========================================
const views = {
    home: `
        <section class="view-section home-section" style="padding: 1.5rem 1rem; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 85vh; box-sizing: border-box;">
            <div style="text-align: center; width: 100%; max-width: 800px; display: flex; flex-direction: column; align-items: center;">
                <h1 style="margin-bottom: 0.5rem; font-size: 1.8rem; color: #fff; line-height: 1.2;">¡Bienvenido a ComicSansCon AI! 🎭</h1>
                <p style="margin-bottom: 1.5rem; color: #b3b3b3; font-size: 0.95rem; max-width: 500px; line-height: 1.4;">Seleccioná un personaje para ver su perfil y entrar a la central multidimensional:</p>
                
                <div class="characters-grid-responsive" style="display: grid; gap: 12px; width: 100%; max-width: 650px; margin-bottom: 1.5rem; box-sizing: border-box;">
                    
                    <div class="clickable-card" data-char="calcifer" style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 12px; text-align: center; cursor: pointer; transition: all 0.2s;">
                        <div style="width: 70px; height: 70px; border-radius: 50%; background: #2a3942; margin: 0 auto 8px auto; display: flex; align-items: center; justify-content: center; border: 2px solid #6366f1; color: #fff; font-size: 1.5rem;">🔥</div>
                        <h3 style="margin: 3px 0; color: #fff; font-size: 1rem;">Calcifer</h3>
                        <span style="font-size: 0.75rem; color: #6366f1; font-weight: bold;">Ver perfil 🔍</span>
                    </div>

                    <div class="clickable-card" data-char="goku" style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 12px; text-align: center; cursor: pointer; transition: all 0.2s;">
                        <div style="width: 70px; height: 70px; border-radius: 50%; background: #2a3942; margin: 0 auto 8px auto; display: flex; align-items: center; justify-content: center; border: 2px solid #6366f1; color: #fff; font-size: 1.5rem;">🥋</div>
                        <h3 style="margin: 3px 0; color: #fff; font-size: 1rem;">Son Goku</h3>
                        <span style="font-size: 0.75rem; color: #6366f1; font-weight: bold;">Ver perfil 🔍</span>
                    </div>

                    <div class="clickable-card" data-char="snape" style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 12px; text-align: center; cursor: pointer; transition: all 0.2s;">
                        <div style="width: 70px; height: 70px; border-radius: 50%; background: #2a3942; margin: 0 auto 8px auto; display: flex; align-items: center; justify-content: center; border: 2px solid #6366f1; color: #fff; font-size: 1.5rem;">🧪</div>
                        <h3 style="margin: 3px 0; color: #fff; font-size: 1rem;">Severus Snape</h3>
                        <span style="font-size: 0.75rem; color: #6366f1; font-weight: bold;">Ver perfil 🔍</span>
                    </div>

                    <div class="clickable-card" data-char="leon" style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 12px; text-align: center; cursor: pointer; transition: all 0.2s;">
                        <div style="width: 70px; height: 70px; border-radius: 50%; background: #2a3942; margin: 0 auto 8px auto; display: flex; align-items: center; justify-content: center; border: 2px solid #6366f1; color: #fff; font-size: 1.5rem;">🔫</div>
                        <h3 style="margin: 3px 0; color: #fff; font-size: 1rem;">Leon S. Kennedy</h3>
                        <span style="font-size: 0.75rem; color: #6366f1; font-weight: bold;">Ver perfil 🔍</span>
                    </div>
                </div>
            </div>

            <div id="char-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); backdrop-filter: blur(5px); justify-content: center; align-items: center; z-index: 9999; padding: 15px; box-sizing: border-box;">
                <div style="background: #1e1e2e; border: 2px solid #6366f1; border-radius: 16px; padding: 25px 20px; max-width: 400px; width: 100%; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5); position: relative; box-sizing: border-box;">
                    <button id="close-modal-btn" style="position: absolute; top: 10px; right: 15px; background: none; border: none; color: #b3b3b3; font-size: 1.8rem; cursor: pointer;">&times;</button>
                    
                    <div id="modal-placeholder" style="width: 100px; height: 100px; border-radius: 50%; background: #2a3942; margin: 0 auto 15px auto; display: flex; align-items: center; justify-content: center; border: 3px solid #6366f1; color: #fff; font-size: 2.5rem;">🎭</div>
                    
                    <h2 id="modal-title" style="color: #fff; margin-bottom: 8px; font-size: 1.5rem;"></h2>
                    <p id="modal-desc" style="color: #b3b3b3; font-size: 0.9rem; line-height: 1.4; margin-bottom: 20px; text-align: left;"></p>
                    
                    <button id="start-btn" class="btn-primary" style="width: 100%; padding: 12px 20px; font-size: 1rem; cursor: pointer; font-weight: bold;">¡Elegir y Chatear! 🚀</button>
                </div>
            </div>
        </section>
    `,
    chat: `
        <section class="view-section chat-section">
            <div class="character-selector-container">
                <span style="font-size: 0.9rem; color: var(--text-muted);">Hablando con:</span>
                <select id="char-select" class="char-dropdown">
                    <option value="calcifer">Calcifer 🔥 (Demonio del Fuego / Consejero)</option>
                    <option value="goku">Son Goku 🥋 (Guerrero Saiyajin / Entrenador)</option>
                    <option value="snape">Severus Snape 🧪 (Profesor de Pociones / Estricto)</option>
                    <option value="leon">Leon S. Kennedy 🔫 (Agente Especial / Táctico)</option>
                </select>
            </div>
            <div class="chat-container">
                <div id="chat-messages" class="chat-messages">
                    <div class="system-message">Iniciaste una conversación con la central multidimensional</div>
                </div>
                <div class="chat-input-area">
                    <input type="text" id="chat-input" placeholder="Escribí tu mensaje acá..." autocomplete="off">
                    <button id="send-btn" class="btn-primary">Enviar</button>
                </div>
            </div>
        </section>
    `,
    about: `
        <section class="view-section about-section" style="padding: 2rem; text-align: center;">
            <h2 style="color: #fff; margin-bottom: 1rem;">Acerca de ComicSansCon AI</h2>
            <p style="color: #b3b3b3; max-width: 600px; margin: 0 auto; line-height: 1.6;">
                Este es un Proyecto Integrador desarrollado como Single Page Application (SPA) nativa utilizando Vanilla JavaScript para el ruteo y componentes, conectado a una API Serverless en el Backend que consume los modelos avanzados de Google Gemini AI.
            </p>
        </section>
    `
};

// ==========================================
// 3. ENRUTADOR NATIVO SPA
// ==========================================
function renderView(path) {
    const appContainer = document.getElementById('app');
    
    // Normalizar la ruta
    let viewKey = path.replace('/', '') || 'home';
    if (viewKey.includes('home')) viewKey = 'home';

    // Inyectar el HTML de la vista correspondiente
    appContainer.innerHTML = views[viewKey] || views.home;

    // Actualizar estados visuales de la barra de navegación
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.getAttribute('href') === path || (path === '/' && item.getAttribute('href') === '/home')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Inicializar lógicas dinámicas según la vista en pantalla
    if (viewKey === 'chat') {
        initChatLogic();
    }
}

// ==========================================
// 4. LÓGICA INTERNA DEL CHAT (ARQUITECTURA FIJA)
// ==========================================
let chatHistoryGlobal = []; 

function initChatLogic() {
    const select = document.getElementById('char-select');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');

    // Inicialización del canal actual
    chatMessages.innerHTML = `<div class="system-message">Iniciaste una conversación con ${activeCharacter.name || 'la central'}</div>`;
    chatHistoryGlobal = []; 

    // Clonación masiva para eliminar duplicación de eventos en cascada de la SPA
    sendBtn.replaceWith(sendBtn.cloneNode(true));
    chatInput.replaceWith(chatInput.cloneNode(true));
    select.replaceWith(select.cloneNode(true));

    // Captura limpia de los nuevos elementos clonados del DOM
    const newSendBtn = document.getElementById('send-btn');
    const newChatInput = document.getElementById('chat-input');
    const newSelect = document.getElementById('char-select');

    if (newSelect && activeCharacter) {
        newSelect.value = activeCharacter.id;
    }

    // Escuchador del selector de personajes sin acumulación
    newSelect.addEventListener('change', (e) => {
        const selectedId = e.target.value;
        const fullCharacters = {
            calcifer: { id: "calcifer", name: "Calcifer 🔥" },
            goku: { id: "goku", name: "Son Goku 🥋" },
            snape: { id: "snape", name: "Severus Snape 🧪" },
            leon: { id: "leon", name: "Leon S. Kennedy 🔫" }
        };
        activeCharacter = fullCharacters[selectedId] || fullCharacters.calcifer;
        chatMessages.innerHTML = `<div class="system-message">Cambiaste de canal. Ahora hablas con: ${activeCharacter.name}</div>`;
        chatHistoryGlobal = []; // Reseteo total de la conversación al cambiar de personaje
    });

    async function handleSendMessage() {
        const text = newChatInput.value.trim();
        if (!text) return;

        // 1. Dibujar el mensaje en el cliente
        chatMessages.innerHTML += `<div class="message user-message">${text}</div>`;
        newChatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // 2. Guardar estructura simple
        chatHistoryGlobal.push({ role: 'user', text: text });

        // 3. Renderizar el indicador de espera
        const typingId = `typing-${Date.now()}`;
        chatMessages.innerHTML += `
            <div id="${typingId}" class="character-msg-wrapper">
                <div class="typing-indicator"><span></span><span></span><span></span></div>
            </div>
        `;
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Prompts de contexto limpios sin palabras de bloqueo para Leon
        const promptsBack = {
            calcifer: `Eres Calcifer, el demonio del fuego de "El castillo ambulante". Tu personalidad es cascarrabias, quejosa y arrogante, pero en el fondo eres leal, divertido y sabio. Responde siempre en español, máximo 3 oraciones cortas.`,
            goku: `¡Eres Son Goku, el guerrero Saiyajin protector de la Tierra! Tu personalidad es alegre, entusiasta e ingenua. Saluda con un "¡Hola, soy Goku!". Responde con energía, máximo 3 oraciones.`,
            snape: `Eres el profesor Severus Snape de Hogwarts. Tu tono es frío, calculador, severo y sarcástico. Tratas al usuario con distancia, como si fuera un alumno mediocre de pociones. Responde de forma cortante, máximo 3 oraciones.`,
            leon: `Eres Leon S. Kennedy, un agente de operaciones especiales de élite. Tu personalidad es profesional, seria, enfocada en la seguridad y la estrategia. Responde en español con tono táctico y templado. Máximo 3 oraciones.`
        };

        const currentPrompt = promptsBack[activeCharacter.id] || promptsBack.calcifer;

        try {
            // 4. Petición limpia por POST
            const response = await fetch('/api/functions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    systemPrompt: currentPrompt, 
                    history: chatHistoryGlobal   
                })
            });

            if (!response.ok) throw new Error("Falla en el backend local");

            const data = await response.json();
            
            const indicatorEl = document.getElementById(typingId);
            if (indicatorEl) indicatorEl.remove();

            if (data.reply) {
                // 5. Dibujar respuesta del personaje
                chatMessages.innerHTML += `
                    <div class="character-msg-wrapper">
                        <div class="message character-message">${data.reply}</div>
                    </div>
                `;
                // 6. Registrar respuesta en el historial plano
                chatHistoryGlobal.push({ role: 'model', text: data.reply });
            }
        } catch (error) {
            console.error("❌ Error de comunicación:", error);
            const indicatorEl = document.getElementById(typingId);
            if (indicatorEl) indicatorEl.remove();
            
            chatMessages.innerHTML += `
                <div class="system-message" style="background-color: #ef4444; color: #fff;">
                    ⚠️ Error de conexión. Reintentá el envío.
                </div>
            `;
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Vinculación definitiva de los nuevos nodos limpios
    newSendBtn.addEventListener('click', handleSendMessage);
    newChatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    });
}
// ==========================================
// 5. INICIALIZACIÓN Y EVENTOS GLOBALES
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Escuchador para el menú superior de navegación
    const headerNav = document.querySelector('.nav-links');
    if (headerNav) {
        headerNav.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-item')) {
                e.preventDefault();
                const path = e.target.getAttribute('href');
                history.pushState({}, "", path);
                renderView(path);
            }
        });
    }

    // --- ESCUCHADOR GLOBAL INTELIGENTE (GRILLA + POP-UP) ---
    document.addEventListener('click', (e) => {
        // 1. Detectar si clickeó una card de personaje en la Home
        const card = e.target.closest('.clickable-card');
        
        if (card) {
            const charId = card.getAttribute('data-char');
            const character = CHARACTERS_DB[charId];
            
            if (character) {
                // Sincronizar personaje global activo
                activeCharacter = character;

                // Cambiar el emoji del modal temporal según el personaje
                const emojis = { calcifer: "🔥", goku: "🥋", snape: "🧪", leon: "🔫" };
                document.getElementById('modal-placeholder').textContent = emojis[charId] || "🎭";
                
                // Rellenar títulos y descripciones del modal
                document.getElementById('modal-title').textContent = character.name;
                
                const descriptions = {
                    calcifer: "Demonio del fuego atrapado en el hogar del castillo vagabundo. Tiene una personalidad quejosa, pero si sabés tratarlo, te dará consejos profundos sobre mantener encendida tu llama interior.",
                    goku: "¡El legendario guerrero Saiyajin protector del universo! Está listo para saludarte con su energía de siempre, hablar sobre entrenamientos intensos y motivarte a superar tus límites físicos y mentales.",
                    snape: "Profesor de Pociones y Jefe de la casa Slytherin. Su temperamento es frío, distante y sumamente estricto. Hablar con él requiere de mucho temple, ya que no tolera la incompetencia.",
                    leon: "Agente federal de élite y sobreviviente estrella del desastre de Raccoon City. Un experto táctico con un temple de acero bajo presión, ideal para repasar planes de contingencia."
                };
                
                document.getElementById('modal-desc').textContent = descriptions[charId] || "";
                
                // Mostrar el modal flotante en pantalla
                document.getElementById('char-modal').style.display = 'flex';
            }
        }

        // 2. Cerrar el modal (tocando la cruz o haciendo clic afuera en el fondo opaco)
        if (e.target.id === 'close-modal-btn' || e.target.id === 'char-modal') {
            document.getElementById('char-modal').style.display = 'none';
        }

        // 3. Confirmar desde el modal ("¡Elegir y Chatear!")
        if (e.target.id === 'start-btn') {
            e.preventDefault();
            const path = '/chat';
            history.pushState({}, "", path);
            renderView(path);
        }
    });

    // Manejar botones atrás/adelante del navegador
    window.addEventListener('popstate', () => {
        renderView(location.pathname);
    });

    // Carga inicial de la ruta actual
    renderView(location.pathname);
});