# Primeros pasos

¡Te damos la bienvenida a Mindwtr! Esta guía te ayudará a empezar rápidamente.

## Instalación

### Escritorio

| Plataforma | Instalación |
| --- | --- |
| **Arch Linux** | Paquete AUR precompilado `mindwtr-bin` o paquete AUR `mindwtr` compilado desde el código fuente |
| **Debian/Ubuntu** | Añade el repositorio APT (recomendado) o descarga el archivo `.deb` desde [Releases](https://github.com/dongdongbh/Mindwtr/releases) |
| **Fedora/RHEL** | Añade el repositorio DNF (recomendado) o descarga el archivo `.rpm` desde [Releases](https://github.com/dongdongbh/Mindwtr/releases) |
| **Flatpak** | Instálalo desde [Flathub](https://flathub.org/apps/tech.dongdongbh.mindwtr) |
| **AppImage** | Descarga el archivo `.AppImage`, ejecuta `chmod +x` y ábrelo |
| **Windows** | Microsoft Store, Winget, Chocolatey, Scoop, ZIP portátil o instalador de [Releases](https://github.com/dongdongbh/Mindwtr/releases) |
| **macOS** | [Mac App Store](https://apps.apple.com/app/mindwtr/id6758597144), beta de TestFlight, Homebrew o archivo `.dmg` de [Releases](https://github.com/dongdongbh/Mindwtr/releases) |

Consulta [Instalación en escritorio](/es/start/desktop-installation) para ver las instrucciones detalladas.

### Dispositivos móviles

| Plataforma | Instalación |
| --- | --- |
| **Android** | Google Play, F-Droid, IzzyOnDroid o APK de [Releases](https://github.com/dongdongbh/Mindwtr/releases) |
| **iOS** | App Store, beta de TestFlight o simulador/compilación propia para desarrollo |

Consulta [Instalación en dispositivos móviles](/es/start/mobile-installation) para ver las instrucciones detalladas.

¿Quieres probar nuevas compilaciones antes? Consulta [Participar en los canales beta](/es/start/beta-channels).

### Docker y aplicación web

Ejecuta la aplicación web (PWA) y el servidor de sincronización autohospedado con Docker cuando quieras un despliegue accesible desde el navegador:

- [Despliegue con Docker](/es/power-users/docker-deployment)
- [Aplicación web (PWA)](/es/power-users/web-app-pwa)

---

## Primer inicio

En una instalación nueva, Mindwtr te pregunta si quieres empezar de cero, importar una copia de seguridad o conectar la sincronización. Después de configurarlo, abre de forma predeterminada la vista **Foco**, para mostrar primero los elementos del calendario y las próximas acciones de hoy. Captura trabajo nuevo en la **Bandeja de entrada** siempre que necesites anotar rápidamente una idea.

### Flujo de trabajo básico

1. **Captura** todo en la Bandeja de entrada.
2. **Aclara** cada elemento con el asistente de procesamiento.
3. **Organiza** en Próximas acciones, Proyectos o Algún día/Tal vez.
4. **Reflexiona** durante la Revisión semanal.
5. **Actúa** con confianza.

---

## Sintaxis de adición rápida

Mindwtr admite lenguaje natural al añadir elementos rápidamente. Escribe directamente en el campo de tareas. La misma sintaxis funciona en la pregunta «¿Cuál es la próxima acción?» que aparece al completar la última acción de un proyecto (por ejemplo, termina con `/waiting` para dejar el seguimiento En espera):

| Sintaxis | Ejemplo | Resultado |
| --- | --- | --- |
| `@context` | `Buy milk @errands` | Añade el contexto @errands |
| `#tag` | `Research topic #creative` | Añade la etiqueta #creative |
| `+Project` | `Call vendor +HomeReno` | Asigna al proyecto |
| `+Multi Word` | `+New Project Name` | Asigna a «New Project Name» |
| `+"Quoted Name"` | `+"New Project" call Bob` | Las comillas delimitan un nombre de varias palabras dentro de una frase (también `!"Area Name"`) |
| `!Area` | `Plan roadmap !Work` | Asigna al área |
| `%Person` | `Ask %Jim for the budget /waiting` | Establece Asignada a (persona delegada o responsable de En espera) |
| `%"Full Name"` | `%"Jim Smith" send report` | Las comillas delimitan el nombre completo de una persona (los nombres conocidos también se reconocen sin comillas) |
| `/area:<name>` | `/area:Personal` | Asigna al área (sin espacios) |
| `/start:date` | `Task /start:monday` | Establece la fecha de inicio |
| `/due:date` | `Report /due:friday` | Establece la fecha límite |
| `/review:date` | `Task /review:next week` | Establece la fecha de revisión |
| `/energy:<level>` | `Task /energy:low` | Establece el nivel de energía (`low`, `medium`, `high`) |
| `/note:text` | `Task /note:remember X` | Añade una descripción |
| `/status` | `/next`, `/waiting`, `/someday`, `/done`, `/archived`, `/inbox` | Establece el estado |

**Ejemplos de fechas:**

- `/due:today`, `/due:tomorrow`
- `/due:friday`, `/due:next week`
- `/due:in 3 days`, `/due:2025-01-15`
- `/start:tomorrow`, `/review:next week`

Las fechas absolutas usan el formato ISO fijo `YYYY-MM-DD` (por ejemplo, `/due:2026-03-15`), independientemente del idioma o el formato de fecha de la interfaz.

**Caracteres de escape**

- Usa una barra invertida para conservar los símbolos como texto: `\@`, `\#`, `\+`, `\!`, `\%`, `\/`.
- Ejemplo: `Call \@support /due:tomorrow` → el título pasa a ser `Call @support`.

**Compatibilidad con Unicode**

- Los nombres de contextos y etiquetas aceptan letras y números Unicode (por ejemplo, caracteres CJK y acentuados).

> **Consejo:** También puedes usar la **captura de audio** para dictar tareas. Actívala en **Ajustes → Asistente de IA** para usar la conversión de voz a texto con análisis inteligente.

---

## Modelo de organización

Mindwtr usa cuatro herramientas de agrupación diferentes. Usa cada una para aquello que mejor resuelve:

- **Proyectos**: resultados que requieren varios pasos y que quieres completar (por ejemplo, «Publicar el sitio web v2»).
- **Áreas**: ámbitos de responsabilidad continuos y sin un final definido (por ejemplo, «Salud», «Familia» o «Carrera»).
- **Contextos**: dónde o cómo puede hacerse una tarea (por ejemplo, `@home`, `@phone` o `@errands`).
- **Etiquetas**: rótulos flexibles para la energía, el tema o agrupaciones personalizadas (por ejemplo, `#focused` o `#lowenergy`).

Regla práctica:

- Si tiene un estado final, usa un **Proyecto**.
- Si es un ámbito duradero de la vida o el trabajo, usa un **Área**.
- Si depende de un lugar, una herramienta o una persona, usa un **Contexto**.
- Si quieres un filtro opcional, usa una **Etiqueta**.

---

## Siguientes pasos

- Conoce la [introducción a GTD](/es/use/gtd-overview).
- Explora la [guía de escritorio](/es/use/desktop) o la [guía para dispositivos móviles](/es/use/mobile).
- Configura [Datos y sincronización](/es/data-sync/).
- Activa el [Asistente de IA](/es/power-users/ai-assistant) (opcional).

---

## ¿Necesitas ayuda?

- El mejor lugar para informar de un error o pedir ayuda es una [incidencia de GitHub](https://github.com/dongdongbh/Mindwtr/issues), ya que permite hacer seguimiento de todo.
- ¿Ya estás en la aplicación? Usa **Enviar comentarios** en la página **Ajustes → Acerca de**.
- Para una consulta privada, escribe a [support@mindwtr.app](mailto:support@mindwtr.app).
- Consulta las [preguntas frecuentes](/es/start/faq) o lee la guía completa del [flujo de trabajo GTD en Mindwtr](/es/use/gtd-workflow).
