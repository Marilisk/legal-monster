import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICreateStaffPayload, LoadingStatusEnum } from "../types/userTypes";
import instance from "./api/api";
import { IStaffInitState } from "../types/staffTypes";


export const fetchGetMyStaff = createAsyncThunk('staff/fetchGetMyStaff', async (staffRole: string) => {
    let response = await instance.get(`/staff/getmystaff/${staffRole}`)
    return response.data;
})

export const fetchGetCandidates = createAsyncThunk('staff/fetchGetCandidates', async () => {
    let response = await instance.get('/auth/getcandidates')
    return response.data;
})

export const fetchCreateStaff = createAsyncThunk('staff/fetchCreateStaff', async (params: ICreateStaffPayload) => {
    let response = await instance.post('/auth/createstaff', params)
    return response.data;
})


const initialState: IStaffInitState = {
    managers: {
        items: [],
        status: LoadingStatusEnum.empty,
    },
    lawyers: {
        items: [],
        status: LoadingStatusEnum.empty,
    },
    candidates: {
        items: [],
        status: LoadingStatusEnum.empty,
    },
    serverMessage: '',
}

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetMyStaff.pending, (state) => {
                state.managers.status = LoadingStatusEnum.loading
                state.lawyers.status = LoadingStatusEnum.loading
            })
            .addCase(fetchGetMyStaff.fulfilled, (state, action) => {
                const editibleStaff = action.payload.length ? action.payload[0].role : ''
                if (editibleStaff === 'manager') {
                    state.managers.items = action.payload;
                } else {
                    state.lawyers.items = action.payload;
                }
                state.managers.status = LoadingStatusEnum.loaded
                state.lawyers.status = LoadingStatusEnum.loaded
            })
            .addCase(fetchGetMyStaff.rejected, (state) => {
                state.serverMessage = 'Не удалось получить сотрудников'
                state.managers.status = LoadingStatusEnum.error;
            })

            .addCase(fetchCreateStaff.pending, (state) => {
                state.managers.status = LoadingStatusEnum.loading
            })
            .addCase(fetchCreateStaff.fulfilled, (state, action) => {
                console.log(action)
                state.managers.status = LoadingStatusEnum.loaded;
                state.candidates.items = [...state.candidates.items, action.payload]
                state.serverMessage = action.payload.message ? action.payload.message : 'сотруднику направлено приглашение';
            })
            .addCase(fetchCreateStaff.rejected, (state) => {
                state.managers.status = LoadingStatusEnum.error;
                state.serverMessage = 'Не удалось пригласить сотрудника'
            })

            .addCase(fetchGetCandidates.pending, (state) => {
                state.managers.status = LoadingStatusEnum.loading
            })
            .addCase(fetchGetCandidates.fulfilled, (state, action) => {
                state.managers.status = LoadingStatusEnum.loaded;
                state.candidates.items = action.payload
            })
            .addCase(fetchGetCandidates.rejected, (state) => {
                state.managers.status = LoadingStatusEnum.error;
            })


            


            

            







    },

});


export const {

} = staffSlice.actions;
export default staffSlice.reducer;