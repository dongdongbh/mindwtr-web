# Diagnóstico y registros

Mindwtr incluye registros de diagnóstico para ayudar a resolver problemas de sincronización y cierres inesperados. Los registros son **solo locales** y los valores sensibles se **ocultan** antes de escribirlos.

---

## Activar el registro de depuración

### Escritorio

1. Abre **Ajustes → Datos**.
2. Activa **Registro de depuración**.
3. Reproduce el problema.

**Compilaciones de diagnóstico:** las herramientas de desarrollo y los registros adicionales solo están disponibles si la aplicación de escritorio se compiló con la función `diagnostics`.

```bash
cd apps/desktop
cargo tauri build --features diagnostics
MINDWTR_DIAGNOSTICS=1 ./src-tauri/target/release/mindwtr
```

### Dispositivos móviles

1. Abre **Ajustes → Datos**.
2. Activa **Registro de depuración**.
3. Reproduce el problema.

---

## Compartir o borrar registros

### Escritorio

- La ruta del archivo aparece en **Ajustes → Datos**.
- Puedes borrar los registros desde la misma pantalla.

### Dispositivos móviles

- Usa **Compartir registro** para exportar un archivo.
- Usa **Borrar registro** para eliminar entradas antiguas.

---

## Ubicaciones predeterminadas (escritorio)

| Plataforma | Archivo de registro |
| --- | --- |
| Linux | `~/.local/share/mindwtr/logs/mindwtr.log` |
| Windows | `%APPDATA%/mindwtr/logs/mindwtr.log` |
| macOS | `~/Library/Application Support/mindwtr/logs/mindwtr.log` |

---

## Qué se registra

- Errores y pasos de sincronización.
- Resúmenes de conflictos: las combinaciones que resolvieron conflictos siempre se escriben en `mindwtr.log`, aunque la depuración esté desactivada, para que las resoluciones puedan auditarse después. Estas entradas incluyen identificadores de registros, nombres de campos modificados y qué lado prevaleció; nunca escriben el contenido del registro, como títulos o notas.
- Errores inesperados durante la ejecución.

Los valores sensibles —claves de API, tokens, contraseñas y URL con credenciales— se ocultan automáticamente.

---

## Páginas relacionadas

- [Preguntas frecuentes](/es/start/faq)
- [Datos y sincronización](/es/data-sync/)
