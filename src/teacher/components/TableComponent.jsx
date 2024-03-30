/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

'use client'
//import Image from 'next/image'
import { useEffect } from 'react'
import { Avatar, Badge, Button, Popover, Table } from 'keep-react'
import { ArrowDown, Check, Cube, DotsThreeOutline, Pencil, Trash } from 'phosphor-react'
import { useTeacherStore } from '../../hooks'

export const TableComponent = ({ courseId }) => {

  const { students, grades, assesments, courses, startLoadingAssesments, startLoadingCourses, startLoadingGrade, startLoadingStudents } = useTeacherStore();

  useEffect(() => {
    startLoadingAssesments();
    startLoadingCourses();
    startLoadingStudents();
    startLoadingGrade();
  }, []);

  const filterAssesments = assesments.filter(assesment => assesment.course._id === courseId);

  /**
   * Filtra las evaluaciones que coinciden con el curso del profesor
   */

  // const assesmentCourses = filterAssesments
  // .map(assesment => ({
  //   _id: assesment._id,
  //   name: assesment.name,
  //   weighted: assesment.weighted,
  //   }))


  const combinedData = courses
    .filter(course => course._id === courseId)
    .map(course => ({
      students: course.students.map(student => ({ id: student._id, name: student.name, lastname: student.lastname })),
      assessments: assesments
        .filter(assessment => course._id === assessment.course._id)
        .map(assessment => ({
          _id: assessment._id,
          name: assessment.name,
          weighted: assessment.weighted,
          grades: assessment.grades
            .filter(grade => grades.some(g => g._id === grade._id))
            .map(grade => ({
              _id: grade._id,
              value: grade.value,
            }))
        }))
    }));

    const calculateFinalGrade = (student, course) => {
      let finalGrade = 0;
      let totalWeighted = 0;
      let hasGrades = false; // Variable para verificar si el estudiante tiene notas en alguna evaluación
    
      course.assessments.forEach((assessment) => {
        const studentGrade = assessment.grades.find(grade => grade.student === student._id);
    
        if (studentGrade) {
          finalGrade += studentGrade.value * assessment.weighted;
          totalWeighted += assessment.weighted;
          hasGrades = true; // El estudiante tiene notas en alguna evaluación
        }
      });
    
      if (!hasGrades) {
        return "Sin notas"; // Retorna un mensaje indicando que el estudiante no tiene notas
      }
    
      if (totalWeighted === 0) {
        return NaN; // Retorna NaN si no hay evaluaciones con calificaciones
      }
    
      return finalGrade / totalWeighted;
    };
    

  return (
    <Table showCheckbox={true} showBorder={true} showBorderPosition="right" striped={true} hoverable={true}>
      <Table.Caption>
        <div className="my-5 flex items-center justify-between px-6">
          <div className="flex items-center gap-5">
            <p className="text-body-1 font-semibold text-metal-600">Team member</p>
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
        {filterAssesments.map(column => (
          <Table.HeadCell className="min-w-[152px]" key={column._id}>{column.name} - {column.weighted} %</Table.HeadCell>
        ))}
        <Table.HeadCell>Definitive Grade</Table.HeadCell>
        <Table.HeadCell className="min-w-[100px]" />
      </Table.Head>
      <Table.Body className="divide-gray-25 divide-y">
        {combinedData.map((course) =>
          course.students.map((student) => (
            <Table.Row key={student.id} className="bg-white">
              <Table.Cell>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Avatar shape="circle" img={`/images/avatar/avatar-${1}.png`} size="md" />
                      <div>
                        <p className="-mb-0.5 text-body-4 font-medium text-metal-600">{student.name}</p>
                        <span>{student.lastname}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>
                <Badge colorType="light" color={student.status === 'Active' ? 'success' : 'warning'} dot={true}>
                  {student.status}
                </Badge>
              </Table.Cell>
              {course.assessments.map((assessment, index) => (
                <Table.Cell key={index}>{assessment.grades[index] && assessment.grades[index].value}</Table.Cell>
              ))}
              <Table.Cell>
                <div className="flex items-center gap-3">
                  <div></div>
                  <div className="flex items-center gap-1">
                    <span>
                      {
                        student.finalGrade < 3 ? <ArrowDown size={20} color="#FF0000" /> : <Check size={20} color="#008000" />
                      }
                    </span>
                    <span>{calculateFinalGrade(student, course)}</span>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>
                <Popover showDismissIcon={false} showArrow={false} className="w-48 border border-metal-100 p-2">
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
                    </ul>
                  </Popover.Container>
                  <Popover.Action>
                    <Button type="outlineGray" size="xs" circle={true}>
                      <DotsThreeOutline size={14} color="#5E718D" weight="bold" />
                    </Button>
                  </Popover.Action>
                </Popover>
              </Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table>
  )
}
