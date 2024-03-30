import { TextInput, Label, Dropdown, DatePicker, Button } from "keep-react";

import { useState } from "react";
import {TeacherLayout} from '../'

export const RegisterCouse = () => {


    const [time, setTime] = useState(null);

    const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ]

    return (

        <TeacherLayout>
                    <div className="max-w-2xl mx-auto  my-4 p-8 bg-gray-100 rounded-lg shadow-lg">
            <nav>
                
            </nav>
            <h2 className="text-center text-3xl mb-8">Create Course</h2>

            <div className="mb-8 ml-8 mr-8 shadow-xl lg:mb-4">
                <Label htmlFor="#id-course" value="Name Course" className="text-xl" />
                <TextInput
                    id="#id-course"
                    placeholder="Input Name Course"
                    color="gray"
                    sizing="lg"
                />
            </div>

            <div className="mb-8 ml-8 mr-8 lg:mb-4">
                <Label htmlFor="#id-day-one" value="Day One" className="text-xl" />
                <Dropdown
                    label="Select a day"
                    size="lg"
                    type="primary"
                    dismissOnClick={true}
                    className="bg-palette-950 shadow-xl"
                >
                    {daysOfWeek.map((day, index) => (
                        <Dropdown.Item key={index}>{day}</Dropdown.Item>
                    ))}
                </Dropdown>
            </div>

            <div className="mb-8 ml-8 mr-8 lg:mb-4">
                <DatePicker time={setTime} placeholder="Select time" className="shadow-xl">
                    <DatePicker.Time />
                </DatePicker>
            </div>

            <div className="mb-8 ml-8 mr-8 lg:mb-4">
                <Label htmlFor="#id-day-two" value="Day Two" className="text-xl" />
                <Dropdown
                    label="Select a day"
                    size="lg"
                    type="primary"
                    dismissOnClick={true}
                    className="bg-palette-950 shadow-xl"
                >
                    {daysOfWeek.map((day, index) => (
                        <Dropdown.Item key={index}>{day}</Dropdown.Item>
                    ))}
                </Dropdown>
            </div>

            <div className="mb-2 ml-8 mr-8 lg:mb-4">
                <DatePicker time={setTime} placeholder="Select time" className="shadow-xl">
                    <DatePicker.Time />
                </DatePicker>
            </div>

            <div className="flex justify-center mb-8">
                <Button size="md" type="primary" className="bg-palette-950 lg:w-96">
                    Create Course
                </Button>
            </div>
        </div>
        </TeacherLayout>

    )
}
