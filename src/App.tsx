
import { useEffect } from "react";
import "./App.css";

import Presentacion from "./components/Presentacion";
import Servicios from "./components/Servicios";
import EjemplosPage from "./ejemplos/EjemplosPage";
import { useServicioEjemplos } from "./utils/ruta";

function App() {
    const servicioEjemplos = useServicioEjemplos();

    // Al cambiar de página: arriba de todo en los ejemplos, o hasta la
    // tarjeta de la que venías (#id) cuando se vuelve al portafolio.
    useEffect(() => {
        if (servicioEjemplos) {
            window.scrollTo({ top: 0, behavior: "instant" });
            return;
        }
        const id = decodeURIComponent(window.location.hash.slice(1));
        if (id) {
            document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
        }
    }, [servicioEjemplos]);

    return (
        <>
            <header className="navbar">
                <div className="navbar-contenido">
                    <div className="navbar-izquierda" />

                    <a
                        href="#contacto"
                        className="navbar-contacto"
                    >
                        Contactarme
                    </a>
                </div>
            </header>

            <main>
                {servicioEjemplos ? (
                    <EjemplosPage
                        key={servicioEjemplos}
                        idServicio={servicioEjemplos}
                    />
                ) : (
                    <>
                        <Presentacion
                            nombre="Facundo Auciello"
                            descripcion="Programador"
                        />

                        <Servicios />
                    </>
                )}
            </main>
        </>
    );
}

export default App;
