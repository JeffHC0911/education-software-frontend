/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Label, TextInput, Button } from "keep-react";

import { useTeacherStore } from '../../hooks'


export const RegisterStudentComponent = ({ courseId }) => {

    const { startSavingStudent } = useTeacherStore();

    const [formValue, setFormValue] = useState({
        name: '',
        lastname: '',
        email: ''
    })

    const onInputChanged = ({ target }) => {
        setFormValue({
            ...formValue,
            [target.name]: target.value,
        });
    };

    const onSubmit = async (event) =>{
        event.preventDefault();
        await startSavingStudent(formValue);

    }

    return (
        <div>
            <h2 className="text-center text-3xl mb-8">Register/Import Student</h2>

            <form action="" onSubmit={onSubmit}>
                <div className="mb-8 ml-8 mr-8 shadow-xl lg:mb-4">
                    <Label htmlFor="#id-name-student" value="Name Student" className="text-xl" />
                    <TextInput
                        id="#id-student"
                        placeholder="Input Name Studet"
                        color="gray"
                        sizing="lg"
                        handleOnChange={onInputChanged}
                    />
                </div>

                <div className="mb-8 ml-8 mr-8 shadow-xl lg:mb-4">
                    <Label htmlFor="#id-lastname-student" value="Lastname Student" className="text-xl" />
                    <TextInput
                        id="#id-student"
                        placeholder="Input Lastname Student"
                        color="gray"
                        sizing="lg"
                        handleOnChange={onInputChanged}
                    />
                </div>

                <div className="mb-8 ml-8 mr-8 shadow-xl lg:mb-4">
                    <Label htmlFor="#id-email-student" value="Email Student" className="text-xl" />
                    <TextInput
                        id="#id-student"
                        placeholder="Input Email Student"
                        type="email"
                        color="gray"
                        sizing="lg"
                        handleOnChange={onInputChanged}
                    />
                </div>

                <div className="flex justify-around mb-8">
                <div className="button text-center">
                    <input type="submit" className='btnSubmit px-4 text-xl font-medium text-center text-white bg-palette-950 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' />
                </div>
                    <Button size="sm" type="primary" className="bg-palette-950 lg:w-96">
                        Import Student
                    </Button>
                </div>
            </form>

        </div>
    )
}
