# Stack y reglas para mis proyectos

Reglas que sigo al armar y subir un proyecto. Salen de mi propio código (el consultorio odontológico, Conectar Docentes y este portfolio) y sirven para que todos mis repos se vean consistentes. Acá solo se suben **proyectos**: mis apuntes y el material de cursos quedan en una carpeta privada.

## Stack

| Capa | Qué uso |
|---|---|
| **Backend** | Java · Spring Boot (Web MVC, Data JPA, Validation, Security) · Lombok · Maven (`mvnw` incluido) |
| **Base de datos** | PostgreSQL en Conectar Docentes · MySQL en el consultorio (pensada para producción, que nunca se usó) · H2 en memoria para el modo demo y los tests |
| **Frontend** | React + TypeScript (modo estricto) + Vite · Tailwind en Conectar Docentes |
| **Autenticación** | Sesión de servidor con cookie `HttpOnly` cuando la usa una sola persona (consultorio). JWT con roles cuando hay distintos tipos de usuario (Conectar Docentes). |
| **Tests** | JUnit 5 · Mockito · AssertJ · MockMvc (backend) · Vitest (frontend) · Playwright (end-to-end en Conectar Docentes) |
| **Contenedores** | Docker Compose para levantar la base de datos |
| **Publicación** | GitHub para el código · Cloudflare para el dominio, el DNS y este portfolio · Vercel, Render y Supabase para Conectar Docentes |

**Versiones de Java:** uso la que corresponde a cada proyecto y lo dejo a la vista. El consultorio odontológico (mi primer proyecto) está en **Java 17** y Conectar Docentes, el más reciente, en **Java 25**. Cuando un proyecto apunta a una versión, no uso APIs de una más nueva (por ejemplo, `Locale.of` es de Java 19 y en un proyecto de Java 17 va `Locale.forLanguageTag`).

## Cómo escribo Java

- **Nombres en español y descriptivos:** `crearTurno`, `buscarPaciente`, `TurnoSuperpuestoException`.
- **Convenciones:** `lowerCamelCase` para variables y métodos, `UpperCamelCase` para clases y `MAYUSCULAS_CON_GUION_BAJO` para constantes. Las interfaces de repositorio llevan prefijo `I` (`ITurnoRepository`). Los services no llevan interfaz.
- **Comentarios cortos en español que explican el porqué**, no lo que el código ya dice. Las decisiones de diseño y las reglas de negocio se comentan. Formato `// texto`, con espacio.
- **Arquitectura por capas:** `controller` (solo HTTP, sin lógica), `service` (reglas de negocio y transacciones), `repository`, `entity`, `dto`, `mapper`, `exception` y `config`.
- **DTOs siempre:** la entidad nunca se expone en la API. Los DTOs de entrada llevan validaciones y se usan `record` cuando conviene.
- **Inyección por constructor,** nunca sobre el campo. En el consultorio con `@RequiredArgsConstructor` de Lombok; en Conectar Docentes con constructores escritos a mano.
- **Tipos correctos:** `BigDecimal` para dinero, `LocalDate` y `LocalDateTime` para fechas.
- **Errores:** excepciones propias de negocio y un manejador global (`@RestControllerAdvice`) con un formato de error único (`status`, `error`, `message`). Un campo vacío da un solo mensaje ("obligatorio"), no dos.
- **Las reglas importantes viven en el backend.** El front valida para responder rápido, pero la validación que cuenta es la del servidor.
- **Concurrencia:** si una regla se comprueba y después se guarda (por ejemplo, que dos turnos no se pisen), dos pedidos a la vez pueden saltearla. Hay que protegerla y probarla con pedidos simultáneos de verdad.

## Cómo escribo el front

- **TypeScript estricto**, con identificadores y textos de la interfaz en español.
- **Una sola capa para hablar con la API** (`api/cliente.ts`): manda la cookie de sesión, convierte los errores del backend en un `ApiError` con un mensaje legible y avisa cuando la sesión venció (401). Cada endpoint tiene su función (`pacientesApi`, `turnosApi`…) y las pantallas nunca llaman a `fetch` directo.
- **Los tipos reflejan los DTOs del backend** (`types/`), así un cambio en la API se nota al compilar.
- **Carpetas por responsabilidad:** `api/`, `pages/` (una pantalla por ruta), `components/`, `hooks/`, `utils/`, `types/` y `context/`.
- **Las funciones puras viven en `utils/` y llevan tests** (fechas, formato, validaciones, estado de un turno).
- **El contenido se separa del diseño:** en el portfolio, lo que se edita para cambiar el sitio está en `src/data/` y no dentro de los componentes.
- **Lo mínimo de librerías:** si algo se resuelve con poco código, no se suma una dependencia (el portfolio tiene su propio router por hash y no usa librería de rutas).
- **Se prueba en celular desde el principio.** Una tabla con muchas columnas pasa a tarjetas en pantallas angostas.
- **Los enlaces entre páginas** de una app con rutas por `#` empiezan con `#/`. Un `#id` suelto es un ancla dentro de la página.

## Cómo escribo los tests

- **Backend, tres niveles:**
  1. **Unitarios** de los services, con repositorios simulados (Mockito).
  2. **De API** con `@SpringBootTest`, MockMvc y el perfil `demo` (H2): prueban lo que ve el front, como el código HTTP, el mensaje de error, las validaciones y el login con sesión. No necesitan MySQL ni variables de entorno.
  3. **De repositorio** contra H2, con `@Transactional` para que cada test se deshaga solo.
- **Los datos de test no dependen del día ni de la demo:** fechas fijas y lejanas (un lunes de 2031, por ejemplo) y un DNI propio por test.
- **Concurrencia de verdad:** varios hilos que esperan en una "largada" (`CountDownLatch`) y salen juntos.
- **Compruebo que el test detecta el problema:** saco el arreglo a mano, veo que el test falla, y lo restauro. Un test que nunca falló no demuestra nada.
- **Frontend:** Vitest para las utilidades y para el cliente HTTP, con `fetch` simulado, sin dependencias extra.
- **Corro la suite con cada versión de Java** que el proyecto soporta. Un error de tipos en un archivo de test también rompe `npm run build`, así que reviso el build aunque los tests pasen.
- **Si un test falla, primero reviso si el error es del test o del código.** Dos veces el error fue mío (el formato de una fecha y una expresión de JSONPath).

## Antes de dar algo por terminado

1. Lint, build y tests en verde.
2. **Lo probé de verdad** en el navegador (Chrome headless), con capturas en escritorio y en celular, y no solo con tipos y tests.
3. **Verifico lo publicado mirando el contenido, no solo el código HTTP.** El sitio responde `200` con una página HTML para cualquier archivo que no existe (así funciona una SPA), por lo que hay que mirar el `content-type` para confirmar que un archivo nuevo ya está en línea.
4. **Pido confirmación antes de publicar** (un `git push` a `main` del portfolio despliega el sitio solo).

## Cómo subo un proyecto

1. **Sin secretos en el repo.** Claves y contraseñas por variables de entorno, sin valores por defecto. Se sube un `.env.example` y nunca el `.env`.
2. **`.gitignore` correcto:** `.env`, `node_modules`, `target`, `dist`, archivos del IDE y logs.
3. **Datos de ejemplo siempre ficticios.** Nunca el nombre real de un cliente ni datos reales de personas. Si el proyecto fue para un cliente real, confirmo que está de acuerdo antes de publicarlo.
4. **README claro:** qué es y en qué estado real está, capturas, stack, funcionalidades, cómo correrlo (idealmente con un modo demo que no necesite instalar nada más), variables de entorno, decisiones de diseño y posibles mejoras.
5. **Tests que pasan** y la versión de Java declarada en el `pom.xml`.
6. **Licencia** y créditos de las plantillas o librerías de terceros.
7. **Un `CLAUDE.md`** con los comandos, las decisiones que no se ven en el código y lo que ya costó tiempo.
8. **Recién ahí** lo publico en GitHub y lo sumo al portfolio con una tarjeta, el enlace al repo y, si se puede, una demo.

## Cómo saco las capturas

- **Con datos inventados** ("Institución Prueba", "Prueba Docente"), nunca con personas reales.
- **Sin correos ni teléfonos reales a la vista.** Tampoco los correos de prueba de servicios públicos descartables (como `@yopmail.com`): cualquiera puede leer esa bandeja.
- **Sin el navegador:** recorto la barra de pestañas, la de direcciones y la de favoritos. Muestran mi vida y no aportan nada.
- **Sin identificadores, tokens ni paneles de infraestructura** (Render, Supabase, Vercel) en la barra de direcciones o en la pantalla.
- **Con el backend recién iniciado**, para que no queden turnos ni pacientes de mis pruebas.
- Para mostrar el interior de una aplicación privada, uso cuentas de prueba.

## Cómo explico un proyecto

Qué problema resuelve, qué decisiones tomé y por qué, qué cambió respecto de una versión anterior (si la hay) y qué mejoraría.

**Digo el estado real del proyecto y no más:** "entregado al cliente" (el consultorio, que no está en producción) o "MVP en línea, todavía sin usuarios reales" (Conectar Docentes). Para cada proyecto mantengo un `.md` en esta carpeta, como [consultorio-odontologico.md](consultorio-odontologico.md).

## Por aprender

- **Angular:** para las ofertas de Java que lo piden. Se aprende con un proyecto, por ejemplo rehaciendo el front del consultorio contra la misma API.
- **Tests de componentes de React** (`@testing-library`) y pruebas end-to-end en el consultorio.
- **Probar contra una base de datos real** con Testcontainers (MySQL o PostgreSQL) y migraciones con Flyway.
- **Seguridad:** límite de intentos de login y Spring Security a fondo.
