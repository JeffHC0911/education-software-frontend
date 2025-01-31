import { useEffect } from 'react';
import { TextInput } from "keep-react";
import { Envelope, Lock, User } from "phosphor-react";
import { useAuthStore, useForm } from '../../hooks'
import './RegisterPage.css';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next'; 

import FondoDosSVG from '../../assets/img/fondo2.svg';

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}

export const RegisterPage = () => {
    const { startRegister, errorMessage } = useAuthStore();
    const { t } = useTranslation();


    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormFields)

    const styles = {
        width: "100%",
        height: "3.5rem",
        fontSize: "1.5rem",
        boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.1)',
    }

    const registerSubmit = (event) => {
        event.preventDefault();
        console.log({ registerName, registerEmail, registerPassword, registerPassword2 });
        if (registerPassword !== registerPassword2) {
            Swal.fire('Error', 'Passwords do not match', 'error');
            return;
        }

        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
    }

    useEffect(() => {
        if (errorMessage) {
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
    }, [errorMessage])

    return (
        <div className="flex flex-col items-center m-auto bg-palette-400 h-screen">
            <h2 className='title-register'>{t('register') } </h2>

            <img className='image' src={FondoDosSVG} alt="" />

            <form className="mt-10 flex flex-col w-80 lg:w-1/2" onSubmit={registerSubmit}>
                <div className="input-register">
                    <TextInput
                        id="#id-9"
                        placeholder="Name"
                        name='registerName'
                        type="text"
                        style={styles}
                        color="gray"
                        sizing="lg"
                        addon={<User size={30} color="#5E718D" />}
                        addonPosition="left"
                        value={registerName}
                        handleOnChange={onRegisterInputChange}
                    />
                </div>

                <div className="input-register">
                    <TextInput
                        id="#id-10"
                        placeholder="Email"
                        name='registerEmail'
                        type="email"
                        style={styles}
                        color="gray"
                        sizing="lg"
                        addon={<Envelope size={30} color="#5E718D" />}
                        addonPosition="left"
                        value={registerEmail}
                        handleOnChange={onRegisterInputChange}
                    />
                </div>

                <div className="input-register">
                    <TextInput
                        id="#id-11"
                        placeholder="Password"
                        name='registerPassword'
                        color="gray"
                        sizing="lg"
                        type="password"
                        style={styles}
                        addon={<Lock size={30} color="#5E718D" />}
                        addonPosition="left"
                        iconPosition="right"
                        value={registerPassword}
                        handleOnChange={onRegisterInputChange}
                    />
                </div>

                <div className="input-register">
                    <TextInput
                        id="#id-12"
                        className="input-register"
                        placeholder="Repeat Password"
                        name='registerPassword2'
                        color="info"
                        sizing="md"
                        type="password"
                        style={styles}
                        addon={<Lock size={30} color="#5E718D" />}
                        addonPosition="left"
                        iconPosition="right"
                        value={registerPassword2}
                        handleOnChange={onRegisterInputChange}
                    />
                </div>

                <div className="form-group mb-2">
                    <input
                        type="submit"
                        className="btnSubmit w-full py-3 px-4 text-base font-medium text-center text-white bg-palette-950 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        value={t('register') } 
                    />
                </div>


            </form>

        </div>
    )
}
