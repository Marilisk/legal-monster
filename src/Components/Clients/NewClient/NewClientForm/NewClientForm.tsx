import { FC, useState } from 'react';
import { useAppDispatch } from '../../../../redux/hooks';
import { RadioBtnsGroup } from '../../../../assets/input elements/RadioBtnsGroup/RadioBtnsGroup';
import FormTextField from '../../../../assets/input elements/formTextField/FormTextField';
import { Button } from '../../../../assets/input elements/button/Button';
import c from './NewClientForm.module.scss'
import impc from './../../../../assets/input elements/formTextField/FormTextField.module.scss'
import { basicLengthValidate, flInnValidate, ulInnValidate } from '../../../Calendar/AddEventForm/validateForm';
import { fetchCreateClient } from '../../../../redux/clientsSlice';
import InputMask from 'react-input-mask';
import PipeLineSelector from '../../EditClient/EditClientForm/PipeLineSelector/PipeLineSelector';
import { Controller, useForm } from "react-hook-form";

interface INewClientFrom {
    test?: string
}

export const NewClientForm: FC<INewClientFrom> = ({ test }: INewClientFrom) => {

    const dispatch = useAppDispatch()

    const initialValues = {
        name: '',
        form: 'юридическое лицо',
        INNnumber: '',
        contactPersonName: '',
        contactPersonPhone: '',
        contactPersonJob: '',
        contactPersonNote: '',
        phase: {
            number: 1,
            assignDateTimestamp: 0,
        },
        managers: [],
        lawyers: [],
        contracts: [],
        projects: [],
        events: [],
    }

    type ValuesType = typeof initialValues

    const [values, setValues] = useState(initialValues)

    const handleChange = (
        field: keyof ValuesType,
        value: ValuesType[keyof ValuesType]
    ) => {
        setValues({
            ...values, [field]: value,
        })

    }

    const onSubmit = (values: ValuesType) => {
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
            phase: { number: values.phase.number, assignDateTimestamp: values.phase.assignDateTimestamp },
            managers: [],
            lawyers: [],
            contracts: [],
            projects: [],
            events: [],
            notes: [],
        }
        dispatch(fetchCreateClient(payload))
        setValues(initialValues)
    }

    const { register, handleSubmit, watch, formState: { errors }, control } = useForm({
        defaultValues: initialValues,

    })


    return <div className={c.wrap}>
        <form onSubmit={handleSubmit((data) => {
            console.log('onSubmit', data)
        })}>
            <div className={c.formBodyWrap}>


                <input {...register('name')} />

                <RadioBtnsGroup values={['юридическое лицо', 'индивидуальный предприниматель', 'физическое лицо']}
                    chosenValue={values.form}
                    name='form'
                    onChange={(v) => handleChange('form', v)}
                />

                {values.form !== 'физическое лицо' &&
                    <>

                        <Controller
                            control={control}
                            name='INNnumber'
                            render={({ field }) => <FormTextField
                                label='ИНН'
                                {...field}

                            // value={values.INNnumber} 
                            // validate={values.form === 'юридическое лицо' ? ulInnValidate : flInnValidate}
                            // onChange={(v) => handleChange('INNnumber', v)}
                            />}
                        />
                        {/* <FormTextField name="INNnumber" value={values.INNnumber} label='ИНН'
                            // error={errors.INNnumber}
                            validate={values.form === 'юридическое лицо' ? ulInnValidate : flInnValidate}
                            // touched={touched.INNnumber}
                            onChange={(v) => handleChange('INNnumber', v)}
                        /> */}
                    </>
                }

                <FormTextField name="name" value={values.name}
                    label={values.form === 'физическое лицо' ? 'имя' : 'наименование'}
                    // error={errors.name}
                    validate={(value) => basicLengthValidate(value, 3)}
                    // touched={touched.name}
                    onChange={(v) => handleChange('form', v)}
                />

                {values.form !== 'физическое лицо' &&
                    <>
                        <h2>Контактное лицо:</h2>
                        <FormTextField
                            value={values.contactPersonName}
                            label='имя'
                            onChange={(v) => handleChange('contactPersonName', v)}
                        />
                    </>
                }

                <div className={impc.lineWrap}>
                    <label>
                        <InputMask mask='+7 (999) 999 99 99' maskChar='*'
                            onChange={(e) => handleChange('contactPersonPhone', e.target.value)}
                            name='contactPersonPhone'
                            value={values.contactPersonPhone} />
                        <span className={values.contactPersonPhone.length > 0 ? impc.hangedLabel : undefined} >
                            телефон
                        </span>
                    </label>
                </div>

                {/* сюда еще селект с менеджерами и юристами надо */}
                <PipeLineSelector value={values.phase.number}
                    // clientId={null}
                    onChange={(v) => handleChange('phase', v)}
                />

                {/* и селект с свыбором ответственного сотрудника если роль руководителя */}

                <div className={c.btnsContainer}>
                    <Button type="submit"/*  disabled={Boolean(errors)} */>
                        <span>добавить</span>
                    </Button>
                </div>
            </div>
        </form>
    </div>
}