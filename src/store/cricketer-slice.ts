import { createSlice } from '@reduxjs/toolkit';

type cricketerSliceType = {
  pageSize:number,
  filter:string,
  searchText:string,
}

type cricketerAction = {
  type: string,
  payload: cricketerSliceType
}



const initialState: cricketerSliceType = {
 
  pageSize:10,
  filter:'',
  searchText:''
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
      
    }
  }
}
);