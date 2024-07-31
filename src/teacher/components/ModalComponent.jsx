/* eslint-disable react/prop-types */
// ModalComponent.js
"use client";
import { useState } from "react";
import { Button, Modal } from "keep-react";
import { CloudArrowUp, Trash } from "phosphor-react";
import { useTeacherStore } from "../../hooks";
import {
  TableComponent,
  RegisterStudentComponent,
  AddGradesComponent,
  AddAssesmentsComponent,
} from "../index";

export const ModalComponent = ({ courseId }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("table");
  const { startLoadingStudentsByCourse, startLoadingAssesments, startDeletingCourse } =
    useTeacherStore();

  const handleOpenModal = () => {
    setShowModal(true);
    startLoadingStudentsByCourse(courseId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSwitchContent = (content) => {
    setModalContent(content);
  };

  const handleAssesmentAdded = () => {
    startLoadingAssesments();
  };

  const renderContent = () => {
    if (modalContent === "register") {
      return <RegisterStudentComponent courseId={courseId} />;
    } else if (modalContent === "add-assesment") {
      return (
        <AddAssesmentsComponent
          courseId={courseId}
          onAssessmentAdded={handleAssesmentAdded}
        />
      );
    } else {
      return <TableComponent courseId={courseId} />;
    }
  };

  const renderFooterButton = () => {
    if (modalContent === "table") {
      return (
        <>
          <Button
            type="outlineGray"
            onClick={() => handleSwitchContent("register")}
          >
            Add Student
          </Button>
          <Button
            type="outlineGray"
            onClick={() => handleSwitchContent("add-assesment")}
          >
            Add Assesments
          </Button>
        </>
      );
    } else {
      return (
        <Button type="outlineGray" onClick={() => handleSwitchContent("table")}>
          Back to Table
        </Button>
      );
    }
  };

  const onDeleteCourse = () => {
    startDeletingCourse({id: courseId});
    handleCloseModal();
  }

  return (
    <>
      <Button
        type="primary"
        className="bg-palette-950 hover:bg-palette-400 mr-1"
        onClick={handleOpenModal}
      >
        View Course
      </Button>
      <Button
        type="primary"
        className="bg-red-500 hover:bg-palette-400 ml-1"
        onClick={onDeleteCourse}
      >
        <span>
          <Trash size={24} color="white" />
        </span>
      </Button>
      <Modal
        icon={<CloudArrowUp size={28} color="#1B4DFF" />}
        size={["md", "5xl"]}
        show={showModal}
        position="top-center"
      >
        <Modal.Header>Manage grades</Modal.Header>
        <Modal.Body>
          <div className="overflow-auto max-h-[400px]">{renderContent()}</div>
        </Modal.Body>
        <Modal.Footer>
          {/* Añade un botón para cambiar entre los contenidos */}
          {renderFooterButton()}
          <Button type="outlineGray" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleCloseModal}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
