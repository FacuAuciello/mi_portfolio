export type Servicio = {
    id: string;
    icono: string;
    titulo: string;
    descripcion: string;
    funcionalidades: string[];
};

export const servicios: Servicio[] = [
    {
        id: "paginas-web",
        icono: "🌐",
        titulo: "Páginas web a medida",
        descripcion:
            "Una web profesional para presentar tu negocio, mostrar tus servicios y facilitar el contacto con tus clientes.",
        funcionalidades: [
            "Diseño personalizado adaptado a la identidad de tu negocio",
            "Diseño adaptable a celulares, tablets y computadoras",
            "Catálogos de productos con categorías y filtros",
            "Carrito de consulta y pedidos por WhatsApp",
            "Formulario de contacto, ubicación y redes sociales"
        ]
    },
    {
        id: "stock",
        icono: "📦",
        titulo: "Control de stock e inventario",
        descripcion:
            "Administrá los productos de tu negocio, registrá movimientos y consultá las existencias desde un solo lugar.",
        funcionalidades: [
            "Registro y organización de productos por categorías, con el detalle de cada uno",
            "Consulta de existencias y stock disponible",
            "Registro de ingresos y egresos de mercadería",
            "Avisos de stock mínimo para productos seleccionados",
            "Historial de movimientos e informes de inventario"
        ]
    },
    {
        id: "turnos",
        icono: "📅",
        titulo: "Turnos y reservas",
        descripcion:
            "Organizá las citas de tu negocio, administrá los horarios disponibles y llevá un registro de tus clientes.",
        funcionalidades: [
            "Agenda diaria, semanal y mensual",
            "Configuración de días y horarios de atención",
            "Registro de turnos y datos de clientes",
            "Reprogramación y cancelación de turnos",
            "Consulta del historial de reservas"
        ]
    },
];
