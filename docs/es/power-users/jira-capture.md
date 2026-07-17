# Capturar tareas desde Jira

Mindwtr no tiene un cliente de Jira integrado, y no hay ninguno previsto. Una integración con Jira Cloud correctamente soportada supondría registrar y operar una aplicación OAuth y seguir indefinidamente los cambios de API y de políticas de Atlassian, para un gestor de trabajo entre muchos. Es un mal trato para una aplicación GTD personal.

En cambio, capturar elementos de trabajo en tu Bandeja de entrada es exactamente para lo que existe la captura GTD, y la propia automatización de Jira puede alimentar Mindwtr con piezas que ya existen. Esta página muestra tres recetas, desde la opción sin código hasta un pequeño script.

Relacionado: [Captura por correo](/es/power-users/email-capture), [API local](/es/power-users/local-api), [API de la nube](/es/developers/cloud-api)

Todas estas vías son captura de un solo sentido, no una sincronización. La tarea capturada lleva la clave de la incidencia, el resumen y un enlace de vuelta a Jira; completar la tarea en Mindwtr no hace avanzar la incidencia, y los cambios en Jira no tocan las tareas ya capturadas. Procesas el elemento capturado como cualquier otro de la Bandeja de entrada, y el enlace te lleva de vuelta cuando toca trabajar en Jira.

## Un correo por incidencia, con Jira Automation

La vía sin código. Jira te envía por correo cada elemento que coincida, y la [captura por correo](/es/power-users/email-capture) integrada de Mindwtr convierte cada mensaje en una tarea de la Bandeja de entrada. No hay nada nuevo que alojar, y el buzón hace de cola mientras tu ordenador está apagado.

1. Configura la [captura por correo](/es/power-users/email-capture) en Mindwtr Desktop, vigilando una carpeta dedicada como `Mindwtr`
2. En Jira, abre **Configuración del proyecto → Automatización** (o la automatización global) y crea una regla
3. Elige un desencadenante que signifique "me ha llegado un elemento de trabajo": **Incidencia creada**, **Incidencia asignada** o una transición de estado
4. Añade opcionalmente una **condición JQL** para acotar la regla, por ejemplo `assignee = currentUser() AND project = ABC`
5. Añade una acción **Enviar correo electrónico** a tu propia dirección, con asunto <span v-pre>`{{issue.key}} - {{issue.summary}}`</span> y un cuerpo que contenga <span v-pre>`{{issue.url}}`</span> más los campos que quieras en la descripción de la tarea
6. En tu cliente de correo, crea una regla que mueva esos mensajes a la carpeta vigilada

Cada evento coincidente produce un correo, y cada correo se convierte en una tarea titulada `ABC-123 - Fix the login redirect` con el enlace en su descripción.

Usa una regla de automatización y no una suscripción a un filtro guardado: las suscripciones envían un resumen periódico con todas las coincidencias en un solo mensaje, que se convertiría en una única tarea poco útil. La automatización se dispara una vez por elemento.

## Directo a tu servidor, con Send web request

Si usas el [servidor en la nube autohospedado](/es/power-users/docker-deployment), Jira puede saltarse el correo. La acción de automatización **Send web request** envía cada elemento a [`POST /v1/tasks`](/es/developers/cloud-api), y tus dispositivos recogen la tarea en su siguiente sincronización.

1. Crea la misma regla de automatización de antes: desencadenante y, opcionalmente, una condición JQL
2. Añade una acción **Send web request**: método `POST`, URL `https://your-server.example/v1/tasks`
3. Añade las cabeceras `Authorization: Bearer <tu token>` (marca el valor como oculto) y `Content-Type: application/json`
4. Configura el cuerpo como **Custom data** con el JSON siguiente

```json
{
  "title": "{{issue.key}} - {{issue.summary.jsonEncode}}",
  "props": { "description": "{{issue.url}}" }
}
```

La función `.jsonEncode` escapa las comillas y otros caracteres que un resumen puede contener, para que el cuerpo de la petición siga siendo JSON válido. La regla se ejecuta en la nube de Atlassian, así que la captura funciona con todas tus máquinas apagadas, y de Jira solo salen los campos que asignes.

## Un script, cuando quieres control total

Cualquier cosa capaz de llamar a la API REST de Jira y hacer una petición HTTP puede ser el puente: un script de cron, n8n, Node-RED o Zapier. Los tokens de API de Atlassian están pensados exactamente para este tipo de scripts personales. El ejemplo siguiente consulta una búsqueda JQL y captura los elementos nuevos, recordando los que ya envió:

```bash
#!/usr/bin/env bash
set -euo pipefail
JIRA="https://your-company.atlassian.net"
JQL='assignee = currentUser() AND created >= -1d'
SEEN="$HOME/.cache/jira-mindwtr-seen"
touch "$SEEN"

curl -s -u "you@company.example:$JIRA_TOKEN" \
  "$JIRA/rest/api/3/search/jql" --get \
  --data-urlencode "jql=$JQL" --data-urlencode "fields=summary" |
jq -r '.issues[] | "\(.key)\t\(.fields.summary)"' |
while IFS=$'\t' read -r key summary; do
  grep -qxF "$key" "$SEEN" && continue
  curl -s -X POST "https://your-server.example/v1/tasks" \
    -H "Authorization: Bearer $MINDWTR_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$(jq -n --arg t "$key - $summary" --arg d "$JIRA/browse/$key" \
          '{title: $t, props: {description: $d}}')" > /dev/null
  echo "$key" >> "$SEEN"
done
```

Sin servidor en la nube, apunta el mismo script a la [API local](/es/power-users/local-api) del escritorio: `http://127.0.0.1:3456/tasks`, mismo esquema de token Bearer, mientras la aplicación de escritorio esté abierta.

## Otros gestores

Aquí nada es específico de Jira más allá de los smart values. GitHub, GitLab, Linear y la mayoría de los demás gestores pueden enviar un correo o una petición HTTP cuando se crea o asigna un elemento, y valen las mismas tres recetas. Si montas un puente que merezca compartirse, publícalo en las [GitHub Discussions](https://github.com/dongdongbh/Mindwtr/discussions) para que otros lo aprovechen.
