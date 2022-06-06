import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";

import { getTableData } from "./store/reducers/selectors";
import DeleteSvg from "assets/svg/DeleteSvg";
import { deleteRow } from "./store/actions";

const Table: React.FC = () => {
  const dispatch = useDispatch();
  const tableData = useSelector(getTableData);

  const handleDeleteRow = (id) => () => {
    dispatch(deleteRow(id));
  };

  return (
    <div className="tableContainer">
      <table className="table">
        <thead className="tableHeader">
          <tr>
            <th></th>
            <th>Company</th>
            <th>Name</th>
            <th>Additional</th>
            <th>Street</th>
            <th>Postal Code</th>
            <th>Country</th>
            <th>IBAN</th>
            <th>BIC</th>
            <th>Bank name</th>
            <th>Fax</th>
            <th>E-mail</th>
            <th>Birthday</th>
          </tr>
        </thead>

        <tbody className="tableBody">
          {tableData.map(
            ({
              id,
              company,
              name,
              additional,
              street,
              postalCode,
              country,
              iban,
              bic,
              bankName,
              fax,
              email,
              birthday,
            }) => (
              <tr key={id}>
                <td onClick={handleDeleteRow(id)}>
                  <DeleteSvg />
                </td>
                <td>{company}</td>
                <td>{name}</td>
                <td>{additional || "-"}</td>
                <td>{street || "-"}</td>
                <td>{postalCode || "-"}</td>
                <td>{country || "-"}</td>
                <td>{iban}</td>
                <td>{bic}</td>
                <td>{bankName}</td>
                <td>{fax || "-"}</td>
                <td>{email || "-"}</td>
                <td>{birthday || "-"}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
