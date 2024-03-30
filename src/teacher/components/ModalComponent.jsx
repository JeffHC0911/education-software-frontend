/* eslint-disable react/prop-types */
// ModalComponent.js
"use client";
import { useState } from "react";
import { Button, Modal } from "keep-react";
import { CloudArrowUp } from "phosphor-react";
import { useTeacherStore } from '../../hooks';
import { TableComponent } from '../index';

export const ModalComponent = ({ courseId }) => {
  const [showModal, setShowModal] = useState(false);
  const { startLoadingStudentsByCourse } = useTeacherStore();

  const handleOpenModal = () => {
    setShowModal(true);
    startLoadingStudentsByCourse(courseId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button type='primary' className="bg-palette-950 hover:bg-palette-400" onClick={handleOpenModal}>View Course</Button>
      <Modal
        icon={<CloudArrowUp size={28} color="#1B4DFF" />}
        size={['md', '5xl']}
        show={showModal}
        position="top-center"
      >
        <Modal.Header>Manage grades</Modal.Header>
        <Modal.Body>
          <div className="overflow-auto max-h-[400px]">
            {/* Pasamos el courseId al TableComponent */}
            <TableComponent courseId={courseId} />
          </div>
        </Modal.Body>
        <Modal.Footer>
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
