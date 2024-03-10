import { FC, useEffect } from 'react'
import c from './Client.module.scss'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { LoadingStatusEnum } from '../../../types/userTypes';
import ContactsPresenter from '../../../assets/ContactsPresenter/ContactsPresenter';
import InfoPart from './EditClientForm/InfoPart/InfoPart';
import { Tabs } from '../../../assets/Tabs/Tabs';
import { fetchGetOneClient } from '../../../redux/clientsSlice';
import MainClientTab from './EditClientForm/MainClientTab/MainClientTab';
import ClientCasesTab from './EditClientForm/ClientCasesTab/ClientCasesTab';
import { LoadingDotsPreloader } from '../../../assets/LoadingDots/LoadingDotsPreloader';
import { Paper, Typography } from '@mui/material';
import PipeLineSelector from './EditClientForm/PipeLineSelector/PipeLineSelector';

interface IClientProps {
    clientId: string
}

const Client: FC<IClientProps> = ({ clientId }: IClientProps) => {

    const dispatch = useAppDispatch()

    const client = useAppSelector(s => s.clients.clients.items.find(c => c._id === clientId))

    useEffect(() => {
        if (!client) {
            dispatch(fetchGetOneClient(clientId))
        }
    }, [clientId])

    // if (isLoading) return <LoadingDotsPreloader />
    if (!client) {
        return <div>No client</div>
    }

    return <>
        <Paper sx={{ mt: 2, mb: 2 }}>
            <Typography variant='h2'>{client.name}</Typography>
            <ContactsPresenter contacts={client.contactPersons} />

            <PipeLineSelector value={client.phase.number}
                clientId={client._id}
            />
        </Paper>
        <div className={c.flexWrap}>

            <InfoPart client={client} />

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
