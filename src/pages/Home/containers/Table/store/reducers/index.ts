import { createReducer } from "@reduxjs/toolkit";

import { createDataForTable, deleteRow } from "../actions";

const tableDataInitialState = {
  data: [],
};

const tableDataReducer = createReducer(tableDataInitialState, (builder) => {
  builder.addCase(createDataForTable, (state, { payload }) => {
    return {
      data: [...state.data, payload],
    };
  });
  builder.addCase(deleteRow, (state, { payload }) => {
    const updatedData = state.data.filter((item) => item.id !== payload);
    return {
      data: updatedData,
    };
  });
});

export default tableDataReducer;
