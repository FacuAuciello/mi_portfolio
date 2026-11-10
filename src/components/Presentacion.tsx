import type { ReactNode } from "react";

interface PresentacionProps {
    nombre: string;
    descripcion: string;
    texto: string;
    /** Botones o enlaces que van debajo del texto (opcional) */
    children?: ReactNode;
}

function Presentacion({
    nombre,
    descripcion,
    texto,
    children,
}: PresentacionProps) {
    return (
        <section className="presentacion">
            <div className="presentacion-contenido">
                <p className="presentacion-saludo">
                    Hola, soy
                </p>

                <h1>{nombre}</h1>

                <h2>{descripcion}</h2>

                <p className="presentacion-texto">
                    {texto}
                </p>

                {children && (
                    <div className="presentacion-enlaces">
                        {children}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Presentacion;
