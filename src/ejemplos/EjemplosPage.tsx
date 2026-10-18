import { useState } from "react";
import "./EjemplosPage.css";

import { servicios } from "../data/servicios";
import { demosPorServicio } from "./registro";
import { enlaceEjemplos } from "../utils/ruta";
import { obtenerEnlaceWhatsApp, whatsappConfigurado } from "../utils/whatsapp";

interface Props {
    idServicio: string;
}

function EjemplosPage({ idServicio }: Props) {
    const servicio = servicios.find((s) => s.id === idServicio);
    const demos = demosPorServicio[idServicio] ?? [];
    const [elegida, setElegida] = useState(0);

    if (!servicio || demos.length === 0) {
        return (
            <section className="ejemplos">
                <div className="ejemplos-vacio">
                    <h2>Todavía no hay ejemplos acá</h2>
                    <a href="#servicios" className="ejemplos-volver">← Volver a los servicios</a>
                </div>
            </section>
        );
    }

    const demo = demos[Math.min(elegida, demos.length - 1)];
    const Demo = demo.Componente;

    return (
        <section className="ejemplos">
            <a href={`#${servicio.id}`} className="ejemplos-volver">← Volver a los servicios</a>

            <header className="ejemplos-intro">
                <span aria-hidden="true">{servicio.icono}</span>
                <div>
                    <p className="ejemplos-etiqueta">Ejemplos de</p>
                    <h2>{servicio.titulo}</h2>
                </div>
            </header>

            <p className="ejemplos-aclaracion">
                Son demostraciones visuales con datos inventados: probalas, tocá los botones y mirá cómo
                funcionan. Tu proyecto se diseña con tu logo, tus colores y tus datos reales.
            </p>

            <div className="ejemplos-selector" role="tablist" aria-label="Elegí un ejemplo">
                {demos.map((d, i) => (
                    <button
                        key={d.id}
                        role="tab"
                        aria-selected={i === elegida}
                        className={i === elegida ? "activo" : ""}
                        onClick={() => setElegida(i)}
                    >
                        <small>Ejemplo {i + 1} · {d.rubro}</small>
                        <b>{d.nombre}</b>
                        <span>{d.descripcion}</span>
                    </button>
                ))}
            </div>

            <div className="marco">
                <div className="marco-barra">
                    <span className="puntos" aria-hidden="true"><i /><i /><i /></span>
                    <span className="marco-url">🔒 {demo.url}</span>
                    <span className="marco-demo">DEMO</span>
                </div>
                <div className="marco-contenido">
                    {/* key: al cambiar de ejemplo se reinicia su estado */}
                    <Demo key={`${idServicio}-${demo.id}`} />
                </div>
            </div>

            <div className="ejemplos-cta">
                <h3>¿Te imaginás algo así para tu negocio?</h3>
                <p>Contame a qué te dedicás y armamos una propuesta a tu medida.</p>
                <a
                    href={obtenerEnlaceWhatsApp(servicio.titulo)}
                    target={whatsappConfigurado() ? "_blank" : undefined}
                    rel={whatsappConfigurado() ? "noopener noreferrer" : undefined}
                    className="boton-consultar"
                >
                    Consultar por WhatsApp ↗
                </a>
            </div>

            <nav className="ejemplos-otros" aria-label="Ejemplos de otros servicios">
                <h4>Ver ejemplos de otros servicios</h4>
                <div>
                    {servicios
                        .filter((s) => s.id !== servicio.id)
                        .map((s) => (
                            <a key={s.id} href={enlaceEjemplos(s.id)}>
                                <span aria-hidden="true">{s.icono}</span> {s.titulo}
                            </a>
                        ))}
                </div>
            </nav>
        </section>
    );
}

export default EjemplosPage;
