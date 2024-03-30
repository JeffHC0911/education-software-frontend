/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import { useEffect } from "react";
import { Card } from "keep-react";
import { PencilCircle } from "phosphor-react";
import { ModalComponent } from '../index'
import { useTeacherStore, useAuthStore } from '../../hooks'


export const CardComponent = () => {

  const {user} = useAuthStore();

  const { courses, startLoadingCourses } = useTeacherStore();

  useEffect(() => {
    startLoadingCourses();
  }, []);

  const teacherCourses = courses.filter(course => user.uid === course.teacher._id || user.uid === course.teacher.uid);

  return (
    <>
      {teacherCourses.map((course) => (
        <div key={course._id}>
          <Card className="p-5  m-5 shadow-lg md: w-80">
            <Card.Container className="flex items-center justify-center">
              <PencilCircle size={100} color="#1F184E" />
            </Card.Container>
            <Card.Container className="text-center">
              <Card.Title className=" text-4xl">{course.name}</Card.Title>
              <Card.Description className="text-2xl">
                {course.schedule}
              </Card.Description>
            </Card.Container>
            <Card.Container className="mt-3 flex items-center justify-center">
              <ModalComponent courseId={course._id} />
            </Card.Container>
          </Card>
        </div>
      ))}
    </>
  );
};
