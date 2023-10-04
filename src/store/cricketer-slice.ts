import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './../store/index';

export type cricketerSliceType = {
  pageSize:number,
  filter:string,
  searchText:string,
  pageNumber: number
}

type cricketerAction = {
  type: string,
  payload: cricketerSliceType
}



const initialState: cricketerSliceType = {
 
  pageSize:5,
  filter:'',
  searchText:'',
  pageNumber: 1,
  
};

export const cricketerSlice = createSlice({
  name: 'cricketers',
  initialState,
  reducers: {
    updatePageSize: (state, action:cricketerAction) => {
      
      state.pageSize = action.payload.pageSize;

    },
    updateFilter:(state, action:cricketerAction)=>{
      state.filter=action.payload.filter ;
    },
    updateSearchText: (state,action)=>{
      state.searchText = action.payload.searchText;
      
    },
    updatePageNumber: (state, action:cricketerAction)=>{
      state.pageNumber = action.payload.pageNumber
    }
  }
}
);

export const { updateFilter, updatePageNumber, updatePageSize, updateSearchText } = cricketerSlice.actions;