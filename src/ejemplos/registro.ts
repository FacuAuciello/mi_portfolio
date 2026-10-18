import type { ComponentType } from "react";

export type Demo = {
    id: string;
    nombre: string;
    rubro: string;
    descripcion: string;
    /** Dirección ficticia que se muestra en la barra del "navegador" */
    url: string;
    Componente: ComponentType;
};

/** Ejemplos de cada servicio. La clave es el `id` del servicio en data/servicios.ts */
export const demosPorServicio: Record<string, Demo[]> = {
    "paginas-web": [],
    stock: [],
    turnos: [],
};
