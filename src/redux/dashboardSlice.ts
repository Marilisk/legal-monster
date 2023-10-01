import { createSlice } from '@reduxjs/toolkit';


/* interface IToolType {
    tool
} */

export interface IDashboardInitState {
  tool: null | object
  canvas: null | object
}

//const date = new Date()
const initialState: IDashboardInitState = {
    tool: null,
    canvas: null
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setTool(state, action) {
            state.tool = action.payload
        },
        setCanvas(state, action) {
            state.canvas = action.payload 
        },
        /* setFillColor: (state, action) {
            state.tool.setFillColor = action.payload
        } */

        


    },
    extraReducers: (builder) => {


    },

});


export const {
    setTool,
    setCanvas,

     } = dashboardSlice.actions;
export default dashboardSlice.reducer;