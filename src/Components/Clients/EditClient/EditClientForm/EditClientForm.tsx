import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import PopupHeader from '../../../../assets/popupHeader/PopupHeader';
import { Form, Formik } from 'formik';
import c from './EditClientForm.module.scss'
import { RadioBtnsGroup } from '../../../../assets/input elements/RadioBtnsGroup/RadioBtnsGroup';
import FormTextField from '../../../../assets/input elements/formTextField/FormTextField';
import { basicLengthValidate, flInnValidate, ulInnValidate } from '../../../Calendar/AddEventForm/validateForm';
import { Button } from '../../../../assets/input elements/button/Button';
import { IClient, IContactPerson } from '../../../../types/clientsTypes';
import ContactsFieldArray from '../../../../assets/input elements/сreateFieldArray/ContactsFieldArray';
import { fetchDeleteClient, fetchEditClient, setWasAnyClientFieldChangedFlag, syncEditClient } from '../../../../redux/clientsSlice';
import { LoadingStatusEnum } from '../../../../types/userTypes';
import StaffGroup from './StaffGroup/StaffGroup';
import PipeLineSelector from './PipeLineSelector/PipeLineSelector';
import NotesArray from './NotesArray/NotesArray';
import ContactsPresenter from '../../../../assets/ContactsPresenter/ContactsPresenter';
import { spotIfAnyFormFieldChanged } from '../../../../assets/functions/spotIfAnyFieldChanged';

interface IEditClientFormProps {
    client: IClient
    //handleCloseEditClientPopup: () => void
    //salesPipeline: SalesPhaseType[]
}

const EditClientForm: FC<IEditClientFormProps> = ({ client }: IEditClientFormProps) => {

    const dispatch = useAppDispatch()
    const wasAnyFieldChangedFlag = useAppSelector(s => s.clients.wasAnyClientFieldChangedFlag)
    const [editMode, setEditMode] = useState(false)
    const isOwner = useAppSelector(s => s.auth.loginData.data?.role === 'owner')
    const myManagers = useAppSelector(s => s.staff.managers.items)
    const myLawyers = useAppSelector(s => s.staff.lawyers.items)
    const canChangeResponsibleUser = useAppSelector(s => s.auth.loginData.data?.powers.canChangeResponsibleUser)
    const loadingStatus = useAppSelector(s => s.clients.clients.status)
    const clientContactsLength = client.contactPersons.length

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

    const initialValues = {
        _id: client._id,
        name: client.name,
        form: client.form,
        INNnumber: client.INNnumber,
        contactPersons: client.contactPersons,
        phase: client.phase.number,
        //managers: client.managers,
        //lawyers: client.lawyers,
        contracts: client.contracts,
        projects: client.projects,
        events: client.events,
        notes: client.notes,
    }

    if (loadingStatus === LoadingStatusEnum.loading) return <h1>Loading</h1>
    if (loadingStatus === LoadingStatusEnum.error) return <h1>Ошибка сохранения</h1>


    return <>
        <PopupHeader title={`${client.name}`}
            handleClose={closeAndSaveEditClientPopup}
            handleDelete={deleteClient}
            setEditible={() => setEditMode(!editMode)}
            content={<ContactsPresenter contacts={client.contactPersons} />}
            id='editClientPopup'
        />
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
                                <div>{props.values.contactPersons[0].phone}</div>
                            }

                            {/* {Boolean(myManagers.length) && (canChangeResponsibleUser || isOwner)
                                &&
                                <div className={editMode ? c.block : c.hiddenBlock}>
                                    <StaffGroup name="managers"
                                        valuesArray={props.values.managers}
                                        variantsArray={myManagers}
                                        title='Ответственные менеджеры'
                                        setFieldValue={props.setFieldValue}
                                    />
                                </div>
                            }

                            {Boolean(myLawyers.length) && (canChangeResponsibleUser || isOwner)
                                &&
                                <div className={editMode ? c.block : c.hiddenBlock}>
                                    <StaffGroup name="lawyers"
                                        valuesArray={props.values.lawyers}
                                        variantsArray={myLawyers}
                                        title='Ответственные юристы'
                                        setFieldValue={props.setFieldValue} />
                                </div>
                            } */}

                            <div className={c.btnsContainer}>
                                <Button type="submit"
                                    disabled={Boolean(Object.keys(props.errors).length)
                                        || !spotIfAnyFormFieldChanged(props.initialValues, props.values, wasAnyFieldChangedFlag, setIfAnyFieldChangedFlag)} >
                                    <span>обновить</span>
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
                    //setFieldValue={props.setFieldValue}
                />
            </div>
        }

        {Boolean(myLawyers.length) && (canChangeResponsibleUser || isOwner)
            &&
            <div className={editMode ? c.block : c.hiddenBlock}>
                <StaffGroup name="lawyers"
                    valuesArray={client.lawyers}
                    variantsArray={myLawyers}
                    title='Ответственные юристы'
                    //setFieldValue={props.setFieldValue}
                    clientId={client._id}
                     />
            </div>
        }

        <div className={!editMode ? c.block : c.hiddenBlock}>
            <PipeLineSelector value={client.phase.number}
                setIfAnyFieldChangedFlag={wasAnyFieldChangedFlag ? undefined : setIfAnyFieldChangedFlag}
                setFieldValue={(value: number) => dispatch(syncEditClient({ _id: client._id, fieldName: 'phase', values: { number: value, assignDateTimestamp: Date.now() } }))} />
        </div>


        <div className={!editMode ? c.block : c.hiddenBlock}>
            <NotesArray array={client.notes} title='Активность' clientId={client._id} />
        </div>

    </>
};

export default React.memo(EditClientForm);

