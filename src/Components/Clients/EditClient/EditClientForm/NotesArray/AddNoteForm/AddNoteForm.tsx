import { FC, useState } from 'react';
import { INote, PriorityType } from '../../../../../../types/clientsTypes';
import { Formik, Form } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';
import { fetchCreateNote, syncEditClient } from '../../../../../../redux/clientsSlice';
import FormTextField from '../../../../../../assets/input elements/formTextField/FormTextField';
import { basicLengthValidate } from '../../../../../Calendar/AddEventForm/validateForm';
import { Button } from '../../../../../../assets/input elements/button/Button';
import c from './AddNoteForm.module.scss'
import { CancelButton } from '../../../../../../assets/input elements/CancelButton/CancelButton';
import { formatDate } from '../../../../../../assets/functions/formatDate';
import DateTimePicker from '../../../../../../assets/input elements/DateTimePicker/DateTimePicker';
import { handleOpenDatePicker } from '../../../../../Calendar/AddEventForm/AddEventForm';
import { DateRangeIcon } from '../../../../../../assets/Icons/DateRangeIcon';
import { spotIfAnyFormFieldChanged } from '../../../../../../assets/functions/spotIfAnyFieldChanged';
import Selector from '../../../../../../assets/input elements/Selector/Selector';
import { getPriorityText } from '../getPriorityText';
import { PriorityIcon } from '../../../../../../assets/Icons/PriorityIcon';

interface IAddNoteFormProps {
    array: INote[]
    fullName: string
    authorId: string
    clientId: string
    setFormVisible: (arg: boolean) => void
}


const AddNoteForm: FC<IAddNoteFormProps> = ({ array, fullName, authorId, clientId, setFormVisible }: IAddNoteFormProps) => {

    const dispatch = useAppDispatch()
    const [wasAnyFieldChangedFlag, setIfAnyFieldChangedFlag] = useState(false)

    const datePickerPopUp = useAppSelector(s => s.calendar.datePickerPopUp)

    const [deadLine, setDeadLine] = useState(Date.now())

    const initialValues = {
        title: '', text: '', priority: 'low',
        author: { fullName, authorId },
    }

    return (
        <div className={c.wrap} onClick={(e) => handleOpenDatePicker(e, dispatch)}>
            <Formik initialValues={initialValues}
                /*  enableReinitialize={true} */
                onSubmit={(values, actions) => {
                    dispatch(fetchCreateNote( { ...values, deadLine, isDone: false, clientId } as INote ))
                    /* dispatch(syncEditClient({
                        _id: clientId, fieldName: 'notes',
                        values: [...array, { ...values, deadLine, isDone: false, }]
                    })) */
                    actions.resetForm()
                    setFormVisible(false)
                }}>

                {props => (
                    <Form>
                        <div className={c.header}>
                            <h3>Новое событие:</h3>
                            <CancelButton callBack={() => setFormVisible(false)} />
                        </div>

                        <div className={c.firstLine}>
                            <FormTextField value={props.values.title}
                                label='заголовок'
                                name='title' error={props.errors.title} touched={props.touched.title}
                                validate={(v) => basicLengthValidate(v, 3)} />

                            <Selector title='приоритет' chosenValue={{ systemValue: props.values.priority, title: getPriorityText(props.values.priority as PriorityType).text }}
                                values={[{ title: 'высокий', systemValue: 'high' }, { title: 'средний', systemValue: 'middle' }, { title: 'низкий', systemValue: 'low' },]}
                                onChange={(value: string) => props.setFieldValue('priority', value)}
                                icon={<PriorityIcon size='26px' />} />
                        </div>

                        <FormTextField value={props.values.text}
                            label='дополнительно'
                            name='text' />

                        <div className={c.lineWrap} id="deadLine">
                            <label className={c.label}>
                                <DateRangeIcon />
                                {deadLine && formatDate(new Date(deadLine))}
                            </label>

                            <DateTimePicker currentDate={new Date(deadLine)}
                                setValue={(f, v) => {
                                    //console.log('deadLine', new Date(deadLine))
                                    setDeadLine(v.getTime())
                                }}
                                fieldName='deadLine '
                                showDataPicker={datePickerPopUp.id === 'deadLine'}
                                top={-406}
                            />

                        </div>

                        <Button type='submit'
                            visible={spotIfAnyFormFieldChanged(props.initialValues, props.values, wasAnyFieldChangedFlag, setIfAnyFieldChangedFlag)}
                            disabled={Boolean(Object.keys(props.errors).length)} >
                            <span>сохранить</span>
                        </Button>

                    </Form>
                )}
            </Formik>

        </div>
    );
};

export default AddNoteForm;