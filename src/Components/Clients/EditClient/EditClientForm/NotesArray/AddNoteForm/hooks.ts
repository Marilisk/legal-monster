import { useEffect, useMemo, useState } from "react"
import { ClientActivityType, IActivity } from "../../../../../../types/clientsTypes"



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


export const useGetInitialValues = (
    editibleNote: IActivity | undefined, 
    type: ClientActivityType,
    fullName: string,
    authorId: string,
    localDeadLine: number,
    localStartTS: number,
    ) => {
    return useMemo(() => {
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
    }, [editibleNote?._id, type])
}