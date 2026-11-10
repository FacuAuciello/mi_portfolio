export type Proyecto = {
    id: string;
    nombre: string;
    descripcion: string;
    /** Dice en qué estado real está el proyecto, para no dar a entender más de lo que hay */
    estado: string;
    tecnologias: string[];
    /** Rutas dentro de /public (o URLs completas) */
    imagenes: string[];
    enlaces: {
        codigo?: string;
        sitio?: string;
        demo?: string;
    };
    /** Se muestra cuando no hay enlace al código (por ejemplo, un repositorio privado) */
    notaCodigo?: string;
};

export const proyectos: Proyecto[] = [
    {
        id: "consultorio-odontologico",
        nombre: "Consultorio Odontológico",
        descripcion:
            "Sistema de gestión para un consultorio: agenda semanal de turnos, pacientes e historia clínica, con login y reglas de agenda validadas en el servidor (horario, duraciones y sin superposición de turnos). Fue mi primer proyecto para un cliente real: reescribí la versión original, hecha con JSP y Servlets, con Spring Boot y React. Tiene 104 tests en el backend y 32 en el frontend.",
        estado: "Entregado al cliente. Los datos de las capturas son ficticios.",
        tecnologias: [
            "Java 17",
            "Spring Boot",
            "Spring Security",
            "JPA / Hibernate",
            "MySQL · H2",
            "React",
            "TypeScript",
            "JUnit · Mockito",
            "Vitest",
        ],
        imagenes: [
            "/proyectos/consultorio/agenda.png",
            "/proyectos/consultorio/turnos.png",
            "/proyectos/consultorio/perfil-paciente.png",
            "/proyectos/consultorio/turno-formulario.png",
            "/proyectos/consultorio/turnos-mobile.png",
        ],
        enlaces: {
            codigo: "https://github.com/FacuAuciello/consultorio-odontologico",
        },
    },
    {
        id: "conectar-docentes",
        nombre: "Conectar Docentes",
        descripcion:
            "Bolsa de trabajo para docentes de Mar del Plata: las instituciones publican búsquedas laborales y los docentes arman un perfil privado y se postulan. API en Java con autenticación JWT y permisos por rol (docente, institución y administrador). Tiene 213 tests de backend y 32 pruebas end-to-end.",
        estado: "MVP en línea, todavía sin usuarios reales.",
        tecnologias: [
            "Java 25",
            "Spring Boot 4.1",
            "Spring Security + JWT",
            "JPA / Hibernate",
            "PostgreSQL",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Playwright",
        ],
        imagenes: [
            "/proyectos/conectar-docentes/portada.png",
            "/proyectos/conectar-docentes/panel-institucion.png",
            "/proyectos/conectar-docentes/publicar-busqueda.png",
            "/proyectos/conectar-docentes/vista-docente.png",
            "/proyectos/conectar-docentes/perfil-docente.png",
        ],
        enlaces: {
            sitio: "https://www.conectardocentes.com.ar",
        },
        notaCodigo: "Código disponible a pedido",
    },
];
