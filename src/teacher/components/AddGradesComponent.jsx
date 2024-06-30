// AddGradesComponent.js
import { useState } from "react";
import { Label, TextInput, Button, Dropdown } from "keep-react";
import { useTeacherStore } from "../../hooks";

export const AddGradesComponent = ({ courseId, studentId }) => {
  const { students, assesments, startSavingGrades } = useTeacherStore();

  const [formValue, setFormValue] = useState({
    grades: {},
    studentId: studentId || "",
  });

  const onInputChanged = ({ target }) => {
    const { name, value } = target;
    const assessmentId = name.split("grade-")[1]; // Extrae el ID de la evaluación

    // Validar que el valor sea un número
    if (!isNaN(value)) {
      // Actualiza las notas en el estado
      setFormValue((prevFormValue) => ({
        ...prevFormValue,
        grades: {
          ...prevFormValue.grades,
          [assessmentId]: value,
        },
      }));
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await startSavingGrades(formValue);
      // Handle successful save (e.g., reset form, show success message, etc.)
    } catch (error) {
      console.error("Error saving grades", error.message);
      // Handle error (e.g., show error message)
    }
  };

  //Filtrando evaluaciones que coincidan con el curso actual
  const filterAssesments = assesments.filter(
    (assesment) => assesment.course._id === courseId
  );

  const student = students.find((student) => student._id === studentId);
  console.log("student", student);

  return (
    <div>
      <h2 className="text-center text-3xl mb-8">Add Grades</h2>
      <div>
        <div className="mb-8 ml-8 mr-8 shadow-xl lg:mb-4">
          <Label
            htmlFor="#id-student-select"
            value="Select Student"
            className="text-xl"
          />
          {/* Muestra información del estudiante seleccionado */}
          {student && (
            <div className="mb-8 ml-8 mr-8">
              <p className="text-xl font-semibold">
                {student.name} {student.lastname}
              </p>
            </div>
          )}
        </div>

        <div className="mb-8 ml-8 mr-8 lg:mb-4">
          {filterAssesments.map((assessment) => (
            <div className="mb-4" key={assessment._id}>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`grade-${assessment._id}`}
              >
                {assessment.name} ({assessment.weighted}%)
              </label>
              <input
                type="number"
                id={`grade-${assessment._id}`}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name={`grade-${assessment._id}`}
                value={formValue.grades[assessment._id] || ""}
                onChange={onInputChanged}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-around mb-8">
          <div className="button text-center">
            <button
              onClick={onSubmit}
              className="btnSubmit px-4 text-xl font-medium text-center text-white bg-palette-950 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
