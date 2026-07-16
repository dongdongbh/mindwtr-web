# Solución de problemas de desarrollo

Esta página reúne los problemas locales más comunes y la forma más corta de diagnosticarlos.

---

## Dependencias y espacio de trabajo

### `bun install` falla o los paquetes parecen desincronizados

- Ejecuta `bun install` desde la raíz, no desde una subcarpeta de aplicación.
- Descarta supuestos sobre un lockfile antiguo antes de investigar errores del código.
- Si acabas de cambiar versiones, comprueba que `bun install` terminara después del script de actualización.

### TypeScript no resuelve paquetes del espacio de trabajo

- Ejecuta las órdenes desde la raíz salvo que la documentación del paquete indique otra cosa.
- Vuelve a ejecutar `bun install`.
- Comprueba que el filtro coincida con el nombre del espacio (`mindwtr`, `mobile`, `@mindwtr/core`, etc.).

---

## Compilación de escritorio

### Tauri falla al compilar en Linux

Requisitos que suelen faltar:

- toolchain de Rust;
- paquetes de desarrollo de WebKitGTK;
- paquetes de desarrollo de OpenSSL;
- paquetes de desarrollo de GTK.

Consulta la [Guía de desarrollo](/es/developers/developer-guide) para instalar por plataforma.

### La aplicación se inicia, pero faltan diagnósticos

Los diagnósticos de una versión solo están disponibles si se compila con `diagnostics`:

```bash
cd apps/desktop
cargo tauri build --features diagnostics
MINDWTR_DIAGNOSTICS=1 ./src-tauri/target/release/mindwtr
```

### Confusión con rutas de datos o configuración

Consulta las notas de almacenamiento en `docs/CONTRIBUTING.md` y las pantallas de Ajustes.

---

## Desarrollo móvil

### No se detectan las herramientas Android/iOS

- Comprueba las rutas de Android Studio y el SDK.
- Para iOS, comprueba que Xcode esté instalado.
- Empieza con `bun mobile:start` desde la raíz.

### Problemas con Expo / Metro

- Reinicia el servidor de Expo.
- Vuelve a ejecutar `bun install`.
- No mezcles instalaciones desde la raíz y desde la aplicación.

### Un error nativo no se reproduce en pruebas

- Añade la prueba unitaria o de integración más pequeña posible para la lógica compartida.
- Documenta en el PR los pasos manuales en dispositivo.
- Captura registros antes de cambiar el comportamiento.

---

## Depurar sincronización y almacenamiento

### Hace falta más detalle sobre fallos de sincronización

Usa el flujo de [Diagnóstico y registros](/es/data-sync/diagnostics-logs).

### Sospechas de un error de combinación o integridad

Empieza en este orden:

1. pruebas de `packages/core` para el auxiliar relevante;
2. pruebas de envoltorios de plataforma;
3. registros locales de diagnóstico.

No saltes directamente a cambios de interfaz si el fallo está en la lógica compartida.

---

## Problemas de pruebas

### Falla una prueba de paquete, pero la aplicación funciona

- Trátala como una regresión real hasta demostrar lo contrario.
- Repite primero la prueba más específica.
- Comprueba si falla el código o la infraestructura de pruebas.

### Las pruebas de React Native generan ruido

- Los avisos de obsolescencia de `react-test-renderer` son esperados actualmente.
- Prefiere aserciones concretas a cambios masivos de instantáneas.

---

## Cuándo añadir diagnósticos

Añade registros o instrumentación cuando:

- el fallo no se reproduce de forma constante;
- cruza límites de paquetes;
- importan los tiempos de sincronización o el estado del almacenamiento;
- un proveedor o API nativa se comporta de modo distinto según la plataforma.

Mantén los registros locales y oculta secretos y tokens.

---

## Páginas relacionadas

- [Guía de desarrollo](/es/developers/developer-guide)
- [Estrategia de pruebas](/es/developers/testing-strategy)
- [Diagnóstico y registros](/es/data-sync/diagnostics-logs)
- [Arquitectura](/es/developers/architecture)
