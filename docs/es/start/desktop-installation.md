# Instalación en escritorio

Instrucciones detalladas de instalación para todas las plataformas de escritorio.

Para las compilaciones candidatas a lanzamiento y beta, consulta [Únete a los canales beta](/es/start/beta-channels).

---

## Linux

### Arch Linux (AUR, precompilado)

[![Versión de AUR mindwtr-bin](https://img.shields.io/aur/version/mindwtr-bin?logo=arch-linux&logoColor=white&color=1793d1&label=mindwtr-bin)](https://aur.archlinux.org/packages/mindwtr-bin)

La forma más sencilla de instalar en distribuciones basadas en Arch es el paquete AUR precompilado:

```bash
# Using yay
yay -S mindwtr-bin

# Using paru
paru -S mindwtr-bin

# Using pamac (Manjaro)
pamac install mindwtr-bin
```

[Paquete AUR: mindwtr-bin](https://aur.archlinux.org/packages/mindwtr-bin)

### Arch Linux (AUR, compilación desde el código fuente)

[![Versión de AUR mindwtr](https://img.shields.io/aur/version/mindwtr?logo=arch-linux&logoColor=white&color=1793d1&label=mindwtr)](https://aur.archlinux.org/packages/mindwtr)

Usa el paquete AUR compilado desde el código fuente si prefieres compilarlo localmente:

```bash
# Using yay
yay -S mindwtr

# Using paru
paru -S mindwtr
```

[Paquete AUR: mindwtr](https://aur.archlinux.org/packages/mindwtr)

### Debian / Ubuntu

[![Repositorio APT](https://img.shields.io/badge/APT_repo-Install-1f6feb?logo=debian&logoColor=white)](https://dongdongbh.github.io/Mindwtr/deb)

Añade el repositorio APT (recomendado):

```bash
curl -fsSL https://dongdongbh.github.io/Mindwtr/mindwtr.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/mindwtr-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/mindwtr-archive-keyring.gpg] https://dongdongbh.github.io/Mindwtr/deb ./" | sudo tee /etc/apt/sources.list.d/mindwtr.list
sudo apt update
sudo apt install mindwtr
```

Instalación manual: descarga el `.deb` desde [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) y ejecuta `sudo dpkg -i mindwtr_*.deb`.

### Fedora / RHEL / openSUSE

[![Repositorio RPM](https://img.shields.io/badge/RPM_repo-Install-ee0000?logo=redhat&logoColor=white)](https://dongdongbh.github.io/Mindwtr/rpm)

Añade el repositorio DNF/YUM (recomendado):

```bash
cat <<'EOF' | sudo tee /etc/yum.repos.d/mindwtr.repo
[mindwtr]
name=Mindwtr Repository
baseurl=https://dongdongbh.github.io/Mindwtr/rpm
enabled=1
gpgcheck=0
EOF

sudo dnf install mindwtr
```

Instalación manual: descarga el `.rpm` desde [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases) y ejecuta `sudo rpm -i mindwtr-*.rpm`.

### Flatpak (Flathub)

[![Flathub](https://img.shields.io/badge/Flathub-Install-000000?logo=flathub&logoColor=white)](https://flathub.org/apps/tech.dongdongbh.mindwtr)

Instala desde Flathub:

```bash
flatpak install flathub tech.dongdongbh.mindwtr
```

Ejecútalo con:

```bash
flatpak run tech.dongdongbh.mindwtr
```

[Página de Flathub](https://flathub.org/apps/tech.dongdongbh.mindwtr)

### Snap Store

[![Snap Store](https://img.shields.io/badge/Snap_Store-Install-82BEA0?logo=snapcraft&logoColor=white)](https://snapcraft.io/mindwtr)

Instala desde Snap Store:

```bash
sudo snap install mindwtr
```

[Página de Snap Store](https://snapcraft.io/mindwtr)

### AppImage (universal)

Funciona en la mayoría de las distribuciones de Linux:

```bash
# Download the versioned AppImage from:
# https://github.com/dongdongbh/Mindwtr/releases/latest

# Make executable
chmod +x Mindwtr-*.AppImage

# Run
./Mindwtr-*.AppImage
```

> **Consejo:** Usa [AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher) para mejorar la integración con el escritorio.

### Otras distribuciones

Para otras distribuciones, usa AppImage o compila desde el código fuente (consulta la [Guía para desarrolladores](/es/developers/developer-guide)).

Los paquetes mantenidos por la comunidad (por ejemplo, nixpkgs para NixOS) son bienvenidos. La compilación de escritorio incluye su dependencia de TLS, por lo que el empaquetado no necesita coincidir con una versión de OpenSSL del sistema. Si mantienes uno, abre una conversación para que podamos enlazarlo aquí.

---

## Windows

### Microsoft Store (recomendado)

[![Microsoft Store](https://img.shields.io/badge/Microsoft_Store-Install-0078D6?logo=microsoft&logoColor=white)](https://apps.microsoft.com/detail/9n0v5b0b6frx?ocid=webpdpshare)

Instala desde [Microsoft Store](https://apps.microsoft.com/detail/9n0v5b0b6frx?ocid=webpdpshare).

### Winget

[![Versión de Winget](https://img.shields.io/winget/v/dongdongbh.Mindwtr?label=Winget&logo=windows&logoColor=white&color=00D2FF)](https://winstall.app/apps/dongdongbh.Mindwtr)

Winget está integrado en Windows 10 y 11. Instala Mindwtr con:

```powershell
winget install dongdongbh.Mindwtr
```

### Chocolatey

[![Versión de Chocolatey](https://img.shields.io/chocolatey/v/mindwtr?label=Chocolatey&logo=chocolatey&logoColor=white&color=80B5E3)](https://community.chocolatey.org/packages/mindwtr)

Si usas Chocolatey:

```powershell
choco install mindwtr
```

[Paquete de Chocolatey](https://community.chocolatey.org/packages/mindwtr)

### Scoop

[![Versión de Scoop](https://img.shields.io/scoop/v/mindwtr?bucket=https://github.com/dongdongbh/homebrew-mindwtr&label=Scoop&logo=scoop&logoColor=white&color=E6E6E6)](https://github.com/dongdongbh/homebrew-mindwtr)

Si usas Scoop:

```powershell
scoop bucket add mindwtr https://github.com/dongdongbh/homebrew-mindwtr
scoop install mindwtr
```

### Instalador (.msi o .exe)

1. Descarga el instalador desde [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases)
2. Ejecuta el instalador
3. Sigue el asistente de instalación
4. Inicia Mindwtr desde el menú Inicio

### Portátil

1. Descarga `mindwtr_<version>_windows_x64_portable.zip` desde [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases).
2. Extráelo en cualquier carpeta con permisos de escritura.
3. Mantén `portable.txt` junto a `mindwtr.exe`.

El modo portátil almacena el estado local junto al ejecutable:

- `profile/data/` para la base de datos SQLite, el JSON de sincronización, los archivos adjuntos, los registros, las instantáneas, las capturas de audio y los modelos de voz
- `profile/config/` para `config.toml` y `secrets.toml`
- `profile/webview/` para el perfil del navegador WebView2 (caché, almacenamiento local)

Windows WebView2 sigue siendo necesario. Los archivos adjuntos que una compilación portátil anterior a v1.1.0 almacenó en `AppData\Roaming\mindwtr` se trasladan al perfil portátil la primera vez que se inicia; si un Mindwtr instalado comparte el equipo, se copian en su lugar, de modo que ambas instalaciones sigan funcionando.

---

## macOS

### Mac App Store (recomendado)

[![Mac App Store](https://img.shields.io/badge/Mac_App_Store-Install-0A84FF?logo=apple&logoColor=white)](https://apps.apple.com/app/mindwtr/id6758597144)

Instala desde Mac App Store:

[Mindwtr en Mac App Store](https://apps.apple.com/app/mindwtr/id6758597144)

Usa esta opción si quieres actualizaciones administradas por la tienda y la compilación firmada de App Store.

### Beta de TestFlight

[![Beta de TestFlight](https://img.shields.io/badge/TestFlight-Beta-0A84FF?logo=apple&logoColor=white)](https://testflight.apple.com/join/7SMJCTSR)

Únete a la beta de macOS mediante TestFlight:

[Beta de Mindwtr en TestFlight](https://testflight.apple.com/join/7SMJCTSR)

Los demás canales beta y las instrucciones para abandonar la beta se explican en [Únete a los canales beta](/es/start/beta-channels).

### Homebrew

[![Versión del cask de Homebrew](https://img.shields.io/homebrew/cask/v/mindwtr?label=Homebrew&logo=homebrew&logoColor=white)](https://formulae.brew.sh/cask/mindwtr)

Instala mediante [Homebrew](https://brew.sh/):

```bash
brew install --cask mindwtr
```

### Imagen de disco (.dmg)

1. Descarga el `.dmg` desde [GitHub Releases](https://github.com/dongdongbh/Mindwtr/releases)
2. Abre la imagen de disco
3. Arrastra Mindwtr a tu carpeta Aplicaciones
4. Inícialo desde Aplicaciones o Spotlight

---

## Ubicación de los datos

Después de la instalación, tus datos se almacenan en:

| Plataforma  | Base de datos SQLite                           | JSON de sincronización                        |
| ----------- | --------------------------------------------- | -------------------------------------------- |
| **Linux**   | `~/.local/share/mindwtr/mindwtr.db`            | `~/.local/share/mindwtr/data.json`           |
| **Windows** | `%APPDATA%/mindwtr/mindwtr.db`                 | `%APPDATA%/mindwtr/data.json`                |
| **macOS**   | `~/Library/Application Support/mindwtr/mindwtr.db` | `~/Library/Application Support/mindwtr/data.json` |

Las instalaciones de Flatpak usan rutas XDG aisladas bajo `~/.var/app/tech.dongdongbh.mindwtr/`. Siempre puedes comprobar las rutas activas exactas en **Ajustes → Sincronización → Datos locales**.

La configuración se almacena por separado:

| Plataforma  | Ubicación                                      |
| ----------- | ---------------------------------------------- |
| **Linux**   | `~/.config/mindwtr/config.toml`                |
| **Windows** | `%APPDATA%/mindwtr/config.toml`                |
| **macOS**   | `~/Library/Application Support/mindwtr/config.toml` |

---

## Actualización

Las comprobaciones de actualizaciones tienen en cuenta el canal: Mindwtr detecta cómo se instaló, compara con la versión publicada para ese canal y te dirige a la vía de actualización correspondiente.

- **Microsoft Store, Winget, Chocolatey, Homebrew, AUR**: el recordatorio de actualización solo aparece cuando tu canal tiene la nueva versión; actualiza con tu gestor de paquetes como de costumbre (por ejemplo, `winget upgrade dongdongbh.Mindwtr`, `choco upgrade mindwtr`, `brew upgrade --cask mindwtr`).
- **Scoop**: Mindwtr no realiza ninguna comprobación automática de actualizaciones, ya que cualquier bucket puede contener el manifiesto y Scoop gestiona las actualizaciones (`scoop update mindwtr`). La comprobación manual en Ajustes → Acerca de sigue funcionando.
- **Flatpak, Snap y la actualización automática de las tiendas de aplicaciones**: las actualizaciones llegan automáticamente, por lo que Mindwtr no muestra avisos.
- **Descarga directa, portátil, AppImage, .deb/.rpm**: comprueba en Ajustes → Acerca de → Buscar actualizaciones; luego descarga la nueva versión desde [Releases](https://github.com/dongdongbh/Mindwtr/releases) e instálala sobre la instalación existente.

Tus datos se conservan entre actualizaciones.

---

## Desinstalación

### Linux (gestor de paquetes)
```bash
# AUR
yay -R mindwtr-bin

# Debian/Ubuntu
sudo dpkg -r mindwtr

# Flatpak
flatpak uninstall tech.dongdongbh.mindwtr
```

### Windows
Usa «Agregar o quitar programas» en la configuración de Windows.

### macOS
Arrastra Mindwtr desde Aplicaciones a la Papelera.

### Limpieza de datos
Para eliminar todos los datos, borra tanto el directorio de configuración como el de datos:
```bash
# Linux
rm -rf ~/.config/mindwtr
rm -rf ~/.local/share/mindwtr

# macOS
rm -rf ~/Library/Application\ Support/mindwtr

# Windows (PowerShell)
Remove-Item -Recurse -Force "$env:APPDATA\\mindwtr"
```

---

## Solución de problemas

### La aplicación no se inicia (Linux)

Asegúrate de que WebKitGTK esté instalado:
```bash
# Arch
sudo pacman -S webkit2gtk-4.1

# Debian/Ubuntu
sudo apt install libwebkit2gtk-4.1-0
```

### Faltan iconos

Instala un tema de iconos completo:
```bash
sudo pacman -S papirus-icon-theme
```

### Ventana en blanco

Prueba a ejecutarlo con la GPU desactivada:
```bash
WEBKIT_DISABLE_DMABUF_RENDERER=1 mindwtr
```

---

## Consulta también

- [Primeros pasos](/es/start/getting-started)
- [Guía del usuario para escritorio](/es/use/desktop)
- [Datos y sincronización](/es/data-sync/)
