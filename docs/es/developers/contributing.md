# Contribuir

Mindwtr agradece contribuciones concretas que preserven su orientación GTD local-first.

Usa la guía del repositorio que quieras modificar:

- [Guía para contribuir al sitio web y la documentación](https://github.com/dongdongbh/mindwtr-web/blob/main/CONTRIBUTING.md)
- [Guía para contribuir a la aplicación y la interfaz](https://github.com/dongdongbh/Mindwtr/blob/main/docs/CONTRIBUTING.md)

## Buenas primeras contribuciones

- Mejorar una página confusa.
- Corregir una instrucción inexacta o rota.
- Traducir una sección coherente de la documentación.
- Añadir un ejemplo probado a un flujo existente.

## Restricciones del producto

Antes de proponer un cambio, comprueba que respete estas restricciones:

- el uso principal no requiere una cuenta;
- local-first de forma predeterminada;
- los conceptos GTD mantienen su coherencia;
- la IA y la automatización siguen siendo opcionales;
- las opciones de sincronización permanecen bajo control del usuario.

## Flujo para la documentación

1. Abre una incidencia antes de empezar un idioma nuevo o reorganizar una sección.
2. Edita el contenido bajo `docs/` en el [repositorio mindwtr-web](https://github.com/dongdongbh/mindwtr-web).
3. Limita cada pull request a una guía, sección o idioma.
4. Ejecuta `bun run check` desde la raíz.
5. Explica en el pull request qué páginas e idiomas cambiaron.

## Cambios de documentación

Escribe según la intención de quien lee. Prefiere páginas como «Importar desde TickTick» o «Sincronización con WebDAV» a un inventario enorme de funciones.

La documentación pública para usuarios y desarrolladores reside en `docs/` y se publica en https://docs.mindwtr.app/. Conserva los documentos de procesos, ADR y notas de publicación en la [documentación del repositorio de la aplicación](https://github.com/dongdongbh/Mindwtr/tree/main/docs). La wiki de GitHub está retirada y no acepta páginas nuevas.

La guía de contribución web define los idiomas compatibles, el proceso de traducción, las fuentes terminológicas, las reglas de respaldo para enlaces y las comprobaciones de los pull requests.

El inglés es la fuente de la documentación completa en alemán, español, francés, chino simplificado y chino tradicional. El mantenimiento usa agentes especializados por idioma para actualizar cada conjunto Markdown estático y después ejecuta las comprobaciones compartidas de compilación y enlaces. Si una traducción suena mal, usa el enlace de edición de la página o abre una incidencia con la corrección.

## Licencia

Mindwtr usa AGPL-3.0. Las contribuciones se aceptan bajo la misma licencia.
