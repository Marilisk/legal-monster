import { LoadingStatusEnum } from "./userTypes"

export interface ICreateClientPayload {
    name: string
    form: string
    INNnumber: string
    contactPersons: Array<IContactPerson>
    phase: {number: number, assignDateTimestamp?: number }
    managers: string[]
    lawyers: string[]
    contracts: string[]
    projects: string[]
    events: Array<{
        id: string
        deadLine: number
        type: string
    }>
    notes: IActivity[]
}

export type ClientFormType = 'юридическое лицо' | 'индивидуальный предприниматель' | 'физическое лицо'
export interface IClient {
    _id: string
    name: string
    form: ClientFormType
    INNnumber: string
    contactPersons: Array<IContactPerson>
    phase: {number: number, assignDateTimestamp: number }
    managers: string[]
    lawyers: string[]
    contracts: string[]
    projects: string[]
    events: Array<{
        id: string
        deadLine: number
        type: string
    }>
    creatorId: string
    ownerId: string
    activities?: string[]
    updatedAt: string
    createdAt: string
}

export type ClientFieldsType = keyof IClient

export type ClientActivityType = 'note' | 'task' | 'meeting' | 'document' | 'court'
export interface IActivity {
    author: {
        authorId: string
        fullName: string
    }
    type: ClientActivityType
    createTimeStamp: number
    deadLine: number
    title?: string
    text: string
    priority: PriorityType
    isDone?: boolean
    _id: string
    clientId: string
    result?: string
    place?: string
    startTS?: number,
    createdAt: string
}

export interface IContactPerson {
    name: string
    phone: string
    email?: string
    job: string
    note?: string
    isMain?: boolean
    preferredMethod?: 'phone' | 'email' | 'telegram' | 'whatsapp'
}


export type ClientsType = {
    items: IClient[],
    status: LoadingStatusEnum
    createClientStatus: LoadingStatusEnum
    serverMessage: string
}

export type SalesPhaseType = {
    stepNumber: number
    title: string
    color?: string
}

export type ClientsInitStateType = {
    clients: ClientsType
    loadedActivities: {[key: string]: {
        items: IActivity[],
        status: LoadingStatusEnum
        itemsInLoadingStatus: string[]
    }}
    salesPipeline: SalesPhaseType[]
   /*  showNewClientPopup: boolean
    showEditClientPopup: {
        isOpened: boolean
        clientId: string 
    } */
    openedFilter: string
    clientsFilters: {
        excludedPhases: number[]
        period: {
            start: number, end: number,
        }
    }
    wasAnyClientFieldChangedFlag: boolean
}

export type PriorityType = 'high' | 'middle' | 'low'


export interface IDadataCompany {
    value: string
    // unrestricted_value: string
    data?: {
        address: {
            unrestricted_value: string
            data: {
                federal_district: string
                city_area: string
                city_district: string
                street: string
                house: string
            }
        }
        name: {
            full: string
            full_with_opf: string
            short_with_opf: string
        }
        kpp: string
        inn: string
    }
}

 

