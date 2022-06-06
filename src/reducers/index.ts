import { combineReducers } from "@reduxjs/toolkit";

import tableDataReducer from "pages/Home/containers/Table/store/reducers";

export const rootReducer = combineReducers({
  tableData: tableDataReducer,
});
