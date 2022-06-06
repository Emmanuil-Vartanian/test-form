import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";

import { createDataForTable } from "../Table/store/actions";
import Button from "components/Button";
import Form from "components/Form";
import { getTableData } from "../Table/store/reducers/selectors";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    background: "#ffffff",
    boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.24)",
    border: "none",
    width: "365px",
    height: "321px",
    padding: "30px 30px 20px 25px",
  },
};

const formData = [
  {
    title: "Invoice Address",
    fields: [
      {
        label: "Company *",
        name: "company",
        field: "input",
        type: "text",
        required: "This is required field",
      },
      {
        label: "Name *",
        name: "name",
        field: "input",
        type: "text",
        required: "This is required field",
      },
      {
        label: "Additional",
        name: "additional",
        field: "input",
        type: "text",
        required: false,
      },
      {
        label: "Street",
        name: "street",
        field: "input",
        type: "text",
        required: false,
      },
      {
        label: "Postal Code",
        name: "postalCode",
        field: "input",
        type: "number",
        required: false,
      },
      {
        label: "Country",
        name: "country",
        field: "select",
        type: "none",
        required: false,
      },
    ],
  },
  {
    title: "Bank Data",
    fields: [
      {
        label: "IBAN *",
        name: "iban",
        field: "input",
        type: "text",
        required: "This is required field",
      },
      {
        label: "BIC *",
        name: "bic",
        field: "input",
        type: "text",
        required: "This is required field",
      },
      {
        label: "Bank name *",
        name: "bankName",
        field: "input",
        type: "text",
        required: "This is required field",
      },
    ],
  },
  {
    title: "Contact",
    fields: [
      {
        label: "Fax",
        name: "fax",
        field: "input",
        type: "text",
        required: false,
      },
      {
        label: "E-mail",
        name: "email",
        field: "input",
        type: "text",
        required: false,
      },
      {
        label: "Birthday",
        name: "birthday",
        field: "input",
        type: "date",
        required: false,
      },
      {
        label: "Homepage",
        name: "homepage",
        field: "input",
        type: "text",
        required: false,
      },
    ],
  },
];

Modal.setAppElement("#root");

const PopUp: React.FC = () => {
  const dispath = useDispatch();
  const tableData = useSelector(getTableData);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [formIndex, setFormIndex] = useState(0);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setFormIndex(0);
  };

  const handleNextFormIndex = () => {
    if (formIndex !== formData.length - 1) {
      setFormIndex((prev) => prev + 1);
    }
  };

  const handlePreviousFormIndex = () => {
    setFormIndex((prev) => prev - 1);
  };

  const onSubmit = (data) => {
    if (formIndex !== formData.length - 1) {
      handleNextFormIndex();
    } else {
      const lastTableData = tableData[tableData.length - 1];
      data.id = lastTableData?.id + 1 || 1;
      dispath(createDataForTable(data));
      closeModal();
    }
  };

  return (
    <div>
      <Button
        title="Add"
        onClick={openModal}
        variant="contained"
        className="btnOpenModal"
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Form-Modal"
      >
        <Form
          title={formData[formIndex].title}
          fields={formData[formIndex].fields}
          formData={formData}
          formIndex={formIndex}
          previousFormIndex={handlePreviousFormIndex}
          closeModal={closeModal}
          onSubmit={onSubmit}
        />
      </Modal>
    </div>
  );
};

export default PopUp;
