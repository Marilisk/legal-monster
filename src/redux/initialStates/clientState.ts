import { ClientsInitStateType } from "../../types/clientsTypes";
import { LoadingStatusEnum } from "../../types/userTypes";


export const clientsInitialState: ClientsInitStateType = {
    clients: {
        items: [],
        status: LoadingStatusEnum.loaded,
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