# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

- `npm run dev` — servidor de desarrollo de Vite
- `npm run build` — `tsc -b && vite build` (primero chequea tipos)
- `npm run lint` — ESLint
- `npm run preview` — sirve el build de producción

No hay test runner. Se verifica con `lint`, `build` y revisando las rutas a mano (`#/`, `#/negocios`, `#/negocios/stock`, `#/ejemplos/stock`).

## Descripción general

Portfolio personal de Facundo Auciello, en https://facundoauciello.com. SPA con React 19 + TypeScript + Vite, sin librerías de UI ni de routing. El contenido es estático: no hay backend ni llamadas a ninguna API. Todo el texto de la interfaz está en español (Argentina) y los identificadores también (`proyectos`, `servicios`, `Presentacion`).

Tiene **dos entradas para dos públicos**: el inicio es el CV (para postulaciones y LinkedIn: título "Desarrollador Java Full Stack", proyectos, GitHub, LinkedIn y email) y `#/negocios` es la página para dueños de negocios (servicios freelance con WhatsApp).

## Arquitectura

- **Routing por hash** (`src/utils/ruta.ts`): no hay librería de router. `usePagina()` (`useSyncExternalStore` sobre `hashchange`) devuelve `{ tipo: "inicio" | "negocios" | "ejemplos", idServicio }` a partir de `leerPagina(hash)`:
  - `#/negocios` y `#/negocios/<id-servicio>` → página de negocios (la segunda baja hasta la tarjeta de ese servicio)
  - `#/ejemplos/<id-servicio>` → página de ejemplos
  - cualquier otro hash → inicio
- **Regla importante de los enlaces:** los enlaces **entre páginas** empiezan siempre con `#/` y se arman con `ENLACE_INICIO`, `enlaceNegocios(id?)` y `enlaceEjemplos(id)`. Un `#<id>` simple es un ancla **dentro del inicio** (`#proyectos`, `#contacto`) y no cambia de página; usarlo en negocios o en ejemplos mandaría al visitante al inicio. Ya pasó con el "Volver" de `EjemplosPage`, que hoy usa `enlaceNegocios(id)`.
- **`App.tsx`:** arma la barra de navegación según la página y un efecto que, al cambiar de página, baja hasta la tarjeta (`#/negocios/<id>`), hasta el ancla del inicio, o sube al principio.
- **Datos (lo que se edita para cambiar el contenido):**
  - `src/data/proyectos.ts`: tipo `Proyecto` y los proyectos de la página del CV. Las tecnologías salen de un catálogo (`TEC`) con su logo en `public/tecnologias/*.svg` (de Devicon, MIT); se listan solo las principales de cada proyecto, no cada librería. La descripción no incluye cantidad de tests. Las imágenes van en `public/proyectos/<id>/` y se referencian con `/proyectos/<id>/archivo.png`. `enlaces.demo` es opcional y el botón "Ver demo" solo aparece si existe. `notaCodigo` se muestra cuando no hay enlace al código (por ejemplo, un repo privado).
  - `src/data/enlaces.ts`: `EMAIL`, `GITHUB` y `LINKEDIN`, usados por la presentación y el contacto.
  - `src/data/servicios.ts`: las tarjetas de la página de negocios. Cada `id` también es la clave que enlaza con sus demos.
- **Componentes:** `Presentacion` (recibe nombre, descripción, texto y, opcional, botones como `children`; se usa en el inicio y en negocios), `Proyectos` + `ProyectoCard` (carrusel de capturas, visor ampliado, estado, tecnologías y enlaces), `Contacto`, `Servicios` (el botón "Ver ejemplos" solo aparece si el servicio tiene demos en `demosPorServicio`).
- **Registro de demos** (`src/ejemplos/registro.ts`): `demosPorServicio` mapea el `id` de un servicio a un `Demo[]`. Cada demo tiene un `Componente` que `EjemplosPage` renderiza dentro de un marco simulado de navegador. Los arrays están vacíos por ahora y `EjemplosPage` muestra un estado vacío. Para agregar una demo: crear el componente y su CSS en `src/ejemplos/demos/` (helpers compartidos en `demos/util.ts`) y registrarla en `registro.ts`.
- **Contacto por WhatsApp** (`src/utils/whatsapp.ts`): `obtenerEnlaceWhatsApp(servicio?)` arma el link `wa.me` con un mensaje predefinido. Si `WHATSAPP_NUMERO` está vacío cae a `#contacto`, que es un ancla del inicio.
- **Estilos:** archivos CSS planos junto a cada componente (`App.css`, `components/Servicios.css`, `ejemplos/EjemplosPage.css`, `ejemplos/demos/*.css`).
- **`index.html`:** título, descripción y etiquetas Open Graph para la vista previa al compartir el enlace (LinkedIn). La imagen es `public/og.png` (1200 × 630) y se referencia con la URL completa.

## Publicación

Un `git push` a `main` publica el sitio solo: Cloudflare (Workers con archivos estáticos) corre `npm run build` y `npx wrangler deploy`, y `wrangler.jsonc` apunta a `./dist`. Se publica en unos 20 segundos, así que **no se hace push sin confirmación del dueño del repo**. Después de publicar conviene abrir https://facundoauciello.com y revisar las rutas.

## Contenido y privacidad

- Cada proyecto dice su estado real y no más: el consultorio está "entregado al cliente" (no está en producción) y Conectar Docentes es un "MVP en línea, todavía sin usuarios reales".
- El repo de Conectar Docentes es **privado**: no se enlaza su código (la tarjeta dice "Código disponible a pedido"). Las capturas de ese proyecto son solo de páginas públicas, sin datos de personas.
- Las capturas del consultorio usan datos y un nombre de profesional ficticios. Nunca usar el nombre real del dentista ni datos reales de pacientes.
- `docs/` es público: no poner ahí rutas de la computadora, claves ni los apuntes privados de cursos (viven en otra carpeta, fuera de los repos).

## Documentación

`docs/estado-sesiones.md` (registro de sesiones y pendientes), `docs/consultorio-odontologico.md` (el proyecto del consultorio) y `docs/stack-y-reglas.md` (stack y reglas para subir proyectos).
