import { FC, useEffect } from 'react'
import c from './MainClientTab.module.scss'
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
        <div>
            <div className={c.block }>
                <ActivityArray array={activityArray} title='Активность' clientId={client._id} />
            </div>
        </div>
    )
}

export default MainClientTab