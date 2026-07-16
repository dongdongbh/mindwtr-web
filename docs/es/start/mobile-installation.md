# Instalación en dispositivos móviles

Instrucciones detalladas de instalación para Android e iOS.

Para las compilaciones candidatas a lanzamiento y beta, consulta [Únete a los canales beta](/es/start/beta-channels).

---

## Android

### Google Play (recomendado)

[![Google Play](https://img.shields.io/badge/Google_Play-Install-414141?logo=googleplay&logoColor=white)](https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr)

Mindwtr está disponible en [Google Play](https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr).

### F-Droid

[![Versión de F-Droid](https://img.shields.io/f-droid/v/tech.dongdongbh.mindwtr?label=F-Droid&logo=fdroid&logoColor=white&color=1976D2)](https://f-droid.org/en/packages/tech.dongdongbh.mindwtr/)

Instala desde F-Droid:

1. Instala el cliente de F-Droid.
2. Abre [Mindwtr en F-Droid](https://f-droid.org/en/packages/tech.dongdongbh.mindwtr/) e instálalo.

### IzzyOnDroid

[![IzzyOnDroid](https://img.shields.io/endpoint?url=https://apt.izzysoft.de/fdroid/api/v1/shield/tech.dongdongbh.mindwtr&label=IzzyOnDroid)](https://apt.izzysoft.de/packages/tech.dongdongbh.mindwtr)

Instala desde IzzyOnDroid si usas un cliente compatible con F-Droid, como Droid-ify, Neo Store o F-Droid:

1. Añade el repositorio de IzzyOnDroid: `https://apt.izzysoft.de/fdroid/repo`.
2. Abre [Mindwtr en IzzyOnDroid](https://apt.izzysoft.de/fdroid/index/apk/tech.dongdongbh.mindwtr) e instálalo.

### Descargar el APK

1. Ve a [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases)
2. Descarga el APK más reciente (por ejemplo, `mindwtr-<version>.apk`)
3. Abre el APK en tu dispositivo

### Instalar desde fuentes desconocidas

Si se te solicita, habilita la instalación desde fuentes desconocidas:

1. Ve a **Ajustes → Seguridad** (o **Ajustes → Aplicaciones → Acceso especial**)
2. Habilita **Instalar aplicaciones desconocidas** para tu navegador o gestor de archivos
3. Vuelve al APK e instálalo

### Verificar la instalación

Después de la instalación:
1. Abre Mindwtr desde el cajón de aplicaciones
2. Concede los permisos solicitados
3. ¡Empieza a capturar tareas!

---

## iOS

### Estado actual

iOS ya está disponible en App Store:

[![App Store](https://img.shields.io/badge/App_Store-iOS-0A84FF?logo=apple&logoColor=white)](https://apps.apple.com/app/mindwtr/id6758597144)

La beta de TestFlight también está disponible en https://testflight.apple.com/join/7SMJCTSR. Consulta [Únete a los canales beta](/es/start/beta-channels) para ver las instrucciones para abandonar la beta y las demás plataformas beta.

[![Beta de TestFlight](https://img.shields.io/badge/TestFlight-Beta-0A84FF?logo=apple&logoColor=white)](https://testflight.apple.com/join/7SMJCTSR)

### Opciones

1. **App Store (recomendado)**: instala la versión estable
2. **TestFlight**: instala la compilación beta más reciente de iOS
3. **Compilaciones para el simulador**: disponibles en el código fuente para desarrollo
4. **Compilación propia**: compila y firma la aplicación tú mismo con Xcode (se requiere una cuenta de Apple Developer para firmar para dispositivos)

Sin embargo, mantener la versión para iOS en App Store requiere una cuota anual considerable (consulta el [Apple Developer Program](https://developer.apple.com/support/enrollment/)), que actualmente pago de mi bolsillo.

Para garantizar la continuidad de Mindwtr y su desarrollo futuro, agradezco mucho tu apoyo. Si la aplicación te resulta útil, considera apoyar el proyecto mediante [GitHub Sponsors](https://github.com/sponsors/dongdongbh) o [Ko-fi](https://ko-fi.com/D1D01T20WK).

### Compilar para iOS (desarrolladores)

```bash
# Clone repo
git clone https://github.com/dongdongbh/Mindwtr.git
cd Mindwtr

# Install dependencies
bun install

# Run on iOS Simulator
bun mobile:ios

# Or open in Xcode for device builds
cd apps/mobile
npx expo prebuild --platform ios
open ios/*.xcworkspace
```

---

## Ubicación de los datos

Los datos móviles se almacenan en el almacenamiento interno de la aplicación, con SQLite como almacenamiento principal, además de los datos JSON de copia de seguridad y sincronización.

---

## Actualización

### Android

1. Descarga el nuevo APK desde [Releases](https://github.com/dongdongbh/Mindwtr/releases)
2. Instálalo sobre la aplicación existente
3. Tus datos se conservan

> **Consejo:** En la aplicación, ve a **Ajustes → Acerca de → Buscar actualizaciones** para comprobar si hay una versión nueva disponible.

---

## Desinstalación

### Android

1. Mantén pulsado el icono de Mindwtr
2. Selecciona **Desinstalar** o arrástralo a la papelera

### Limpieza de datos

La desinstalación elimina todos los datos locales. Si quieres conservar tus datos:
1. Exporta primero una copia de seguridad (**Ajustes → Datos → Exportar copia de seguridad**)
2. Guarda el archivo exportado
3. Desinstala la aplicación

---

## Solución de problemas

### La aplicación se cierra al iniciarse

Prueba a borrar los datos de la aplicación:
1. Ve a **Ajustes → Aplicaciones → Mindwtr**
2. Pulsa **Almacenamiento → Borrar datos**
3. Vuelve a abrir la aplicación

> **Nota:** Esto eliminará todos los datos locales. Restáuralos desde la sincronización o una copia de seguridad.

### La sincronización no funciona

Consulta [Datos y sincronización](/es/data-sync/) para solucionar problemas de sincronización.

### El APK no se instala

- Asegúrate de tener suficiente espacio de almacenamiento
- Habilita la instalación desde fuentes desconocidas
- Prueba a descargar de nuevo el APK (puede haberse dañado)

---

## Consulta también

- [Primeros pasos](/es/start/getting-started)
- [Guía del usuario para dispositivos móviles](/es/use/mobile)
- [Datos y sincronización](/es/data-sync/)
