import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import "./style.css";

import CloseSvg from "assets/svg/CloseSvg";
import Button from "components/Button";
import { countries } from "assets/countries/countries";

interface FormProps {
  title: string;
  fields: Record<string, any>[];
  previousFormIndex: () => void;
  formIndex: number;
  closeModal: () => void;
  formData: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
}

const Form: React.FC<FormProps> = ({
  title,
  fields,
  previousFormIndex,
  formIndex,
  closeModal,
  formData,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  return (
    <div className="formContainer">
      <h1 className="formTitle">{title}</h1>
      <div className="closeModal" onClick={closeModal}>
        <CloseSvg />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formBlock">
          <div>
            {fields.map(({ label, name, field, type, required }, index) => (
              <div key={name + index}>
                <div className="formFields">
                  <span className="formLabel">{label}</span>
                  {field === "input" && (
                    <input
                      type={type}
                      {...register(name, {
                        required,
                        validate: (value) => {
                          if (name === "email" && value) {
                            const re = /\S+@\S+\.\S+/;
                            return re.test(value);
                          }
                        },
                      })}
                      onFocus={() => {
                        if (Object.keys(errors).includes("email")) {
                          setError("email", {
                            type: "validate",
                            message: "Wrong format",
                          });
                        }
                      }}
                    />
                  )}

                  {field === "select" && (
                    <select {...register(name)}>
                      <option></option>
                      {countries.map((country, index) => (
                        <option key={country.name + index}>{country.name}</option>
                      ))}
                    </select>
                  )}
                </div>
                <ErrorMessage
                  errors={errors}
                  name={name}
                  render={({ message }) => (
                    <p className="errorMessage">{message}</p>
                  )}
                />
              </div>
            ))}
          </div>

          <div className="btnsForm">
            <Button
              title="Cancel"
              variant="outlined"
              onClick={closeModal}
              type={"button"}
            />
            {formIndex !== 0 && (
              <Button
                title="Previous"
                variant="outlined"
                onClick={previousFormIndex}
                className="btnPrevious"
                type={"button"}
              />
            )}
            <Button
              title={formIndex !== formData.length - 1 ? "Next" : "Save"}
              variant="contained"
              type={"submit"}
              // onClick={() => {
              //   if (Object.keys(errors).includes("email")) {
              //     setError("email", {
              //       type: "custom",
              //       message: "Wrong format",
              //     });
              //   }
              // }}
              className="btnNext"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
