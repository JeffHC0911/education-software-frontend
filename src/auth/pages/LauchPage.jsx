import { Link } from "react-router-dom";
import { Button } from "keep-react";
import FondoSVG from "../../assets/img/fondo1.svg";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../../teacher/components/LanguageSwitcher";
import './LauchPage.css'

export const LauchPage = () => {
    const { t } = useTranslation();

    return (
        <div className="container m-auto flex flex-col items-center justify-center min-h-screen px-4 text-center">
            {/* Coloca el componente LanguageSwitcher aquí */}
            <div className="absolute top-4 right-4">
                <LanguageSwitcher />
            </div>

            <h2 className="title text-blue">{t('welcome') }</h2>
            <img className="image" src={FondoSVG} alt="FondoSVG" />

            <div className="buttons mt-32">
                <Link to="/register">
                    <Button size="2xl" type="primary" className="mb-6 w-80 bg-palette-400 md:w-60">{t('register') }</Button>
                </Link>
                <Link to="/login">
                    <Button size="2xl" type="primary" className="w-80 bg-palette-950 md:w-60">{t('login') }</Button>
                </Link>
            </div>
        </div>
    )
}
