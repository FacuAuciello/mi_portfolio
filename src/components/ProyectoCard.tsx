import { useState } from "react";

import type { Proyecto } from "../data/proyectos";

interface ProyectoCardProps {
    proyecto: Proyecto;
}

function ProyectoCard({ proyecto }: ProyectoCardProps) {
    const { nombre, descripcion, estado, tecnologias, imagenes, enlaces, notaCodigo } = proyecto;

    const [imagenActual, setImagenActual] = useState(0);
    const [imagenAmpliada, setImagenAmpliada] = useState(false);

    function imagenAnterior() {
        if (imagenes.length === 0) {
            return;
        }

        setImagenActual((indiceActual) =>
            indiceActual === 0
                ? imagenes.length - 1
                : indiceActual - 1
        );
    }

    function imagenSiguiente() {
        if (imagenes.length === 0) {
            return;
        }

        setImagenActual((indiceActual) =>
            indiceActual === imagenes.length - 1
                ? 0
                : indiceActual + 1
        );
    }

    return (
        <>
            <article className="proyecto-card">
                {/* sin capturas no se muestra el bloque de imagen */}
                {imagenes.length > 0 && (
                    <div className="proyecto-imagen">
                        <img
                            src={imagenes[imagenActual]}
                            alt={`Captura del proyecto ${nombre}`}
                            onClick={() => setImagenAmpliada(true)}
                        />

                        {imagenes.length > 1 && (
                            <>
                                <button
                                    className="flecha-imagen flecha-izquierda"
                                    onClick={imagenAnterior}
                                    aria-label="Imagen anterior"
                                >
                                    ‹
                                </button>

                                <button
                                    className="flecha-imagen flecha-derecha"
                                    onClick={imagenSiguiente}
                                    aria-label="Imagen siguiente"
                                >
                                    ›
                                </button>

                                <div className="indicadores-imagenes">
                                    {imagenes.map((_, indice) => (
                                        <button
                                            key={indice}
                                            className={
                                                indice === imagenActual
                                                    ? "indicador activo"
                                                    : "indicador"
                                            }
                                            onClick={() =>
                                                setImagenActual(indice)
                                            }
                                            aria-label={`Ver imagen ${indice + 1}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}

                <div className="proyecto-contenido">
                    <h3>{nombre}</h3>

                    <p className="proyecto-estado">{estado}</p>

                    <p>{descripcion}</p>

                    <div className="proyecto-tecnologias">
                        {tecnologias.map((tecnologia) => (
                            <span key={tecnologia.nombre}>
                                {/* alt vacío: el logo es decorativo, el nombre ya está escrito al lado */}
                                {tecnologia.logo && (
                                    <img
                                        src={tecnologia.logo}
                                        alt=""
                                        width={18}
                                        height={18}
                                    />
                                )}
                                {tecnologia.nombre}
                            </span>
                        ))}
                    </div>

                    <div className="proyecto-enlaces">
                        {enlaces.demo && (
                            <a
                                href={enlaces.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="proyecto-boton proyecto-boton-principal"
                            >
                                Ver demo ↗
                            </a>
                        )}

                        {enlaces.sitio && (
                            <a
                                href={enlaces.sitio}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="proyecto-boton proyecto-boton-principal"
                            >
                                Ver sitio en línea ↗
                            </a>
                        )}

                        {enlaces.codigo && (
                            <a
                                href={enlaces.codigo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="proyecto-boton"
                            >
                                Ver código ↗
                            </a>
                        )}

                        {!enlaces.codigo && notaCodigo && (
                            <span className="proyecto-nota-codigo">
                                {notaCodigo}
                            </span>
                        )}
                    </div>
                </div>
            </article>

            {imagenAmpliada &&
                imagenes.length > 0 && (
                    <div
                        className="modal-imagen"
                        onClick={() => setImagenAmpliada(false)}
                    >
                        <button
                            className="cerrar-modal"
                            onClick={() =>
                                setImagenAmpliada(false)
                            }
                            aria-label="Cerrar imagen"
                        >
                            ×
                        </button>

                        {imagenes.length > 1 && (
                            <button
                                className="modal-flecha modal-flecha-izquierda"
                                onClick={(evento) => {
                                    evento.stopPropagation();
                                    imagenAnterior();
                                }}
                                aria-label="Imagen anterior"
                            >
                                ‹
                            </button>
                        )}

                        <img
                            src={imagenes[imagenActual]}
                            alt={`Captura ampliada del proyecto ${nombre}`}
                            onClick={(evento) =>
                                evento.stopPropagation()
                            }
                        />

                        {imagenes.length > 1 && (
                            <button
                                className="modal-flecha modal-flecha-derecha"
                                onClick={(evento) => {
                                    evento.stopPropagation();
                                    imagenSiguiente();
                                }}
                                aria-label="Imagen siguiente"
                            >
                                ›
                            </button>
                        )}
                    </div>
                )}
        </>
    );
}

export default ProyectoCard;
