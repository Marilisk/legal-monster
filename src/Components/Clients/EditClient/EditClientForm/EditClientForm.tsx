import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import PopupHeader from '../../../../assets/PopupWrapper/PopupWrapper';
import c from './EditClientForm.module.scss'
import { IClient } from '../../../../types/clientsTypes';
import { fetchDeleteClient, fetchEditClient, setWasAnyClientFieldChangedFlag } from '../../../../redux/clientsSlice';
import { LoadingStatusEnum } from '../../../../types/userTypes';
import ContactsPresenter from '../../../../assets/ContactsPresenter/ContactsPresenter';
import InfoPart from './InfoPart/InfoPart';
import { Tabs } from '../../../../assets/Tabs/Tabs';
import MainClientTab from './MainClientTab/MainClientTab';
import ClientCasesTab from './ClientCasesTab/ClientCasesTab';

interface IEditClientFormProps {
    client: IClient
    //handleCloseEditClientPopup: () => void
    //salesPipeline: SalesPhaseType[]
}

const EditClientForm: FC<IEditClientFormProps> = ({ client }: IEditClientFormProps) => {

    const dispatch = useAppDispatch()
    const wasAnyFieldChangedFlag = useAppSelector(s => s.clients.wasAnyClientFieldChangedFlag)
    const [editMode, setEditMode] = useState(false)
    
    const loadingStatus = useAppSelector(s => s.clients.clients.status)

    const setIfAnyFieldChangedFlag = (v: boolean) => {
        dispatch(setWasAnyClientFieldChangedFlag(v))
    }

    const closeAndSaveEditClientPopup = async () => {
        if (wasAnyFieldChangedFlag) {
            const response = await dispatch(fetchEditClient(client))
            if (response.meta.requestStatus === 'fulfilled') {
                setIfAnyFieldChangedFlag(false)
            }
        }
    }

    const deleteClient = () => {
        dispatch(fetchDeleteClient(client._id))
    }

    if (loadingStatus === LoadingStatusEnum.loading) return <h1>Loading</h1>
    if (loadingStatus === LoadingStatusEnum.error) return <h1>Ошибка сохранения</h1>


    return <div className={c.wrap}>
        <PopupHeader title={`${client.name}`}
            handleDelete={deleteClient}
            content={<ContactsPresenter contacts={client.contactPersons} />}
            id='editClientPopup'
        />
        <div className={c.flexWrap}>

            <InfoPart client={client} />

            <Tabs tabsArray={[
                {
                    name: 'клиент',
                    component: <MainClientTab 
                        client={client}
                        /* editMode={editMode}
                        wasAnyFieldChangedFlag={wasAnyFieldChangedFlag}
                        setIfAnyFieldChangedFlag={setIfAnyFieldChangedFlag}
                        loadingStatus={loadingStatus} */
                    />
                },

                {
                    name: 'Лента',
                    component: <MainClientTab 
                        client={client}
                        /* editMode={editMode}
                        wasAnyFieldChangedFlag={wasAnyFieldChangedFlag}
                        setIfAnyFieldChangedFlag={setIfAnyFieldChangedFlag}
                        loadingStatus={loadingStatus} */
                    />
                },

                {
                    name: 'Связанные дела',
                    component: <ClientCasesTab 
                        client={client}
                        /* editMode={editMode}
                        wasAnyFieldChangedFlag={wasAnyFieldChangedFlag}
                        setIfAnyFieldChangedFlag={setIfAnyFieldChangedFlag}
                        loadingStatus={loadingStatus} */
                    />
                },


                
            ]} />

        </div>
    </div>
};

export default React.memo(EditClientForm);

