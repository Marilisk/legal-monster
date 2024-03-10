import { ClientFieldsType, IActivity, IClient, ICreateClientPayload } from './../types/clientsTypes';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import instance from './api/api';
import { LoadingStatusEnum } from '../types/userTypes';
import { IEditStaffPayload, clientsInitialState } from './initialStates/clientState';


export const fetchCreateClient = createAsyncThunk('clients/fetchCreateClient', async (params: ICreateClientPayload) => {
    let response = await instance.post('/clients/create', params);
    return response.data;
})

export const fetchEditClient = createAsyncThunk('clients/fetchEditClient',
    async (params: Partial<IClient>) => {
        let response = await instance.post('/clients/edit', params);
        return response.data;
    })

export const fetchDeleteClient = createAsyncThunk('clients/fetchDeleteClient', async (param: string) => {
    let response = await instance.delete(`/clients/delete/${param}`);
    return response.data;
})

export const fetchCreateNote = createAsyncThunk('clients/fetchCreateNote', async (params: IActivity) => {
    let response = await instance.post('/notes/create', params);
    return response.data;
})
export const fetchEditNote = createAsyncThunk('clients/fetchEditNote', async (activity: IActivity) => {
    let response = await instance.post(`/notes/edit`, activity);
    return { data: response.data, activity };
})

export interface IDeleteNotePayload {
    noteId: string
    clientId: string
}
export const fetchDeleteNote = createAsyncThunk('clients/fetchDeleteNote', async ({ noteId, clientId }: IDeleteNotePayload) => {
    let response = await instance.delete(`/notes/deletenote/${noteId}/${clientId}`);
    return { clientId, data: response.data }
})

export const fetchGetClients = createAsyncThunk('clients/fetchGetClients', async () => {
    let response = await instance.get('/clients/getall');
    return response.data;
})

export const fetchGetOneClient = createAsyncThunk('clients/fetchGetOneClient', async (clientId: string) => {
    let response = await instance.get(`/clients/getone/${clientId}`);
    return response.data;
})

export const fetchGetClientActivities = createAsyncThunk('clients/fetchGetClientActivities', async (clientId: string) => {
    let response = await instance.get(`/activities/getbyclient/${clientId}`);
    return { activities: response.data, clientId };
})

export const fetchEditClientStaff = createAsyncThunk('clients/fetchEditClientStaff', async (
    { clientId, newValuesArr, staffName }: IEditStaffPayload) => {
    let response = await instance.patch(`/clients/staff/edit/${clientId}`, ({ staffName, newValuesArr }));
    return { staff: response.data, clientId, staffName };
})


const clientsSlice = createSlice({
    name: 'clients',
    initialState: clientsInitialState,
    reducers: {
        setClientsFilter(state, action: PayloadAction<{ property: 'excludedPhases' | 'period', values: any }>) {
            state.clientsFilters[action.payload.property] = action.payload.values
        },
        setOpenedFilter(state, action) {
            state.openedFilter = action.payload
        },
        syncEditClient(state, action: PayloadAction<{ _id: string, values: any, fieldName: ClientFieldsType }>) {
            if (!state.wasAnyClientFieldChangedFlag) state.wasAnyClientFieldChangedFlag = true
            const editibleIdx = state.clients.items.findIndex(cl => cl._id === action.payload._id)
            if (editibleIdx >= 0) {
                state.clients.items[editibleIdx][action.payload.fieldName as keyof IClient] = action.payload.values
                state.wasAnyClientFieldChangedFlag = true
            }
        },
        setWasAnyClientFieldChangedFlag(state, action) {
            state.wasAnyClientFieldChangedFlag = action.payload
        },
        setEditClientStatus(state, action) {
            state.clients.createClientStatus = action.payload
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCreateClient.pending, (state) => {
            state.clients.createClientStatus = LoadingStatusEnum.loading
        })
            .addCase(fetchCreateClient.fulfilled, (state, action) => {
                if ('_id' in action.payload) {
                    state.clients.createClientStatus = LoadingStatusEnum.loaded
                    state.clients.items.push(action.payload)
                } else {
                    console.log('action', action)
                    state.clients.serverMessage = action.payload.message
                    state.clients.createClientStatus = LoadingStatusEnum.empty
                }
            })
            .addCase(fetchCreateClient.rejected, (state, action) => {
                state.clients.createClientStatus = LoadingStatusEnum.error;
                state.clients.serverMessage = `Ошибка создания нового клиента`
            })

            .addCase(fetchGetClients.pending, (state) => {
                state.clients.status = LoadingStatusEnum.loading
            })
            .addCase(fetchGetClients.fulfilled, (state, action) => {
                state.clients.status = LoadingStatusEnum.loaded;
                state.clients.items = action.payload;
            })
            .addCase(fetchGetClients.rejected, (state) => {
                state.clients.status = LoadingStatusEnum.error;
            })

            .addCase(fetchGetOneClient.pending, (state) => {
                state.clients.status = LoadingStatusEnum.loading
            })
            .addCase(fetchGetOneClient.fulfilled, (state, action) => {
                state.clients.status = LoadingStatusEnum.loaded;
                state.clients.items = [...state.clients.items, ...action.payload]
            })
            .addCase(fetchGetOneClient.rejected, (state) => {
                state.clients.status = LoadingStatusEnum.error;
            })

            .addCase(fetchEditClient.pending, (state, action) => {
                if ('phase' in action.meta.arg) {
                    state.clients.status === LoadingStatusEnum.loaded
                } else {
                    state.clients.status = LoadingStatusEnum.loading
                }
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

            .addCase(fetchGetClientActivities.pending, (state, action) => {
                state.loadedActivities[action.meta.arg] = {
                    items: [],
                    status: LoadingStatusEnum.loading,
                    itemsInLoadingStatus: []
                }
            })
            .addCase(fetchGetClientActivities.fulfilled, (state, action) => {
                state.loadedActivities[action.payload.clientId] = {
                    items: [],
                    status: LoadingStatusEnum.loaded,
                    itemsInLoadingStatus: []
                }
                state.loadedActivities[action.payload.clientId].items = action.payload.activities
            })
            .addCase(fetchGetClientActivities.rejected, (state) => {
                state.clients.status = LoadingStatusEnum.error;
            })

            .addCase(fetchCreateNote.pending, (state, action) => {
                state.loadedActivities[action.meta.arg.clientId].status = LoadingStatusEnum.loading
            })
            .addCase(fetchCreateNote.fulfilled, (state, action) => {
                state.loadedActivities[action.payload.clientId].items.push(action.payload)
                state.wasAnyClientFieldChangedFlag = false
                state.loadedActivities[action.payload.clientId].status = LoadingStatusEnum.loaded
            })
            .addCase(fetchCreateNote.rejected, (state, action) => {
                state.loadedActivities[action.meta.arg.clientId].status = LoadingStatusEnum.error;
                state.wasAnyClientFieldChangedFlag = false
            })

            .addCase(fetchEditNote.pending, (state, action) => {
                console.log('action.meta', action.meta)
                // state.loadedActivities[action.meta.arg.clientId].status = LoadingStatusEnum.loading
                /* const editibleActivities = state.loadedActivities[action.meta.arg.clientId].items
                const editibleItemInd = editibleActivities.findIndex(act => act._id === action.meta.arg._id )
                if (editibleItemInd || editibleItemInd === 0) {
                    editibleActivities[editibleItemInd].status = LoadingStatusEnum.loading
                } */
                state.loadedActivities[action.meta.arg.clientId].itemsInLoadingStatus.push(action.meta.arg._id)
            })
            .addCase(fetchEditNote.fulfilled, (state, action) => {
                const editibleActivities = state.loadedActivities[action.payload.activity.clientId].items
                const editibleItemInd = editibleActivities.findIndex(act => act._id === action.payload.activity._id)
                if (editibleItemInd || editibleItemInd === 0) {
                    editibleActivities[editibleItemInd] = action.payload.activity
                }
                state.wasAnyClientFieldChangedFlag = false
                state.clients.status = LoadingStatusEnum.loaded
                state.loadedActivities[action.meta.arg.clientId].itemsInLoadingStatus =
                    state.loadedActivities[action.meta.arg.clientId].itemsInLoadingStatus.filter(item => item !== action.payload.activity._id)
            })
            .addCase(fetchEditNote.rejected, (state, action) => {
                state.clients.status = LoadingStatusEnum.error;
                state.wasAnyClientFieldChangedFlag = false
                state.loadedActivities[action.meta.arg.clientId].itemsInLoadingStatus =
                    state.loadedActivities[action.meta.arg.clientId].itemsInLoadingStatus.filter(item => item !== action.meta.arg._id)
            })

            .addCase(fetchDeleteNote.pending, (state) => {
                state.clients.status = LoadingStatusEnum.loading
            })
            .addCase(fetchDeleteNote.fulfilled, (state, action) => {
                state.loadedActivities[action.payload.clientId].items = state.loadedActivities[action.payload.clientId].items
                    .filter(act => act._id !== action.payload.data.noteId)
                state.clients.status = LoadingStatusEnum.loaded

            })
            .addCase(fetchDeleteNote.rejected, (state) => {
                state.clients.status = LoadingStatusEnum.error;
            })


    },

});


export const {
    setClientsFilter,
    setOpenedFilter,
    syncEditClient,
    setWasAnyClientFieldChangedFlag,
    setEditClientStatus,
} = clientsSlice.actions;
export default clientsSlice.reducer;