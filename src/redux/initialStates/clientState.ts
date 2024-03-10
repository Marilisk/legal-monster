import { ClientsInitStateType } from "../../types/clientsTypes";
import { LoadingStatusEnum } from "../../types/userTypes";

export interface IEditStaffPayload {
    clientId: string,
    newValuesArr: string[],
    staffName: 'lawyers' | 'managers'
}


export const clientsInitialState: ClientsInitStateType = {
    clients: {
        items: [],
        status: LoadingStatusEnum.empty,
        createClientStatus: LoadingStatusEnum.empty,
        serverMessage: '',
    },
    loadedActivities: {},
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

    /* showNewClientPopup: false,
    showEditClientPopup: {
        isOpened: false,
        clientId: ''
    }, */
    openedFilter: '',
    clientsFilters: {
        excludedPhases: [],
        period: {
            start: 0, end: 0,
        }
    },
    wasAnyClientFieldChangedFlag: false,
}