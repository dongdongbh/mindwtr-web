# Aplicación web (PWA)

La aplicación de escritorio de Mindwtr puede ejecutarse en un navegador mediante la compilación de Vite. En el navegador, fuera de Tauri, usa `localStorage` para conservar los datos y registra un service worker para funcionar sin conexión como PWA.

---

## Ejecutar localmente

Puedes ejecutar la PWA con Bun o usar **Docker**.

### Con Docker (recomendado)

Consulta [Despliegue con Docker](/es/power-users/docker-deployment) para ejecutar el contenedor PWA.

### Con Bun

Desde la raíz del repositorio:

```bash
bun install
bun desktop:web
```

Vite se inicia en `http://localhost:5173/`.

---

## Compilar para alojamiento

```bash
bun desktop:web:build
```

El resultado queda en `apps/desktop/dist/` y puede alojarse como sitio estático.

---

## Comportamiento de la PWA

- La aplicación registra `apps/desktop/public/sw.js` al ejecutarse en el navegador.
- `sw.js` precarga `/`, `/index.html`, `/manifest.webmanifest`, `/icon.png` y `/logo.png`, y guarda bajo demanda otras solicitudes GET del mismo origen.
- Sin conexión, las solicitudes de navegación recurren a `/index.html`, por lo que los enlaces profundos siguen cargando.

---

## Requisitos de alojamiento

Aloja `apps/desktop/dist/` en la raíz del sitio (`/`). El service worker se registra desde `/sw.js` y el manifiesto hace referencia a rutas raíz.

Comprueba que el alojamiento sirva:

- `manifest.webmanifest` como `application/manifest+json` (recomendado);
- `sw.js` como `application/javascript`.

Para alojar en una subruta, como `/mindwtr/`, debes adaptar el registro del service worker y las rutas del manifiesto a la ruta base.

---

## Limitaciones

- Las compilaciones de navegador guardan los datos en `localStorage`; borrar los datos del sitio también borra los de Mindwtr.
- Algunas funciones exclusivas del escritorio pueden no estar disponibles, como adjuntos que requieren acceso nativo a archivos.
- No hay bandeja del sistema ni atajos globales nativos.

---

## Consulta también

- [Guía de desarrollo](/es/developers/developer-guide)
- [Datos y sincronización](/es/data-sync/)
