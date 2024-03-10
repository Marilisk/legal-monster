import { FC, useEffect } from 'react'
import { IClient } from '../../../../../types/clientsTypes'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import ActivityArray from '../NotesArray/ActivityArray'
import { fetchGetClientActivities } from '../../../../../redux/clientsSlice'
import { LoadingStatusEnum } from '../../../../../types/userTypes'
import { LoadingDots } from '../../../../../assets/LoadingDots/LoadingDots'

interface IMainClientTabProps {
    client: IClient
}

const MainClientTab: FC<IMainClientTabProps> = ({
    client,
}: IMainClientTabProps) => {

    const dispatch = useAppDispatch()
    const activities = useAppSelector(s => s.clients.loadedActivities[client._id])
    const activityArray = activities?.items
    const loadingActivities = activities?.itemsInLoadingStatus
    const clientActivitiesLoadingStatus = useAppSelector(s => s.clients.loadedActivities[client._id]?.status)

    useEffect(() => {
        if (!activityArray) {
                dispatch(fetchGetClientActivities(client._id))
        }
    }, [client._id])

    if (clientActivitiesLoadingStatus === LoadingStatusEnum.loading) return <LoadingDots />
    if (!activityArray) return null

    return (
        <ActivityArray
            array={activityArray}
            title='Активность'
            clientId={client._id}
            loadingActivities={loadingActivities}
        />
    )
}

export default MainClientTab
