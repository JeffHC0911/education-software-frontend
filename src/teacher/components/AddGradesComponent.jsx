// AddGradesComponent.js
import { useState } from "react";
import { Label, TextInput, Button, Dropdown } from "keep-react";
import { useTeacherStore } from "../../hooks";

export const AddGradesComponent = ({ courseId }) => {
  const { students, assesments, startSavingGrades } = useTeacherStore();

  const [formValue, setFormValue] = useState({
    studentId: "",
    grades: {}, // Aquí almacenaremos las notas de las evaluaciones
  });

  const onInputChanged = ({ target }) => {
    const { name, value } = target;
  
    // Si el nombre del campo incluye 'grade-', se trata de una nota de evaluación
    if (name.startsWith('grade-')) {
      const assessmentId = name.split('grade-')[1]; // Extraer el ID de la evaluación
      setFormValue((prevFormValue) => ({
        ...prevFormValue,
        grades: {
          ...prevFormValue.grades,
          [assessmentId]: value,
        },
      }));
    } else {
      setFormValue({
        ...formValue,
        [target.name]: target.value,
      });
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
  //console.log(filterAssesments);

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
          <select
            id="id-student-select"
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            name="studentId"
            value={formValue.studentId}
            onChange={onInputChanged}
          >
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student._id} value={student.id}>
                {student.name} {student.lastname}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-8 ml-8 mr-8 shadow-xl lg:mb-4">
          <Label htmlFor="#id-grade-input" value="Grade" className="text-xl" />
          <TextInput
            id="id-grade-input"
            placeholder="Enter grade"
            color="gray"
            name="grade"
            sizing="lg"
            value={formValue.grade}
            onChange={onInputChanged}
          />
        </div>
        {filterAssesments.map((assessment) => (
          <div className="mb-4" key={assessment._id}>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={`grade-${assessment._id}`}
            >
              {assessment.name} ({assessment.weight}%)
            </label>
            <input
              type="number"
              id={`grade-${assessment._id}`}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              //value={grades[assessment.id] || ""}
              //onChange={(event) => handleGradeChange(event, assessment._id)}
            />
          </div>
        ))}

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
