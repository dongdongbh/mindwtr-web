# Estrategia de pruebas

Mindwtr usa una estrategia por capas en `core`, las aplicaciones de plataforma y las superficies de integración.

## Objetivos

1. Proteger la integridad de los datos: sincronización, almacenamiento y reglas de combinación.
2. Detectar regresiones en los flujos esenciales.
3. Mantener pruebas rápidas y deterministas en CI.

## Capas de pruebas

## Núcleo (`packages/core`)

- Cobertura principal de lógica: sincronización, recurrencias, análisis y auxiliares de almacenamiento.
- Pruebas unitarias rápidas con datos deterministas.
- La mayoría de invariantes de integridad deben imponerse primero aquí.

## Escritorio (`apps/desktop`)

- Pruebas de componentes y vistas con Vitest + Testing Library.
- Atención a vistas con mucha interacción y envoltorios de orquestación de sincronización.

## Móvil (`apps/mobile`)

- Pruebas de utilidades y orquestación.
- Pruebas básicas de flujos esenciales de sincronización y edición.
- El comportamiento específico del dispositivo todavía depende en parte de verificaciones manuales.

## Nube (`apps/cloud`)

- Pruebas de endpoints de API.
- Validación de autenticación, límites de frecuencia y rutas.
- Comportamiento CRUD y de endpoints de adjuntos.
- La cobertura se centra en el procesamiento principal de solicitudes, no en todos los escenarios concurrentes de despliegue.

## Servidor MCP (`apps/mcp-server`)

- Corrección de la capa de consultas: buscar, añadir, actualizar, eliminar y restaurar.
- Validación de entradas y comportamiento transaccional.
- Cobertura centrada en herramientas y validación, no en flujos completos entre editor y LLM.

## Límites actuales

- `packages/core` tiene la cobertura automatizada más sólida y debe seguir siendo la primera defensa ante regresiones de integridad.
- El escritorio cubre bien componentes de vistas esenciales, pero no todas las interacciones de extremo a extremo.
- La cobertura móvil es deliberadamente menor; accesibilidad, gestos e integraciones nativas aún exigen comprobaciones manuales.
- Las pruebas Cloud y MCP cubren controladores y validaciones principales, pero no todos los casos límite de concurrencia o despliegue en producción.

## Qué probar primero

Al añadir o cambiar comportamiento, prioriza:

1. Corrección de datos y semántica de combinación.
2. Rutas de error, reintentos y tiempos de espera.
3. Flujo de interacción visible.
4. Lógica sensible al rendimiento: búsquedas, sincronización y transformación de listas.

## Lista de regresión

Antes de combinar:

1. Añade o actualiza pruebas del comportamiento cambiado.
2. Ejecuta localmente las pruebas de los paquetes afectados.
3. Ejecuta pruebas más amplias para cambios entre paquetes.
4. Comprueba que no haya acoplamiento de instantáneas o estado entre pruebas.

## Reglas prácticas

1. Prefiere marcas de tiempo y datos deterministas a la hora real.
2. Evita depender de la red en pruebas unitarias.
3. Centra cada prueba en un comportamiento.
4. Usa integración para los límites de flujos, no para cada rama.
5. Trata las pruebas inestables como errores y corrige pronto la causa.
6. Si arreglas un error específico de una plataforma sin automatización sólida, documenta en el PR los pasos manuales de verificación.

## Documentación relacionada

- [Guía de desarrollo](/es/developers/developer-guide)
- [Arquitectura](/es/developers/architecture)
- [Algoritmo de sincronización](/es/data-sync/sync-algorithm)
- [Datos y sincronización](/es/data-sync/)
