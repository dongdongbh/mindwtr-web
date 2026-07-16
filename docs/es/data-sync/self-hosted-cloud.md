# Mindwtr Cloud autohospedado

Mindwtr Cloud es la opción de sincronización autohospedada para quien prefiera un servidor específico de Mindwtr en vez de un proveedor. El backend de nube autohospedada es un pequeño servidor de sincronización en `apps/cloud`; es un endpoint para los clientes de escritorio y móvil, no la interfaz de la aplicación Mindwtr.

## Cuándo usarlo

Usa la nube autohospedada si:

- quieres un endpoint de sincronización específico para Mindwtr;
- puedes desplegar y actualizar un servidor pequeño;
- quieres controlar la cuenta de alojamiento, la ubicación de los datos y el acceso.

Si solo necesitas sincronización mediante archivos, [WebDAV](/es/data-sync/webdav) puede ser más sencillo.

## Referencias canónicas

- Usa [Datos y sincronización](/es/data-sync/) para elegir un backend y configurar el cliente.
- Usa [Despliegue en la nube](/es/data-sync/cloud-deployment) para configurar y operar el servidor y conocer las variables de entorno.
- Usa [API de la nube](/es/developers/cloud-api) para conocer los endpoints `/v1`.
- Usa [Despliegue con Docker](/es/power-users/docker-deployment) si prefieres esa vía.

## Orientación rápida

- El backend autohospedado guarda un espacio de nombres JSON por token al portador.
- Los clientes apuntan a la URL base `/v1` y sincronizan mediante `GET /v1/data` y `PUT /v1/data`.
- `/v1/data` es el contrato canónico; las rutas de tareas, proyectos, áreas, secciones, búsquedas y adjuntos son API auxiliares opcionales.
- Las API de adjuntos están en `/v1/attachments/...`.
- Despliega el servidor detrás de HTTPS y trata el token al portador como una contraseña.
- Las URL públicas requieren HTTPS. HTTP solo se acepta en destinos locales o privados como `localhost`, `127.0.0.1`, `10.x.x.x`, `172.16.x.x` a `172.31.x.x`, `192.168.x.x`, direcciones IPv6 privadas o de loopback, `*.local` y `*.home.arpa`.

## Forma del despliegue

Un despliegue habitual incluye:

- el servidor Mindwtr Cloud;
- una base de datos o backend de almacenamiento persistente;
- HTTPS delante del servidor;
- la URL del servidor configurada en cada cliente;
- un token o credencial creado para tu despliegue.

## Lista de configuración

1. Exporta una copia desde tu dispositivo principal.
2. Despliega el servidor con las instrucciones actuales del repositorio de Mindwtr.
3. Comprueba que el endpoint de estado responde mediante HTTPS.
4. Configura Mindwtr con la URL y la credencial del servidor.
5. Ejecuta una sincronización manual y comprueba que los mismos datos aparecen en un segundo dispositivo.

::: warning No guardes secretos del despliegue en Git
Guarda los tokens, URL de bases de datos y credenciales de proveedores en tu plataforma de alojamiento o gestor de secretos local. No los confirmes en un repositorio.
:::
