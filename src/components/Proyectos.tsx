import { proyectos } from "../data/proyectos";
import ProyectoCard from "./ProyectoCard";

function Proyectos() {
    return (
        <section id="proyectos" className="proyectos-seccion">
            <h2>Proyectos</h2>

            <div className="proyectos-grid">
                {proyectos.map((proyecto) => (
                    <ProyectoCard
                        key={proyecto.id}
                        proyecto={proyecto}
                    />
                ))}
            </div>
        </section>
    );
}

export default Proyectos;
