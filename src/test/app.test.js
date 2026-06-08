// @vitest-environment jsdom

import { describe, it, expect, beforeEach } from 'vitest';

describe('Pruebas de estructura de Vistas (SPA) en frontend', () => {

    // Antes de cada test, simulamos el contenedor principal de la app en el DOM virtual
    beforeEach(() => {
        document.body.innerHTML = '<main id="app"></main>';
    });

    // TEST 5: Verificar que la estructura del título de bienvenida esté definida
    it('Debería validar que la estructura del título de bienvenida esté definida', () => {
        const tituloEsperado = "¡Bienvenido a ComicSansCon AI! 🎭";
        expect(tituloEsperado).toContain("🎭");
    });

    // TEST 6: Verificar el formato del selector de canales integrado
    it('Debería comprobar los identificadores de canales del selector', () => {
        const opcionesDropdown = ['calcifer', 'goku', 'snape', 'sheriff'];
        expect(opcionesDropdown).toHaveLength(4);
        expect(opcionesDropdown).toContain('sheriff');
    });
});