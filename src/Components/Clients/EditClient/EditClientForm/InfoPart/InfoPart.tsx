import { FC, useState } from 'react'
import c from './InfoPart.module.scss'
import { IClient } from '../../../../../types/clientsTypes'
import { EditIcon } from '../../../../../assets/Icons/EditIcon'
import { formatDate } from '../../../../../assets/functions/formatDate'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import { setWasAnyClientFieldChangedFlag, syncEditClient } from '../../../../../redux/clientsSlice'
import { LoadingStatusEnum } from '../../../../../types/userTypes'
import StaffGroup from '../StaffGroup/StaffGroup'
import PipeLineSelector from '../PipeLineSelector/PipeLineSelector'
import { Collapse, IconButton, Paper } from '@mui/material'
import { CloseButton } from '../../../../../assets/input elements/CloseButton/CloseButton'
import ContactsList from './components/ContactsList'
import { selectIsOwner } from '../../../../../redux/authSlice'
import EditClientDataForm from './components/EditClientDataForm'


interface IInfoPartProps {
    client: IClient
}

const InfoPart: FC<IInfoPartProps> = ({ client }: IInfoPartProps) => {

    const dispatch = useAppDispatch()
    const [editMode, setEditMode] = useState(false)
    const isOwner = useAppSelector(selectIsOwner)

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


    const setIfAnyFieldChangedFlag = (v: boolean) => {
        dispatch(setWasAnyClientFieldChangedFlag(v))
    }

    return (
        <div className={c.leftInfoPart} >
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
                        setIfAnyFieldChangedFlag={setIfAnyFieldChangedFlag}
                    />
                </Collapse>

                <PipeLineSelector value={client.phase.number}
                    setIfAnyFieldChangedFlag={wasAnyFieldChangedFlag ? undefined : setIfAnyFieldChangedFlag}
                    setFieldValue={(value: number) => dispatch(syncEditClient({ _id: client._id, fieldName: 'phase', values: { number: value, assignDateTimestamp: Date.now() } }))} />

            </Paper>

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

        </div>
    )
}

export default InfoPart