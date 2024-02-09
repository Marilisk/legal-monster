import { FC } from 'react'
import { IClient, IContactPerson } from '../../../../../../types/clientsTypes'
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks'
import { fetchEditClient, syncEditClient } from '../../../../../../redux/clientsSlice'
import { RadioBtnsGroup } from '../../../../../../assets/input elements/RadioBtnsGroup/RadioBtnsGroup'
import FormTextField from '../../../../../../assets/input elements/formTextField/FormTextField'
import CompanySuggester from '../../../../../../assets/CompanySuggester/CompanySuggester'
import { basicLengthValidate, flInnValidate, ulInnValidate } from '../../../../../Calendar/AddEventForm/validateForm'
import { Button } from '../../../../../../assets/input elements/button/Button'
import c from './../InfoPart.module.scss'

interface IProps {
    client: IClient
    wasAnyFieldChangedFlag: boolean
}

const EditClientDataForm: FC<IProps> = ({
    client,
    wasAnyFieldChangedFlag,
}: IProps) => {

    const dispatch = useAppDispatch()

    const loadingStatus = useAppSelector(s => s.clients.clients.status)

    const handleChange = (field: keyof IClient, value: IClient[keyof IClient]) => {
        return dispatch(syncEditClient({
            _id: client._id, fieldName: field,
            values: value
        }))
    }


    return (
        <div>
            <div className={c.formBodyWrap}>

                {wasAnyFieldChangedFlag && <div>WAS CHANGED</div>}

                <RadioBtnsGroup values={['юридическое лицо', 'индивидуальный предприниматель', 'физическое лицо']}
                    chosenValue={client.form}
                    name='form'
                    onChange={(v) => handleChange('form', v)}
                />

                {client.form === 'физическое лицо' ?
                    <FormTextField name="name" value={client.name}
                        label={client.form === 'физическое лицо' ? 'имя' : 'наименование'}
                        validate={(value) => basicLengthValidate(value, 3)}
                        onChange={(v) => handleChange('name', v)}
                    />
                    :
                    <CompanySuggester
                        setFieldValue={(f, v) => handleChange(f, v)}
                        name="name"
                        value={client.name}
                    />
                }

                {client.form !== 'физическое лицо' &&
                    <FormTextField name="INNnumber"
                        value={client.INNnumber}
                        label='ИНН'
                        validate={client.form === 'юридическое лицо' ? ulInnValidate : flInnValidate}
                        onChange={(v) => handleChange('INNnumber', v)}
                    />
                }

                {client.form === 'физическое лицо' && 
                    <div>{client.contactPersons[0].phone}</div>
                }

                <div className={c.btnsContainer}>
                    <Button /* type="submit" */
                        callBack={() => dispatch(fetchEditClient(client))}
                        disabled={!wasAnyFieldChangedFlag} 
                    >
                        <span>сохранить</span>
                    </Button>
                </div>
            </div>


        </div>
    )
}

export default EditClientDataForm