import { Label, Dropdown, DatePicker, Button } from "keep-react";

import { useState } from "react";
import { TeacherLayout } from "../";
import { useTeacherStore } from "../../hooks";

export const RegisterCouse = () => {
  const { startSavingCourse } = useTeacherStore();

  const [formValue, setFormValue] = useState({
    name: "",
    schedule: "",
  });

  const onInputChanged = ({ target }) => {
    setFormValue({
      ...formValue,
      [target.name]: target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await startSavingCourse(formValue);
      setFormValue({
        name: "",
        schedule: "",
      });
    } catch (error) {
      console.error("Error al guardar el curso", error.message);
    }
  };

  //const [time, setTime] = useState(null);

  // const daysOfWeek = [
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //     "Sunday"
  // ]

  return (
    <TeacherLayout>
      <div className="max-w-2xl mx-auto  my-4 p-8 bg-gray-100 rounded-lg shadow-lg">
        <nav></nav>
        <h2 className="text-center text-3xl mb-8">Create Course</h2>

        <form onSubmit={onSubmit}>
          <div className="mb-8 ml-8 mr-8 shadow-xl lg:mb-4">
            <Label
              htmlFor="#id-name-course"
              value="Name Course"
              className="text-xl"
            />
            <input
              id="#id-name-course"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              placeholder="Input Name Course"
              color="gray"
              sizing="lg"
              name="name"
              value={formValue.name}
              onChange={onInputChanged}
            />
          </div>

          <div className="mb-8 ml-8 mr-8 shadow-xl lg:mb-4">
            <Label
              htmlFor="#id-schedule-course"
              value="Schedule Course"
              className="text-xl"
            />
            <input
              id="#id-schedule-course"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              placeholder="Input Schedule Course"
              color="gray"
              sizing="lg"
              name="schedule"
              value={formValue.schedule}
              onChange={onInputChanged}
            />
          </div>

          {/* <div className="mb-8 ml-8 mr-8 lg:mb-4">
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
        </div> */}

          {/* <div className="mb-8 ml-8 mr-8 lg:mb-4">
          <DatePicker
            time={setTime}
            placeholder="Select time"
            className="shadow-xl"
          >
            <DatePicker.Time />
          </DatePicker>
        </div> */}

          {/* <div className="mb-8 ml-8 mr-8 lg:mb-4">
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
        </div> */}
          {/* 
        <div className="mb-2 ml-8 mr-8 lg:mb-4">
          <DatePicker
            time={setTime}
            placeholder="Select time"
            className="shadow-xl"
          >
            <DatePicker.Time />
          </DatePicker>
        </div> */}

          <div className="flex justify-center mb-8">
            <button size="md" type="submit" className="bg-palette-950 text-white rounded-lg p-2 lg:w-96">
              Create Course
            </button>
          </div>
        </form>
      </div>
    </TeacherLayout>
  );
};
