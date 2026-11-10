import "./Servicios.css";

import { servicios } from "../data/servicios";
import { demosPorServicio } from "../ejemplos/registro";
import { ENLACE_INICIO, enlaceEjemplos } from "../utils/ruta";
import {
    obtenerEnlaceWhatsApp,
    whatsappConfigurado as hayWhatsApp,
} from "../utils/whatsapp";

function Servicios() {
    const whatsappConfigurado = hayWhatsApp();

    return (
        <section id="servicios" className="servicios">
            <div className="servicios-intro">
                <h2>Encontrá la solución para tu negocio</h2>

                <p>
                    Cada tarjeta muestra una solución específica con
                    lo que puede incluir. Si algo te interesa, podés
                    consultarme directamente por WhatsApp desde la
                    misma tarjeta.
                </p>

                <p className="servicios-aviso">
                    ¿Buscás un desarrollador para tu equipo?{" "}
                    <a href={ENLACE_INICIO}>Mirá mis proyectos</a>
                </p>
            </div>

            <div className="servicios-grid">
                {servicios.map((servicio) => (
                    <article
                        key={servicio.id}
                        id={servicio.id}
                        className="servicio-tarjeta"
                    >
                        <div className="servicio-encabezado">
                            <span
                                className="servicio-icono"
                                aria-hidden="true"
                            >
                                {servicio.icono}
                            </span>

                            <h3>{servicio.titulo}</h3>
                        </div>

                        <p className="servicio-descripcion">
                            {servicio.descripcion}
                        </p>

                        <h4>¿Qué podría incluir?</h4>

                        <ul className="servicio-funcionalidades">
                            {servicio.funcionalidades.map(
                                (funcionalidad) => (
                                    <li key={funcionalidad}>
                                        {funcionalidad}
                                    </li>
                                )
                            )}
                        </ul>

                        <div className="servicio-acciones">
                            {/* el botón solo aparece cuando hay algo para mostrar: sin ejemplos llevaba a una pantalla vacía */}
                            {(demosPorServicio[servicio.id]?.length ?? 0) > 0 && (
                                <a
                                    href={enlaceEjemplos(servicio.id)}
                                    className="boton-ejemplos"
                                >
                                    Ver ejemplos
                                </a>
                            )}

                            <a
                                href={obtenerEnlaceWhatsApp(
                                    servicio.titulo
                                )}
                                className="boton-consultar"
                                target={
                                    whatsappConfigurado
                                        ? "_blank"
                                        : undefined
                                }
                                rel={
                                    whatsappConfigurado
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                            >
                                Consultar por WhatsApp ↗
                            </a>
                        </div>
                    </article>
                ))}
            </div>

            <div id="contacto-negocios" className="servicios-personalizado">
                <h2>
                    ¿Necesitás algo más específico para tu negocio?
                </h2>

                <p>
                    Quizás necesitás combinar varias de estas
                    funcionalidades o necesitás reformular alguna
                    de estas ideas para tu negocio.
                    Contame cómo trabajás hoy y vemos juntos
                    qué se puede mejorar.
                </p>

                <a
                    href={obtenerEnlaceWhatsApp()}
                    target={
                        whatsappConfigurado
                            ? "_blank"
                            : undefined
                    }
                    rel={
                        whatsappConfigurado
                            ? "noopener noreferrer"
                            : undefined
                    }
                >
                    Contame tu idea por WhatsApp ↗
                </a>
            </div>
        </section>
    );
}

export default Servicios;
