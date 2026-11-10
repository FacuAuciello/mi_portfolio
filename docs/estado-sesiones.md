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

---

## Sesión 2 — 2026-11-09: consultorio, apuntes de Java y página del CV

### Qué se hizo
1. **Consultorio odontológico, de punta a punta.** Se tomó el proyecto de un zip y se llevó, por etapas, a un repo público: https://github.com/FacuAuciello/consultorio-odontologico. El detalle completo está en [`consultorio-odontologico.md`](consultorio-odontologico.md). En resumen:
   - Pasó de Java 21 a **Java 17** a propósito (para mostrar que se manejan distintas versiones; Conectar Docentes usa Java 25) y compila y pasa los tests en las dos.
   - Se arregló la vista de celular (las tablas pasan a tarjetas).
   - Se cambió el nombre real del dentista por uno ficticio en el código y en las capturas.
   - Revisión del backend con correcciones; la principal evita **turnos superpuestos** cuando llegan pedidos a la vez (un cerrojo que envuelve la transacción).
   - Tests: de 27 a **104 en el backend** y de 20 a **32 en el frontend**, con tests de concurrencia que se comprobó que fallan si se saca el cerrojo.
2. **Apuntes de Java (privados).** Los Word de los cursos se convirtieron a texto en una carpeta privada (fuera de cualquier repo) y se armó una guía de estilo, `REGLAS-JAVA.md`. No se suben a GitHub porque parte del material es de un curso.
3. **Reglas y stack para subir proyectos:** [`stack-y-reglas.md`](stack-y-reglas.md).
4. **Página del CV.** El inicio de facundoauciello.com pasó a ser el portfolio para postulaciones, con los proyectos primero.

### Decisiones y por qué
- **Dos entradas en el mismo sitio:** `facundoauciello.com` es el CV (para LinkedIn y postulaciones) y `facundoauciello.com/#/negocios` es la página para negocios (los servicios freelance, a la que apuntará el QR de la tarjeta). Un recruiter busca pruebas (proyectos, código); el dueño de un local busca ver qué problema se le resuelve. Mezclarlos confunde a los dos.
- **Título: "Desarrollador Java Full Stack".** No ata a un framework de front, así que sirve para ofertas con React y con Angular.
- **React primero, Angular como segunda carta:** ya hay un proyecto real en React y TypeScript. Angular se suma si las ofertas a las que se postula lo piden, y no se pone en el CV hasta construir algo con él.
- **Honestidad sobre el estado de cada proyecto:** el consultorio dice "entregado al cliente" (no está en producción) y Conectar Docentes dice "MVP en línea, todavía sin usuarios reales".
- **Conectar Docentes sin enlace al código:** su repo es privado, así que la tarjeta enlaza al sitio en línea y dice "código disponible a pedido".
- **El botón "Ver ejemplos" se oculta** mientras un servicio no tenga ejemplos; antes llevaba a una pantalla vacía.

### Cómo funciona la página del CV (para explicarlo)
- **Rutas por hash**, sin librería: `#/` inicio, `#/negocios` negocios, `#/negocios/<servicio>` baja hasta la tarjeta, `#/ejemplos/<servicio>` ejemplos. Los enlaces como `#proyectos` son anclas dentro del inicio. Un detalle que costó: un enlace `#<id>` mandaba al inicio en vez de a negocios, así que los enlaces entre páginas empiezan siempre con `#/`.
- **Datos separados del diseño:** los proyectos están en `src/data/proyectos.ts` y los enlaces personales en `src/data/enlaces.ts`.
- **Vista previa en LinkedIn:** `index.html` trae las etiquetas Open Graph y la imagen `public/og.png` (1200 × 630).
- **Comprobado con Chrome:** 16 comprobaciones de navegación con clics reales (rutas, anclas, carrusel, imágenes), capturas en escritorio y celular, sin ningún `localhost` en el código publicado.

### Pendiente
- **Publicar estos cambios** del portfolio (el push a `main` despliega el sitio solo).
- **Permiso del dentista** para tener el consultorio público.
- **Demo del consultorio** en el portfolio (Etapa 7): front con datos simulados, publicado como sitio aparte; después se activa el botón "Ver demo" de la tarjeta.
- **Tarjeta con QR** que apunte a `facundoauciello.com/#/negocios`, y al menos una demo más antes de ofrecer "demos de tu rubro".
- **Decidir si se hace público** el repo de Conectar Docentes (requiere una revisión previa).
- **Borrado lógico de pacientes** en el consultorio (cambia el modelo de datos; queda a decisión).
- **Opcional:** hacer el front del consultorio también en Angular, contra la misma API, si las ofertas lo piden.
