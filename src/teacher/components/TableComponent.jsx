/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

//TODO: Ajustar la recarga de la notas, estudiante y evaluaciones

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
import * as XLSX from "xlsx";
import { useTranslation } from "react-i18next";

export const TableComponent = ({ courseId }) => {
  const { t } = useTranslation();

  const {
    students,
    grades,
    assesments,
    courses,
    startLoadingAssesments,
    startLoadingGrade,
    startLoadingStudents,
    startDeletingStudent,
    startDeletingAssesment,
    startDeletingGrade,
  } = useTeacherStore();

  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const [shouldReloadGrades, setShouldReloadGrades] = useState(false);

  useEffect(() => {
    startLoadingAssesments();
    startLoadingStudents();
    startLoadingGrade();
  }, []);

  // useEffect condicional para recargar notas
  useEffect(() => {
    if (shouldReloadGrades) {
      startLoadingGrade();
      setShouldReloadGrades(false);
    }
  }, [shouldReloadGrades]);

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
        student: grade.student ? grade.student._id.toString() : null,
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
        const weight = assessment.weighted / 100; // Convertir porcentaje a fracción
        finalGrade += studentGrade.value * weight;
        totalWeighted += weight;
        hasGrades = true;
      }
    });

    if (!hasGrades) {
      return 0;
    }

    if (totalWeighted === 0) {
      return NaN;
    }

    return finalGrade;
  };

  const handleAddGrades = (studentId) => {
    setSelectedStudentId(studentId);
    setShouldReloadGrades(true);
  };

  const handleDeleteStudent = (studentId) => {
    startDeletingStudent({ id: studentId });
  };

  const handleDeleteAssesment = (assesmentId) => {
    startDeletingAssesment({ id: assesmentId });
  };

  const handleDeleteGrade = (gradeId) => {
    startDeletingGrade({ id: gradeId });
    setShouldReloadGrades(true);
  }

  const exportToExcel = (combinedData) => {
    const data = combinedData.students.map((student) => {
      const rowData = {
        Name: `${student.name} ${student.lastname}`,
        Status: student.status,
      };
      combinedData.assessments.forEach((assessment) => {
        const studentGrade = assessment.grades.find(
          (grade) => grade.student === student.id
        );
        rowData[`${assessment.name} (${assessment.weighted}%)`] = studentGrade
          ? studentGrade.value
          : "N/A";
      });
      rowData["Definitive Grade"] = Number.isNaN(
        calculateFinalGrade(student, combinedData)
      )
        ? "Sin notas"
        : calculateFinalGrade(student, combinedData).toFixed(2);
      return rowData;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Grades");
    XLSX.writeFile(workbook, "grades.xlsx");
  };

  return (
    <div>
      <div className="my-5 flex items-center justify-between px-6">
        <Button
          type="outlineGray"
          size="sm"
          onClick={() => exportToExcel(combinedData)}
        >
          Export to Excel
        </Button>
      </div>

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
              {t('teammember') }
              </p>
              <Badge size="xs" colorType="light" color="gray">
                {combinedData.students.length} Member
                {combinedData.students.length !== 1 && "s"}
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
            <p className="text-body-6 font-medium text-metal-400">{t('name') }</p>
          </Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          {combinedData.assessments.map((assessment, index) => (
            <Table.HeadCell
              className="min-w-[152px] w-7"
              key={`assessment-header-${assessment._id}-${index}`}
            >
              {assessment.name} - {assessment.weighted} %
              <Button className="bg-red-700 ml-2" size={60}>
                <span>
                  <Trash size={24} color="white" />
                </span>
              </Button>
            </Table.HeadCell>
          ))}
          <Table.HeadCell>{t('definitivegrade') }</Table.HeadCell>
          <Table.HeadCell className="min-w-[100px]" />
        </Table.Head>
        <Table.Body className="divide-gray-25 divide-y">
          {combinedData.students.map((student) => (
            <Table.Row key={`student-${student.id}`} className="bg-white">
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
              {combinedData.assessments.map((assessment, index) => {
                const studentGrade = assessment.grades.find(
                  (grade) => grade.student === student.id
                );
                
                return (
                  <Table.Cell
                    className="flex items-center justify-between"
                    key={`assessment-${assessment._id}-${student.id}-${index}`}
                  >
                    {studentGrade ? studentGrade.value : "N/A"}
                    <Button className="bg-red-700" size={60} onClick={() => handleDeleteGrade(studentGrade._id)}>
                      <span>
                        <Trash size={24} color="white" />
                      </span>
                    </Button>
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
                    <span>
                      {Number.isNaN(calculateFinalGrade(student, combinedData))
                        ? "Sin notas"
                        : calculateFinalGrade(student, combinedData).toFixed(2)}
                    </span>
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
                        <button
                          className="flex w-full items-center justify-between text-body-4 font-normal text-metal-600"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
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
                          <span>{t('addgrades') }</span>
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
