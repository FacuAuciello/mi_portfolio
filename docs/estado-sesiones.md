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

### Pendiente (estado al 2026-11-10)
- ~~Subir los 2 proyectos reales~~: hecho en la Sesión 2 (el consultorio está en GitHub y los dos proyectos están en la página del CV).
- **Armar las demos de los servicios** (hoy vacías): sigue pendiente. Cuando haya una, el botón "Ver ejemplos" vuelve a aparecer solo.
- ~~Decidir qué hacer con `ProyectoCard.tsx` y `Contacto.tsx`~~: hecho, se reutilizaron en la página del CV.
- **Reemplazar el favicon provisorio** por un logo propio: sigue pendiente.
- **Más adelante: backend en Java** (Spring Boot). Habrá que usar una variable `VITE_API_URL` en lugar de `http://localhost:8080` (esa dirección ya no está en el código) y configurar CORS para el dominio.

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
- ~~Publicar la página del CV~~: hecho, está en línea en https://facundoauciello.com (commit `b0e56d4`, verificada con las mismas 16 comprobaciones de navegación).
- ~~Permiso del dentista~~: hecho, está de acuerdo con que se muestre (es de confianza; de palabra).
- **Demo del consultorio** en el portfolio (Etapa 7): front con datos simulados, publicado como sitio aparte; después se activa el botón "Ver demo" de la tarjeta.
- **Tarjeta con QR** que apunte a `facundoauciello.com/#/negocios`, y al menos una demo más antes de ofrecer "demos de tu rubro".
- ~~Más capturas de Conectar Docentes~~: hecho en la Sesión 3 (ver abajo).
- **Decidir si se hace público** el repo de Conectar Docentes (requiere una revisión previa).
- **Borrado lógico de pacientes** en el consultorio (cambia el modelo de datos; queda a decisión).
- **Opcional:** hacer el front del consultorio también en Angular, contra la misma API, si las ofertas lo piden.

---

## Sesión 3 — 2026-11-10: puesta al día de la documentación

### Qué se hizo
Se revisaron todos los `.md` de los proyectos para ver cuáles habían quedado desactualizados después de la Sesión 2.

1. **`README.md` del portfolio:** estaba muy desactualizado (decía que el front consumía una API de Spring Boot y que estaba "En desarrollo"). Se reescribió: qué muestra cada entrada, los proyectos, cómo correrlo, cómo se publica y cómo agregar un proyecto.
2. **`CLAUDE.md` del portfolio:** describía la arquitectura anterior (la función `useServicioEjemplos()` ya no existe y decía que los "volver" usan `#<id>`, justo el error que había que evitar). Se reescribió con las rutas nuevas, la regla de los enlaces entre páginas (`#/...`), los archivos de datos, la publicación y las reglas de privacidad.
3. **`docs/consultorio-odontologico.md`:** se corrigieron tres frases viejas (la tarjeta ya estaba publicada y los tests de concurrencia y de controllers ya existían).
4. **Este archivo:** se cerró el "Pendiente" de la Sesión 1.
5. **`CLAUDE.md` del repo del consultorio (nuevo):** comandos, Java 17 a propósito, el problema de CORS con otro puerto, la concurrencia de los turnos, convenciones y privacidad. Está creado en la carpeta del proyecto pero todavía no se subió a su repo.

### Cosas a corregir que aparecieron
- El comentario de `frontend/vite.config.ts` del consultorio dice que en desarrollo "ni siquiera se necesita CORS". No es cierto si el front corre en otro puerto que el permitido por el backend (el navegador manda el `Origin` igual). Está documentado en el `CLAUDE.md` del consultorio; falta corregir el comentario.

### Pendiente
- **Commit y push** de estos cambios: en el portfolio (README, CLAUDE.md y `docs/`) y en el consultorio (`CLAUDE.md`). El push al portfolio vuelve a desplegar el sitio, aunque estos cambios no alteran lo que se ve.
- **Etapa 7:** la demo del consultorio con datos simulados y, después, el botón "Ver demo" de la tarjeta.
- **Tarjeta con QR** para negocios (apunta a `facundoauciello.com/#/negocios`) y al menos una demo más antes de ofrecer "demos de tu rubro".
- **`docs/stack-y-reglas.md`:** hoy solo tiene reglas de Java. Falta una sección del front (React y TypeScript, cliente HTTP central, nombres en español), una de tests y la decisión de React primero y Angular como segunda carta.
- **Apuntes privados:** seguir `REGLAS-JAVA.md` (falta leer Git, HTML/CSS y el resto de JPA, y sumar "lo que aprendí en el consultorio").
- **Opcional:** borrado lógico de pacientes en el consultorio; front del consultorio en Angular.

### Capturas de Conectar Docentes (Sesión 3, 2026-11-10)
Facundo pasó 11 capturas del interior de la aplicación. Se revisaron una por una y quedaron **5 imágenes** en la tarjeta (la portada pública y 4 del interior):
- **Panel de la institución**, **publicar una búsqueda**, **vista de una búsqueda para el docente** (con el aviso de privacidad al postularse) y **perfil privado del docente**.
- **Todas usan datos de prueba** ("Institución Prueba", "Prueba Docente", teléfono ficticio). Se descartaron las que mostraban correos de prueba (`@yopmail.com`) y los formularios vacíos o repetidos.
- **Se recortó la parte de Chrome** (pestañas abiertas y favoritos) de las capturas de pantalla completa y se redujeron a 1600 px de ancho. Los originales no se tocaron.
- Cómo se hizo: `sips` no sirve para recortar desde arriba, así que el recorte se hace mostrando la imagen desplazada en Chrome headless y capturando el resultado.
- Se sacó `registro.png` (un formulario con poco valor) y la tarjeta ya no depende de páginas públicas únicamente.
