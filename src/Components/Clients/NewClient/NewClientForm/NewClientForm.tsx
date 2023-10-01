import { FC } from 'react';
import { Form, Formik } from 'formik';
import { useAppDispatch } from '../../../../redux/hooks';
import { RadioBtnsGroup } from '../../../../assets/input elements/RadioBtnsGroup/RadioBtnsGroup';
import FormTextField from '../../../../assets/input elements/formTextField/FormTextField';
import { Button } from '../../../../assets/input elements/button/Button';
import c from './NewClientForm.module.scss'
import impc from './../../../../assets/input elements/formTextField/FormTextField.module.scss'
import PopupHeader from '../../../../assets/popupHeader/PopupHeader';
import { basicLengthValidate, flInnValidate, ulInnValidate } from '../../../Calendar/AddEventForm/validateForm';
import { fetchCreateClient } from '../../../../redux/clientsSlice';
import InputMask from 'react-input-mask';
import { SalesPhaseType } from '../../../../types/clientsTypes';
import PipeLineSelector from '../../EditClient/EditClientForm/PipeLineSelector/PipeLineSelector';


interface INewClientFromProps {
    
}

export const NewClientForm: FC<INewClientFromProps> = ({ }: INewClientFromProps) => {

    const dispatch = useAppDispatch()

    const initialValues = {
        name: '',
        form: 'юридическое лицо',
        INNnumber: '',
        contactPersonName: '',
        contactPersonPhone: '',
        contactPersonJob: '',
        contactPersonNote: '',
        phase: 1,
        managers: [],
        lawyers: [],
        contracts: [],
        projects: [],
        events: [],
    }

    return <div className={c.wrap}>

        <Formik initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={(values, actions) => {
                const payload = {
                    name: values.name,
                    form: values.form,
                    INNnumber: values.INNnumber,
                    contactPersons: [{
                        name: values.contactPersonName,
                        phone: values.contactPersonPhone,
                        job: values.contactPersonJob,
                        note: values.contactPersonNote,
                    }],
                    phase: {number: values.phase,},
                    managers: [],
                    lawyers: [],
                    contracts: [],
                    projects: [],
                    events: [],
                    notes: [],
                }
                dispatch(fetchCreateClient(payload))
                actions.resetForm()
            }}>

            {props => (
                <Form >

                    <PopupHeader title={'Новый клиент'}
                        handleClose={() => {
                            //setShowNewClientPopup(false)
                        }} />

                    <div className={c.formBodyWrap}>

                        <RadioBtnsGroup values={['юридическое лицо', 'индивидуальный предприниматель', 'физическое лицо']}
                            chosenValue={props.values.form}
                            name='form' />

                        {props.values.form !== 'физическое лицо' &&
                            <FormTextField name="INNnumber" value={props.values.INNnumber} label='ИНН'
                                error={props.errors.INNnumber}
                                validate={props.values.form === 'юридическое лицо' ? ulInnValidate : flInnValidate}
                                touched={props.touched.INNnumber} />
                        }

                        <FormTextField name="name" value={props.values.name}
                            label={props.values.form === 'физическое лицо' ? 'имя' : 'наименование'}
                            error={props.errors.name}
                            validate={(value) => basicLengthValidate(value, 3)}
                            touched={props.touched.name} />

                        {props.values.form !== 'физическое лицо' &&
                            <>
                                <h2>Контактное лицо:</h2>
                                <FormTextField name="contactPersonName" value={props.values.contactPersonName} label='имя' />
                            </>
                        }
                     
                        <div className={impc.lineWrap}>
                            <label>
                                <InputMask mask='+7 (999) 999 99 99' maskChar='*'
                                    onChange={props.handleChange}
                                    name='contactPersonPhone'
                                    value={props.values.contactPersonPhone} />
                                <span className={props.values.contactPersonPhone.length > 0 ? impc.hangedLabel : undefined} >
                                    телефон
                                </span>
                            </label>
                        </div>

                        {/* сюда еще селект с менеджерами и юристами надо */}
                        <PipeLineSelector value={props.values.phase}
                            setFieldValue={(value: number) => props.setFieldValue('phase', value)} />

                        {/* и селект с свыбором ответственного сотрудника если роль руководителя */}

                        <div className={c.btnsContainer}>
                            <Button type="submit"/*  disabled={Boolean(props.errors)} */>
                                <span>добавить</span>
                            </Button>
                        </div>
                    </div>

                </Form>
            )}

        </Formik>

    </div>
}