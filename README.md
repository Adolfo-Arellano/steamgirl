# Integración con Supabase — STEAM Girls

Esta carpeta trae todo lo necesario para reemplazar los mocks del frontend
por datos reales en Supabase. Los archivos están organizados igual que en
`src/` del proyecto para que sea fácil copiarlos.

## Orden de pasos

### 1. Correr el schema SQL

En tu proyecto de Supabase: **SQL Editor > New query**, pegá el contenido
completo de `sql/001_schema.sql` y ejecutalo. Esto crea:

- Tablas: `admins`, `posts`, `comments`, `subscribers`, `blocked_words`
- Row Level Security (RLS) en todas, con las políticas de acceso correctas
- El trigger `moderate_comment`, que revisa cada comentario nuevo contra la
  tabla `blocked_words` y lo marca `approved` o `pending` automáticamente

No hace falta tocar nada del archivo — está pensado para correr tal cual.

### 2. Activar email/password en Auth

**Authentication > Providers > Email** — confirmá que esté habilitado (viene
así por defecto). Si no querés que las admins tengan que confirmar el email
al crearlas manualmente vos, podés desactivar "Confirm email" en
**Authentication > Settings** (opcional, cómodo para un equipo chico).

### 3. Crear tu primera administradora

Esto tiene dos partes: crear el usuario en Auth, y agregarlo a la tabla
`admins` para que el sistema lo reconozca como tal.

1. **Authentication > Users > Add user** (o "Invite user"). Cargá el email
   real de una admin (ej. `florencia@steamgirls.club`) y una contraseña.
2. Copiá el **UUID** que le asignó (columna `UID` en la lista de usuarios).
3. Andá a **Table Editor > admins > Insert row** y cargá:
   - `id`: pegá el UUID que copiaste
   - `name`: "Florencia Ysaguirre"
   - `role`: "Fundadora & dirección de marca"
   - `bio`: lo que quieras mostrar en el equipo
   - `avatar_url`: una URL de imagen

Repetí esto por cada administradora. Recién en el paso 3 esa cuenta puede
entrar al panel — crear el usuario en Auth sin agregarlo a `admins` no le da
acceso (`login()` en el frontend chequea las dos cosas).

### 4. (Opcional) Cargar datos de ejemplo

`sql/002_seed_opcional.sql` inserta un post de prueba. Reemplazá
`'TU_ADMIN_UUID_ACA'` por el UUID de una admin real antes de correrlo.

### 5. Variables de entorno en el frontend

Copiá `.env.example` a `.env.local` en la raíz del proyecto (no `.env` — así
Vite lo toma en local y por convención no se commitea) y completá con los
valores de **Project Settings > API** de tu proyecto Supabase:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-publica
```

La "anon key" es pública por diseño (va en el bundle del frontend) — la
seguridad real la da RLS, que ya está configurado en el schema.

### 6. Instalar el cliente de Supabase

```bash
npm install @supabase/supabase-js@2.45.4
```

**Importante: usá exactamente esta versión (no la última).** Las versiones
2.50 en adelante de `@supabase/supabase-js` tienen un bug conocido de
inferencia de tipos: al pasarle tu tipo `Database` como genérico a
`createClient<Database>(...)`, todas las queries devuelven `never` en lugar
de los tipos reales de las tablas, y el proyecto no compila. `2.45.4` es la
última versión antes de que se introdujera el problema. Si en el futuro
actualizás dependencias y ves errores de tipo `Property 'x' does not exist
on type 'never'` en `src/data/posts.ts` o `src/data/admins.ts`, este es el
motivo — revisá si el bug sigue reportado antes de actualizar
`@supabase/supabase-js`.

### 7. Copiar los archivos al proyecto

Cada carpeta acá (`src-lib`, `src-data`, `src-components`, `src-pages`,
`src-hooks`, `src-types`) tiene el prefijo `src-` en vez de `src/` para que
no pise nada sin que lo revises primero. Copiá el contenido de cada una a su
carpeta real en `src/`, reemplazando el archivo mock existente:

| Archivo acá | Reemplaza en tu proyecto |
|---|---|
| `src-lib/supabase.ts` | `src/lib/supabase.ts` (nuevo) |
| `src-lib/database.types.ts` | `src/lib/database.types.ts` (nuevo) |
| `src-lib/auth.tsx` | `src/lib/auth.tsx` |
| `src-data/posts.ts` | `src/data/posts.ts` |
| `src-data/admins.ts` | `src/data/admins.ts` |
| `src-hooks/useAsync.ts` | `src/hooks/useAsync.ts` (nuevo) |
| `src-types/index.ts` | `src/types/index.ts` |
| `src-components/ProtectedRoute.tsx` | `src/components/ProtectedRoute.tsx` |
| `src-components/CommentSection.tsx` | `src/components/newsletter/CommentSection.tsx` |
| `src-components/SubscribeForm.tsx` | `src/components/newsletter/SubscribeForm.tsx` |
| `src-components/NovedadesSection.tsx` | `src/components/home/NovedadesSection.tsx` |
| `src-components/TeamSection.tsx` | `src/components/home/TeamSection.tsx` |
| `src-components/AdminSidebar.tsx` | `src/components/admin/AdminSidebar.tsx` |
| `src-components/PostComposer.tsx` | `src/components/admin/PostComposer.tsx` |
| `src-pages/NewsletterPage.tsx` | `src/pages/NewsletterPage.tsx` |
| `src-pages/PostDetailPage.tsx` | `src/pages/PostDetailPage.tsx` |
| `src-pages/AdminLoginPage.tsx` | `src/pages/AdminLoginPage.tsx` |
| `src-pages/AdminDashboardPage.tsx` | `src/pages/AdminDashboardPage.tsx` |

`data/categories.ts` **no cambia** — sigue siendo metadata visual estática
(colores por categoría), no datos de negocio.

Los mocks viejos de `src/data/posts.ts` y `src/data/admins.ts` (arrays
hardcodeados) dejan de usarse una vez copiados los reemplazos — podés
borrarlos.

### 8. Probar

```bash
npm run dev
```

- El Home y el Newsletter deberían mostrar "Cargando..." un instante y
  después los datos reales de tu base (vacíos si no cargaste el seed).
- Entrá a `/admin/ingresar` con el email y contraseña que creaste en el
  paso 3.
- Publicá algo desde el composer del panel — debería aparecer en el
  newsletter público al toque.
- Probá comentar con una palabra de `blocked_words` (ej. "idiota") y
  confirmá que no aparece en la lista pública hasta aprobarlo manualmente
  desde Table Editor (cambiando su `status` a `approved`) — la UI de
  moderación dentro del panel admin todavía no está construida, ver la
  siguiente sección.

## Qué queda pendiente (fuera de este alcance)

- **Pantalla de moderación de comentarios** en el panel admin: hoy podés
  aprobar comentarios `pending` a mano desde el Table Editor de Supabase.
  Construir la UI (`comments` filtrados por `status = 'pending'` + botón
  aprobar/rechazar) es un paso natural siguiente.
- **Métricas reales del dashboard**: las tarjetas de suscriptas, comentarios
  pendientes y próximo evento quedaron con placeholders (`—`) — son queries
  cortas a `subscribers`, `comments` y `posts` respectivamente.
- **Envío real de emails** a las suscriptoras cuando se publica una nota
  nueva: requiere un Edge Function de Supabase + un proveedor (Resend,
  por ejemplo) — la tabla `subscribers` ya está lista para eso.
- **Gestión de administradoras desde la UI**: hoy se agregan a mano desde
  el Table Editor (paso 3). Si el equipo crece, conviene una pantalla para
  invitar admins sin entrar a Supabase directamente.
- **Edición y borrado de posts publicados** desde el panel (`PostRow` hoy
  solo muestra, no edita).
