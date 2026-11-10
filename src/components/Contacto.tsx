import { EMAIL, GITHUB, LINKEDIN } from "../data/enlaces";

function Contacto() {
    return (
        <section
            id="contacto"
            className="contacto"
        >
            <div className="contacto-contenido">
                <span className="contacto-titulo">
                    Contacto
                </span>

                <a
                    href={`mailto:${EMAIL}`}
                    className="contacto-email"
                >
                    {EMAIL}
                </a>

                <a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contacto-email"
                >
                    LinkedIn
                </a>

                <a
                    href={GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contacto-email"
                >
                    GitHub
                </a>
            </div>
        </section>
    );
}

export default Contacto;
