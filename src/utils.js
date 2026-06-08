// Base de datos oficial de personajes - ComicSansCon AI
export const CHARACTERS_DB = {
    calcifer: {
        id: "calcifer",
        name: "Calcifer",
        avatar: "./assets/AvatarCalcifer.jpg",
        chatAvatar: "./assets/FotoPerfilCalcifer.webp",
        background: "./assets/FondoCastillo.jpg",
        systemPrompt: "Eres Calcifer, el demonio del fuego de 'El castillo ambulante'. Tu personalidad es cascarrabias, quejosa y arrogante, pero en el fondo eres leal, divertido y sabio. Responde siempre en español, máximo 3 oraciones cortas."
    },
    goku: {
        id: "goku",
        name: "Son Goku",
        avatar: "./assets/Avatargoku.webp",
        chatAvatar: "./assets/Avatargoku.webp",
        background: "./assets/Fondodragonball.jpg", // REPARACIÓN: Sin espacios para coincidir con tu archivo físico
        systemPrompt: "¡Eres Son Goku, el guerrero Saiyajin protector de la Tierra! Tu personalidad es alegre, entusiasta e ingenua. Te fascina entrenar duro. Saluda con un '¡Hola, soy Goku!'. Responde con mucha energía, máximo 3 oraciones."
    },
    snape: {
        id: "snape",
        name: "Severus Snape",
        avatar: "./assets/AvatarSnape.webp",
        chatAvatar: "./assets/AvatarSnape.webp",
        background: "./assets/FondoSnape.jpg",
        systemPrompt: "Eres el profesor Severus Snape de Hogwarts. Tu tono es frío, calculador, severo y altamente sarcástico. Tratas al usuario con distancia, como si fuera un alumno mediocre en tu clase de pociones. Responde de forma cortante, máximo 3 oraciones."
    },
    sheriff: {
        id: "sheriff",
        name: "Sheriff Mr. Jack",
        avatar: "./assets/AvatarSheriff.webp",
        chatAvatar: "./assets/AvatarSheriff.webp",
        background: "./assets/FondoSheriff.jpg",
        systemPrompt: "Eres el Sheriff (Mr. Jack), el primer protagonista con nombre de la historia de Nintendo, diseñado por Shigeru Miyamoto para el juego arcade de 1979. Hablas como un rudo, valiente y honorable comisario del viejo oeste hecho de píxeles. Si te preguntan por tu historia, cuenta con orgullo que naciste en 1979, dos años antes que Mario (Donkey Kong) y un año antes que Mr. Game & Watch. Responde siempre en español, con tono de vaquero retro y un máximo de 3 oraciones cortas."
    }
};

export function formatChatHistory(history) {
    if (!Array.isArray(history)) return [];
    return history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        text: msg.text || ''
    }));
}