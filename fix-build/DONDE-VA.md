# Fix de los 3 errores de build

| Archivo en este zip | Reemplaza en tu proyecto |
|---|---|
| Hero.tsx | src/components/home/Hero.tsx |
| database.types.ts | src/lib/database.types.ts |

## Qué se corrigió

1. **Hero.tsx**: `formatEventDate` desestructuraba `year` sin usarlo.
   Cambiado a `const [, month, day] = ...` para descartarlo sin declarar
   una variable.

2. **database.types.ts**: le faltaba el campo `event_date` en la tabla
   `posts` (Row e Insert) — por eso `posts.ts` no podía leer
   `row.event_date`. De paso agregué también la tabla `contact_messages`
   a los tipos, por si todavía no la tenías ahí desde la pantalla de
   Contacto.

Después de copiar estos dos, corré `npm run build` de nuevo — debería
compilar sin errores.
