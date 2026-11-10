import { useSyncExternalStore } from "react";

/**
 * Router mínimo basado en el hash de la URL. Funciona en hosting estático sin configurar nada.
 *
 *   #/negocios                    ->  página para negocios (los servicios)
 *   #/negocios/<id-del-servicio>  ->  lo mismo, y baja hasta la tarjeta de ese servicio
 *   #/ejemplos/<id-del-servicio>  ->  página de ejemplos de un servicio
 *   cualquier otra cosa           ->  inicio (la página del CV)
 *
 * Ojo: un enlace del tipo "#proyectos" es un ancla DENTRO del inicio y no cambia de página.
 * Por eso los enlaces entre páginas siempre empiezan con "#/".
 */
export type Pagina =
    | { tipo: "inicio" }
    | { tipo: "negocios"; idServicio: string | null }
    | { tipo: "ejemplos"; idServicio: string };

function suscribir(callback: () => void) {
    window.addEventListener("hashchange", callback);
    return () => window.removeEventListener("hashchange", callback);
}

function leerHash() {
    return window.location.hash;
}

export function leerPagina(hash: string): Pagina {
    const ejemplos = hash.match(/^#\/ejemplos\/([\w-]+)/);
    if (ejemplos) {
        return { tipo: "ejemplos", idServicio: ejemplos[1] };
    }

    const negocios = hash.match(/^#\/negocios(?:\/([\w-]+))?\/?$/);
    if (negocios) {
        return { tipo: "negocios", idServicio: negocios[1] ?? null };
    }

    return { tipo: "inicio" };
}

export function usePagina(): Pagina {
    const hash = useSyncExternalStore(suscribir, leerHash, () => "");
    return leerPagina(hash);
}

export const ENLACE_INICIO = "#/";

export function enlaceNegocios(idServicio?: string): string {
    return idServicio ? `#/negocios/${idServicio}` : "#/negocios";
}

export function enlaceEjemplos(idServicio: string): string {
    return `#/ejemplos/${idServicio}`;
}
