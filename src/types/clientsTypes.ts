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
export interface IClient {
    _id: string
    name: string
    form: 'юридическое лицо' | 'индивидуальный предприниматель' | 'физическое лицо'
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
    activities?: IActivity[]
    updatedAt: string
    createdAt: string
}

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
    endTS?: number,
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
}

export type SalesPhaseType = {
    stepNumber: number
    title: string
    color?: string
}

export type ClientsInitStateType = {
    clients: ClientsType
    loadedActivities: {[key: string]: IActivity[]}
    salesPipeline: SalesPhaseType[]
    showNewClientPopup: boolean
    showEditClientPopup: {
        isOpened: boolean
        clientId: string 
    }
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

