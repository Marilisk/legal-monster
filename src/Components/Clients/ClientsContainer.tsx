import { useEffect } from 'react';
import { Clients } from './Clients';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchGetClients } from '../../redux/clientsSlice';
import { LoadingStatusEnum } from '../../types/userTypes';
import { fetchGetMyStaff } from '../../redux/staffSlice';
import { LoadingDotsPreloader } from '../../assets/LoadingDots/LoadingDotsPreloader';


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

    const canSeeOtherClients = useAppSelector(s => s.auth.loginData.data?.powers.canSeeOtherClients)

    useEffect(() => {
        dispatch(fetchGetClients())
        if (isOwner || canChangeResponsibleUser) {
            dispatch(fetchGetMyStaff('manager'))
            dispatch(fetchGetMyStaff('lawyer'))
        }
    }, [isOwner, canChangeResponsibleUser])

    if (isLoading ) {
        return <LoadingDotsPreloader />
    }

    const filteredClients = (isOwner || canSeeOtherClients) ?  // а это вообще не бэк должен фильтровать?
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