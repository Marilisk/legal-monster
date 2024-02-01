import { SalesPhaseType } from "./clientsTypes"


export type HeaderInitStateType = {
    name: string
}

export interface IUser {
    _id: string
    email: string
    phone: string
    password: string 
    fullName: string
    activationLink: string
    resetPasswordLink?: string
    role: 'owner' | 'manager' | 'lawyer'
    powers: {
        canChangeResponsibleUser: boolean
        canCreateNewClients: boolean
        canSeeOtherClients: boolean
        canSeeOtherCases: boolean
        canEditSalesPipeline: boolean
        canDeleteNotes: boolean
        canDeleteClients: boolean
        canEditCompletedActions?: boolean
    }
    ownerId?: string
    isActivated: boolean
    allowedToResetPassword?: boolean
    avatarUrl?: string 
    ownerSettings: {
        salesPipeline: {
            isCustom: boolean
            pipeline: SalesPhaseType[]
        },
    }, 
}
export type ILData = {
    data: IUser | null
    status: LoadingStatusEnum
    serverMessage: string
}
export enum LoadingStatusEnum {
    empty = 'empty',
    loading = 'loading',
    loaded = 'loaded',
    error = 'error',
}

export type AuthInitStateType = {
    loginData: ILData
}

export interface ICreateStaffPayload {
    email: string
    role: 'manager' | 'lawyer'
}

