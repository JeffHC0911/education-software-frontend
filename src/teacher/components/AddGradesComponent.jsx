import { useState } from "react";
import { Label, TextInput, Button, Dropdown } from "keep-react";
import { useTeacherStore } from "../../hooks";

//TODO: Organizar lo de los ids duplicados en este componente ya que al agregar las notas aparece ese warning.
//Por otro lado, las notas no se están renderizando al momento de ser agregadas en la tabla, debe actualizarse manualmente la página para verlas.

export const AddGradesComponent = ({ courseId, studentId }) => {
  const { students, assesments, startSavingGrade } = useTeacherStore();

  const [formValue, setFormValue] = useState({
    grade: "",
    assessmentId: "",
    student: studentId || "",
  });

  // Handler para cambios en el select de evaluación
  const onAssessmentChange = (event) => {
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      assessmentId: event.target.value,
    }));
  };

  // Handler para cambios en el input de nota
  const onGradeChange = ({ target }) => {
    const { name, value } = target;

    // Validar que el valor sea un número
    if (!isNaN(value) && value.trim() !== "") {
      setFormValue((prevFormValue) => ({
        ...prevFormValue,
        grade: Number(value),
      }));
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const gradeToSave = {
        value: formValue.grade,
        student: studentId,
        assessmentId: formValue.assessmentId,
      };

      await startSavingGrade(gradeToSave);

      // Resetear el formulario después de guardar la nota
      setFormValue({
        grade: "",
        assessmentId: "",
        student: studentId || "",
      });

      // Mostrar mensaje de éxito o hacer cualquier otra acción
    } catch (error) {
      console.error("Error saving grades", error.message);
      // Manejar el error (e.g., mostrar mensaje de error)
    }
  };

  // Filtrar evaluaciones que coincidan con el curso actual
  const filterAssesments = assesments.filter(
    (assesment) => assesment.course._id === courseId
  );

  const student = students.find((student) => student._id === studentId);

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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="assessment-select"
          >
            Select Assessment
          </label>
          <select
            id="assessment-select"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formValue.assessmentId}
            onChange={onAssessmentChange}
          >
            <option value="">Select an assessment</option>
            {filterAssesments.map((assessment) => (
              <option key={assessment._id} value={assessment._id}>
                {assessment.name} ({assessment.weighted}%)
              </option>
            ))}
          </select>
        </div>

        {formValue.assessmentId && (
          <div className="mb-8 ml-8 mr-8 lg:mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={`grade-input`}
            >
              Grade
            </label>
            <input
              type="number"
              id="grade-input"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="grade"
              value={formValue.grade}
              onChange={onGradeChange}
            />
          </div>
        )}

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
