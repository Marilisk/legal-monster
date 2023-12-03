import React, { FC, useEffect } from 'react'
import c from './MainClientTab.module.scss'
import { IClient } from '../../../../../types/clientsTypes'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import ActivityArray from '../NotesArray/ActivityArray'
import { fetchGetClientActivities } from '../../../../../redux/clientsSlice'

interface IMainClientTabProps {
    client: IClient
    // editMode: boolean
    // loadingStatus: LoadingStatusEnum
    // wasAnyFieldChangedFlag: boolean
    // setIfAnyFieldChangedFlag: (arg: boolean) => void
}

const MainClientTab: FC<IMainClientTabProps> = ({
    client,
    // editMode,
    // loadingStatus,
    // wasAnyFieldChangedFlag,
    // setIfAnyFieldChangedFlag,


}: IMainClientTabProps) => {

    const dispatch = useAppDispatch()
    const clientContactsLength = client.contactPersons.length
    const myManagers = useAppSelector(s => s.staff.managers.items)
    const myLawyers = useAppSelector(s => s.staff.lawyers.items)
    const isOwner = useAppSelector(s => s.auth.loginData.data?.role === 'owner')
    const canChangeResponsibleUser = useAppSelector(s => s.auth.loginData.data?.powers.canChangeResponsibleUser)
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