/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import { useEffect, useState } from "react";
import { Card } from "keep-react";
import { PencilCircle } from "phosphor-react";
import { ModalComponent } from '../index'
import { useTeacherStore, useAuthStore } from '../../hooks'


export const CardComponent = () => {

  const {user} = useAuthStore();

  const { courses, startLoadingCourses } = useTeacherStore();
  const [shouldReloadCourses, setShouldReloadCourses] = useState(false);

  useEffect(() => {
    startLoadingCourses();
  }, []);

  useEffect(() => {
    if (shouldReloadCourses) {
      startLoadingCourses();
      setShouldReloadCourses(false);
    }
  }, [shouldReloadCourses]);

  const handleCourseDeleted = () => {
    setShouldReloadCourses(true);
  };

  const teacherCourses = courses.filter(course => user.uid === course.teacher._id || user.uid === course.teacher.uid);

  return (
    <>
      {teacherCourses.map((course) => (
        <div key={course._id}>
          <Card className="p-5 bg-gray-100  m-5 shadow-lg md: w-80">
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
              <ModalComponent courseId={course._id} onCourseDeleted={handleCourseDeleted} />
            </Card.Container>
          </Card>
        </div>
      ))}
    </>
  );
};
