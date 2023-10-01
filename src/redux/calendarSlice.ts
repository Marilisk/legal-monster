import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICalendarDayItem, ITask } from '../types/eventsTypes';
import { createAppAsyncThunk } from './hooks';
import { collectDaysOfMonth } from '../assets/functions/collectDaysOfMonth';
import { LoadingStatusEnum } from '../types/userTypes';

export const fetchTasks = createAppAsyncThunk('calendar/fetchTasks', async (month: number) => {
    //let response = await instance.get(`/calendar/tasks/${month}`);

    //return response.data;
})
export interface IPopup {
    top: number | null
    left: number | null
    id: string | null
}
export interface IFormPopup {
    top: number | null
    left: number | null
    id: string | null
    initialTask: ITask | null
}


export interface ICalendarInitState {
    currentDate: number
    days: {
        items: ICalendarDayItem[]
        loadingStatus: LoadingStatusEnum
    }
    viewPeriod: 'month' | 'week'
    date: number
    addEventFormPopUp: IFormPopup
    datePickerPopUp: IPopup
    eventPopUp: IPopup
}

//const date = new Date()
const initialState: ICalendarInitState = {
    viewPeriod: 'month',
    date: Date.now(),
    currentDate: Date.now(),
    days: {
        items: collectDaysOfMonth(1680615697763),
        loadingStatus: LoadingStatusEnum.loaded
    },
    addEventFormPopUp: {
        top: null,
        left: null,
        id: null,
        initialTask: null,
    },
    datePickerPopUp: {
        top: null,
        left: null,
        id: null,
    },
    eventPopUp: {
        top: null,
        left: null,
        id: null,
    },
}

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setCalendarDate(state, action) {
            state.date = action.payload
            state.currentDate = action.payload
            state.days = { ...state.days, items: collectDaysOfMonth(action.payload) }
        },

        setTasks(state, action: PayloadAction<ITask[]>) {
            for (let task of action.payload) {
                let startDate = task.startDate.day
                let taskDay = state.days.items.find(d => d.index === startDate)
                if (taskDay) {
                    taskDay.tasks.push(task)
                }
            }
        },

        addTask(state, action) {
            let startDate = action.payload.startDate.day
            let taskDay = state.days.items.find(d => d.index === startDate)
            if (taskDay) {
                taskDay.tasks?.push(action.payload)
            }
        },
        editTask(state, action) {
            let startDate = action.payload.startDate.day
            let taskDayIndex = state.days.items.findIndex(d => d.index === startDate)
            if (taskDayIndex || taskDayIndex === 0) {
                let taskIndex = state.days.items[taskDayIndex]
                    .tasks.findIndex(el => el._id === action.payload._id)
                state.days.items[taskDayIndex].tasks[taskIndex] = action.payload                
            }
        },

        callFormPopUp(state, action) {
            state.addEventFormPopUp.top = action.payload.offsetTop
            state.addEventFormPopUp.left = action.payload.offsetLeft
            state.addEventFormPopUp.id = action.payload.id
            //state.addEventFormPopUp.initialTask = action.payload.task
        },
        setEventToForm(state, action) {
            state.addEventFormPopUp.initialTask = action.payload
        },
        /* closePopUp(state, action) {
            state.popUp.id = state.popUp.id.filter(el => el === action.payload.id)
        }, */

        callDatePickerPopUp(state, action) {
            state.datePickerPopUp.top = action.payload.offsetTop
            state.datePickerPopUp.left = action.payload.offsetLeft
            state.datePickerPopUp.id = action.payload.id
        },


    },
    extraReducers: (builder) => {


    },

});


export const {
    setCalendarDate,
    setTasks,
    callFormPopUp,
    setEventToForm,
    callDatePickerPopUp,
    addTask,
    editTask } = calendarSlice.actions;
export default calendarSlice.reducer;