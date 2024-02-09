import { useState } from 'react';
import { Field, FieldArray, Form, Formik } from "formik"
import c from './ContactsFieldArray.module.scss';
import { IContactPerson } from '../../../types/clientsTypes';
import ReactInputMask from 'react-input-mask';
import { NoBorderButton } from '../NoBorderButton/NoBorderButton';
import { DoneIcon } from '../../Icons/DoneIcon';
import { Button } from '../button/Button';
import { CancelButton, CancelButtonWithConfirm } from '../CancelButton/CancelButton';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchEditClient, setWasAnyClientFieldChangedFlag, syncEditClient } from '../../../redux/clientsSlice';
import { Box, Paper } from '@mui/material';
import DoneButton from '../DoneButton/DoneButton';
import { appearingBtnStyles } from '../DeleteButton/DeleteButton';

interface ICreateFieldArrayProps {
    array: IContactPerson[]
    title: string
    clientContactsLength: number
    clientId: string
}


const ContactsFieldArray = ({ array, title, clientId, clientContactsLength }: ICreateFieldArrayProps) => {

    const wasAnyFieldChangedFlag = useAppSelector(s => s.clients.wasAnyClientFieldChangedFlag)

    const [isBtnHovered, setIsBtnHovered] = useState<number | undefined>()

    let wasAnythAdded = clientContactsLength === array.length

    const dispatch = useAppDispatch()

    const syncEdit = (values: IContactPerson[]) => {
        dispatch(syncEditClient({
            _id: clientId, fieldName: 'contactPersons',
            values
        }))
    }

    const name = 'persons'

    return <Paper sx={{ mt: 2 }}>
        <div>
            <Formik initialValues={{ persons: array }}
                onSubmit={(values, actions) => {
                    console.log(values)
                    dispatch(fetchEditClient({ _id: clientId, contactPersons: values.persons }))
                }}

                render={({ values }) => (

                    <Form onChange={() => dispatch(setWasAnyClientFieldChangedFlag(true))}>
                        <FieldArray name={name}>

                            {({ insert, remove, push }) => <>

                                <div className={c.header} >
                                    <h3>{title}</h3>
                                    <Button type="button" visible={wasAnythAdded}
                                        callBack={() => {
                                            push({ name: '', phone: '', email: '', job: '', note: '', isMain: false, preferredMethod: 'phone', })
                                            //syncEdit(array)
                                        }} >
                                        <span>добавить</span>
                                    </Button>
                                </div>

                                <div onMouseLeave={() => setIsBtnHovered(undefined)}
                                    className={c.grid} >

                                    {
                                        values.persons.length > 0 &&
                                        values.persons.map((elem, index) => {

                                            const isNew = index > clientContactsLength

                                            return <div key={index} className={c.line}
                                                onMouseOver={() => setIsBtnHovered(index)}>
                                                <Field name={`${name}.${index}.name`} type="text" placeholder='имя' /* onChange={} */ />
                                                <Field name={`${name}.${index}.phone`}>
                                                    {({ field }: { field: any }) => (
                                                        <ReactInputMask mask='+7 (999) 999 99 99' maskChar='*'
                                                            onChange={field.onChange}
                                                            name={field.name}
                                                            value={field.value}
                                                            placeholder='телефон' />
                                                    )}
                                                </Field>

                                                <Box sx={() => appearingBtnStyles(!!values.persons[index].job?.length || isBtnHovered === index)}>
                                                    <Field name={`${name}.${index}.job`} type="text" placeholder='должность' />
                                                </Box>

                                                <Box sx={() => appearingBtnStyles(!!values.persons[index].note?.length || isBtnHovered === index)}>
                                                    <Field name={`${name}.${index}.note`} type="text" placeholder='примечание' />
                                                </Box>

                                                <div className={c.cancelBtnWrap}>
                                                    <CancelButtonWithConfirm
                                                        confirmTitle='Удалить контакт?'
                                                        confirmBtnText='удалить'
                                                        cancleBtnText='оставить'
                                                        callBack={() => {
                                                            remove(index)
                                                            const newArr = [...array]
                                                            newArr.splice(index, 1)
                                                            syncEdit(newArr)
                                                        }}
                                                        visible={isBtnHovered === index} />
                                                </div>

                                            </div>
                                        })
                                    }
                                </div>
                            </>}
                        </FieldArray>

                        {wasAnyFieldChangedFlag &&
                            <Button type='submit'>
                                сохранить
                            </Button>}
                    </Form>
                )}
            />
        </div>
    </Paper>
}

export default ContactsFieldArray