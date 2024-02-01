import React, { FC } from 'react'
import { Form, Formik } from 'formik'
import { IClient, IContactPerson } from '../../../../../../types/clientsTypes'
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks'
import { fetchEditClient, syncEditClient } from '../../../../../../redux/clientsSlice'
import { LoadingStatusEnum } from '../../../../../../types/userTypes'
import { RadioBtnsGroup } from '../../../../../../assets/input elements/RadioBtnsGroup/RadioBtnsGroup'
import FormTextField from '../../../../../../assets/input elements/formTextField/FormTextField'
import CompanySuggester from '../../../../../../assets/CompanySuggester/CompanySuggester'
import { basicLengthValidate, flInnValidate, ulInnValidate } from '../../../../../Calendar/AddEventForm/validateForm'
import ContactsFieldArray from '../../../../../../assets/input elements/сreateFieldArray/ContactsFieldArray'
import { Button } from '../../../../../../assets/input elements/button/Button'
import { spotIfAnyFormFieldChanged } from '../../../../../../assets/functions/spotIfAnyFieldChanged'
import c from './../InfoPart.module.scss'

interface IProps {
    client: IClient
    wasAnyFieldChangedFlag: boolean
    setIfAnyFieldChangedFlag: (v: boolean) => void
}

const EditClientDataForm:FC<IProps> = ({
    client, 
    wasAnyFieldChangedFlag, 
    setIfAnyFieldChangedFlag,
 }:IProps) => {

    const dispatch = useAppDispatch()

    const loadingStatus = useAppSelector(s => s.clients.clients.status)

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
    }


  return (
    <div>
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

                                <div className={c.block}>
                                    <RadioBtnsGroup values={['юридическое лицо', 'индивидуальный предприниматель', 'физическое лицо']}
                                        chosenValue={props.values.form}
                                        name='form' />
                                </div>

                                <div className={c.block}>
                                    {props.values.form === 'физическое лицо' ?
                                        <FormTextField name="name" value={props.values.name}
                                            label={props.values.form === 'физическое лицо' ? 'имя' : 'наименование'}
                                            error={props.errors.name}
                                            validate={(value) => basicLengthValidate(value, 3)}
                                            touched={props.touched.name} />
                                        :
                                        <CompanySuggester
                                            setFieldValue={props.setFieldValue}
                                            name="name"
                                            value={props.values.name}
                                        />
                                    }

                                    {props.values.form !== 'физическое лицо' &&
                                        <FormTextField name="INNnumber"
                                            value={props.values.INNnumber}
                                            label='ИНН'
                                            error={props.errors.INNnumber}
                                            validate={props.values.form === 'юридическое лицо' ? ulInnValidate : flInnValidate}
                                            touched={props.touched.INNnumber} />
                                    }
                                </div>

                                {props.values.form !== 'физическое лицо' ?
                                    <div className={c.block}>
                                        <ContactsFieldArray name="contactPersons"
                                            array={props.values.contactPersons}
                                            title='Контакты'
                                            clientContactsLength={client.contactPersons.length}
                                            syncEdit={(values: IContactPerson[]) => dispatch(syncEditClient({ _id: client._id, fieldName: 'contactPersons', values }))}
                                        />
                                    </div>
                                    :
                                    <div>{props.values.contactPersons[0].phone}</div>
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
 
    </div>
  )
}

export default EditClientDataForm