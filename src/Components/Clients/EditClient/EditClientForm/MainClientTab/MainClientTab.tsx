import { FC, useEffect } from 'react'
import { IClient } from '../../../../../types/clientsTypes'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import ActivityArray from '../NotesArray/ActivityArray'
import { fetchGetClientActivities } from '../../../../../redux/clientsSlice'

interface IMainClientTabProps {
    client: IClient
}

const MainClientTab: FC<IMainClientTabProps> = ({
    client,
}: IMainClientTabProps) => {

    const dispatch = useAppDispatch()
    const activityArray = useAppSelector( s => s.clients.loadedActivities[client._id])

    useEffect(() => {
        if (!activityArray) {
            dispatch(fetchGetClientActivities(client._id))
        }
    }, [client._id])


    return (
        <ActivityArray array={activityArray} title='Активность' clientId={client._id} />
    )
}

export default MainClientTab
