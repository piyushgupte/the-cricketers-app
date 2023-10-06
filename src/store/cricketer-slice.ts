import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type PlayerFilter = "name_asc" | "name_dec" | "rank_asc" | "rank_dec" | "age_asc" | "age_dec" | ""
export type cricketerSliceType = {
  pageSize: number,
  filter: PlayerFilter,
  searchText: string,
  pageNumber: number
}

const initialState: cricketerSliceType = {
  pageSize: 5,
  filter: '',
  searchText: '',
  pageNumber: 0,
};

export const cricketerSlice = createSlice({
  name: 'cricketers',
  initialState,
  reducers: {
    updatePageSize: (state, action: PayloadAction<cricketerSliceType>) => {

      state.pageSize = action.payload.pageSize;


    },
    updateFilter: (state, action: PayloadAction<cricketerSliceType>) => {
      state.filter = action.payload.filter;
    },
    updateSearchText: (state, action: PayloadAction<cricketerSliceType>) => {
      state.searchText = action.payload.searchText;

    },
    updatePageNumber: (state, action: PayloadAction<cricketerSliceType>) => {
      state.pageNumber = action.payload.pageNumber
    }
  }
}
);

export const { updateFilter, updatePageNumber, updatePageSize, updateSearchText } = cricketerSlice.actions;