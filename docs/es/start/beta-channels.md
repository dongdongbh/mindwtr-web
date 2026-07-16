# Participar en los canales beta

Mindwtr publica versiones beta y candidatas antes de cada versión estable definitiva. Las versiones beta reciben antes las funciones nuevas y las correcciones de errores, y ayudan a detectar problemas específicos de cada plataforma antes de que la misma compilación llegue a todas las personas del canal estable.

Puedes permanecer en un canal beta a largo plazo. Las versiones estables también se publican en los canales beta, por lo que no necesitas volver al canal estable después de cada ciclo de pruebas para mantenerte al día.

Si necesitas la compilación de menor riesgo, usa las páginas de instalación estable:

- [Instalación en escritorio](/es/start/desktop-installation)
- [Instalación en dispositivos móviles](/es/start/mobile-installation)

## Android: pruebas abiertas de Google Play

Únete al canal de pruebas abiertas de Google Play y después actualiza normalmente desde Play Store:

- [Unirse desde Android](https://play.google.com/store/apps/details?id=tech.dongdongbh.mindwtr)
- [Unirse desde la web](https://play.google.com/apps/testing/tech.dongdongbh.mindwtr)

Para abandonar la beta más adelante, vuelve al mismo enlace de pruebas y elige **Salir del programa**.

## iOS, iPadOS y macOS: TestFlight

Instala TestFlight y únete a la beta de Mindwtr:

- [Beta de Mindwtr en TestFlight](https://testflight.apple.com/join/7SMJCTSR)

Para salir de TestFlight, elimina Mindwtr de TestFlight y reinstala la versión estable desde App Store o Mac App Store.

## Linux: beta de AUR

Quienes usen Arch Linux o una distribución derivada pueden instalar el paquete beta específico:

```bash
yay -S mindwtr-bin-beta
```

Página del paquete:

- [mindwtr-bin-beta en AUR](https://aur.archlinux.org/packages/mindwtr-bin-beta)

Para volver a la versión estable, instala `mindwtr-bin`.

## Linux: beta de Flathub

Añade una vez el repositorio remoto beta de Flathub e instala la rama beta:

```bash
flatpak remote-add --if-not-exists flathub-beta https://flathub.org/beta-repo/flathub-beta.flatpakrepo
flatpak install flathub-beta tech.dongdongbh.mindwtr//beta
```

Ejecuta explícitamente la compilación beta:

```bash
flatpak run --branch=beta tech.dongdongbh.mindwtr
```

Puedes mantener instaladas a la vez las versiones estable y beta. Para que el lanzador del escritorio abra la rama beta:

```bash
flatpak make-current tech.dongdongbh.mindwtr beta
```

Para que el lanzador vuelva más adelante a la versión estable:

```bash
flatpak make-current tech.dongdongbh.mindwtr stable
```

## Linux: repositorios beta de APT y RPM

Quienes usen Debian o Ubuntu pueden añadir el repositorio APT beta (la clave de firma se comparte con el repositorio estable):

```bash
curl -fsSL https://dongdongbh.github.io/Mindwtr/mindwtr.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/mindwtr-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/mindwtr-archive-keyring.gpg] https://dongdongbh.github.io/Mindwtr/deb-beta ./" | sudo tee /etc/apt/sources.list.d/mindwtr-beta.list
sudo apt update
sudo apt install mindwtr
```

Quienes usen Fedora, RHEL u openSUSE pueden añadir el repositorio beta DNF/YUM:

```bash
cat <<'EOF' | sudo tee /etc/yum.repos.d/mindwtr-beta.repo
[mindwtr-beta]
name=Mindwtr Beta Repository
baseurl=https://dongdongbh.github.io/Mindwtr/rpm-beta
enabled=1
gpgcheck=0
EOF

sudo dnf install mindwtr
```

Las versiones estables también se publican en los repositorios beta. Las candidatas se versionan como `1.2.0~rc.3` en los metadatos del paquete; tanto APT como DNF las ordenan por debajo de la versión definitiva `1.2.0`, así que las actualizaciones normales te llevan automáticamente de una candidata a la versión estable correspondiente.

Para abandonar el repositorio beta, elimina `/etc/apt/sources.list.d/mindwtr-beta.list` (o `/etc/yum.repos.d/mindwtr-beta.repo`) y reinstala desde el repositorio estable.

## Docker: etiqueta beta

Cada versión llega a GHCR con su etiqueta de versión y la etiqueta flotante `beta` siempre apunta a la más reciente (candidata o estable), por lo que quienes usan `beta` nunca tienen que cambiar de etiqueta. `latest` permanece en la versión estable más reciente:

```bash
docker pull ghcr.io/dongdongbh/mindwtr-app:beta
docker pull ghcr.io/dongdongbh/mindwtr-cloud:beta
```

Puedes fijar una versión preliminar concreta, por ejemplo `ghcr.io/dongdongbh/mindwtr-app:1.2.0-rc.1`. Consulta [Despliegue con Docker](/es/power-users/docker-deployment) para configurar Compose.

## Windows, AppImage, APK FOSS y otras descargas directas

Las compilaciones preliminares se publican en GitHub Releases y se marcan como versiones preliminares:

- [Versiones de Mindwtr](https://github.com/dongdongbh/Mindwtr/releases)

Busca versiones con un sufijo preliminar como `-rc` o `-beta`. Las versiones estables siguen disponibles en la misma página.

## Informar de problemas en la beta

Si encuentras un error, [abre una incidencia](https://github.com/dongdongbh/Mindwtr/issues/new/choose) e incluye:

- tu plataforma;
- la versión que aparece en **Ajustes → Acerca de**;
- qué esperabas que ocurriera;
- qué ocurrió en su lugar.

Los comentarios sobre la beta son más útiles cuando incluyen la plataforma y la versión exacta, porque las correcciones de las versiones candidatas suelen variar según el canal.
