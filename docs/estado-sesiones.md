# Estado del proyecto por sesiones

Registro de lo que se fue haciendo en el portfolio, con el porqué de cada decisión, para poder explicarlo después. Cada sesión nueva se agrega al final.

## Resumen rápido

- **Qué es:** portfolio personal de Facundo Auciello para conseguir trabajo. Muestra servicios (páginas web, control de stock, turnos) y, más adelante, proyectos reales y demos.
- **Tecnologías:** React 19 + TypeScript + Vite. Sin librerías de UI ni de routing.
- **Online en:** https://facundoauciello.com
- **Repo:** https://github.com/FacuAuciello/mi_portfolio (rama `main`)
- **Hosting y dominio:** Cloudflare (registro del dominio, DNS y Workers con archivos estáticos).

---

## Sesión 1 — 2026-11-09: revisión, dominio y publicación

### Qué se hizo
1. **Documentación para Claude Code:** se creó `CLAUDE.md` en la raíz, con los comandos y la arquitectura del proyecto.
2. **Revisión del código:** `npm run lint` y `npm run build` pasan sin errores. Se detectó:
   - `ProyectoCard.tsx` y `Contacto.tsx` no se usan en ningún lado (código muerto). `ProyectoCard` apunta a `http://localhost:8080`, el backend que todavía no existe.
   - Las demos de cada servicio están vacías (`src/ejemplos/registro.ts`), así que "Ver ejemplos" muestra una pantalla vacía.
   - El home vende servicios pero no muestra proyectos hechos.
3. **Se levantó en local** con `npm install` y `npm run dev` (http://localhost:5173).
4. **Retoques para publicar** (`index.html`): `lang="es"`, título "Facundo Auciello — Programador" y un favicon provisorio en `public/favicon.svg`.
5. **Dominio:** se compró `facundoauciello.com` en **Cloudflare Registrar** (~USD 11,17 por año, con renovación automática al mismo precio).
6. **Publicación en Cloudflare Workers:** se agregó `wrangler.jsonc` y se conectó el repo de GitHub. Cada `git push` a `main` vuelve a publicar el sitio solo.
7. **Dominios personalizados:** `facundoauciello.com` y `www.facundoauciello.com` apuntan al Worker.
8. **Redirección `www` → raíz** (Redirect Rule, plantilla "Redirect from WWW to root", 301, conservando los parámetros de la URL).
9. **Always Use HTTPS** activado: cualquier `http://` pasa a `https://`.
10. **URLs temporales `workers.dev` apagadas** (Production y Preview): ahora responden 404.

### Commits de la sesión
- `53d9692` — Preparar sitio para publicar: idioma, título, favicon y `CLAUDE.md`
- `05a068b` — Agregar `wrangler.jsonc` para publicar en Cloudflare

### Decisiones y por qué
- **Dominio `.com` y no `.dev`:** es el más conocido, y la renovación es más barata (~USD 11 contra ~USD 12 del `.dev`, que además tiene un precio de promo el primer año). Se evitó `.tech`, que renueva a ~USD 49.
- **Cloudflare para todo:** el registro, el DNS y el hosting quedan en un solo lugar, sin recargo en el dominio.
- **Hosting estático:** el sitio es solo frontend (`dist/`), así que no hace falta servidor. El routing es por hash (`#/ejemplos/<id>`), por eso no necesita configuración especial.
- **Una sola dirección pública:** se redirige `www` a la raíz y se apagaron las URLs de `workers.dev`, para que no haya varias copias del sitio.
- **Los proyectos se refinan en su propio repo:** cada proyecto se trabaja y se sube a GitHub por separado, y en el portfolio solo va la tarjeta con el link.

### Cómo se publica hoy (para explicarlo)
1. Se hace `git push` a `main`.
2. Cloudflare clona el repo, corre `npm run build` (genera `dist/`) y `npx wrangler deploy`.
3. `wrangler.jsonc` le indica que publique la carpeta `./dist` como archivos estáticos.
4. El sitio queda disponible en `facundoauciello.com`, con HTTPS.

### Pendiente
- Subir los 2 proyectos reales (uno está en un zip que se revisa y limpia antes de publicar en GitHub).
- Armar las demos de los servicios (hoy vacías).
- Decidir qué hacer con `ProyectoCard.tsx` y `Contacto.tsx` (reutilizar o borrar).
- Reemplazar el favicon provisorio por un logo propio.
- Más adelante: backend en Java (Spring Boot). Habrá que usar una variable `VITE_API_URL` en lugar de `http://localhost:8080` y configurar CORS para el dominio.
