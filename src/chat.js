import { formatChatHistory } from './utils.js';

export async function sendChatMessageToServer(history, systemPrompt) {
    const cleanHistory = formatChatHistory(history);

    const response = await fetch('/api/functions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            systemPrompt: systemPrompt, // Enviamos el prompt del personaje seleccionado
            history: cleanHistory
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en la respuesta del servidor proxy');
    }

    const data = await response.json();
    return data.reply;
}