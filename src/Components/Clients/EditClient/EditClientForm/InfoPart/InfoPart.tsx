import { FC, useState } from 'react'
import c from './InfoPart.module.scss'
import { IClient } from '../../../../../types/clientsTypes'
import { EditIcon } from '../../../../../assets/Icons/EditIcon'
import { formatDate } from '../../../../../assets/functions/formatDate'
import { useAppSelector } from '../../../../../redux/hooks'
import { LoadingStatusEnum } from '../../../../../types/userTypes'
import StaffGroup from '../StaffGroup/StaffGroup'
import { Collapse, IconButton, Paper } from '@mui/material'
import { CloseButton } from '../../../../../assets/input elements/CloseButton/CloseButton'
import ContactsList from './components/ContactsList'
import { selectIsOwner } from '../../../../../redux/authSlice'
import EditClientDataForm from './components/EditClientDataForm'
import ContactsFieldArray from '../../../../../assets/input elements/сreateFieldArray/ContactsFieldArray'
import { LoadingDots } from '../../../../../assets/LoadingDots/LoadingDots'



interface IInfoPartProps {
    client: IClient
}

const InfoPart: FC<IInfoPartProps> = ({ client }: IInfoPartProps) => {

    const [editMode, setEditMode] = useState(false)
    const isOwner = useAppSelector(selectIsOwner)
    const isLoading = useAppSelector(s => s.clients.clients.status === LoadingStatusEnum.loading)

    const {
        wasAnyFieldChangedFlag,
        myManagers,
        myLawyers,
        canChangeResponsibleUser,
        wereManagersLoaded,
        wereLawyersLoaded,
    } = useAppSelector(s => ({
        wasAnyFieldChangedFlag: s.clients.wasAnyClientFieldChangedFlag,
        myManagers: s.staff.managers.items,
        myLawyers: s.staff.lawyers.items,
        canChangeResponsibleUser: s.auth.loginData.data?.powers.canChangeResponsibleUser,
        wereManagersLoaded: s.staff.managers.status === LoadingStatusEnum.loaded,
        wereLawyersLoaded: s.staff.lawyers.status === LoadingStatusEnum.loaded,
    }))

    // if (!isLoading) return <LoadingDots />

    return (
        <div className={c.leftInfoPart} >
            {
                isLoading ?
                    <LoadingDots />
                    :
                    <>
                        <Paper>
                            <div className={c.header}>
                                <h2>Клиент</h2>
                                <IconButton onClick={() => setEditMode(!editMode)} >
                                    <EditIcon color='#69BFAF' size={20} />
                                </IconButton>
                                <CloseButton />
                            </div>
                            <ContactsList contactPersons={client.contactPersons} />
                            <div>
                                <p>создан: </p>
                                {formatDate(new Date(Date.parse(client.createdAt)))}
                            </div>

                            <Collapse in={editMode}>
                                <EditClientDataForm
                                    client={client}
                                    wasAnyFieldChangedFlag={wasAnyFieldChangedFlag}
                                />
                            </Collapse>

                        </Paper>

                        {client.form !== 'физическое лицо' &&
                            <ContactsFieldArray
                                clientId={client._id}
                                array={client.contactPersons}
                                title='Контакты'
                                clientContactsLength={client.contactPersons.length}
                            />
                        }

                        {wereManagersLoaded && (canChangeResponsibleUser || isOwner)
                            &&
                            <StaffGroup name="managers"
                                valuesArray={client.managers}
                                variantsArray={myManagers}
                                title='Ответственные менеджеры'
                                clientId={client._id}
                            />
                        }

                        {wereLawyersLoaded && (canChangeResponsibleUser || isOwner)
                            &&
                            <StaffGroup name="lawyers"
                                valuesArray={client.lawyers}
                                variantsArray={myLawyers}
                                title='Ответственные юристы'
                                clientId={client._id}
                            />
                        }
                    </>
            }
        </div>
    )
}

export default InfoPart