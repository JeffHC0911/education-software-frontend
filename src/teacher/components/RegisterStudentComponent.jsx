/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Label, TextInput, Button } from "keep-react";

import { useTeacherStore } from '../../hooks'


export const RegisterStudentComponent = ({ courseId }) => {

    const { startSavingStudent, startSavingCourse, startLoadingCoursesById } = useTeacherStore();

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

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const studentId = await startSavingStudent(formValue);

            // Asegúrate de que startLoadingCoursesById devuelva el objeto del curso correctamente
            const response = await startLoadingCoursesById(courseId);
            const courseData = response.course; // Accede a la propiedad 'course' de la respuesta
            //console.log('Datos del curso',courseData);
            //console.log('Datos del curso', courseData.students);

            if (courseData && courseData.students) {
                const updatedCourse = {
                    ...courseData,
                    students: [...courseData.students, studentId]
                };


                await startSavingCourse(updatedCourse);
            } else {
                console.error('No se encontró la propiedad students en los datos del curso');
                //Swal.fire('Error', 'No se encontró la propiedad students en los datos del curso', 'error');
            }
        } catch (error) {
            console.error('Error al guardar el estudiante', error.message);
            //Swal.fire('Error al guardar el estudiante', error.message, 'error');
        }
    }



    return (
        <div>
            <h2 className="text-center text-3xl mb-8">Register/Import Student</h2>
            <div>
                <div className="mb-8 ml-8 mr-8 shadow-xl lg:mb-4">
                    <Label htmlFor="#id-name-student" value="Name Student" className="text-xl" />
                    <TextInput
                        id="id-name-student"
                        placeholder="Input Name Studet"
                        color="gray"
                        name='name'
                        sizing="lg"
                        value={formValue.name}
                        handleOnChange={onInputChanged}
                    />
                </div>

                <div className="mb-8 ml-8 mr-8 shadow-xl lg:mb-4">
                    <Label htmlFor="#id-lastname-student" value="Lastname Student" className="text-xl" />
                    <TextInput
                        id="id-lastname-student"
                        placeholder="Input Lastname Student"
                        color="gray"
                        name='lastname'
                        sizing="lg"
                        value={formValue.lastname}
                        handleOnChange={onInputChanged}
                    />
                </div>

                <div className="mb-8 ml-8 mr-8 shadow-xl lg:mb-4">
                    <Label htmlFor="#id-email-student" value="Email Student" className="text-xl" />
                    <TextInput
                        id="id-email-student"
                        placeholder="Input Email Student"
                        type="email"
                        color="gray"
                        name='email'
                        sizing="lg"
                        value={formValue.email}
                        handleOnChange={onInputChanged}
                    />
                </div>

                <div className="flex justify-around mb-8">
                    <div className="button text-center">
                        <button onClick={onSubmit} className='btnSubmit px-4 text-xl font-medium text-center text-white bg-palette-950 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                            Submit
                        </button>
                    </div>
                    <Button size="sm" type="primary" className="bg-palette-950 lg:w-96">
                        Import Student
                    </Button>
                </div>
            </div>
        </div>
    )
}
