import { createAction } from "@reduxjs/toolkit";

import { TableDataActionTypes } from "../types";

const createDataForTable = createAction<Record<string, any>>(
  TableDataActionTypes.CREATE_DATA_FOR_TABLE
);

const deleteRow = createAction<number>(TableDataActionTypes.DELETE_ROW);

export { createDataForTable, deleteRow };
