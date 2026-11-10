# Consultorio Odontológico

Documento para poder explicar el proyecto: qué es, cómo está armado y por qué se tomaron ciertas decisiones. Se actualiza a medida que avanza el trabajo.

- **Repo en GitHub:** https://github.com/FacuAuciello/consultorio-odontologico (público, publicado el 2026-11-09 con un commit inicial de 131 archivos)
- **En el portfolio:** tarjeta en la página del CV (https://facundoauciello.com), con link al repo y capturas, ya publicada. La demo está pendiente (Etapa 7) y el botón "Ver demo" se activa cuando exista

## Qué es

Sistema de gestión para un consultorio odontológico: **agenda de turnos, pacientes e historia clínica**, con login y API REST.

Es el **primer proyecto que desarrollé para un cliente real** (me pagaron por él). La primera versión estaba hecha con JSP, Servlets y JPA puro. Esta es la **reescritura completa** con un stack moderno: backend en Spring Boot y frontend en React + TypeScript.

## Por qué Java 17

Quiero mostrar que manejo distintas versiones de Java. Este fue mi primer proyecto, así que lo dejo en **Java 17**. Mi proyecto más reciente, *Conectar Docentes*, está hecho en **Java 25**. Quien vea los dos repos puede ver que me adapto a cada versión.

- **Estado:** hecho (Etapa 2). El proyecto vino configurado para Java 21 y ahora compila y pasa sus tests con **Java 17**.
- **Qué se cambió:** la versión en `backend/pom.xml` (21 → 17), el uso de `Locale.of("es","AR")` (API de Java 19) en `TurnoService` y `HistoriaClinicaUtils`, que ahora usan `Locale.forLanguageTag("es-AR")`, y el README (Java 17 y requisitos "JDK 17 o superior"). Los records, los text blocks y el `instanceof` con patrón ya eran válidos en 17.
- **Cómo se comprobó:** antes del cambio, con Java 17 el proyecto no compilaba (`release version 21 not supported`). Después, `./mvnw test` da **27 tests en verde con Java 17** y también con Java 25.
- **Spring Boot 4.1** exige Java 17 como mínimo, así que no hizo falta bajar la versión del framework.

## Stack

| Capa | Tecnologías |
|---|---|
| **Backend** | Java · Spring Boot 4 · Spring Web MVC · Spring Data JPA (Hibernate) · Bean Validation · Spring Security (BCrypt + sesión) · Lombok |
| **Base de datos** | MySQL (desarrollo y producción) · H2 en memoria (modo demo y tests) |
| **Frontend** | React 19 · TypeScript (modo estricto) · Vite · React Router · FullCalendar |
| **Estilos** | SB Admin 2 (Bootstrap 4) · FontAwesome. Se mantuvo la estética de la versión original |
| **Tests** | JUnit 5 · Mockito · AssertJ (backend) · Vitest (frontend) |

## Funcionalidades

- **Login** con usuario y contraseña (guardada con BCrypt) y sesión de servidor. Pensado para un único usuario: la secretaria del consultorio.
- **Agenda semanal y diaria** con calendario: clic en un hueco para agendar, clic en un turno para editarlo.
- **Tabla de turnos** con filtros rápidos, búsqueda, columnas ordenables, paginación y estado calculado (Próximo, Hoy, En curso, Realizado).
- **Recordatorio por WhatsApp** con el mensaje del turno ya escrito.
- **Pacientes:** alta, edición, baja y búsqueda por nombre, apellido o DNI.
- **Historia clínica:** editable a mano y con entradas automáticas cuando un turno se guarda con notas o monto.
- **Reglas de agenda validadas en el servidor:** días laborales, horario de atención, duraciones permitidas, turnos alineados a la grilla y sin superposición.
- **Responsive:** se usa desde el celular.

## Arquitectura

El backend está organizado por capas (`backend/src/main/java/com/consultorio`):

| Capa | Qué hace |
|---|---|
| `controller/` | Recibe la request HTTP y devuelve DTOs. Sin lógica de negocio |
| `service/` | Reglas de negocio y transacciones |
| `repository/` | Interfaces de Spring Data JPA |
| `entity/` | `Usuario`, `Paciente`, `Turno` |
| `dto/` | `request/` (lo que entra, con validaciones) y `response/` (lo que sale) |
| `mapper/` | Conversión entre entidad y DTO |
| `exception/` | Excepciones de negocio y un manejador global de errores |
| `security/` y `config/` | Login, CORS, propiedades de la agenda y datos de demo |

El frontend (`frontend/src`) separa `api/` (un cliente HTTP y una función por endpoint), `pages/` (una pantalla por ruta), `components/`, `hooks/`, `utils/` y `types/`.

## Qué cambió respecto de la versión original

| Antes (JSP + Servlets) | Ahora |
|---|---|
| Contraseñas en texto plano | BCrypt y sesión de servidor (cookie `HttpOnly`) |
| Páginas JSP renderizadas en el servidor | API REST + SPA en React y TypeScript |
| Entidades JPA usadas directamente | DTOs de entrada y salida con mappers |
| Fechas como `java.util.Date`, dinero como `String` | `LocalDateTime`, `Integer` para minutos y `BigDecimal` para dinero |
| Se podían agendar dos turnos a la misma hora | Validación de superposición en el servidor |
| DNI repetido permitido | DNI único (validación y restricción en la base) |
| Una entrada nueva en la historia clínica en cada guardado | Solo cuando cambian las notas o el monto |
| Reglas de horario en el JavaScript del front | Reglas en el backend, configurables, y el front las consulta |
| Sin tests | Tests unitarios en backend y frontend |

## Decisiones de diseño (para explicar)

- **DTOs en vez de entidades en la API:** la base puede cambiar sin romper el contrato y no se filtran campos por accidente.
- **Reglas en el backend:** el front valida para responder rápido, pero cualquiera puede llamar a la API sin pasar por la pantalla, así que la validación que cuenta es la del servidor.
- **Estado del turno calculado:** *Realizado*, *En curso* o *Próximo* se deduce de la hora actual, así nunca queda desactualizado.
- **`open-in-view=false` y `@EntityGraph`:** las consultas ocurren solo dentro de los services y los listados traen al paciente en un solo `join`.
- **Sin secretos en el código:** la clave de la base y la del usuario inicial salen de variables de entorno, sin valores por defecto.
- **Sesión de servidor en vez de tokens:** la usa una sola persona, así que alcanza con una cookie `HttpOnly` con `SameSite=Lax`.

## Cómo correrlo en modo demo

Requisitos: JDK y Node.js 20 o superior. Maven viene incluido (`mvnw`).

```bash
# Terminal 1: backend en http://localhost:8080 (base H2 en memoria con datos ficticios)
cd backend
./mvnw spring-boot:run -Dspring-boot.run.profiles=demo

# Terminal 2: frontend en http://localhost:5173
cd frontend
npm install
npm run dev
```

Usuario `admin` y contraseña `demo1234`. Son públicas y solo existen en el perfil `demo`.

## Plan de trabajo

| Etapa | Qué | Estado |
|---|---|---|
| 1 | Este documento | Hecho |
| 2 | Pasar a Java 17 | Hecho |
| 3 | Levantarlo y decidir qué hacer con el front | Hecho: se dejó el diseño y se arregló la vista de celular (tablas como tarjetas) |
| 4 | Revisar el backend respetando mi forma de escribir y comentar | Hecho: revisión y correcciones 1, 2, 3 y 5 aplicadas (queda pendiente solo el punto 4, el borrado lógico) |
| 5 | Tests: correr los que hay y sumar los que falten | Hecho: 104 tests en el backend y 32 en el frontend, todos en verde |
| 6 | Subirlo a GitHub (antes: permiso del cliente) | Hecho: publicado en `FacuAuciello/consultorio-odontologico` con capturas y nombres ficticios. El dentista dio su OK para mostrarlo |
| 7 | Demo con datos simulados en el portfolio, sin backend | Pendiente |

## Qué se hizo en la Etapa 3

- **Se levantó todo con Java 17:** backend en modo demo (H2, `admin` / `demo1234`) y front con Vite. El front tiene 20 tests en verde y el build compila.
- **API probada a mano:** 401 sin sesión, 409 al superponer turnos o repetir un DNI, 400 fuera de horario, con una duración inválida o con campos vacíos, y 404 con un paciente inexistente.
- **Vista de celular:** las tablas de Turnos y Pacientes se deslizaban hacia el costado y se perdían el estado y los botones. Ahora, en pantallas angostas, cada fila es una tarjeta con todo a la vista, y los botones de filtro pasan a una segunda línea. Está hecho solo con CSS y clases `celda-*` en los `<td>`, sin cambiar la lógica.
- **Comprobado con Chrome en modo headless**, simulando un celular de 390 px, no solo con tipos y tests.
- **Error de entorno para no repetir:** el backend solo acepta pedidos desde el origen de `CORS_ORIGEN` (por defecto `http://localhost:5173`). Si el front corre en otro puerto, el login falla con "Invalid CORS request" (403). Para el puerto 5174 se arranca el backend con `CORS_ORIGEN=http://localhost:5174`.

## Etapa 4: revisión del backend

Se leyeron todas las capas (controller, service, repository, entity, dto, mapper, exception, config y security, unas 2.100 líneas). En general el código está bien escrito, es coherente con las reglas de `stack-y-reglas.md` y los comentarios explican el porqué. Dos hallazgos se comprobaron con pruebas reales contra el backend en modo demo.

### Hallazgos por importancia

1. **Se pueden crear turnos superpuestos si llegan pedidos a la vez (comprobado).** `TurnoService.validarSinSuperposicion` consulta si hay un choque y después guarda, sin nada que lo proteja entre las dos cosas. Se mandaron 12 pedidos simultáneos para el mismo horario libre: 6 devolvieron 201 y quedaron 6 turnos a la misma hora. Para el DNI sí hay una red de seguridad (la restricción `UNIQUE` y el handler `DataIntegrityViolationException`), para los turnos no. Riesgo real bajo, porque lo usa una persona y el front deshabilita el botón mientras guarda, pero es una regla de negocio que se puede romper. Opciones: bloquear en la base con `@Lock(PESSIMISTIC_WRITE)` sobre el rango de turnos (en MySQL/InnoDB funciona; en H2 no es confiable), o serializar el alta y la edición. Se agrega además un test de concurrencia.
2. **El comentario dice una cosa y el código hace otra (comprobado).** En `ActualizarHistoriaClinicaDTO` el comentario dice "puede ser vacía, pero no null ni gigante", pero solo hay `@Size`, que acepta `null`. Un `PATCH` con `{}` responde 200 y deja la historia clínica en `null`. Hay que agregar `@NotNull` o corregir el comentario.
3. **Mensajes de validación repetidos (comprobado).** Con el nombre vacío responde "El nombre es obligatorio. El nombre solo puede contener letras y espacios": fallan `@NotBlank` y `@Pattern` a la vez. Es cosmético; se evita haciendo que el `@Pattern` acepte vacío.
4. **Borrado definitivo de historias clínicas.** `eliminarPaciente` borra al paciente y su historia clínica para siempre. Para un sistema médico, un borrado lógico (campo `activo`) sería más seguro, y además puede haber plazos legales de conservación de la historia clínica en Argentina (no verificado: habría que revisarlo antes de usarlo con un cliente real).
5. **Referencias a otro repositorio en los comentarios.** 5 comentarios (`pom.xml` x2, `PacienteRequestDTO`, `PacienteMapper`, `ConsultorioException`) hablan de "conectar-docentes". Quien lea este repo solo no tiene ese contexto: conviene reescribirlos de forma neutra.
6. **Búsqueda con comodines.** `buscarPorTexto` no escapa `%` y `_`; buscar `%` devuelve todos los pacientes. No hay inyección (la consulta está parametrizada), solo un comportamiento raro.

### Correcciones aplicadas

- **Punto 1, turnos superpuestos:** `TurnoService` toma un cerrojo (`ReentrantLock`) y abre la transacción de escritura *adentro* del cerrojo con un `TransactionTemplate`, así el commit ocurre antes de soltarlo y el siguiente pedido ya ve el turno guardado. Los métodos llevan `Propagation.NOT_SUPPORTED` para que la transacción de solo lectura de la clase no se abra antes del cerrojo.
  - **Qué se probó antes:** `Isolation.SERIALIZABLE` no sirvió en H2 (siguieron entrando hasta 10 turnos iguales de 12 pedidos), y como acá no hay Docker ni MySQL no se podía verificar un bloqueo real de base de datos. Por eso se eligió el cerrojo, que se puede comprobar.
  - **Resultado:** de 12 pedidos simultáneos para el mismo horario, ahora entra exactamente 1 (antes entraban 6 a 10). Con la edición pasa lo mismo: dos turnos que se mueven a la vez al mismo horario dejan uno solo.
  - **Límite:** el cerrojo protege mientras haya **un solo servidor** corriendo, que es el caso de un consultorio. Con varios servidores haría falta un bloqueo en la base de datos (y probarlo con MySQL).
  - **Test automático:** `TurnoConcurrenciaTest` (Etapa 5) lo comprueba con pedidos simultáneos; además se probó a mano contra el backend en marcha.
- **Punto 2:** `ActualizarHistoriaClinicaDTO` ahora tiene `@NotNull`, de modo que un `PATCH` con `{}` responde 400. Un texto vacío sigue siendo válido (comprobado).
- **Punto 3:** los `@Pattern` de nombre, apellido, DNI y teléfono aceptan el valor vacío, así de un campo vacío se ocupa solo `@NotBlank`: un mensaje por campo en vez de dos. Los valores inválidos siguen mostrando su mensaje (comprobado).
- **Punto 5:** se reescribieron los 5 comentarios que hablaban de "conectar-docentes" (`pom.xml` x2, `PacienteRequestDTO`, `PacienteMapper`, `ConsultorioException`).
- **Formato:** los 40 comentarios `//texto` pasaron a `// texto`.
- **Tests:** `TurnoServiceTest` se adaptó al nuevo constructor y sigue en 27 tests en verde con Java 17 y con Java 25.

### Cosas que no son errores, pero se dejan anotadas
- **Sin límite de intentos de login** (ya figura en "Posibles mejoras" del README).
- **`/api/turnos` sin fechas devuelve todos los turnos** y no hay paginación en el servidor (también figura en el README).
- **CORS solo permite el header `Content-Type`:** si el front envía otro header, el navegador lo bloquea.
- ~~Faltaban tests de controllers, de seguridad y de concurrencia~~: resuelto en la Etapa 5 (ver más abajo).

### Estilo
- **Coincide con las reglas:** nombres en español, DTOs y mappers, `@RequiredArgsConstructor`, `Optional.ofNullable` y `Predicate.not`, comentarios del porqué, handler global con un único formato de error.
- **Inconsistencia de formato:** 40 comentarios `//texto` (sin espacio) contra 65 `// texto`. Conviene unificar con espacio.
- **Los repositorios llevan prefijo `I`, los services no tienen interfaz.** Es una decisión razonable (una interfaz con una sola implementación aporta poco), pero difiere de lo que enseñan los apuntes.

## Etapa 5: tests

Antes había 27 tests en el backend (servicios con Mockito y utilidades) y 20 en el frontend (solo utilidades). Ninguno probaba la API de punta a punta. Ahora hay **104 en el backend y 32 en el frontend**, todos en verde con Java 17 y con Java 25.

| Archivo | Tests | Qué prueba |
|---|---|---|
| `controller/AutenticacionControllerTest` | 9 | Login correcto, clave incorrecta, usuario inexistente (mismo mensaje, para no revelar qué usuarios hay), logout, sesión, y que **todas** las rutas de la API pidan sesión. |
| `controller/PacienteControllerTest` | 19 | Alta (201 y `Location`), DNI repetido (409), validaciones con un mensaje por campo, id no numérico (400), búsqueda, edición, historia clínica (`PATCH`) y borrado con sus turnos. |
| `controller/TurnoControllerTest` | 21 | Horario, día no laborable, duración, grilla, superposición (incluye turnos más largos y consecutivos), mover y editar turnos, rango de fechas, configuración y resumen de la agenda. |
| `controller/TurnoConcurrenciaTest` | 3 | 12 pedidos simultáneos al mismo horario, horarios que se solapan sin empezar juntos, y dos turnos que se mueven a la vez: en los tres casos queda uno solo. |
| `repository/TurnoRepositoryTest` | 16 | Las 8 variantes de superposición (incluye los bordes que se tocan), editar sin chocar consigo mismo, rangos, próximo turno y borrado por paciente. |
| `repository/PacienteRepositoryTest` | 9 | Búsqueda por nombre, apellido y DNI, orden, DNI único y la restricción de la base. |
| `api/cliente.test.ts` (front) | 12 | Armado del pedido, parámetros vacíos, errores del backend, errores que no son JSON, falta de conexión y sesión vencida (401). |

### Cómo están hechos
- **Sin dependencias nuevas:** los tests de API y de repositorios usan `@SpringBootTest` con el perfil `demo` (H2), como el test de arranque que ya existía.
- **Datos que no se pisan:** los tests de API usan un lunes distinto de 2031 y un DNI propio cada uno, para no depender del día en que se corran ni de los datos de demo. Los de repositorio usan fechas de 2032 y se deshacen solos (`@Transactional`).
- **Concurrencia de verdad:** los hilos esperan en una "largada" (`CountDownLatch`) y salen juntos. Se corrió 5 veces seguidas sin fallar.
- **Se comprobó que el test detecta el problema:** al sacarle el cerrojo a `TurnoService`, los 3 tests de concurrencia fallan; con el cerrojo, pasan. El archivo original quedó restaurado y sin cambios.

### Lo que encontraron los tests
- **Los espacios al principio del nombre se rechazan** (el `@Pattern` pide empezar con una letra), mientras que los del final se recortan. No es grave, porque el front los recorta antes de enviar, pero conviene saberlo: la API no acepta `"  Marta"`.
- **Dos errores míos en los propios tests** (el formato de los segundos en las fechas y un `JSONPath` mal escrito) aparecieron al correrlos y se corrigieron. Ningún test reveló un error nuevo del código de producción.

### Lo que no se probó
- **Un bloqueo contra MySQL real:** acá no hay Docker ni MySQL. Los tests usan H2, y el cerrojo de `TurnoService` está pensado para un solo servidor.
- **Los componentes de React** (pantallas y hooks): requieren sumar `@testing-library` y `jsdom`. Quedan como posible mejora junto con pruebas end-to-end.

## Nombres reales y datos del cliente

El proyecto se hizo para un dentista real, y las capturas mostraban su nombre. La práctica habitual en portfolios, según lo que recomiendan varias guías para freelancers, es **no mostrar el nombre del cliente salvo que el contrato lo permita o el cliente lo apruebe por escrito**. Lo común es anonimizar (o poner "cliente real, nombre reservado"), contar el trabajo sin el nombre y usar datos ficticios en las capturas y en la demo. Lo que sí se muestra es el trabajo: el problema, las decisiones, el stack y los resultados.

Para este proyecto se decidió:
- **Nombre del profesional ficticio:** `Dr. Demo (ficticio)` en `frontend/src/config/consultorio.ts` y en `frontend/.env.example`. Ya no queda el nombre real en el código.
- **Pacientes y turnos ficticios**, como ya estaban.
- **Capturas nuevas:** las 7 de `docs/` del proyecto se rehicieron con Chrome contra el backend en modo demo recién iniciado (para que no queden turnos de pruebas), y ya muestran "Dr. Demo (ficticio)". Las viejas, con el nombre real, se reemplazaron (se descartaron). El aspecto de la captura de celular también cambió: ahora se ve la vista de tarjetas.
- **Permiso del dentista:** está de acuerdo con que se muestre (es de confianza). Aun así, el nombre está cambiado y los datos son ficticios.
- **Dato sensible:** el sistema maneja historias clínicas. Nunca se publican datos reales de pacientes.

## ¿Está en producción?

**No.** El sistema se terminó y se entregó, y el cliente lo pagó, pero finalmente no lo puso en uso. Esto es lo que hay que decir si alguien pregunta ("lo desarrollé para un cliente real; al final no se usó, y por eso hay una demo con datos ficticios"), y es lo que dice el README del proyecto.

- **Por eso no se usa MySQL:** estaba pensado para producción, pero nunca se instaló. Los tests y la demo corren sobre H2, y el `docker-compose.yml` con MySQL queda como configuración lista para usar.
- **Para que "funcione" no hace falta un dominio.** Corre en la compu y pasa todos sus tests. Un dominio o un hosting solo sirven para que otra persona lo abra desde internet.

## Por qué la demo es un front con datos simulados

La demo del portfolio no necesita un servidor: el front usa una API falsa en memoria que respeta las mismas reglas de agenda. Es gratis, no tiene tiempos de espera por servidor dormido y la puede abrir cualquiera. A cambio, no muestra el backend de Java corriendo. Eso se cubre con el repo, el README y los tests.
