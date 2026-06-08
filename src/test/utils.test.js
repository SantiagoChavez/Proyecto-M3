import { describe, it, expect } from 'vitest';
import { CHARACTERS_DB, formatChatHistory } from '../utils.js';

describe('Pruebas unitarias para utils.js - ComicSansCon AI', () => {

    // ==========================================
    // RUTA DE CAMMINO FELIZ (HAPPY PATH)
    // ==========================================
    it('Debería contener los 4 personajes oficiales en la base de datos', () => {
        expect(CHARACTERS_DB).toBeDefined();
        expect(CHARACTERS_DB.calcifer).toBeDefined();
        expect(CHARACTERS_DB.goku).toBeDefined();
        expect(CHARACTERS_DB.snape).toBeDefined();
        expect(CHARACTERS_DB.sheriff).toBeDefined();
    });

    it('Debería tener configurado correctamente el ID y las rutas del Sheriff Mr. Jack', () => {
        const sheriff = CHARACTERS_DB.sheriff;
        expect(sheriff.id).toBe('sheriff');
        expect(sheriff.name).toBe('Sheriff Mr. Jack');
        expect(sheriff.background).toContain('FondoSheriff.jpg');
    });

    it('Debería transformar el historial de mensajes al formato de roles que espera Gemini (user/model)', () => {
        const historialFront = [
            { role: 'user', text: 'Hola Goku' },
            { role: 'character', text: '¡Hola, soy Goku!' }
        ];

        const resultadoLimpio = formatChatHistory(historialFront);

        expect(resultadoLimpio).toHaveLength(2);
        expect(resultadoLimpio[0].role).toBe('user');
        expect(resultadoLimpio[1].role).toBe('model'); 
        expect(resultadoLimpio[1].text).toBe('¡Hola, soy Goku!');
    });


    // ==========================================
    // CASOS BORDE (EDGE CASES) - ¡IGUAL QUE EN MINIBLOG!
    // ==========================================
    describe('Casos Borde (Edge Cases) de formatChatHistory', () => {

        // Edge Case 1: ¿Qué pasa si mandan estructuras inválidas en vez de un Array?
        it('Debería retornar un array vacío de forma segura ante tipos de datos inválidos (null, undefined, strings)', () => {
            expect(formatChatHistory(null)).toEqual([]);
            expect(formatChatHistory(undefined)).toEqual([]);
            expect(formatChatHistory('historial-de-texto')).toEqual([]);
            expect(formatChatHistory(12345)).toEqual([]);
            expect(formatChatHistory({ mensaje: 'hola' })).toEqual([]);
        });

        // Edge Case 2: ¿Qué pasa si mandan un array vacío? (Al iniciar el chat por primera vez)
        it('Debería manejar correctamente un array vacío sin romper la ejecución', () => {
            expect(formatChatHistory([])).toEqual([]);
        });

        // Edge Case 3: ¿Qué pasa si mandan un mensaje sin la propiedad "text"?
        it('Debería asignar un string vacío en "text" si el objeto del mensaje viene corrupto o incompleto', () => {
            const historialCorrupto = [
                { role: 'user' }, // Falta la propiedad text
                { role: 'character', text: undefined } // text viene indefinido
            ];

            const resultado = formatChatHistory(historialCorrupto);

            expect(resultado).toHaveLength(2);
            expect(resultado[0].text).toBe('');
            expect(resultado[1].text).toBe('');
        });

    });

});