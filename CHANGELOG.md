# Changelog

All notable changes to this project will be documented in this file.

## [2.0.0] - 2026-06-07
### Added
- **Integración con IA:** Conexión segura con el modelo Gemini 3.1 Flash Lite mediante Vercel Serverless Functions.
- **Selector Multipersonaje:** Galería interactiva en la Home con 4 personajes (Calcifer, Goku, Snape y Sheriff Mr. Jack).
- **UX del Chat:** Animación de indicador de carga ("Escribiendo..."), timestamps dinámicos en los mensajes y botón para copiar respuestas al portapapeles.
- **Soporte de teclado:** Envío de mensajes al presionar la tecla `Enter`.

### Fixed
- **Rate Limiting:** Ajuste estricto en el backend para limitar el margen de tokens a 600, evitando el bloqueo de cuota (Error 429) de Google AI Studio.

---

## [1.0.0] - 2026-06-01
### Added
- **Estructura SPA:** Sistema de routing nativo utilizando la History API (`pushState` y `popstate`) para navegar sin recargar la página (/home, /chat, /about).
- **Diseño Base:** Maquetación responsive (Mobile-First) de la interfaz de usuario con Flexbox y Grid.
- **Persistencia Temporal:** Historial de conversación mantenido en memoria durante la sesión del usuario.