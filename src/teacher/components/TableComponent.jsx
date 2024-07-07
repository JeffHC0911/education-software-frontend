/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import { useEffect, useState } from "react";
import { Badge, Button, Popover, Table } from "keep-react";
import {
  ArrowDown,
  Check,
  Cube,
  DotsThreeOutline,
  Pencil,
  Trash,
} from "phosphor-react";
import { useTeacherStore } from "../../hooks";
import { AddGradesComponent } from "../index";

export const TableComponent = ({ courseId }) => {
  const {
    students,
    grades,
    assesments,
    courses,
    startLoadingAssesments,
    startLoadingCourses,
    startLoadingGrade,
    startLoadingStudents,
  } = useTeacherStore();

  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    startLoadingAssesments();
    startLoadingCourses();
    startLoadingStudents();
    startLoadingGrade();
  }, []);

  // Filtrar cursos por el ID del curso proporcionado
  const course = courses.find((course) => course._id === courseId);
  const courseAssessments = assesments.filter(
    (assessment) => assessment.course._id === courseId
  );

  const combinedData = {
    students: course
      ? course.students.map((student) => ({
          id: student._id.toString(),
          name: student.name,
          lastname: student.lastname,
          status: student.status,
        }))
      : [],
    assessments: courseAssessments.map((assessment) => ({
      _id: assessment._id.toString(),
      name: assessment.name,
      weighted: assessment.weighted,
      grades: assessment.grades.map((grade) => ({
        _id: grade._id,
        value: grade.value,
        student: grade.student._id
      })),
    })),
  };
  
  //console.log("Combined Data:", combinedData);


  const calculateFinalGrade = (student, courseData) => {
    let finalGrade = 0;
    let totalWeighted = 0;
    let hasGrades = false;

    courseData.assessments.forEach((assessment) => {
      const studentGrade = assessment.grades.find(
        (grade) => grade.student === student.id
      );

      if (studentGrade) {
        finalGrade += studentGrade.value * assessment.weighted;
        totalWeighted += assessment.weighted;
        hasGrades = true;
      }
    });

    if (!hasGrades) {
      return "Sin notas";
    }

    if (totalWeighted === 0) {
      return NaN;
    }

    return finalGrade / totalWeighted;
  };

  const handleAddGrades = (studentId) => {
    setSelectedStudentId(studentId);
  };

  return (
    <div>
      <Table
        showCheckbox={true}
        showBorder={true}
        showBorderPosition="right"
        striped={true}
        hoverable={true}
      >
        <Table.Caption>
          <div className="my-5 flex items-center justify-between px-6">
            <div className="flex items-center gap-5">
              <p className="text-body-1 font-semibold text-metal-600">
                Team member
              </p>
              <Badge size="xs" colorType="light" color="gray">
                100 Member
              </Badge>
            </div>
            <div className="flex items-center gap-5">
              <Button type="outlineGray" size="sm">
                <span className="pr-2">
                  <Cube size={24} />
                </span>
                New member
              </Button>
              <Button type="outlineGray" size="sm">
                <span className="pr-2">
                  <Cube size={24} />
                </span>
                Search
              </Button>
            </div>
          </div>
        </Table.Caption>
        <Table.Head>
          <Table.HeadCell className="min-w-[290px]">
            <p className="text-body-6 font-medium text-metal-400">Name</p>
          </Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          {combinedData.assessments.map((assessment) => (
            <Table.HeadCell className="min-w-[152px]" key={assessment._id}>
              {assessment.name} - {assessment.weighted} %
            </Table.HeadCell>
          ))}
          <Table.HeadCell>Definitive Grade</Table.HeadCell>
          <Table.HeadCell className="min-w-[100px]" />
        </Table.Head>
        <Table.Body className="divide-gray-25 divide-y">
          {combinedData.students.map((student) => (
            <Table.Row key={student.id} className="bg-white">
              <Table.Cell>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div>
                        <p className="-mb-0.5 text-body-4 font-medium text-metal-600">
                          {student.name}
                        </p>
                        <span>{student.lastname}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>
                <Badge
                  colorType="light"
                  color={student.status === "Active" ? "success" : "warning"}
                  dot={true}
                >
                  {student.status}
                </Badge>
              </Table.Cell>
              {combinedData.assessments.map((assessment) => {
                const studentGrade = assessment.grades.find(
                  (grade) => grade.student === student.id
                );
                return (
                  <Table.Cell key={assessment._id}>
                    {studentGrade ? studentGrade.value : "N/A"}
                  </Table.Cell>
                );
              })}
              <Table.Cell>
                <div className="flex items-center gap-3">
                  <div></div>
                  <div className="flex items-center gap-1">
                    <span>
                      {calculateFinalGrade(student, combinedData) < 3 ? (
                        <ArrowDown size={20} color="#FF0000" />
                      ) : (
                        <Check size={20} color="#008000" />
                      )}
                    </span>
                    <span>{calculateFinalGrade(student, combinedData)}</span>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>
                <Popover
                  showDismissIcon={false}
                  showArrow={false}
                  className="w-48 border border-metal-100 p-2"
                >
                  <Popover.Container className="!mt-0 !block">
                    <ul>
                      <li className="rounded px-2 py-1 hover:bg-metal-100">
                        <button className="flex w-full items-center justify-between text-body-4 font-normal text-metal-600">
                          <span>Delete</span>
                          <span>
                            <Trash />
                          </span>
                        </button>
                      </li>
                      <li className="rounded px-2 py-1 hover:bg-metal-100">
                        <button className="flex w-full items-center justify-between text-body-4 font-normal text-metal-600">
                          <span>Edit</span>
                          <span>
                            <Pencil />
                          </span>
                        </button>
                      </li>
                      <li className="rounded px-2 py-1 hover:bg-metal-100">
                        <button
                          className="flex w-full items-center justify-between text-body-4 font-normal text-metal-600"
                          onClick={() => handleAddGrades(student.id)}
                        >
                          <span>Add Grades</span>
                          <span>
                            <Pencil />
                          </span>
                        </button>
                      </li>
                    </ul>
                  </Popover.Container>
                  <Popover.Action>
                    <Button type="outlineGray" size="xs" circle={true}>
                      <DotsThreeOutline
                        size={14}
                        color="#5E718D"
                        weight="bold"
                      />
                    </Button>
                  </Popover.Action>
                </Popover>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {selectedStudentId && (
        <AddGradesComponent studentId={selectedStudentId} courseId={courseId} />
      )}
    </div>
  );
};
