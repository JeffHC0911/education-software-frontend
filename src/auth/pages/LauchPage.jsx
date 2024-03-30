import { Link } from "react-router-dom";

import { Button } from "keep-react";
import FondoSVG from "../../assets/img/fondo1.svg";

import './LauchPage.css'

export const LauchPage = () => {
    return (
        <div className="container m-auto flex flex-col items-center">
            <h2 className="title text-blue">Welcome</h2>

            <img className="image" src={FondoSVG} alt="FondoSVG" />

            <div className="buttons mt-32">
                <Link to="/register"> {/* Enlaza a la página de registro */}
                    <Button size="2xl" type="primary" className="mb-6 w-80 bg-palette-400 md:w-60">Create Account</Button>
                </Link>
                <Link to="/login"> {/* Enlaza a la página de inicio de sesión */}
                    <Button size="2xl" type="primary" className="w-80 bg-palette-950 md:w-60">Sign In</Button>
                </Link>
            </div>

        </div>
    )
}
