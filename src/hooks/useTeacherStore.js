import { useDispatch, useSelector } from 'react-redux';
import {
    onAddNewAssesment, onAddNewCourse, onAddNewGrade, onAddNewStudent, onAddNewSubject,
    onUpdateAssesment, onUpdateCourse, onUpdateGrade, onUpdateStudent, onUpdateSubject,
    onDeleteAssesment, onDeleteCourse, onDeleteGrade, onDeleteStudent, onDeleteSubject,
    onLoadAssesment, onLoadCourses, onLoadGrades, onLoadStudents, onLoadSubjects
} from '../store'
import { educationSoftApi } from '../api'

import Swal from 'sweetalert2';

export const useTeacherStore = () => {

    const { subjects, courses, students, assesments, grades } = useSelector(state => state.teacher);
    const { user } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const startSavingSubject = async (subject) => {

        try {
            if (subject.id) {
                await educationSoftApi.put(`/subject/${subject.id}`, subject);
                dispatch(onUpdateSubject({ ...subject, user }));
                return;
            }
            const { data } = await educationSoftApi.post('/subject', subject);
            dispatch(onAddNewSubject({ ...data, id: data.subject.id, user }));
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar la materia', error.message, 'error');

        }
    }

    const startDeletingSubject = async (subject) => {
        try {
            await educationSoftApi.delete(`/subject/${subject.id}`);
            dispatch(onDeleteSubject(subject.id));
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar la materia', error.message, 'error');
        }

        dispatch(onDeleteSubject(subject.id));
    }

    const startLoadingSubjects = async () => {
        try {
            const { data } = await educationSoftApi.get('/subject');
            dispatch(onLoadSubjects(data));
        } catch (error) {
            console.log("Error al cargar los subjects");
            //Swal.fire('Error al cargar las materias', error.message, 'error');
        }
    }

    const startSavingCourse = async (course) => {
        try {
            if (course.id) {
                await educationSoftApi.put(`/course/${course.id}`, course);
                dispatch(onUpdateCourse({ ...course }));
                return;
            }
            const { data } = await educationSoftApi.post('/course', course);
            dispatch(onAddNewCourse({ ...course, id: data.course.id }));
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar el curso', error.message, 'error');
        }
    }

    const startDeletingCourse = async (course) => {
        try {
            await educationSoftApi.delete(`/course/${course.id}`);
            dispatch(onDeleteCourse(course.id));
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar el curso', error.message, 'error');
        }

        dispatch(onDeleteCourse(course.id));
    }

    const startLoadingCourses = async () => {
        try {
            const { data } = await educationSoftApi.get('/course');
            dispatch(onLoadCourses(data.courses));
        } catch (error) {
            console.log("Error al cargar los courses: ", error);
            //Swal.fire('Error al cargar los cursos', error.message, 'error');
        }

    }

    const startSavingStudent = async (student) => {
        try {
            if (student.id) {
                await educationSoftApi.put(`/student/${student.id}`, student);
                dispatch(onUpdateStudent({ ...student }));
                return;
            }
            const { data } = await educationSoftApi.post('/student', student);
            dispatch(onAddNewStudent({ ...student, id: data.student.id }));
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar el estudiante', error.message, 'error');
        }

    }

    const startDeletingStudent = async (student) => {
        try {
            await educationSoftApi.delete(`/student/${student.id}`);
            dispatch(onDeleteStudent(student.id));
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar el estudiante', error.message, 'error');
        }

    }

    const startLoadingStudents = async () => {
        try {
            const { data } = await educationSoftApi.get('/student');
            dispatch(onLoadStudents(data.students));
        } catch (error) {
            console.log("Error al cargar los students");
            //Swal.fire('Error al cargar los estudiantes', error.message, 'error');
        }
    }
    
    const startLoadingStudentsByCourse = async (courseId) =>{
        try {
            const { data } = await educationSoftApi.get(`/course/${courseId}/students`);
            dispatch(onLoadStudents(data.students));
        } catch (error) {
            console.log("Error al cargar los students");
            //Swal.fire('Error al cargar los estudiantes', error.message, 'error');
        }
    }

    const startSavingAssesment = async (assesment) => {
        try {
            if (assesment.id) {
                await educationSoftApi.put(`/assesment/${assesment.id}`, assesment);
                dispatch(onUpdateAssesment({ ...assesment, user }));
                return;
            }
            const { data } = await educationSoftApi.post('/assesment', assesment);
            dispatch(onAddNewAssesment({ ...assesment, id: data.assesment.id, user }));
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar la evaluación', error.message, 'error');
        }
    }

    const startDeletingAssesment = async (assesment) => {
        try {
            await educationSoftApi.delete(`/assesment/${assesment.id}`);
            dispatch(onDeleteAssesment(assesment.id));
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar la evaluación', error.message, 'error');
        }
    }

    const startLoadingAssesments = async () => {
        try {
            const { data } = await educationSoftApi.get('/assesment');
            dispatch(onLoadAssesment(data.assesments));
        } catch (error) {
            console.log("Error al cargar los assesments");
            //Swal.fire('Error al cargar las evaluaciones', error.message, 'error');
        }
    }

    const startSavingGrade = async (grade) => {
        try {
            if (grade.id) {
                await educationSoftApi.put(`/grade/${grade.id}`, grade);
                dispatch(onUpdateGrade({ ...grade, user }));
                return;
            }
            const { data } = await educationSoftApi.post('/grade', grade);
            dispatch(onAddNewGrade({ ...grade, id: data.grade.id, user }));
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar la calificación', error.message, 'error');
        }
    }

    const startDeletingGrade = async (grade) => {
        try {
            await educationSoftApi.delete(`/grade/${grade.id}`);
            dispatch(onDeleteGrade(grade.id));
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar la calificación', error.message, 'error');
        }
    }

    const startLoadingGrade = async () => {
        try {
            const { data } = await educationSoftApi.get('/grade');
            dispatch(onLoadGrades(data.grades));
        } catch (error) {
            console.log("Error al cargar los grades");
            //Swal.fire('Error al cargar las calificaciones', error.message, 'error');
        }
    }

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
        startLoadingGrade,
        startLoadingStudents,
        startLoadingStudentsByCourse,
        startLoadingSubjects,
        startSavingAssesment,
        startSavingCourse,
        startSavingGrade,
        startSavingStudent,
        startSavingSubject,
    }

}