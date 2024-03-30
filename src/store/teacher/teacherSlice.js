import { createSlice } from '@reduxjs/toolkit'


export const teacherSlice = createSlice({
    name: 'teacher',
    initialState: {
        subjects: [],
        students: [],
        courses: [],
        grades: [],
        assesments: []

    },
    reducers: {
        onAddNewSubject: (state, { payload }) => {
            state.subjects.push(payload)
        },
        onUpdateSubject: (state, { payload }) => {
            state.subjects = state.subjects.map(
                subject => subject.id === payload.id ? payload : subject
            )
        },
        onDeleteSubject: (state, { payload }) => {
            state.subjects = state.subjects.filter(subject => subject.id !== payload);
        },
        onLoadSubjects: (state, { payload = [] }) => {
            payload.forEach(subject => {
                const exist = state.subjects.some(dbSubject => dbSubject.id === subject.id);
                if (!exist) {
                    state.subjects.push(subject);
                }
            });
        },
        onAddNewStudent: (state, { payload }) => {
            state.students.push(payload)
        },
        onUpdateStudent: (state, { payload }) => {
            state.students = state.students.map(
                student => student.id === payload.id ? payload : student
            )
        },
        onDeleteStudent: (state, { payload }) => {
            state.students = state.students.filter(student => student.id !== payload);
        },
        onLoadStudents: (state, { payload = [] }) => {
            state.students = payload;
        },

        onAddNewCourse: (state, { payload }) => {
            state.courses.push(payload)
        },
        onUpdateCourse: (state, { payload }) => {
            state.courses = state.courses.map(
                course => course.id === payload.id ? payload : course
            )
        },
        onDeleteCourse: (state, { payload }) => {
            state.courses = state.courses.filter(course => course.id !== payload);
        },
        onLoadCourses: (state, { payload = [] }) => {
            state.courses = payload;
        },
        onAddNewGrade: (state, { payload }) => {
            state.grades.push(payload)
        },
        onUpdateGrade: (state, { payload }) => {
            state.grades = state.grades.map(
                grade => grade.id === payload.id ? payload : grade
            )
        },
        onDeleteGrade: (state, { payload }) => {
            state.grades = state.grades.filter(grade => grade.id !== payload);
        },
        onLoadGrades: (state, { payload = [] }) => {
            payload.forEach(grade => {
                const exist = state.grades.some(dbGrade => dbGrade.id === grade.id);
                if (!exist) {
                    state.grades.push(grade);
                }
            });
        },
        onAddNewAssesment: (state, { payload }) => {
            state.assesments.push(payload)
        },
        onUpdateAssesment: (state, { payload }) => {
            state.assesments = state.assesments.map(
                assesment => assesment.id === payload.id ? payload : assesment
            )
        },
        onDeleteAssesment: (state, { payload }) => {
            state.assesments = state.assesments.filter(assesment => assesment.id !== payload);
        },
        onLoadAssesment: (state, { payload = [] }) => {
            state.assesments = payload;
        },
    }
})

export const {
    onAddNewSubject,
    onUpdateSubject,
    onDeleteSubject,
    onLoadSubjects,
    onAddNewStudent,
    onUpdateStudent,
    onDeleteStudent,
    onLoadStudents,
    onAddNewCourse,
    onUpdateCourse,
    onDeleteCourse,
    onLoadCourses,
    onAddNewGrade,
    onUpdateGrade,
    onDeleteGrade,
    onLoadGrades,
    onAddNewAssesment,
    onUpdateAssesment,
    onDeleteAssesment,
    onLoadAssesment,
} = teacherSlice.actions