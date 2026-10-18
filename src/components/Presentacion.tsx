interface PresentacionProps {
    nombre: string;
    descripcion: string;
}

function Presentacion({
    nombre,
    descripcion,
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
                    Desarrollo páginas web profesionales y sistemas
                    internos a medida para comercios, profesionales e
                    instituciones. Si tu negocio todavía trabaja con
                    papeles, planillas, tiene el sistema desactualizado
                    o no tiene presencia online, puedo ayudarte a
                    cambiarlo.
                </p>
            </div>
        </section>
    );
}

export default Presentacion;