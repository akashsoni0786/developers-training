import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gridData: [],
  totalRow:200,
  rowCount : 10,
  page_no :1
};

export const storeSlice = createSlice({
  name: "storeslice",
  initialState,
  reducers: {
    totalRowCount: (state, actions) => {
      state.totalRow = actions.payload;
    },
    alldata: (state, actions) => {
      state.gridData = actions.payload;
    },
    changeRowCount: (state, actions) => {
      state.rowCount = actions.payload;
    },
    changePage: (state, actions) => {
      state.page_no = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { alldata, changeRowCount, totalRowCount, changePage } = storeSlice.actions;
export default storeSlice.reducer; // storeReducer  in Store.js
