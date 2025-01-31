import { Label } from "keep-react";
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

  return (
    <TeacherLayout>
      <div className="max-w-4xl mx-auto my-8 p-6 sm:p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Create Course
        </h2>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Nombre del curso */}
          <div className="space-y-2">
            <Label
              htmlFor="id-name-course"
              value="Name Course"
              className="text-lg font-medium text-gray-700"
            />
            <input
              id="id-name-course"
              className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-500"
              placeholder="Enter the course name"
              name="name"
              value={formValue.name}
              onChange={onInputChanged}
            />
          </div>

          {/* Horario del curso */}
          <div className="space-y-2">
            <Label
              htmlFor="id-schedule-course"
              value="Schedule Course"
              className="text-lg font-medium text-gray-700"
            />
            <input
              id="id-schedule-course"
              className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-500"
              placeholder="Enter the course schedule"
              name="schedule"
              value={formValue.schedule}
              onChange={onInputChanged}
            />
          </div>

          {/* Botón de envío */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg transition-all"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </TeacherLayout>
  );
};
