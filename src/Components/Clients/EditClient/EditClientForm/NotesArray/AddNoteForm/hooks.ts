import { useEffect, useMemo, useState } from "react"
import { ClientActivityType, IActivity, PriorityType } from "../../../../../../types/clientsTypes"



export const useGetPickerValues = (startTs = 0, deadLine = 0 ) => {

    const [localDeadLine, setDeadLine] = useState(deadLine || Date.now() + 3600000)
    const [localStartTS, setStartTS] = useState(startTs || Date.now())

    const duration = deadLine - startTs

    useEffect(() => {
        if (localStartTS > localDeadLine) {
            setDeadLine(localStartTS + duration || 3600000)
        }
    }, [localStartTS, localDeadLine])


    return {localDeadLine, localStartTS, setDeadLine, setStartTS}
}


export interface IAddNoteFormValues {
    title: string
    text: string
    priority: PriorityType
    author: {
        fullName: string
        authorId: string
    };
    type: ClientActivityType
    deadLine: number
    startTS: number
    place: string
    result: string
    _id: string | undefined
    createdAt: string | undefined
}

export type ChangeNoteFormEvent = {
    field: keyof IAddNoteFormValues
    value: IAddNoteFormValues[keyof IAddNoteFormValues]
}


export const useGetInitialValues = (
    editibleNote: IActivity | undefined, 
    type: ClientActivityType,
    fullName: string,
    authorId: string,
    localDeadLine: number,
    localStartTS: number,
    ) => {
        // console.log('in useGetInitialValues', type)
    return useMemo(() => {
        return {
            title: editibleNote?.title || '', text: editibleNote?.text || '', priority: editibleNote?.priority || 'low',
            author: { fullName, authorId },
            type: !!editibleNote ? editibleNote?.type : type,
            deadLine: editibleNote?.deadLine || localDeadLine,
            startTS: editibleNote?.startTS || localStartTS,
            place: editibleNote?.place || '',
            result: editibleNote?.result || '',
            _id: editibleNote?._id || undefined,
            createdAt: editibleNote?.createdAt
        }
    }, [editibleNote?._id, type])
    return {
        title: editibleNote?.title || '', text: editibleNote?.text || '', priority: editibleNote?.priority || 'low',
        author: { fullName, authorId },
        type: editibleNote?.type || type,
        deadLine: editibleNote?.deadLine || localDeadLine,
        startTS: editibleNote?.startTS || localStartTS,
        place: editibleNote?.place || '',
        result: editibleNote?.result || '',
        _id: editibleNote?._id || undefined,
        createdAt: editibleNote?.createdAt
    }
}