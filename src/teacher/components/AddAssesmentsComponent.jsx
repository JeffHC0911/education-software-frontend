import { useState } from "react";

import { Label, TextInput, Button } from "keep-react";

import { useTeacherStore } from "../../hooks";

export const AddAssesmentsComponent = ({ courseId, onAssessmentAdded }) => {
  const { startSavingAssesment } = useTeacherStore();

  const [formValue, setFormValue] = useState({
    name: "",
    weighted: 0,
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
      const newAssessment = {
        ...formValue,
        course: courseId,
      };

      await startSavingAssesment(newAssessment);
      if (onAssessmentAdded) {
        onAssessmentAdded();
      }
      setFormValue({
        name: "",
        weighted: 0,
      });
    } catch (error) {
      console.error("Error saving assesment", error.message);
    }
  };

  return (
    <div>
      <h2 className="text-center text-3xl mb-8">Add Assessment</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Assessment Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formValue.name}
            onChange={onInputChanged}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="weighted"
          >
            Weighted (%)
          </label>
          <input
            type="number"
            id="weighted"
            name="weighted"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formValue.weighted}
            onChange={onInputChanged}
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btnSubmit px-4 py-2 text-xl font-medium text-white bg-palette-950 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
