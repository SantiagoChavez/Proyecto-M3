# Changelog

All notable changes to this project will be documented in this file.

## [2.1.0] - 2026-06-08
### Added
- **Persistencia de Canales Independiente:** Arquitectura de memoria indexada por ID de personaje que mantiene los historiales de chat activos de forma aislada al navegar por la SPA.
- **Modal de Confirmación Táctil:** Reemplazo del `confirm()` nativo del navegador por una ventana flotante integrada al diseño oscuro de la app, optimizada para Mobile-First con desenfoque de fondo (*backdrop-filter*).
- **Testing Unitario Avanzado (Vitest):** Implementación de 8 pruebas unitarias automatizadas en entorno virtual de DOM (`jsdom`), cubriendo rutas felices de renderizado y manejo defensivo de errores (*Edge Cases* al estilo Miniblog).
- **Botón de Enviar Premium:** Rediseño del botón de envío estático por uno circular con degradado lineal, sombras de neón suave y transiciones elásticas interactiva al tacto (`:active` / `:hover`).
- **Sección Institucional "Acerca de":** Reestructuración completa de la vista con el enfoque formal de la Prueba de Concepto (POC) para la agencia ComicSansCon, incluyendo ficha técnica de seguridad y créditos del desarrollador.

### Fixed
- **Ciclo de Vida de Modales (SPA):** Reubicación del modal de selección al `index.html` global para evitar su destrucción y pérdida de eventos al cambiar de ruta en el enrutador nativo.
- **Scroll en Vistas:** Corrección del desbordamiento vertical mediante la propiedad `overflow-y: auto` unificada en las secciones de la interfaz para evitar cortes de contenido.

---

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