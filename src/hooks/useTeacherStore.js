import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewAssesment,
  onAddNewCourse,
  onAddNewGrade,
  onAddNewStudent,
  onAddNewSubject,
  onUpdateAssesment,
  onUpdateCourse,
  onUpdateGrade,
  onUpdateStudent,
  onUpdateSubject,
  onDeleteAssesment,
  onDeleteCourse,
  onDeleteGrade,
  onDeleteStudent,
  onDeleteSubject,
  onLoadAssesment,
  onLoadCourses,
  onLoadGrades,
  onLoadStudents,
  onLoadSubjects,
} from "../store";
import { educationSoftApi } from "../api";

import Swal from "sweetalert2";

export const useTeacherStore = () => {
  const { subjects, courses, students, assesments, grades } = useSelector(
    (state) => state.teacher
  );
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const startSavingSubject = async (subject) => {
    try {
      if (subject.id) {
        await educationSoftApi.put(`/subject/${subject.id}`, subject);
        dispatch(onUpdateSubject({ ...subject, user }));
        return;
      }
      const { data } = await educationSoftApi.post("/subject", subject);
      dispatch(onAddNewSubject({ ...data, id: data.subject.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar la materia", error.message, "error");
    }
  };

  const startDeletingSubject = async (subject) => {
    try {
      await educationSoftApi.delete(`/subject/${subject.id}`);
      dispatch(onDeleteSubject(subject.id));
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar la materia", error.message, "error");
    }

    dispatch(onDeleteSubject(subject.id));
  };

  const startLoadingSubjects = async () => {
    try {
      const { data } = await educationSoftApi.get("/subject");
      dispatch(onLoadSubjects(data));
    } catch (error) {
      console.log("Error al cargar los subjects");
      //Swal.fire('Error al cargar las materias', error.message, 'error');
    }
  };

  const startSavingCourse = async (course) => {
    try {
      if (course._id) {
        await educationSoftApi.put(`/course/${course._id}`, course);
        dispatch(onUpdateCourse({ ...course, user }));
        return;
      }
      const { data } = await educationSoftApi.post("/course", course);
      dispatch(onAddNewCourse({ ...course, id: data.course.id, user }));
      Swal.fire(
        "Curso guardado",
        "El curso se ha guardado correctamente",
        "success"
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar el curso", error.message, "error");
    }
  };

  const startDeletingCourse = async (course) => {
    try {
      await educationSoftApi.delete(`/course/${course.id}`);
      dispatch(onDeleteCourse(course.id));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Course has been deleted",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar el curso", error.message, "error");
    }

    dispatch(onDeleteCourse(course.id));
  };

  const startLoadingCourses = async () => {
    try {
      const { data } = await educationSoftApi.get("/course");
      console.log(data);
      
      if (data && data.courses) {
        dispatch(onLoadCourses(data.courses));
      } else {
        console.log("No hay cursos");
      }
    } catch (error) {
      console.log("Error al cargar los courses: ", error);
      //Swal.fire('Error al cargar los cursos', error.message, 'error');
    }
  };

  const startLoadingCoursesById = async (courseId) => {
    try {
      const { data } = await educationSoftApi.get(`/course/${courseId}`);
      dispatch(onLoadCourses(data.courses));
      return data;
    } catch (error) {
      console.log("Error al cargar los courses: ", error);
      //Swal.fire('Error al cargar los cursos', error.message, 'error');
    }
  };

  const startSavingStudent = async (student) => {
    try {
      if (student.id) {
        await educationSoftApi.put(`/student/${student.id}`, student);
        dispatch(onUpdateStudent({ ...student }));
        return;
      }
      const { data } = await educationSoftApi.post("/student", student);
      dispatch(onAddNewStudent({ ...student, id: data.student.id }));
      Swal.fire(
        "Estudiante guardado",
        "El estudiante se ha guardado correctamente",
        "success"
      );
      return data.student;
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar el estudiante", error.message, "error");
    }
  };

  const startDeletingStudent = async (student) => {
    try {
      await educationSoftApi.delete(`/student/${student.id}`);
      dispatch(onDeleteStudent(student.id));
      Swal.fire(
        "Estudiante eliminado",
        "El estudiante se ha eliminado correctamente",
        "success"
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar el estudiante", error.message, "error");
    }
  };

  const startLoadingStudents = async () => {
    try {
      const { data } = await educationSoftApi.get("/student");
      if (data && data.students) {
        dispatch(onLoadStudents(data.students));
      } else {
        console.log("No hay estudiantes");
      }
    } catch (error) {
      console.log("Error al cargar los students");
      //Swal.fire('Error al cargar los estudiantes', error.message, 'error');
    }
  };

  const startLoadingStudentsByCourse = async (courseId) => {
    try {
      const { data } = await educationSoftApi.get(
        `/course/${courseId}/students`
      );
      dispatch(onLoadStudents(data.students));
    } catch (error) {
      console.log("Error al cargar los students");
      //Swal.fire('Error al cargar los estudiantes', error.message, 'error');
    }
  };

  const startSavingAssesment = async (assesment) => {
    try {
      if (assesment.id) {
        await educationSoftApi.put(`/assesment/${assesment.id}`, assesment);
        dispatch(onUpdateAssesment({ ...assesment, user }));
        return;
      }
      const { data } = await educationSoftApi.post("/assesment", assesment);
      dispatch(
        onAddNewAssesment({ ...assesment, id: data.assesment.id, user })
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Assessment has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar la evaluación", error.message, "error");
    }
  };

  const startDeletingAssesment = async (assesment) => {
    try {
      await educationSoftApi.delete(`/assesment/${assesment.id}`);
      dispatch(onDeleteAssesment(assesment.id));
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar la evaluación", error.message, "error");
    }
  };

  const startLoadingAssesments = async () => {
    try {
      const { data } = await educationSoftApi.get("/assesment");
      
      if (data && data.assesments) {
        dispatch(onLoadAssesment(data.assesments));
      } else {
        console.log("No hay assesments");
      }
    } catch (error) {
      console.log("Error al cargar los assesments");
      //Swal.fire('Error al cargar las evaluaciones', error.message, 'error');
    }
  };

  const startSavingGrade = async (grade) => {
    try {
      let gradeId;

      if (!grade.value || isNaN(grade.value)) {
        throw new Error("Invalid grade value");
      }

      if (grade.id) {
        await educationSoftApi.put(`/grade/${grade.id}`, grade);
        dispatch(onUpdateGrade({ ...grade, user }));
        gradeId = grade.id;
      } else {
        const { data } = await educationSoftApi.post("/grade", grade);
        dispatch(onAddNewGrade({ ...grade, id: data.grade.id, user }));
        gradeId = data.grade._id;
      }

      // Obtener la assesment actualizada y agregar el nuevo grade
      const { data: assesmentData } = await educationSoftApi.get(
        `/assesment/${grade.assessmentId}`
      );
      const updatedAssesment = assesmentData.assesment;
      if (!updatedAssesment.grades.includes(gradeId)) {
        updatedAssesment.grades.push(gradeId);
        await educationSoftApi.put(
          `/assesment/${updatedAssesment._id}`,
          updatedAssesment
        );
        dispatch(onUpdateAssesment({ ...updatedAssesment, user }));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Grade added correct",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      await startLoadingGrade();
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar la calificación", error.message, "error");
    }
  };

  const startDeletingGrade = async (grade) => {
    try {
      await educationSoftApi.delete(`/grade/${grade.id}`);
      dispatch(onDeleteGrade(grade.id));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Grade eliminated correct",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar la calificación", error.message, "error");
    }
  };

  const startLoadingGrade = async () => {
    try {
      const { data } = await educationSoftApi.get("/grade");
      if(data && data.grades){
        dispatch(onLoadGrades(data.grades));
      }else{
        console.log("No hay calificaciones");
      }
    } catch (error) {
      console.log("Error al cargar los grades");
      //Swal.fire('Error al cargar las calificaciones', error.message, 'error');
    }
  };

  return {
    //propiedades
    courses,
    students,
    subjects,
    assesments,
    grades,

    //metodos
    startDeletingAssesment,
    startDeletingCourse,
    startDeletingGrade,
    startDeletingStudent,
    startDeletingSubject,
    startLoadingAssesments,
    startLoadingCourses,
    startLoadingCoursesById,
    startLoadingGrade,
    startLoadingStudents,
    startLoadingStudentsByCourse,
    startLoadingSubjects,
    startSavingAssesment,
    startSavingCourse,
    startSavingGrade,
    startSavingStudent,
    startSavingSubject,
  };
};
