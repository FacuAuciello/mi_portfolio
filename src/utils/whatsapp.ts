export const WHATSAPP_NUMERO = "5492236360649";

export function whatsappConfigurado(): boolean {
    return WHATSAPP_NUMERO.trim().length > 0;
}

export function obtenerEnlaceWhatsApp(servicio?: string): string {
    const mensaje = servicio
        ? `Hola Facundo, estuve viendo tu portfolio y me interesa ${servicio.toLowerCase()}. Quisiera consultarte por una solución para mi negocio.`
        : "Hola Facundo, estuve viendo tu portfolio y quiero consultarte por una solución personalizada para mi negocio.";

    if (!whatsappConfigurado()) {
        return "#contacto";
    }

    return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}
