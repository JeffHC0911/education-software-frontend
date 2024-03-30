import { Label, TextInput, Button } from "keep-react";

import{TeacherLayout} from '../'

export const RegisterStudent = () => {
    return (

        <TeacherLayout>
                    <div>
            <h2 className="text-center text-3xl mb-8">Register/Import Student</h2>

            <div className="mb-8 ml-8 mr-8 shadow-xl lg:mb-4">
                <Label htmlFor="#id-name-student" value="Name Student" className="text-xl" />
                <TextInput
                    id="#id-student"
                    placeholder="Input Name Studet"
                    color="gray"
                    sizing="lg"
                />
            </div>

            <div className="mb-8 ml-8 mr-8 shadow-xl lg:mb-4">
                <Label htmlFor="#id-lastname-student" value="Lastname Student" className="text-xl" />
                <TextInput
                    id="#id-student"
                    placeholder="Input Lastname Student"
                    color="gray"
                    sizing="lg"
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
                />
            </div>

            <div className="flex justify-around mb-8">
                <Button size="sm" type="primary" className="bg-palette-950 lg:w-96">
                    Create Student
                </Button>
                <Button size="sm" type="primary" className="bg-palette-950 lg:w-96">
                    Import Student
                </Button>
            </div>

        </div>
        </TeacherLayout>

    )
}
