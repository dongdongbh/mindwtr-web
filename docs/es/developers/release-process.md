# Proceso de lanzamiento

Esta página documenta el flujo normal de lanzamiento de Mindwtr a un nivel práctico. Está destinada a quienes mantienen el repositorio.

---

## Archivos fuente

La automatización de lanzamientos y los metadatos de versión se concentran en:

- `scripts/bump-version.sh`
- `scripts/update-versions.js`
- `docs/release-notes/`
- `docs/release-notes/google-play/`
- `metadata/`
- `metadata/metadata.json`
- `apps/desktop/src-tauri/linux/Mindwtr.metainfo.xml`
- `https://github.com/dongdongbh/mindwtr-web/tree/main/docs` para cambios en la documentación pública
- `wiki/` está retirado: solo contiene una página de inicio que apunta al sitio de documentación; nunca añadas páginas de contenido
- `.github/workflows/`
- `.github/workflows/release-rc.yml` para automatizar versiones candidatas

---

## Ciclo de versiones candidatas para lanzamientos quincenales

Utiliza un ciclo de versiones candidatas para los lanzamientos menores quincenales normales. No se trata de un programa beta general. Una RC es la compilación destinada a convertirse en estable salvo que quienes la prueben encuentren un problema bloqueante.

Utiliza nombres de prelanzamiento SemVer:

- primera versión candidata: `v1.1.0-rc.1`
- corrección posterior de un problema bloqueante: `v1.1.0-rc.2`
- versión estable final: `v1.1.0`

No sustituyas los artefactos de una RC que haya llegado a quienes la prueban. Corrige ese caso con el siguiente número de RC. Si una ejecución falla antes de que GitHub publique el prelanzamiento, cancélala, corrige `main`, elimina y vuelve a crear la misma etiqueta RC en el commit corregido y, después, vuelve a enviar la etiqueta.

Ejecuta `./scripts/bump-version.sh vX.Y.Z-rc.N` para una RC. El script mantiene los archivos de versión de aplicaciones y paquetes en la versión base estable (`X.Y.Z`), a la vez que escribe la versión RC completa en `apps/mobile/release-version.json` para compilaciones FOSS sin variables de entorno. El flujo de trabajo de RC comprueba ambos valores antes de iniciar las compilaciones de las plataformas.

### Cuándo utilizar el ciclo de RC

Utiliza el ciclo de RC completo para:

- lanzamientos menores quincenales programados
- lanzamientos con cambios multiplataforma
- lanzamientos que afectan a la sincronización, el almacenamiento, la captura, el empaquetado, los permisos, los metadatos del actualizador o los metadatos de las tiendas
- lanzamientos en los que han cambiado varios artefactos de distribución

Quien mantenga el proyecto puede omitir el ciclo de RC para lanzamientos de parche triviales, como una corrección limitada de una sola línea, una corrección exclusivamente de documentación o una actualización únicamente de metadatos que no afecte al comportamiento de la aplicación instalada. La omisión del ciclo debe indicarse explícitamente en las notas de la versión o en la lista de comprobación del lanzamiento.

### Matriz de canales de RC

Publica compilaciones RC únicamente en canales que puedan admitir personas encargadas de las pruebas sin generar una gran carga de mantenimiento.

| Plataforma | Canal de RC | Comportamiento estable |
| --- | --- | --- |
| Todas las descargas directas | Prelanzamiento de GitHub | La versión final de GitHub se convierte en la fuente de descarga estable. |
| iOS | TestFlight | App Store sigue siendo el canal estable. |
| Compilación para macOS App Store | TestFlight | Mac App Store sigue siendo el canal estable. |
| Compilación para Android Play | Pruebas internas de Google Play y pruebas abiertas (`beta`) de forma predeterminada; canales cerrados/personalizados cuando estén configurados | Producción recibe posteriormente una subida estable y el flujo de trabajo estable actualiza el canal de pruebas internas. |
| Linux Flatpak | Rama beta de Flathub | Las versiones estables se publican tanto en la rama estable como en la beta para no dejar atrás a los usuarios de la beta. |
| Arch Linux | AUR `mindwtr-bin-beta` | El lanzamiento estable actualiza el paquete beta persistente. |
| Debian/Fedora Linux | Repositorios APT/RPM beta | Los paquetes estables permanecen en directorios separados de repositorios estables. |
| Descarga directa para Windows | Instalador/versión portátil del prelanzamiento de GitHub | Microsoft Store permanece solo en estable salvo que posteriormente se automaticen los paquetes piloto. |

Mantén estos canales solo en estable salvo que exista una necesidad clara y ya se disponga de automatización:

- F-Droid
- IzzyOnDroid
- Paquetes piloto de Microsoft Store
- winget
- Cask estable de Homebrew
- Chocolatey
- Bucket estable de Scoop
- Repositorios APT/RPM estables

Los paquetes piloto de Microsoft Store siguen siendo una posible incorporación futura.

### Automatización actual de RC

El flujo de trabajo de RC es `.github/workflows/release-rc.yml`.

Al enviar una nueva etiqueta `vX.Y.Z-rc.N` se inicia el flujo de trabajo y se verifican la etiqueta, las versiones base estables, la versión FOSS confirmada y el commit de la etiqueta antes de iniciar las compilaciones de las plataformas. Una ejecución fallida sin un prelanzamiento publicado en GitHub se recupera eliminando y volviendo a crear la misma etiqueta en el commit corregido. Si ya existe una versión de GitHub para la etiqueta, el flujo de trabajo solo valida; publica los cambios con el siguiente número de RC. Utiliza `workflow_dispatch` únicamente para reintentos controlados de canales o para seleccionar canales no predeterminados.

El flujo de trabajo reutiliza, cuando resulta práctico, los trabajos de compilación de los canales estables y después crea un prelanzamiento de GitHub a partir de los artefactos exactos de Linux, macOS, Windows, Android y Android FOSS.

También publica compilaciones para pruebas en los canales respaldados por tiendas que ya están conectados:

- AAB de Android en los canales `internal` y de pruebas abiertas (`beta`) de Google Play de forma predeterminada; las ejecuciones manuales pueden elegir canales de prueba de Play separados por comas o `none`.
- Compilación de iOS para App Store en TestFlight con el envío para revisión de App Store desactivado.
- Compilación de macOS para App Store en TestFlight con el envío para revisión de App Store desactivado.
- Solicitudes de incorporación de cambios para actualizar la rama beta de Flathub mediante el flujo de trabajo compartido de Flathub; las ejecuciones manuales pueden desactivarlo cuando la configuración del canal no esté lista.
- Actualizaciones de AUR `mindwtr-bin-beta` después de que existan los recursos del prelanzamiento de GitHub; las ejecuciones manuales pueden desactivarlas cuando el canal del paquete no esté listo.
- Actualizaciones de repositorios APT/RPM beta después de que exista el prelanzamiento de GitHub; las ejecuciones manuales pueden desactivarlas.

El flujo estable `release.yml` sigue siendo el flujo de trabajo de lanzamientos estables. Está protegido para que las etiquetas de prelanzamiento no publiquen en canales exclusivamente estables, como producción de Google Play, Microsoft Store, Snap estable, repositorios APT/RPM de Linux, Flathub estable, AUR estable, Scoop, winget, Homebrew o Chocolatey.

La beta de Flathub requiere la rama beta y permisos en `flathub/tech.dongdongbh.mindwtr`. La beta de AUR requiere el paquete `mindwtr-bin-beta` y los secretos `AUR_SSH_PRIVATE_KEY`, `AUR_USERNAME` y `AUR_EMAIL`. Si alguno de los canales no está listo, desactiva esa entrada del flujo de trabajo de RC en lugar de considerar fallida toda la RC.

Como una subida a las pruebas de Play consume un `versionCode` de Android, cada RC que se suba a Play necesita un `versionCode` nuevo. El flujo de trabajo de RC determina ese código una sola vez antes de iniciar las compilaciones de Android; después, la compilación de Play y la de Android FOSS consumen la misma salida de comprobación previa y se ejecutan en paralelo. El flujo de trabajo sube un AAB y asigna el mismo versionCode a cada canal de pruebas configurado. El flujo estable final actual también debe utilizar una nueva subida a producción con un `versionCode` superior, o un futuro flujo de promoción a estable debe promocionar la compilación de Play ya probada. No etiquetes una versión estable final con un `versionCode` de Android que ya se haya subido a Play salvo que el flujo estable se haya preparado para promocionar esa compilación existente.


### Cronología

Los canales con latencia de revisión necesitan empezar antes. Utiliza este calendario predeterminado:

| Día | Acción |
| --- | --- |
| T-7 a T-5 | Congelación de funciones. Solo se permiten correcciones de errores, notas de la versión, metadatos y problemas bloqueantes del lanzamiento. |
| T-5 | Crea la rama de lanzamiento, ejecuta `./scripts/bump-version.sh vX.Y.Z-rc.1`, genera notas específicas de la RC, como `docs/release-notes/X.Y.Z-rc.1.md`, y etiqueta `vX.Y.Z-rc.1` para que `release-rc.yml` suba los canales de pruebas habilitados. |
| T-4 | Ejecuta comprobaciones rápidas de los artefactos de cada canal a medida que estén disponibles las compilaciones revisadas. Corrige únicamente los problemas bloqueantes. |
| T-3 | Confirma el prelanzamiento de GitHub de `release-rc.yml`, verifica la solicitud de incorporación de cambios de la beta de Flathub y la actualización de `mindwtr-bin-beta` cuando esas entradas del flujo de trabajo estuvieran habilitadas, y anuncia la RC a quienes vayan a probarla. |
| T-2 a T-1 | Clasifica los comentarios. Publica `rc.2` únicamente para problemas bloqueantes. Los demás pasan al siguiente ciclo. |
| Día del lanzamiento | Etiqueta `vX.Y.Z`, publica la versión estable en todas partes y actualiza también a la versión estable cualquier canal de pruebas persistente que exista. |
| T+1 a T+2 | Supervisa bloqueos, incidencias de GitHub, Discord, comentarios de las tiendas e informes de paquetes de terceros. Aplica un parche con la siguiente etiqueta de parche, como `v1.1.1` después de `v1.1.0`, si es necesario. |

### Umbral de problemas bloqueantes para rc.2

Publica otra RC únicamente por uno de estos problemas bloqueantes:

- bloqueo al iniciar
- pérdida o corrupción de datos
- corrupción de la sincronización o fallo reproducible de sincronización
- fallo de instalación, actualización, firma, permisos o empaquetado
- captura, creación, edición o finalización de tareas averiada
- migración averiada desde la versión estable anterior
- regresión grave específica de una plataforma en un canal compatible

Todo lo demás espera al siguiente lanzamiento programado o a un parche posterior. Así se evita que el ciclo quincenal se convierta en un bucle beta sin fin.

### Comprobaciones rápidas obligatorias de la RC

Cada canal de distribución es un entorno de ejecución diferente. La RC no está lista hasta que el artefacto de cada canal de RC se haya iniciado de forma básica en un entorno fiel al canal, en la medida en que lo permitan la CI o las pruebas locales.

Comprobaciones rápidas mínimas:

- iniciar el artefacto exacto que reciben los usuarios
- crear, editar, completar y eliminar una tarea
- verificar que la captura o la adición rápida se abre y guarda
- verificar que la aplicación puede leer los datos existentes de la versión estable anterior
- verificar que los ajustes de sincronización se abren sin bloquearse
- verificar el comportamiento de inicio específico del actualizador, la tienda o el entorno aislado cuando corresponda
- verificar que los registros no muestran errores de inicio fatales

En los canales con antecedentes de fallos, mantén comprobaciones específicas:

- el APK FOSS y el APK/AAB de Play son conjuntos de dependencias distintos
- Flatpak debe iniciarse dentro del entorno de ejecución de Flatpak
- los paquetes AUR deben compilarse en un contenedor Arch limpio antes de publicarlos
- los paquetes MSIX/Microsoft Store no deben fallar irremediablemente por la bandeja, los accesos directos o las funciones limitadas por el entorno aislado
- las compilaciones de App Store y TestFlight deben conservar los permisos necesarios

### Anuncio para quienes prueben la versión

El anuncio de la RC debe ser breve y práctico:

- versión y enlaces de los canales
- principales cambios visibles para los usuarios
- riesgos conocidos o áreas que requieren pruebas
- vía exacta para enviar comentarios: incidencia de GitHub, canal de Discord o correo electrónico
- recordatorio de que se trata de una versión candidata, no de una vista previa de funciones

---

## Flujo de lanzamiento estable

1. Asegúrate de que `main` se encuentre en el estado previsto para el lanzamiento y confirma primero cualquier trabajo previo al lanzamiento.
   - Si la versión anterior ya se ha publicado, añade las correcciones posteriores en `docs/release-notes/unreleased.md` y enlázalo desde `CHANGELOG.md` hasta que se prepare la siguiente versión de parche, por ejemplo `v0.9.1` después de `v0.9.0`.
2. Incrementa la versión con:

```bash
./scripts/bump-version.sh 0.x.y
```

Esto actualiza las versiones de los paquetes del espacio de trabajo e incrementa el `versionCode` de Android.

Si Google Play ya tiene un `versionCode` superior procedente de subidas de RC o de pruebas, proporciona ese máximo al script de incremento antes de etiquetar:

```bash
ANDROID_REMOTE_MAX_VERSION_CODE=85 ./scripts/bump-version.sh 0.x.y
```

El script escribe en `apps/mobile/app.json` un valor bajo control de versiones superior al máximo de Play, de modo que la etiqueta de lanzamiento, el APK de GitHub y las recetas de compilación reproducible de terceros vean los mismos metadatos de Android. La CI del lanzamiento estable sigue rechazando las sustituciones de `versionCode` exclusivas de la CI; corrige los metadatos fuente antes de etiquetar en lugar de depender de una mutación del flujo de trabajo que no esté bajo control de versiones.

3. Ejecuta las comprobaciones obligatorias del lanzamiento antes de etiquetar:
   - Comprobación de tipos/pruebas:
     - `bun run test`
     - `bun run typecheck`
     - `bun run native:test`
   - Comprobación FOSS/estática:
     - revisa `git diff vPREV..HEAD -- apps/mobile/package.json`
     - revisa los archivos de configuración de F-Droid/FOSS (`apps/mobile/plugins/android-manifest-fixes.js`, `apps/mobile/scripts/`, `.github/workflows/release-android-foss.yml`, `config/izzyonandroid.yml`)
     - ejecuta `python3 scripts/ci/repair-package-lock.py --check apps/desktop/package-lock.json`
   - Comprobación del esquema de CloudKit:
     - revisa los archivos de esquema sincronizados frente a la etiqueta anterior
     - si se añadió un nuevo campo o tipo de registro respaldado por CloudKit, actualiza/despliega el esquema de producción antes del lanzamiento
4. Prepara o actualiza las notas de la versión y los metadatos:
   - `docs/release-notes/<version>.md`
   - `docs/release-notes/google-play/<version>.txt`
   - `metadata/*/release_notes.txt`
   - `metadata/*/changelogs/<androidVersionCode>.txt`
   - `metadata/metadata.json`
   - `apps/desktop/src-tauri/linux/Mindwtr.metainfo.xml`
5. Actualiza la documentación pública en la [fuente de la documentación web de Mindwtr](https://github.com/dongdongbh/mindwtr-web/tree/main/docs) cuando cambien los detalles del proceso de lanzamiento o documentación. La wiki de GitHub está retirada; no añadas ni actualices páginas de contenido en `wiki/` ni ejecutes git en un checkout `.wiki` separado.
6. Revisa detenidamente los cambios resultantes de versión y metadatos.
7. Confirma la preparación del lanzamiento:

```bash
git add -A
git commit -m "chore(release): v0.x.y"
```

8. Etiqueta el lanzamiento:

```bash
git tag v0.x.y
```

9. Envía `main` y la etiqueta:

```bash
git push origin main --tags
```

10. Deja que GitHub Actions publique los artefactos de las plataformas y cualquier trabajo de empaquetado posterior.

---

## Antes de etiquetar

Como mínimo, verifica:

- que las notas de la versión existan y coincidan con los cambios reales
- que las versiones de los paquetes estén alineadas en todo el monorepositorio
- que `apps/mobile/release-version.json` contenga la versión RC completa para una etiqueta RC
- que se haya incrementado el `versionCode` de Android
- que el archivo de bloqueo de paquetes de escritorio supere `repair-package-lock.py --check`
- que la configuración FOSS siga eliminando los permisos bloqueados y conserve solo los intencionados
- que el esquema respaldado por CloudKit no haya cambiado o que el esquema de producción se haya actualizado primero
- que los cambios en los metadatos de tiendas/lanzamiento sean intencionados y estén limitados a cada plataforma
- que las categorías de las tiendas móviles en las consolas sigan siendo correctas: Google Play `Productivity > Task Management` y la categoría principal de App Store `Productivity`
- que el contenido de las configuraciones regionales de Google Play respete el límite de 500 caracteres de la API

Para lanzamientos de mayor envergadura, verifica también:

- los metadatos del actualizador de escritorio
- los metadatos de las tiendas móviles/entradas de Fastlane
- los cambios del sitio de documentación para funciones visibles para los usuarios en la [fuente de la documentación web de Mindwtr](https://github.com/dongdongbh/mindwtr-web/tree/main/docs)
- una comprobación rápida de sincronización entre backends con un pequeño conjunto inicial de datos: añadir, actualizar, eliminar y transferir adjuntos debe converger entre la nube, la sincronización por WebDAV/archivo y cualquier backend nativo de la plataforma disponible para quien pruebe el lanzamiento; una segunda sincronización no debe indicar nuevos conflictos

---

## Notas de la versión

Las notas de versión con número de versión se encuentran en `docs/release-notes/`.

Pautas:

- mantén el resumen inicial orientado a los usuarios
- incluye primero las correcciones/funciones importantes
- enumera commits relevantes cuando sea útil
- para las RC, utiliza `docs/release-notes/X.Y.Z-rc.N.md` o `docs/release-notes/vX.Y.Z-rc.N.md` e incluye la versión RC completa en el primer encabezado; reserva `docs/release-notes/X.Y.Z.md` para la versión estable final
- mantén alineados los fragmentos de Google Play en `docs/release-notes/google-play/` cuando sea necesario
- actualiza `metadata/*/release_notes.txt` para las notas de la versión de App Store
- añade el nuevo archivo de registro de cambios de Android en `metadata/*/changelogs/<versionCode>.txt`
- mantén las notas de la versión de Microsoft Store en `metadata/metadata.json` alineadas con el mismo lanzamiento
- añade o actualiza la primera entrada de AppStream en `apps/desktop/src-tauri/linux/Mindwtr.metainfo.xml`

---

## Comprobaciones posteriores al lanzamiento

Después de enviar la etiqueta:

- verifica la creación de la versión en GitHub
- verifica que se hayan adjuntado los artefactos de escritorio/móvil esperados
- verifica que los flujos de trabajo específicos de las tiendas hayan finalizado correctamente cuando corresponda
- comprueba de forma puntual las superficies de actualización/descarga con la nueva versión
- verifica que la versión estable también se haya publicado en los canales de pruebas persistentes existentes, para que quienes prueban la aplicación mantengan la compilación más reciente

---

## Enfoque para revertir problemas

Si se detecta un lanzamiento defectuoso:

- detén la creación de etiquetas posteriores hasta comprender el modo de fallo
- prefiere una versión de corrección rápida hacia delante antes que reescribir el historial publicado
- explica claramente el parche correctivo en las notas de la versión

---

## Relacionado

- [Guía para desarrolladores](/es/developers/developer-guide)
- [Despliegue con Docker](/es/power-users/docker-deployment)
- [Despliegue en la nube](/es/data-sync/cloud-deployment)
- [Notas de las versiones del repositorio](https://github.com/dongdongbh/Mindwtr/tree/main/docs/release-notes)
- [Versionado semántico](https://semver.org/)
- [Prelanzamientos de GitHub](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)
- [Canales de pruebas de Google Play](https://support.google.com/googleplay/android-developer/answer/9845334)
- [Apple TestFlight](https://developer.apple.com/help/app-store-connect/test-a-beta-version/testflight-overview/)
- [Repositorio beta de Flathub](https://docs.flathub.org/docs/for-app-authors/maintenance)
- [Paquetes piloto de Microsoft Store](https://learn.microsoft.com/en-us/windows/apps/publish/package-flights)
