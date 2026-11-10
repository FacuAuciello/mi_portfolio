export type Tecnologia = {
    nombre: string;
    /** Logo dentro de /public/tecnologias (opcional: sin logo se muestra solo el nombre) */
    logo?: string;
};

export type Proyecto = {
    id: string;
    nombre: string;
    descripcion: string;
    /** Dice en qué estado real está el proyecto, para no dar a entender más de lo que hay */
    estado: string;
    tecnologias: Tecnologia[];
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

// Catálogo de tecnologías: cada logo se define una sola vez y los proyectos lo reutilizan.
// Se muestran solo las principales de cada proyecto, no cada librería que usa.
const TEC = {
    java17: { nombre: "Java 17", logo: "/tecnologias/java.svg" },
    java25: { nombre: "Java 25", logo: "/tecnologias/java.svg" },
    springBoot: { nombre: "Spring Boot", logo: "/tecnologias/spring.svg" },
    // Spring Security no tiene un logo propio: lleva el de Spring, igual que Spring Boot
    springSecurity: { nombre: "Spring Security", logo: "/tecnologias/spring.svg" },
    mysql: { nombre: "MySQL", logo: "/tecnologias/mysql.svg" },
    react: { nombre: "React", logo: "/tecnologias/react.svg" },
    typescript: { nombre: "TypeScript", logo: "/tecnologias/typescript.svg" },
    postgresql: { nombre: "PostgreSQL", logo: "/tecnologias/postgresql.svg" },
    tailwind: { nombre: "Tailwind CSS", logo: "/tecnologias/tailwindcss.svg" },
} satisfies Record<string, Tecnologia>;

export const proyectos: Proyecto[] = [
    {
        id: "consultorio-odontologico",
        nombre: "Consultorio Odontológico",
        descripcion:
            "Sistema de gestión para un consultorio odontológico: agenda de turnos, pacientes e historia clínica, con login. El servidor valida las reglas de la agenda (horario, duraciones y que dos turnos no se superpongan). Fue mi primer proyecto para un cliente real: reescribí la versión original, hecha con JSP y Servlets, con Spring Boot y React.",
        estado: "Entregado al cliente. Los datos de las capturas son ficticios.",
        tecnologias: [
            TEC.java17,
            TEC.springBoot,
            TEC.springSecurity,
            TEC.mysql,
            TEC.react,
            TEC.typescript,
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
            "Bolsa de trabajo para docentes de Mar del Plata: las instituciones publican búsquedas laborales y los docentes arman un perfil privado y se postulan. API en Java con autenticación JWT y permisos por rol (docente, institución y administrador).",
        estado: "MVP en línea, todavía sin usuarios reales.",
        tecnologias: [
            TEC.java25,
            TEC.springBoot,
            TEC.springSecurity,
            TEC.postgresql,
            TEC.react,
            TEC.typescript,
            TEC.tailwind,
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
    {
        id: "stockcontrol",
        nombre: "StockControl",
        descripcion:
            "Sistema de control de stock para pequeños comercios: productos con búsqueda y filtros, entradas y salidas de mercadería que actualizan el stock solas, categorías, indicadores e importación y exportación de planillas Excel y CSV. Es una demostración solo de frontend: usa datos de ejemplo y todavía no tiene backend.",
        estado: "Demo sin backend: los datos son ficticios y se reinician al recargar la página.",
        tecnologias: [TEC.react, TEC.typescript],
        imagenes: [
            "/proyectos/stockcontrol/inicio.png",
            "/proyectos/stockcontrol/productos.png",
            "/proyectos/stockcontrol/movimientos.png",
            "/proyectos/stockcontrol/importar-exportar.png",
            "/proyectos/stockcontrol/modo-oscuro.png",
        ],
        enlaces: {
            codigo: "https://github.com/FacuAuciello/stockcontrol-frontend",
        },
    },
];
