import { FC, useState } from 'react'
import c from './InfoPart.module.scss'
import { IClient, IContactPerson } from '../../../../../types/clientsTypes'
import { EditIcon } from '../../../../../assets/Icons/EditIcon'
import { formatDate } from '../../../../../assets/functions/formatDate'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import { fetchEditClient, setWasAnyClientFieldChangedFlag, syncEditClient } from '../../../../../redux/clientsSlice'
import { Form, Formik } from 'formik'
import { LoadingStatusEnum } from '../../../../../types/userTypes'
import { RadioBtnsGroup } from '../../../../../assets/input elements/RadioBtnsGroup/RadioBtnsGroup'
import FormTextField from '../../../../../assets/input elements/formTextField/FormTextField'
import { basicLengthValidate, flInnValidate, ulInnValidate } from '../../../../Calendar/AddEventForm/validateForm'
import ContactsFieldArray from '../../../../../assets/input elements/сreateFieldArray/ContactsFieldArray'
import { Button } from '../../../../../assets/input elements/button/Button'
import { spotIfAnyFormFieldChanged } from '../../../../../assets/functions/spotIfAnyFieldChanged'
import StaffGroup from '../StaffGroup/StaffGroup'
import PipeLineSelector from '../PipeLineSelector/PipeLineSelector'
import NotesArray from '../NotesArray/ActivityArray'


interface IInfoPartProps {
    client: IClient
    // setEditMode: () => void
}

const InfoPart: FC<IInfoPartProps> = ({ client, /* setEditMode */ }: IInfoPartProps) => {

    const dispatch = useAppDispatch()
    const wasAnyFieldChangedFlag = useAppSelector(s => s.clients.wasAnyClientFieldChangedFlag)
    const [editMode, setEditMode] = useState(false)
    const clientContactsLength = client.contactPersons.length
    const myManagers = useAppSelector(s => s.staff.managers.items)
    const myLawyers = useAppSelector(s => s.staff.lawyers.items)
    const isOwner = useAppSelector(s => s.auth.loginData.data?.role === 'owner')
    const canChangeResponsibleUser = useAppSelector(s => s.auth.loginData.data?.powers.canChangeResponsibleUser)


    
    const loadingStatus = useAppSelector(s => s.clients.clients.status)

    const setIfAnyFieldChangedFlag = (v: boolean) => {
        dispatch(setWasAnyClientFieldChangedFlag(v))
    }

    const initialValues = {
        _id: client._id,
        name: client.name,
        form: client.form,
        INNnumber: client.INNnumber,
        contactPersons: client.contactPersons,
        phase: client.phase.number,
        contracts: client.contracts,
        projects: client.projects,
        events: client.events,
        notes: client.notes,
    }

    return (
        <div className={c.leftInfoPart} >
            <div className={c.header}>
                <h2>Клиент</h2>
                <button onClick={() => setEditMode(!editMode)} type='button'>
                    <EditIcon color='#69BFAF' size={20} />
                </button>
            </div>
            <div>
                {client.contactPersons.map((person, i) => (
                    <div key={i}>
                        <div>{person.name}</div>
                        <div>{person.job}</div>
                        <div>{person.phone}</div>
                    </div>
                ))}
            </div>
            <div>
                <p>создан: </p>
                {formatDate(new Date(Date.parse(client.createdAt))) }
            </div>


             {editMode &&
                <Formik initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={(values, actions) => {
                        dispatch(fetchEditClient(client))
                        if (loadingStatus === LoadingStatusEnum.loaded) {
                            actions.resetForm()
                        }
                    }}>

                    {props => (
                        <Form onChange={(e: React.ChangeEvent<HTMLFormElement>) => {
                            props.handleChange(e)
                            if (!e.target.name.includes('contactPersons')) {
                                dispatch(syncEditClient({
                                    _id: client._id, fieldName: e.target.name,
                                    values: (e.nativeEvent.target as HTMLFormElement).value
                                }))
                            }
                        }}>

                            <div className={c.formBodyWrap}>

                                {wasAnyFieldChangedFlag && <div>WAS CHANGED</div>}

                                <div className={editMode ? c.block : c.hiddenBlock}>
                                    <RadioBtnsGroup values={['юридическое лицо', 'индивидуальный предприниматель', 'физическое лицо']}
                                        chosenValue={props.values.form}
                                        name='form' />
                                </div>

                                <div className={editMode ? c.block : c.hiddenBlock}>
                                    <FormTextField name="name" value={props.values.name}
                                        label={props.values.form === 'физическое лицо' ? 'имя' : 'наименование'}
                                        error={props.errors.name}
                                        validate={(value) => basicLengthValidate(value, 3)}
                                        touched={props.touched.name} />
                                    {props.values.form !== 'физическое лицо' &&
                                        <FormTextField name="INNnumber" value={props.values.INNnumber} label='ИНН'
                                            error={props.errors.INNnumber}
                                            validate={props.values.form === 'юридическое лицо' ? ulInnValidate : flInnValidate}
                                            touched={props.touched.INNnumber} />
                                    }
                                </div>

                                {props.values.form !== 'физическое лицо' ?
                                    <div className={editMode ? c.block : c.hiddenBlock}>
                                        <ContactsFieldArray name="contactPersons"
                                            array={props.values.contactPersons}
                                            title='Контакты'
                                            clientContactsLength={clientContactsLength}
                                            syncEdit={(values: IContactPerson[]) => dispatch(syncEditClient({ _id: client._id, fieldName: 'contactPersons', values }))}
                                        />
                                    </div>
                                    :
                                    <div>{ props.values.contactPersons[0].phone }</div>
                                }

                                <div className={c.btnsContainer}>
                                    <Button type="submit"
                                        disabled={Boolean(Object.keys(props.errors).length)
                                            || !spotIfAnyFormFieldChanged(props.initialValues, props.values, wasAnyFieldChangedFlag, setIfAnyFieldChangedFlag)} >
                                        <span>сохранить</span>
                                    </Button>
                                </div>
                            </div>

                        </Form>
                    )}
                </Formik>
            } 


            {Boolean(myManagers.length) && (canChangeResponsibleUser || isOwner)
                &&
                <div className={editMode ? c.block : c.hiddenBlock}>
                    <StaffGroup name="managers"
                        valuesArray={client.managers}
                        variantsArray={myManagers}
                        title='Ответственные менеджеры'
                        clientId={client._id}
                        editMode={editMode}
                    />
                </div>
            }

            {Boolean(myLawyers.length) && (canChangeResponsibleUser || isOwner)
                &&
                
                    <StaffGroup name="lawyers"
                        valuesArray={client.lawyers}
                        variantsArray={myLawyers}
                        title='Ответственные юристы'
                        //setFieldValue={props.setFieldValue}
                        clientId={client._id}
                        editMode={editMode}
                    />
                
            }

            <div className={!editMode ? c.block : c.hiddenBlock}>
                <PipeLineSelector value={client.phase.number}
                    setIfAnyFieldChangedFlag={wasAnyFieldChangedFlag ? undefined : setIfAnyFieldChangedFlag}
                    setFieldValue={(value: number) => dispatch(syncEditClient({ _id: client._id, fieldName: 'phase', values: { number: value, assignDateTimestamp: Date.now() } }))} />
            </div> 

           
            
        </div>
    )
}

export default InfoPart