import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import FormTextField from '../../../../assets/input elements/formTextField/FormTextField';
import { Button } from '../../../../assets/input elements/button/Button';
import c from './NewClientForm.module.scss'
import { basicLengthValidate, flInnValidate, ulInnValidate } from '../../../Calendar/AddEventForm/validateForm';
import InputMask from 'react-input-mask';
import PipeLineSelector from '../../EditClient/EditClientForm/PipeLineSelector/PipeLineSelector';
import { Tab, Tabs, Typography } from '@mui/material';
import { ValuesType, initialValues, useCloseModal, useSubmit } from './NewClientFrom.helpers';
import { clientFormsVariants } from '../../../../types/consts';
import { LoadingStatusEnum } from '../../../../types/userTypes';


export const NewClientForm: FC = () => {

    const { isLoading, serverMessage} = useAppSelector(s => ({
        isLoading: s.clients.clients.createClientStatus === LoadingStatusEnum.loading,
        serverMessage: s.clients.clients.serverMessage,
    }))

    const [values, setValues] = useState(initialValues)
    const [isError, setIsError] = useState(false)

    const handleChange = (
        field: keyof ValuesType,
        value: ValuesType[keyof ValuesType]
    ) => {
        setValues({
            ...values, [field]: value,
        })
    }

    const onSubmit = useSubmit(values, setValues)

    useCloseModal(setValues)

    const formValue = clientFormsVariants.indexOf(values.form)


    return <div className={c.wrap}>
        <div className={c.formBodyWrap}>
            {
                serverMessage && <Typography color='error' >
                    {serverMessage}
                </Typography>
            }

            <Tabs value={formValue} >
                {clientFormsVariants.map((form, i) => (
                    <Tab key={i} value={i}
                        onClick={() => handleChange('form', form)}
                        label={form}
                    />
                ))}
            </Tabs>

            {values.form !== 'физическое лицо' &&
                <FormTextField
                    value={values.INNnumber} label='ИНН'
                    validate={values.form === 'юридическое лицо' ? ulInnValidate : flInnValidate}
                    onChange={(v) => handleChange('INNnumber', v)}
                    onErrorDetect={(v) => setIsError(v)}
                />
            }

            <FormTextField value={values.name}
                label={values.form === 'физическое лицо' ? 'имя' : 'наименование'}
                validate={(value) => basicLengthValidate(value, 3)}
                onChange={(v) => handleChange('name', v)}
                onErrorDetect={(v) => setIsError(v)}
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

            <div className={c.phoneInput}>
                <label>
                    <span>
                        телефон
                    </span>
                    <InputMask mask='+7 (999) 999 99 99' maskChar='*'
                        onChange={(e) => handleChange('contactPersonPhone', e.target.value)}
                        name='contactPersonPhone'
                        value={values.contactPersonPhone}

                    />

                </label>
            </div>

            {/* сюда еще селект с менеджерами и юристами надо */}
            <PipeLineSelector value={values.phase.number}
                onChange={(v) => handleChange('phase', v)}
            />

            {/* и селект с свыбором ответственного сотрудника если роль руководителя */}

            <div className={c.btnsContainer}>
                <Button type="submit"
                    callBack={onSubmit}
                    disabled={isError || isLoading}
                >
                    <span>добавить</span>
                </Button>
            </div>
        </div>
    </div>
}