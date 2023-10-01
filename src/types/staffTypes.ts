import { IUser, LoadingStatusEnum } from "./userTypes"

export interface ICandidate {
    _id: string
    email: string
    role: "manager" | "lawyer"
    ownerId: string
    createdAt: string 
    updatedAt: string
}

export interface IStaffInitState {
    managers: {
        items: IUser[]
        status: LoadingStatusEnum,
    }
    lawyers: {
        items: IUser[]
        status: LoadingStatusEnum,
    }
    candidates: {
        items: ICandidate[]
        status: LoadingStatusEnum,
    }
    serverMessage: string
}