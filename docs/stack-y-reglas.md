# Stack y reglas para mis proyectos

Reglas que sigo al armar y subir un proyecto. Salen de mi propio código (sobre todo del consultorio odontológico) y sirven para que todos mis repos se vean consistentes. Acá solo se suben **proyectos**: mis apuntes y el material de cursos quedan en una carpeta privada.

## Stack

| Capa | Qué uso |
|---|---|
| **Backend** | Java · Spring Boot (Web MVC, Data JPA, Validation, Security) · Lombok · Maven (`mvnw` incluido) |
| **Base de datos** | MySQL en desarrollo y producción · H2 en memoria para el modo demo y los tests |
| **Frontend** | React + TypeScript (modo estricto) + Vite |
| **Tests** | JUnit 5 · Mockito · AssertJ (backend) · Vitest (frontend) |
| **Contenedores** | Docker Compose para levantar la base de datos |
| **Publicación** | GitHub para el código · Cloudflare para dominio, DNS y sitios estáticos |

**Versiones de Java:** uso la que corresponde a cada proyecto y lo dejo a la vista. El consultorio odontológico (mi primer proyecto) está en **Java 17** y Conectar Docentes, el más reciente, en **Java 25**.

## Cómo escribo Java

- **Nombres en español y descriptivos:** `crearTurno`, `buscarPaciente`, `TurnoSuperpuestoException`.
- **Convenciones:** `lowerCamelCase` para variables y métodos, `UpperCamelCase` para clases y `MAYUSCULAS_CON_GUION_BAJO` para constantes. Las interfaces llevan prefijo `I` (`ITurnoRepository`).
- **Comentarios cortos en español que explican el porqué**, no lo que el código ya dice. Las decisiones de diseño y las reglas de negocio se comentan.
- **Arquitectura por capas:** `controller` (solo HTTP, sin lógica), `service` (reglas de negocio y transacciones), `repository`, `entity`, `dto`, `mapper`, `exception` y `config`.
- **DTOs siempre:** la entidad nunca se expone en la API. Los DTOs de entrada llevan validaciones y se usan `record` cuando conviene.
- **Inyección por constructor** con `@RequiredArgsConstructor`.
- **Tipos correctos:** `BigDecimal` para dinero, `LocalDate` y `LocalDateTime` para fechas.
- **Errores:** excepciones propias de negocio y un manejador global (`@RestControllerAdvice`) con un formato de error único.
- **Las reglas importantes viven en el backend.** El front valida para responder rápido, pero la validación que cuenta es la del servidor.

## Cómo subo un proyecto

1. **Sin secretos en el repo.** Claves y contraseñas por variables de entorno, sin valores por defecto. Se sube un `.env.example` y nunca el `.env`.
2. **`.gitignore` correcto:** `.env`, `node_modules`, `target`, `dist`, archivos del IDE y logs.
3. **Datos de ejemplo siempre ficticios.** Si el proyecto fue para un cliente real, confirmo que está de acuerdo antes de publicarlo.
4. **README claro:** qué es, capturas, stack, funcionalidades, cómo correrlo (idealmente con un modo demo que no necesite instalar nada más), variables de entorno, decisiones de diseño y posibles mejoras.
5. **Tests que pasan** y la versión de Java declarada en el `pom.xml`.
6. **Licencia** y créditos de las plantillas o librerías de terceros.
7. **Recién ahí** lo publico en GitHub y lo sumo al portfolio con una tarjeta, link al repo y, si se puede, una demo.

## Cómo explico un proyecto

Qué problema resuelve, qué decisiones tomé y por qué, qué cambió respecto de una versión anterior (si la hay) y qué mejoraría. Para cada proyecto mantengo un `.md` en esta carpeta, como [consultorio-odontologico.md](consultorio-odontologico.md).
