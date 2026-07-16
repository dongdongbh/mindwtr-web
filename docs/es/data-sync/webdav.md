# Sincronización con WebDAV

WebDAV está pensado para quien quiera un endpoint de almacenamiento estándar y bajo su control sin ejecutar el servidor Mindwtr Cloud.

## Cuándo usarlo

Usa WebDAV si:

- ya tienes un servidor WebDAV;
- quieres sincronización multiplataforma;
- prefieres controlar la infraestructura;
- puedes administrar URL y credenciales del servidor.

## Lista de configuración

1. Exporta una copia de seguridad.
2. Crea una carpeta específica para Mindwtr en tu servidor WebDAV.
3. Introduce la URL y las credenciales en Mindwtr.
4. Ejecuta una sincronización manual en el primer dispositivo.
5. Conecta otro dispositivo y comprueba que una tarea de prueba se sincroniza en ambas direcciones.

::: tip Carpeta específica
Usa una carpeta reservada para los datos de sincronización de Mindwtr. No mezcles los archivos de la aplicación con documentos ajenos.
:::

## Solución de problemas

- Comprueba que la URL apunte a una carpeta con permisos de escritura.
- Comprueba la validez del certificado del servidor.
- Confirma los permisos para subir y sobrescribir archivos.
- Ten en cuenta los límites de frecuencia o bloqueos de archivos del proveedor.
- Exporta una copia antes de eliminar archivos del servidor.
