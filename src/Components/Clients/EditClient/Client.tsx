import { FC, useEffect } from 'react'
import c from './Client.module.scss'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { LoadingStatusEnum } from '../../../types/userTypes';
import PopupHeader from '../../../assets/PopupWrapper/PopupWrapper';
import ContactsPresenter from '../../../assets/ContactsPresenter/ContactsPresenter';
import InfoPart from './EditClientForm/InfoPart/InfoPart';
import { Tabs } from '../../../assets/Tabs/Tabs';
import { fetchDeleteClient, fetchGetOneClient } from '../../../redux/clientsSlice';
import MainClientTab from './EditClientForm/MainClientTab/MainClientTab';
import ClientCasesTab from './EditClientForm/ClientCasesTab/ClientCasesTab';
import { LoadingDotsPreloader } from '../../../assets/LoadingDots/LoadingDotsPreloader';

interface IClientProps {
    clientId: string
}

const Client: FC<IClientProps> = ({ clientId }: IClientProps) => {

    const dispatch = useAppDispatch()

    const client = useAppSelector(s => s.clients.clients.items.find(c => c._id === clientId))
    const isLoading = useAppSelector(s => s.clients.clients.status === LoadingStatusEnum.loading)

    useEffect(() => {
        if (!client) {
            dispatch(fetchGetOneClient(clientId))
        }
    }, [clientId])

    if (isLoading) return <LoadingDotsPreloader />
    if (!client) {
        return <div>NO client</div>
    }

    return <>
        <PopupHeader title={`${client.name}`}
            handleDelete={() => dispatch(fetchDeleteClient(client._id))}
            content={<ContactsPresenter contacts={client.contactPersons} />}
            id='editClientPopup'
        />
        <div className={c.flexWrap}>

            <InfoPart client={client} /* setEditMode={() => setEditMode(!editMode)} */ />

            <Tabs tabsArray={
                [
                    {
                        name: 'клиент',
                        component: <MainClientTab
                            client={client}
                        />
                    },

                    /*  {
                         name: 'Лента',
                         component: <MainClientTab 
                             client={client}
                             editMode={editMode}
                             wasAnyFieldChangedFlag={wasAnyFieldChangedFlag}
                             setIfAnyFieldChangedFlag={setIfAnyFieldChangedFlag}
                             loadingStatus={loadingStatus}
                         />
                     }, */

                    {
                        name: 'Связанные дела',
                        component: <ClientCasesTab
                            client={client}
                        />
                    },

                ]} />

        </div>
    </>

};

export default Client;
