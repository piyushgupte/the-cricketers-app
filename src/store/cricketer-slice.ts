import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type PlayerFilter = "name_asc" | "name_dec" | "rank_asc" | "rank_dec" | "age_asc" | "age_dec" 
export type cricketerSliceType = {
  pageSize: number,
  filter: PlayerFilter,
  searchText: string,
  pageNumber: number
  isDrOpen:boolean
}

const initialState: cricketerSliceType = {
  pageSize: 5,
  filter: 'name_asc',
  searchText: '',
  pageNumber: 0,
  isDrOpen:false
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
    },
    updateDrState: (state,action:PayloadAction<cricketerSliceType>)=>{
      state.isDrOpen = action.payload.isDrOpen
    }
  }
}
);

export const { updateFilter, updatePageNumber, updatePageSize, updateSearchText,updateDrState } = cricketerSlice.actions;