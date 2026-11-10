import { useEffect } from "react";
import "./App.css";

import Contacto from "./components/Contacto";
import Presentacion from "./components/Presentacion";
import Proyectos from "./components/Proyectos";
import Servicios from "./components/Servicios";
import { CV, GITHUB, LINKEDIN } from "./data/enlaces";
import EjemplosPage from "./ejemplos/EjemplosPage";
import { ENLACE_INICIO, enlaceNegocios, usePagina } from "./utils/ruta";
import {
    obtenerEnlaceWhatsApp,
    whatsappConfigurado as hayWhatsApp,
} from "./utils/whatsapp";

function App() {
    const pagina = usePagina();
    const whatsappConfigurado = hayWhatsApp();

    const tipo = pagina.tipo;
    const idServicio = pagina.tipo === "inicio" ? null : pagina.idServicio;

    // Al cambiar de página: hasta la tarjeta del servicio (#/negocios/<id>), hasta el
    // ancla del inicio (#proyectos, #contacto) o arriba de todo en cualquier otro caso.
    useEffect(() => {
        if (tipo === "negocios" && idServicio) {
            document.getElementById(idServicio)?.scrollIntoView({ behavior: "instant" });
            return;
        }

        if (tipo === "inicio") {
            const id = decodeURIComponent(window.location.hash.slice(1));
            const destino = id && id !== "/" ? document.getElementById(id) : null;

            if (destino) {
                destino.scrollIntoView({ behavior: "instant" });
                return;
            }
        }

        window.scrollTo({ top: 0, behavior: "instant" });
    }, [tipo, idServicio]);

    return (
        <>
            <header className="navbar">
                <div className="navbar-contenido">
                    {/* en el inicio no hay enlaces a la izquierda (los botones de la presentacion ya llevan a los proyectos);
                        el nav vacio se deja para que "Para negocios" quede a la derecha */}
                    <nav className="navbar-izquierda">
                        {tipo !== "inicio" && (
                            <a href={ENLACE_INICIO} className="navbar-enlace">
                                ← Mis proyectos
                            </a>
                        )}
                    </nav>

                    {tipo === "inicio" ? (
                        <a href={enlaceNegocios()} className="navbar-contacto">
                            Para negocios
                        </a>
                    ) : (
                        <a
                            href={obtenerEnlaceWhatsApp()}
                            className="navbar-contacto"
                            target={whatsappConfigurado ? "_blank" : undefined}
                            rel={whatsappConfigurado ? "noopener noreferrer" : undefined}
                        >
                            Contactarme
                        </a>
                    )}
                </div>
            </header>

            <main>
                {pagina.tipo === "ejemplos" && (
                    <EjemplosPage
                        key={pagina.idServicio}
                        idServicio={pagina.idServicio}
                    />
                )}

                {pagina.tipo === "negocios" && (
                    <>
                        <Presentacion
                            nombre="Facundo Auciello"
                            descripcion="Páginas web y sistemas a medida"
                            texto="Desarrollo páginas web profesionales y sistemas internos a medida para comercios, profesionales e instituciones. Si tu negocio todavía trabaja con papeles, planillas, tiene el sistema desactualizado o no tiene presencia online, puedo ayudarte a cambiarlo."
                        />

                        <Servicios />
                    </>
                )}

                {pagina.tipo === "inicio" && (
                    <>
                        <Presentacion
                            nombre="Facundo Auciello"
                            descripcion="Desarrollador Java Full Stack"
                            texto="Desarrollo aplicaciones de punta a punta: APIs REST con Java y Spring Boot, bases de datos relacionales e interfaces web con React y TypeScript. Abajo podés ver algunos de mis proyectos."
                        >
                            <a
                                href="#proyectos"
                                className="presentacion-enlace presentacion-enlace-principal"
                            >
                                Ver proyectos
                            </a>

                            <a
                                href={GITHUB}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="presentacion-enlace"
                            >
                                GitHub
                            </a>

                            <a
                                href={LINKEDIN}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="presentacion-enlace"
                            >
                                LinkedIn
                            </a>

                            <a
                                href={CV}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="presentacion-enlace"
                            >
                                Mi CV
                            </a>
                        </Presentacion>

                        <Proyectos />

                        <Contacto />
                    </>
                )}
            </main>
        </>
    );
}

export default App;
