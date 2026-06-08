import { CHARACTERS_DB } from './utils.js';

let activeCharacter = CHARACTERS_DB.calcifer;
let chatHistoryGlobal = [];

// ==========================================
// 2. VISTAS DE LA SPA (HTML TEMPLATES)
// ==========================================
const views = {
    home: `
        <section class="view-section home-section" style="padding: 1.5rem 1rem; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 80vh; box-sizing: border-box;">
            <div style="text-align: center; width: 100%; max-width: 800px; display: flex; flex-direction: column; align-items: center;">
                <h1 style="margin-bottom: 0.5rem; font-size: 1.8rem; color: #fff; line-height: 1.2;">¡Bienvenido a ComicSansCon AI! 🎭</h1>
                <p style="margin-bottom: 1.5rem; color: #b3b3b3; font-size: 0.95rem; max-width: 500px; line-height: 1.4;">Seleccioná un personaje para ver su perfil y entrar a la central multidimensional:</p>
                
                <div class="characters-grid-responsive" style="display: grid; gap: 16px; width: 100%; max-width: 650px; margin-bottom: 1.5rem; box-sizing: border-box;">
                    
                    <div class="clickable-card" data-char="calcifer" style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 16px; text-align: center; cursor: pointer; transition: all 0.2s;">
                        <img src="${CHARACTERS_DB.calcifer.avatar}" style="width: 75px; height: 75px; border-radius: 50%; object-fit: cover; border: 2px solid #6366f1; margin-bottom: 8px;">
                        <h3 style="margin: 3px 0; color: #fff; font-size: 1rem;">Calcifer</h3>
                        <span style="font-size: 0.75rem; color: #6366f1; font-weight: bold;">Ver perfil 🔍</span>
                    </div>

                    <div class="clickable-card" data-char="goku" style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 16px; text-align: center; cursor: pointer; transition: all 0.2s;">
                        <img src="${CHARACTERS_DB.goku.avatar}" style="width: 75px; height: 75px; border-radius: 50%; object-fit: cover; border: 2px solid #6366f1; margin-bottom: 8px;">
                        <h3 style="margin: 3px 0; color: #fff; font-size: 1rem;">Son Goku</h3>
                        <span style="font-size: 0.75rem; color: #6366f1; font-weight: bold;">Ver perfil 🔍</span>
                    </div>

                    <div class="clickable-card" data-char="snape" style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 16px; text-align: center; cursor: pointer; transition: all 0.2s;">
                        <img src="${CHARACTERS_DB.snape.avatar}" style="width: 75px; height: 75px; border-radius: 50%; object-fit: cover; border: 2px solid #6366f1; margin-bottom: 8px;">
                        <h3 style="margin: 3px 0; color: #fff; font-size: 1rem;">Severus Snape</h3>
                        <span style="font-size: 0.75rem; color: #6366f1; font-weight: bold;">Ver perfil 🔍</span>
                    </div>

                    <div class="clickable-card" data-char="sheriff" style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 16px; text-align: center; cursor: pointer; transition: all 0.2s;">
                        <img src="${CHARACTERS_DB.sheriff.avatar}" style="width: 75px; height: 75px; border-radius: 50%; object-fit: cover; border: 2px solid #6366f1; margin-bottom: 8px;">
                        <h3 style="margin: 3px 0; color: #fff; font-size: 1rem;">Sheriff Mr. Jack</h3>
                        <span style="font-size: 0.75rem; color: #6366f1; font-weight: bold;">Ver perfil 🔍</span>
                    </div>
                </div>
            </div>
        </section>
    `,
    chat: `
        <section class="view-section chat-section">
            <div class="chat-container">
                
                <div class="character-selector-header" style="background-color: var(--card-bg); padding: 12px 16px; border-bottom: 1px solid #222e35; display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%;">
                    <div style="display: flex; align-items: center; gap: 8px; flex-grow: 1;">
                        <span style="font-size: 0.9rem; color: var(--text-muted); white-space: nowrap;">Canal:</span>
                        <select id="char-select" class="char-dropdown">
                            <option value="calcifer">Calcifer 🔥</option>
                            <option value="goku">Son Goku 🥋</option>
                            <option value="snape">Severus Snape 🧪</option>
                            <option value="sheriff">Sheriff Mr. Jack 🤠</option>
                        </select>
                    </div>

                    <div class="menu-tres-puntos-container" style="position: relative;">
                        <button id="menu-dots-btn" style="background: none; border: none; color: #fff; font-size: 1.4rem; cursor: pointer; padding: 4px 10px; border-radius: 8px; line-height: 1;">⋮</button>
                        <div id="chat-dropdown-options" style="display: none; position: absolute; top: 110%; right: 0; background: #1e1e2e; border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); z-index: 100; min-width: 160px; overflow: hidden;">
                            <button id="copy-all-btn" style="width: 100%; background: none; border: none; color: #fff; padding: 10px 14px; text-align: left; cursor: pointer; font-size: 0.85rem; font-family: inherit; display: flex; align-items: center; gap: 8px;">📋 Copiar Chat</button>
                            <button id="clear-btn" style="width: 100%; background: none; border: none; color: #ef4444; padding: 10px 14px; text-align: left; cursor: pointer; font-size: 0.85rem; font-family: inherit; display: flex; align-items: center; gap: 8px; border-top: 1px solid rgba(255,255,255,0.06);">🗑️ Borrar Chat</button>
                        </div>
                    </div>
                </div>

                <div id="chat-messages" class="chat-messages"></div>
                
               <div class="chat-input-area">
                    <input type="text" id="chat-input" placeholder="Escribí tu mensaje acá..." autocomplete="off">
                    <button id="send-btn" class="send-arrow-btn">➤</button>
                </div>

            </div>

            <div id="delete-confirm-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); backdrop-filter: blur(4px); justify-content: center; align-items: center; z-index: 10000; padding: 15px; box-sizing: border-box;">
                <div style="background: #1e1e2e; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; max-width: 340px; width: 100%; text-align: center; box-shadow: 0 8px 24px rgba(0,0,0,0.6);">
                    <div style="font-size: 2rem; margin-bottom: 10px;">🗑️</div>
                    <h3 style="color: #fff; margin-bottom: 8px; font-size: 1.2rem;">¿Vaciar conversación?</h3>
                    <p style="color: #b3b3b3; font-size: 0.9rem; line-height: 1.4; margin-bottom: 20px;">Se eliminará de forma definitiva todo el historial actual con este personaje.</p>
                    
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button id="cancel-delete-btn" style="flex: 1; background: #2a3942; color: #fff; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 0.9rem;">Cancelar</button>
                        <button id="confirm-delete-btn" style="flex: 1; background: #ef4444; color: #fff; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 0.9rem;">Sí, borrar</button>
                    </div>
                </div>
            </div>
        </section>
    `,
};

// ==========================================
// 3. ENRUTADOR NATIVO SPA
// ==========================================
function renderView(path) {
    const appContainer = document.getElementById('app');
    let viewKey = path.replace('/', '') || 'home';
    if (viewKey.includes('home')) viewKey = 'home';

    appContainer.innerHTML = views[viewKey] || views.home;

    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.getAttribute('href') === path || (path === '/' && item.getAttribute('href') === '/home')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // REPARACIÓN DE UX: Controlar el botón de acción del modal según la ruta
    const modalStartBtn = document.getElementById('start-btn');
    if (modalStartBtn) {
        if (viewKey === 'chat') {
            // Si ya estamos en el chat, ocultamos el botón para que no borre el historial
            modalStartBtn.style.display = 'none';
        } else {
            // Si estamos en la home, lo volvemos a mostrar para permitir la navegación
            modalStartBtn.style.display = 'block';
        }
    }

    if (viewKey === 'chat') {
        initChatLogic();
    }
}

// ==========================================
// 4. LÓGICA INTERNA DEL CHAT
// ==========================================
function updateChatBackground() {
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages && activeCharacter && activeCharacter.background) {
        chatMessages.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.50)), url('${activeCharacter.background}')`;
        chatMessages.style.backgroundSize = 'cover';
        chatMessages.style.backgroundPosition = 'center';
    }
}

function initChatLogic() {
    const select = document.getElementById('char-select');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');

    chatMessages.innerHTML = `<div class="system-message">Iniciaste una conversación con ${activeCharacter.name}</div>`;
    chatHistoryGlobal = [];
    updateChatBackground();

    sendBtn.replaceWith(sendBtn.cloneNode(true));
    chatInput.replaceWith(chatInput.cloneNode(true));
    select.replaceWith(select.cloneNode(true));

    const newSendBtn = document.getElementById('send-btn');
    const newChatInput = document.getElementById('chat-input');
    const newSelect = document.getElementById('char-select');

    if (newSelect && activeCharacter) {
        newSelect.value = activeCharacter.id;
    }

    newSelect.addEventListener('change', (e) => {
        const selectedId = e.target.value;
        activeCharacter = CHARACTERS_DB[selectedId] || CHARACTERS_DB.calcifer;
        chatMessages.innerHTML = `<div class="system-message">Canal sincronizado. Ahora hablas con: ${activeCharacter.name}</div>`;
        chatHistoryGlobal = [];
        updateChatBackground();
    });

    const dotsBtn = document.getElementById('menu-dots-btn');
    const dropdownOptions = document.getElementById('chat-dropdown-options');
    const clearBtn = document.getElementById('clear-btn');
    const copyAllBtn = document.getElementById('copy-all-btn');

    if (dotsBtn && dropdownOptions) {
        dotsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = dropdownOptions.style.display === 'block';
            dropdownOptions.style.display = isVisible ? 'none' : 'block';
        });
        document.addEventListener('click', () => {
            if (dropdownOptions) dropdownOptions.style.display = 'none';
        });
    }

    const deleteModal = document.getElementById('delete-confirm-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');

    if (clearBtn && deleteModal) {
        clearBtn.addEventListener('click', () => {
            deleteModal.style.display = 'flex';
        });
    }

    if (cancelDeleteBtn && deleteModal) {
        cancelDeleteBtn.addEventListener('click', () => {
            deleteModal.style.display = 'none';
        });
    }

    if (confirmDeleteBtn && deleteModal) {
        confirmDeleteBtn.addEventListener('click', () => {
            chatHistoryGlobal = [];
            chatMessages.innerHTML = `<div class="system-message">Historial vaciado. Iniciaste una conversación limpia con ${activeCharacter.name}</div>`;
            updateChatBackground();
            deleteModal.style.display = 'none';
        });
    }

    if (copyAllBtn) {
        copyAllBtn.addEventListener('click', () => {
            if (chatHistoryGlobal.length === 0) {
                alert("No hay mensajes para copiar.");
                return;
            }
            const textToCopy = chatHistoryGlobal
                .map(msg => `${msg.role === 'user' ? 'Tú' : activeCharacter.name}: ${msg.text}`)
                .join('\n');
            navigator.clipboard.writeText(textToCopy);
            copyAllBtn.textContent = "✅ ¡Copiado!";
            setTimeout(() => { copyAllBtn.textContent = "📋 Copiar Chat"; }, 2000);
        });
    }

    function getCleanTimestamp() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    async function handleSendMessage() {
        const text = newChatInput.value.trim();
        if (!text) return;

        const userTime = getCleanTimestamp();

        chatMessages.innerHTML += `
            <div class="user-msg-wrapper" style="display: flex; align-items: flex-start; justify-content: flex-end; gap: 8px; margin-bottom: 12px; width: 100%;">
                <div class="message user-message" style="position: relative; max-width: 70%; display: flex; flex-direction: column;">
                    <span class="message-text">${text}</span>
                    <span style="font-size: 0.65rem; opacity: 0.5; align-self: flex-end; margin-top: 4px; white-space: nowrap;">${userTime}</span>
                </div>
                <img src="./assets/AvatarYo.jpg" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 1px solid #6366f1; flex-shrink: 0;">
            </div>
        `;
        newChatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        chatHistoryGlobal.push({ role: 'user', text: text });

        const typingId = `typing-${Date.now()}`;
        chatMessages.innerHTML += `
            <div id="${typingId}" class="character-msg-wrapper" style="margin-bottom: 12px; display: flex; align-items: flex-start; gap: 8px; width: 100%;">
                <img src="${activeCharacter.chatAvatar}" class="avatar-clickeable-chat" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 1px solid #6366f1; flex-shrink: 0; cursor: pointer;">
                <div class="typing-indicator"><span></span><span></span><span></span></div>
            </div>
        `;
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            const response = await fetch('/api/functions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemPrompt: activeCharacter.systemPrompt,
                    history: chatHistoryGlobal
                })
            });

            if (!response.ok) throw new Error("Falla backend");
            const data = await response.json();

            const indicatorEl = document.getElementById(typingId);
            if (indicatorEl) indicatorEl.remove();

            if (data.reply) {
                const botTime = getCleanTimestamp();
                const uniqueBtnId = `copy-${Date.now()}`;

                chatMessages.innerHTML += `
                    <div class="character-msg-wrapper" style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 12px; width: 100%;">
                        <img src="${activeCharacter.chatAvatar}" class="avatar-clickeable-chat" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 1px solid #6366f1; flex-shrink: 0; cursor: pointer;">
                        <div class="message character-message" style="position: relative; max-width: 70%; display: flex; flex-direction: column;">
                            <span class="message-text" style="padding-right: 5px;">${data.reply}</span>
                            
                            <div style="display: flex; align-items: center; justify-content: flex-end; gap: 6px; margin-top: 4px; align-self: flex-end; width: 100%;">
                                <span style="font-size: 0.65rem; opacity: 0.5; white-space: nowrap;">${botTime}</span>
                                <button id="${uniqueBtnId}" title="Copiar respuesta" style="background: none; border: none; color: #6366f1; font-size: 0.85rem; cursor: pointer; padding: 2px; display: flex; align-items: center; justify-content: center; border-radius: 4px;">
                                    📋
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                chatHistoryGlobal.push({ role: 'model', text: data.reply });

                document.getElementById(uniqueBtnId).addEventListener('click', () => {
                    navigator.clipboard.writeText(data.reply);
                    const btn = document.getElementById(uniqueBtnId);
                    btn.textContent = "✅";
                    setTimeout(() => { btn.textContent = "📋"; }, 2000);
                });
            }
        } catch (error) {
            console.error(error);
            const indicatorEl = document.getElementById(typingId);
            if (indicatorEl) indicatorEl.remove();
            chatMessages.innerHTML += `<div class="system-message" style="background: #ef4444; color: #fff; border-radius: 8px; padding: 6px;">⚠️ Conexión interrumpida con el servidor. Reintentá.</div>`;
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

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

    // CONTROLADOR DE CLICKS REFACTORIZADO Y ROBUSTO
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.clickable-card');
        
        // DELEGACIÓN PERFECTA: Detecta el click en la foto buscando la clase estricta
        const chatAvatarClick = e.target.closest('.avatar-clickeable-chat');

        if (card || chatAvatarClick) {
            const character = chatAvatarClick ? activeCharacter : CHARACTERS_DB[card.getAttribute('data-char')];

            if (character) {
                activeCharacter = character;

                const modalAvatarEl = document.getElementById('modal-avatar');
                if (modalAvatarEl) modalAvatarEl.src = character.avatar;

                document.getElementById('modal-title').textContent = character.name;

                const descriptions = {
                    calcifer: "Demonio del fuego atrapado en el hogar del castillo vagabundo. Tiene una personalidad quejosa, pero si sabés tratarlo, te dará consejos profundos sobre mantener encendida tu llama interior.",
                    goku: "¡El legendario guerrero Saiyajin protector del universo! Está listo para saludarte con su energía de siempre, hablar sobre entrenamientos intensos y motivarte a superar tus límites físicos y mentalmente.",
                    snape: "Profesor de Pociones y Jefe de la casa Slytherin. Su temperamento es frío, distante y sumamente estricto. Hablar con él requiere de mucho temple, ya que no tolera la incompetencia.",
                    sheriff: "El primer héroe con nombre propio en la historia de Nintendo (1979). Un rudo e histórico vaquero pixelado diseñado por Shigeru Miyamoto para arcade."
                };

                const modalDescEl = document.getElementById('modal-desc');
                if (modalDescEl) modalDescEl.textContent = descriptions[character.id] || "";

                const charModalEl = document.getElementById('char-modal');
                if (charModalEl) charModalEl.style.display = 'flex';
            }
        }

        if (e.target.id === 'close-modal-btn' || e.target.id === 'char-modal') {
            const charModalEl = document.getElementById('char-modal');
            if (charModalEl) charModalEl.style.display = 'none';
        }

        if (e.target.id === 'start-btn') {
            e.preventDefault();
            const charModalEl = document.getElementById('char-modal');
            if (charModalEl) charModalEl.style.display = 'none';
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