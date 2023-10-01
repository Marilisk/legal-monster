import { IClient, ICreateClientPayload, INote } from './../types/clientsTypes';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import instance from './api/api';
import { LoadingStatusEnum } from '../types/userTypes';
import { ClientsInitStateType } from '../types/clientsTypes';
import { log } from 'console';


export const fetchCreateClient = createAsyncThunk('clients/fetchCreateClient', async (params: ICreateClientPayload) => {
    let response = await instance.post('/clients/create', params);
    return response.data;
})

export const fetchEditClient = createAsyncThunk('clients/fetchEditClient', async (params: IClient) => {
    let response = await instance.post('/clients/edit', params);
    return response.data;
})

export const fetchDeleteClient = createAsyncThunk('clients/fetchDeleteClient', async (param: string) => {
    let response = await instance.delete(`/clients/delete/${param}`);
    return response.data;
})

export const fetchCreateNote = createAsyncThunk('clients/fetchCreateNote', async (params: INote) => {
    let response = await instance.post('/notes/create', params);
    return response.data;
})
export const fetchEditNote = createAsyncThunk('clients/fetchEditNote', async (note: INote) => {
    let response = await instance.post(`/notes/edit`, note);
    return response.data;
})

export interface IDeleteNotePayload {
    noteId: string
    clientId: string
}
export const fetchDeleteNote = createAsyncThunk('clients/fetchDeleteNote', async ({ noteId, clientId }: IDeleteNotePayload) => {
    let response = await instance.delete(`/notes/deletenote/${noteId}`);
    return { clientId, data: response.data }
})

export const fetchGetClients = createAsyncThunk('clients/fetchGetClients', async () => {
    let response = await instance.get('/clients/getall');
    return response.data;
})

export const fetchGetClientNotes = createAsyncThunk('clients/fetchGetClientNotes', async (clientId: string) => {
    let response = await instance.get(`/notes/getbyclient/${clientId}`);
    return { notes: response.data, clientId };
})

interface IEditStaffPayload {
    clientId: string,
    newValuesArr: string[],
    staffName: 'lawyers' | 'managers'
}
export const fetchEditClientStaff = createAsyncThunk('clients/fetchEditClientStaff', async (
    { clientId, newValuesArr, staffName }: IEditStaffPayload) => {
    let response = await instance.patch(`/clients/staff/edit/${clientId}`, ({staffName, newValuesArr}));
    console.log(response)
    return { staff: response.data, clientId, staffName };
})


const initialState: ClientsInitStateType = {
    clients: {
        items: [],
        status: LoadingStatusEnum.loaded,
    },

    salesPipeline: [
        {
            stepNumber: 1,
            title: 'новый контакт',
        },
        {
            stepNumber: 2,
            title: 'телефонные переговоры',
        },
        {
            stepNumber: 3,
            title: 'надо направить предложение',
        },
        {
            stepNumber: 4,
            title: 'ждем ответа на предложение',
        },
        {
            stepNumber: 5,
            title: 'готовим договор',
        },
        {
            stepNumber: 6,
            title: 'договор подписан',
        },

    ],

    showNewClientPopup: false,
    showEditClientPopup: {
        isOpened: false,
        clientId: ''
    },
    openedFilter: '',
    clientsFilters: {
        excludedPhases: [],
        period: {
            start: 0, end: 0,
        }
    },
    wasAnyClientFieldChangedFlag: false,
}

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        setShowNewClientPopup(state, action) {
            state.showNewClientPopup = action.payload
        },
        setShowEditClientPopup(state, action: PayloadAction<{ isOpened: boolean, id: string }>) {
            state.showEditClientPopup.isOpened = action.payload.isOpened
            if (action.payload.id) {
                state.showEditClientPopup.clientId = action.payload.id
            }
        },
        /* setSalesPipeline(state, action) {
            state.salesPipeline = action.payload
        }, */
        /*  deleteSalesPipelineItem(state, action) {
             //state.salesPipeline = state.salesPipeline.filter((el, i) => i !== action.payload)
             state.salesPipeline.splice(action.payload, 1)
         },
         savePipelineItem(state, action) {
             const editibleItemIndex = state.salesPipeline.findIndex(el => el.stepNumber === action.payload.stepNumber)
             state.salesPipeline[editibleItemIndex] = action.payload
         }, */
        setClientsFilter(state, action: PayloadAction<{ property: 'excludedPhases' | 'period', values: any }>) {
            state.clientsFilters[action.payload.property] = action.payload.values
        },
        setOpenedFilter(state, action) {
            state.openedFilter = action.payload
        },
        syncEditClient(state, action: PayloadAction<{ _id: string, values: any, fieldName: string }>) {
            //console.log('syncEditClient payload', action.payload)
            const editibleIdx = state.clients.items.findIndex(cl => cl._id === action.payload._id)
            if (editibleIdx >= 0) {
                state.clients.items[editibleIdx][action.payload.fieldName as keyof IClient] = action.payload.values
                state.wasAnyClientFieldChangedFlag = true
            }
        },
        setWasAnyClientFieldChangedFlag(state, action) {
            state.wasAnyClientFieldChangedFlag = action.payload
        },


    },
    extraReducers: (builder) => {
        builder.addCase(fetchCreateClient.pending, (state, action/* :PayloadAction<string[]> */) => {
            state.clients.status = LoadingStatusEnum.loading
        })
            .addCase(fetchCreateClient.fulfilled, (state, action) => {
                state.clients.status = LoadingStatusEnum.loaded;
                state.clients.items.push(action.payload);
            })
            .addCase(fetchCreateClient.rejected, (state, action) => {
                state.clients.status = LoadingStatusEnum.error;
                /* if (action.error.message === 'Request failed with status code 400') {
                    state.clients.serverMessage = 'неверный логин или пароль';
                } else {
                    state.clients.serverMessage = 'сервис недоступен';
                } */
            })


            .addCase(fetchGetClients.pending, (state) => {
                state.clients.status = LoadingStatusEnum.loading
            })
            .addCase(fetchGetClients.fulfilled, (state, action) => {
                //console.log('fetchGetClients', action.payload)
                state.clients.status = LoadingStatusEnum.loaded;
                state.clients.items = action.payload;
            })
            .addCase(fetchGetClients.rejected, (state, action) => {
                state.clients.status = LoadingStatusEnum.error;
            })

            .addCase(fetchEditClient.pending, (state) => {
                state.clients.status = LoadingStatusEnum.loading
            })
            .addCase(fetchEditClient.fulfilled, (state, action) => {
                const editibleItemIndex = state.clients.items.findIndex(el => el._id === action.payload._id)
                if (editibleItemIndex || editibleItemIndex === 0) {
                    state.clients.items[editibleItemIndex] = action.payload;
                    state.clients.status = LoadingStatusEnum.loaded;
                }
                state.wasAnyClientFieldChangedFlag = false
            })
            .addCase(fetchEditClient.rejected, (state) => {
                state.clients.status = LoadingStatusEnum.error;
                state.wasAnyClientFieldChangedFlag = false
            })

            .addCase(fetchEditClientStaff.pending, (state) => {
                state.clients.status = LoadingStatusEnum.loading
            })
            .addCase(fetchEditClientStaff.fulfilled, (state, action) => {
                const staffName = action.payload.staffName 
                const editibleItemIndex = state.clients.items.findIndex(el => el._id === action.payload.clientId)
                if (editibleItemIndex || editibleItemIndex === 0) {
                    state.clients.items[editibleItemIndex][staffName] = action.payload.staff
                }
                state.clients.status = LoadingStatusEnum.loaded;
                state.wasAnyClientFieldChangedFlag = false
            })
            .addCase(fetchEditClientStaff.rejected, (state) => {
                state.clients.status = LoadingStatusEnum.error;
                state.wasAnyClientFieldChangedFlag = false
            })


            .addCase(fetchDeleteClient.pending, (state) => {
                state.clients.status = LoadingStatusEnum.loading
            })
            .addCase(fetchDeleteClient.fulfilled, (state, action) => {
                if (action.payload.clientId) {
                    state.clients.items = state.clients.items.filter(client => client._id !== action.payload.clientId)
                    state.clients.status = LoadingStatusEnum.loaded;
                }
            })
            .addCase(fetchDeleteClient.rejected, (state) => {
                state.clients.status = LoadingStatusEnum.error;
            })

            .addCase(fetchGetClientNotes.pending, (state) => {
                state.clients.status = LoadingStatusEnum.loading
            })
            .addCase(fetchGetClientNotes.fulfilled, (state, action) => {
                const clientIndex = state.clients.items.findIndex(el => el._id === action.payload.clientId)
                if ((clientIndex || clientIndex === 0) && action.payload.notes.length) {
                    state.clients.items[clientIndex].notes = action.payload.notes
                } else {
                    state.clients.items[clientIndex].notes = []
                }
                state.clients.status = LoadingStatusEnum.loaded;
                state.wasAnyClientFieldChangedFlag = false
            })
            .addCase(fetchGetClientNotes.rejected, (state) => {
                state.clients.status = LoadingStatusEnum.error;
                state.wasAnyClientFieldChangedFlag = false
            })

            .addCase(fetchCreateNote.pending, (state) => {
                state.clients.status = LoadingStatusEnum.loading
            })
            .addCase(fetchCreateNote.fulfilled, (state, action) => {
                const clientIndex = state.clients.items.findIndex(el => el._id === action.payload.clientId)
                if (clientIndex || clientIndex === 0) {
                    state.clients.items[clientIndex].notes?.push(action.payload);
                    state.clients.status = LoadingStatusEnum.loaded;
                }
                state.wasAnyClientFieldChangedFlag = false
            })
            .addCase(fetchCreateNote.rejected, (state) => {
                state.clients.status = LoadingStatusEnum.error;
                state.wasAnyClientFieldChangedFlag = false
            })

            .addCase(fetchEditNote.pending, (state) => {
                state.clients.status = LoadingStatusEnum.loading
            })
            .addCase(fetchEditNote.fulfilled, (state, action) => {
                const clientIndex = state.clients.items.findIndex(el => el._id === action.payload.clientId)
                if (clientIndex || clientIndex === 0) {
                    const client = state.clients.items[clientIndex]
                    const noteIndex = client.notes?.findIndex(note => note._id === action.payload._id)
                    if ((noteIndex || noteIndex === 0) && client.notes) {
                        client.notes[noteIndex] = action.payload
                    }
                    state.clients.status = LoadingStatusEnum.loaded;
                }
                state.wasAnyClientFieldChangedFlag = false
            })
            .addCase(fetchEditNote.rejected, (state) => {
                state.clients.status = LoadingStatusEnum.error;
                state.wasAnyClientFieldChangedFlag = false
            })

            .addCase(fetchDeleteNote.pending, (state) => {
                state.clients.status = LoadingStatusEnum.loading
            })
            .addCase(fetchDeleteNote.fulfilled, (state, action) => {
                const editableClientIndex = state.clients.items.findIndex(cl => cl._id === action.payload.clientId)
                if (editableClientIndex || editableClientIndex === 0) {
                    const clientNotes = state.clients.items[editableClientIndex].notes
                    state.clients.items[editableClientIndex].notes = clientNotes?.filter(note => note._id === action.payload.data.noteId)
                    state.clients.status = LoadingStatusEnum.loaded;
                }
            })
            .addCase(fetchDeleteNote.rejected, (state) => {
                state.clients.status = LoadingStatusEnum.error;
            })





        /*  .addCase(fetchAddPipeline.pending, (state) => {
             state.clients.status = LoadingStatusEnum.loading
         })
         .addCase(fetchAddPipeline.fulfilled, (state, action) => {
             console.log(action.payload)
             state.salesPipeline = action.payload.pipeline
             state.clients.status = LoadingStatusEnum.loaded
         })
         .addCase(fetchAddPipeline.rejected, (state, action) => {
             state.clients.status = LoadingStatusEnum.error;
         }) */





    },

});


export const {
    //setShowNewClientPopup,
    //setShowEditClientPopup,
    //setSalesPipeline,
    /* deleteSalesPipelineItem,
    savePipelineItem, */
    setClientsFilter,
    setOpenedFilter,
    syncEditClient,
    setWasAnyClientFieldChangedFlag,
} = clientsSlice.actions;
export default clientsSlice.reducer;