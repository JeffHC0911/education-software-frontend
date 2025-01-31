/* eslint-disable react/no-unknown-property */
import { useEffect } from 'react'
import { useAuthStore, useForm } from '../../hooks'
import { TextInput } from "keep-react";
import { Envelope, Lock } from "phosphor-react";
import './LoginPage.css';
import Swal from "sweetalert2";
import { useTranslation } from 'react-i18next'; 

import FondoDosSVG from '../../assets/img/fondo2.svg';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

export const LoginPage = () => {
    const { t } = useTranslation();

    const styles = {
        width: "100%",
        height: "4.5rem",
        fontSize: "1.5rem",
        boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.1)',
    }

    const { startLogin, errorMessage } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);

    const loginSubmit = (event) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
    }

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error en la autenticación', errorMessage, 'error')
        }
    }, [errorMessage])


    return (
        <div className="flex flex-col items-center m-auto bg-palette-950 h-screen">
            <h2 className='title-login'>{t('login') } </h2>


            <img className='image' src={FondoDosSVG} alt="FondoDos" transition-style="in:wipe:right" />

            <form className="mt-10 flex flex-col w-80 lg:w-1/2" onSubmit={loginSubmit}>

                <div className="input-register">
                    <TextInput
                        id="#id-10"
                        placeholder="Email"
                        name='loginEmail'
                        type="email"
                        style={styles}
                        color="gray"
                        sizing="lg"
                        addon={<Envelope size={30} color="#5E718D" />}
                        addonPosition="left"
                        value={loginEmail}
                        handleOnChange={onLoginInputChange}
                    />
                </div>

                <div className="input-register">
                    <TextInput
                        id="#id-11"
                        placeholder="Password"
                        name='loginPassword'
                        color="gray"
                        sizing="lg"
                        type="password"
                        style={styles}
                        addon={<Lock size={30} color="#5E718D" />}
                        addonPosition="left"
                        iconPosition="right"
                        value={loginPassword}
                        handleOnChange={onLoginInputChange}
                    />
                </div>

                <div className="button mt-14 text-center">
                    <input type="submit" className='btnSubmit w-56 py-6 px-4 text-xl font-medium text-center text-white bg-palette-400 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' />
                </div>

            </form>

        </div>
    )
}