# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

- `npm run dev` — servidor de desarrollo de Vite
- `npm run build` — `tsc -b && vite build` (primero chequea tipos)
- `npm run lint` — ESLint
- `npm run preview` — sirve el build de producción

No hay test runner configurado.

## Descripción general

Portfolio personal de Facundo Auciello, pensado para conseguir trabajo: que la gente vea lo que hizo y pueda contactarlo. Es una SPA con React 19 + TypeScript + Vite, sin librerías de UI ni de routing. Presenta servicios (páginas web, control de stock, turnos) con demos interactivas de ejemplo. Todo el texto de la interfaz está en español (Argentina) y los identificadores también (`servicios`, `ejemplos`, `Presentacion`). El README menciona una API REST en Spring Boot, pero el frontend todavía no hace llamadas a ninguna API: el contenido es estático.

## Arquitectura

- **Routing por hash** (`src/utils/ruta.ts`): no hay librería de router. `#/ejemplos/<id-servicio>` muestra la página de ejemplos; cualquier otro hash muestra el home. `App.tsx` lo lee con `useServicioEjemplos()` (`useSyncExternalStore` sobre `hashchange`) y reemplaza `<Presentacion/><Servicios/>` por `<EjemplosPage/>`. Los hashes simples `#id` son anclas dentro de la página; al volver al home, `App.tsx` hace scroll hasta el ancla (por eso los links de "volver" usan `#<servicio.id>`).
- **Datos de servicios** (`src/data/servicios.ts`): el array `servicios` genera las tarjetas del home. Cada `id` es también la clave que enlaza con sus demos.
- **Registro de demos** (`src/ejemplos/registro.ts`): `demosPorServicio` mapea el `id` de un servicio a un `Demo[]`. Cada demo tiene un `Componente` que `EjemplosPage` renderiza dentro de un marco simulado de navegador. Los arrays están vacíos por ahora y `EjemplosPage` muestra un estado vacío cuando un servicio no tiene demos. Para agregar una demo: crear el componente y su CSS en `src/ejemplos/demos/` (helpers compartidos en `demos/util.ts`, p. ej. `pesos`) y registrarla en `registro.ts`.
- **Contacto por WhatsApp** (`src/utils/whatsapp.ts`): `obtenerEnlaceWhatsApp(servicio?)` arma el link `wa.me` con un mensaje predefinido; si `WHATSAPP_NUMERO` está vacío, cae a `#contacto`.
- Los estilos son archivos CSS planos junto a cada componente (`App.css`, `components/Servicios.css`, `ejemplos/EjemplosPage.css`, `ejemplos/demos/*.css`).
