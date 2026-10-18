import { useSyncExternalStore } from "react";

/**
 * Router mínimo basado en el hash de la URL.
 *   #/ejemplos/<id-del-servicio>  ->  página de ejemplos
 *   cualquier otra cosa           ->  portafolio (home)
 * Funciona en hosting estático sin configurar nada.
 */
function suscribir(callback: () => void) {
    window.addEventListener("hashchange", callback);
    return () => window.removeEventListener("hashchange", callback);
}

function leerHash() {
    return window.location.hash;
}

export function useServicioEjemplos(): string | null {
    const hash = useSyncExternalStore(suscribir, leerHash, () => "");
    const coincidencia = hash.match(/^#\/ejemplos\/([\w-]+)/);
    return coincidencia ? coincidencia[1] : null;
}

export function enlaceEjemplos(idServicio: string): string {
    return `#/ejemplos/${idServicio}`;
}
