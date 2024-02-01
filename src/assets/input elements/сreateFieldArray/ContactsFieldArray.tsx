import { useState } from 'react';
import { Field, FieldArray } from "formik"
import c from './ContactsFieldArray.module.scss';
import { IContactPerson } from '../../../types/clientsTypes';
import ReactInputMask from 'react-input-mask';
import { NoBorderButton } from '../NoBorderButton/NoBorderButton';
import { DoneIcon } from '../../Icons/DoneIcon';
import { Button } from '../button/Button';
import { CancelButton } from '../CancelButton/CancelButton';

interface ICreateFieldArrayProps {
    name: string
    array: IContactPerson[]
    title: string
    syncEdit: (arg: IContactPerson[]) => void
    clientContactsLength: number
}


const  ContactsFieldArray =  ({ name, array, title, syncEdit, clientContactsLength }: ICreateFieldArrayProps) => {

    const [isBtnHovered, setIsBtnHovered] = useState<number | undefined>()
    
    let wasAnythAdded = clientContactsLength === array.length

    return <div className={c.arrayWrapper}>
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
                        array.length > 0 &&
                        array.map((elem, index) => {

                            const isNew = index >= clientContactsLength

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
                                <Field name={`${name}.${index}.job`} type="text" placeholder='должность' />
                                <Field name={`${name}.${index}.note`} type="text" placeholder='примечание' />

                                <NoBorderButton type='button' small={true} callBack={() => syncEdit(array)}
                                    visible={isNew} >
                                    <DoneIcon />
                                </NoBorderButton>

                                <CancelButton callBack={() => {
                                        remove(index)
                                        const newArr = [...array]
                                        newArr.splice(index, 1)
                                        syncEdit(newArr)
                                    }}
                                    visible={isBtnHovered === index} />

                            </div>
                        })
                    }
                </div>
            </>}
        </FieldArray>
    </div>

}

export default ContactsFieldArray