import { useEffect, useCallback } from 'react';
import { Clients } from './Clients';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchEditClient, fetchGetClients, setOpenedFilter, setWasAnyClientFieldChangedFlag } from '../../redux/clientsSlice';
import { LoadingStatusEnum } from '../../types/userTypes';
import { fetchGetMyStaff } from '../../redux/staffSlice';
import { LoadingDotsPreloader } from '../../assets/LoadingDots/LoadingDotsPreloader';
import { IClient } from '../../types/clientsTypes';
import EditClient from './EditClient/EditClient';
import { createModal } from '../../utils/DialogCreator/DialogCreator';

export const editClientOnClosePopup = async (client: IClient, dispatch: any) => {
    const response = await dispatch(fetchEditClient(client))
    console.log('resp close on click outside', response)
    if (response.meta.requestStatus === 'fulfilled') {
        //dispatch(setShowEditClientPopup({ isOpened: false, id: '' }))
        dispatch(setWasAnyClientFieldChangedFlag(false))
    }
}


const ClientsContainer = () => {

    const dispatch = useAppDispatch()

    const clients = useAppSelector(s => s.clients.clients.items)
    const isLoading = useAppSelector(s => s.clients.clients.status === LoadingStatusEnum.loading)
    const showNewClientPopup = useAppSelector(s => s.clients.showNewClientPopup)
    const showEditClient = useAppSelector(s => s.clients.showEditClientPopup)
    const showEditClientPopup = showEditClient.isOpened
    const isOwner = useAppSelector(s => s.auth.loginData.data?.role === 'owner')
    const authUserRole = useAppSelector(s => s.auth.loginData.data?.role)
    const userId = useAppSelector(s => s.auth.loginData.data?._id)
    const canChangeResponsibleUser = useAppSelector(s => s.auth.loginData.data?.powers.canChangeResponsibleUser)
    const wasAnyFieldChangedFlag = useAppSelector(s => s.clients.wasAnyClientFieldChangedFlag)

    const canSeeOtherClients = useAppSelector(s => s.auth.loginData.data?.powers.canSeeOtherClients)

    const handleClientsPageClick = useCallback((e: Event): void => {
        let id
        const element = (e.target as HTMLElement).closest('[id]') as HTMLElement
        if (element) { id = element.id }
        dispatch(setOpenedFilter(id || ''))
        if (showNewClientPopup && id !== 'newClientPopup' && id !== 'newClientBtn') {
            //createModal({component: <EditClient />})
            
            //dispatch(setShowNewClientPopup(false))
        } else if (id && showEditClientPopup && id !== 'clientLine'
            && id !== 'editClientPopup'
            && id !== 'deadLine' && id !== 'saveBtn' && id !== 'cancelBtn') {
            const client = clients.find(cl => cl._id === showEditClient.clientId)
            if (client && wasAnyFieldChangedFlag) editClientOnClosePopup(client, dispatch)
        }
    }, [showNewClientPopup, showEditClientPopup, dispatch])

    useEffect(() => {
        document.addEventListener('click', handleClientsPageClick)
        return () => document.removeEventListener('click', handleClientsPageClick)
    }, [handleClientsPageClick])

    useEffect(() => {
        dispatch(fetchGetClients())
        if (isOwner || canChangeResponsibleUser) {
            dispatch(fetchGetMyStaff('manager'))
            dispatch(fetchGetMyStaff('lawyer'))
        }
    }, [dispatch, isOwner, canChangeResponsibleUser])

    if (isLoading ) {
        return <div>clients container loading</div>
    }

    const filteredClients = (isOwner || canSeeOtherClients) ?
        clients
        :
        clients.filter(client => {
            if (authUserRole === 'lawyer' && userId) {
                return client.lawyers.includes(userId)
            } else if (authUserRole === 'manager' && userId) {
                return client.managers.includes(userId)
            }
            return null
        })


    return <Clients clients={filteredClients}
        showNewClientPopup={showNewClientPopup}
        showEditClientPopup={showEditClientPopup} />
};

export default ClientsContainer;