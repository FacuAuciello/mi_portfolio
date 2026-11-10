# Portfolio de Facundo Auciello

Sitio personal en **https://facundoauciello.com**. Está pensado para dos públicos, cada uno con su entrada:

| Dirección | Para quién | Qué muestra |
|---|---|---|
| `facundoauciello.com` | Quien me evalúa para un puesto (CV, LinkedIn) | Presentación como **Desarrollador Java Full Stack**, mis proyectos con capturas, tecnologías y enlaces, y mis datos de contacto. |
| `facundoauciello.com/#/negocios` | Dueños de negocios que necesitan una web o un sistema | Los servicios que ofrezco (páginas web, control de stock, turnos), con botón de consulta por WhatsApp. |

## Proyectos que muestra

- **[Consultorio Odontológico](https://github.com/FacuAuciello/consultorio-odontologico):** gestión de turnos, pacientes e historia clínica. Backend en Java y Spring Boot, frontend en React y TypeScript. Entregado a un cliente real; las capturas usan datos ficticios.
- **[Conectar Docentes](https://www.conectardocentes.com.ar):** bolsa de trabajo para docentes de Mar del Plata. MVP en línea, todavía sin usuarios reales. Su repositorio es privado.
- **[StockControl](https://github.com/FacuAuciello/stockcontrol-frontend):** control de stock para pequeños comercios (productos, movimientos, categorías e importación y exportación de Excel y CSV). Es una demo solo de frontend, con datos de ejemplo y sin backend.

## Tecnologías

React 19 · TypeScript · Vite. Sin librerías de UI ni de rutas: el router es propio y está basado en el `#` de la URL (`src/utils/ruta.ts`). El contenido es estático: no hay backend ni llamadas a ninguna API.

## Cómo correrlo

```bash
npm install
npm run dev        # servidor de desarrollo
npm run build      # chequeo de tipos + build de producción (carpeta dist/)
npm run lint       # ESLint
npm run preview    # sirve el build de producción
```

No hay tests automáticos: se verifica con `lint`, `build` y revisando a mano las rutas (`#/`, `#/negocios`, `#/negocios/stock`, `#/ejemplos/stock`).

## Cómo se publica

Cada `git push` a `main` publica el sitio solo: **Cloudflare** clona el repo, corre `npm run build` y `npx wrangler deploy`. El archivo `wrangler.jsonc` le indica que sirva `./dist` como archivos estáticos. El dominio, el DNS y el hosting están en Cloudflare.

## Cómo agregar un proyecto

1. Copiar las capturas a `public/proyectos/<id-del-proyecto>/`.
2. Agregar una entrada en `src/data/proyectos.ts` (nombre, descripción, estado, tecnologías, imágenes y enlaces).
3. Los enlaces son opcionales: `codigo`, `sitio` y `demo`. Si no hay enlace al código, se puede usar `notaCodigo`. El botón "Ver demo" solo aparece cuando hay un `demo`.
4. Las tecnologías salen del catálogo `TEC` del mismo archivo, con su logo en `public/tecnologias/`. Se muestran solo las principales de cada proyecto.

## Estructura

```
src/
  data/         Proyectos, servicios y enlaces personales (lo que se edita para cambiar el contenido)
  components/   Presentación, Proyectos, tarjeta de proyecto, Servicios y Contacto
  ejemplos/     Página de ejemplos por servicio y su registro de demos
  utils/        Router por hash y armado del enlace de WhatsApp
public/         Imágenes de los proyectos, favicon e imagen para compartir el enlace (og.png)
docs/           Registro de lo que se fue haciendo y por qué
```

## Créditos

Los logos de las tecnologías (`public/tecnologias/`) son de [Devicon](https://devicon.dev/) (licencia MIT). Las marcas pertenecen a sus respectivos dueños.

## Documentación

- [`docs/estado-sesiones.md`](docs/estado-sesiones.md): qué se hizo en cada sesión, decisiones y pendientes.
- [`docs/consultorio-odontologico.md`](docs/consultorio-odontologico.md): cómo está armado el proyecto del consultorio y cómo se llevó a su versión actual.
- [`docs/stack-y-reglas.md`](docs/stack-y-reglas.md): el stack que uso y las reglas que sigo al armar y subir proyectos.
