import { FC, useState } from 'react';
import { ClientActivityType, IActivity, PriorityType } from '../../../../../../types/clientsTypes';
import { Formik, Form } from 'formik';
import { useAppDispatch } from '../../../../../../redux/hooks';
import { fetchCreateNote } from '../../../../../../redux/clientsSlice';
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
import { useGetActivityTitleFromType, getPriorityText } from '../getPriorityText';
import { PriorityIcon } from '../../../../../../assets/Icons/PriorityIcon';
import CheckBox from '../../../../../../assets/input elements/checkbox/CheckBox';
import { Typography } from '@mui/material';
import { useGetInitialValues, useGetPickerValues } from './hooks';

interface IAddNoteFormProps {
    fullName: string
    authorId: string
    clientId: string
    setFormVisible: (arg: boolean) => void
    editibleNote?: IActivity
    fetchEdit?: (arg: IActivity) => void
    type: ClientActivityType
}


const AddNoteForm: FC<IAddNoteFormProps> = ({
    editibleNote,
    fullName,
    authorId,
    clientId,
    setFormVisible,
    fetchEdit,
    type,
}: IAddNoteFormProps) => {

    const dispatch = useAppDispatch()
    const [wasAnyFieldChangedFlag, setIfAnyFieldChangedFlag] = useState(false)

    const {
        localDeadLine,
        localStartTS,
        setDeadLine,
        setStartTS
    } = useGetPickerValues(editibleNote?.startTS, editibleNote?.deadLine)

    const initialValues = useGetInitialValues(
        editibleNote,
        type,
        fullName, authorId,
        localDeadLine, 
        localStartTS,
    )

    const assets = useGetActivityTitleFromType(editibleNote?.type || type)

    return (
        <div className={c.wrap} onClick={(e) => handleOpenDatePicker(e, dispatch)}>
            <Formik initialValues={initialValues}
                enableReinitialize
                onSubmit={(values, actions) => {
                    const payload = {
                        ...values, 
                        isDone: false, clientId,
                        startTS: localStartTS,
                        deadLine: localDeadLine,
                    } as IActivity
                    if (editibleNote && fetchEdit) {
                        fetchEdit(payload)
                    } else {
                        dispatch(fetchCreateNote(payload))
                    }
                    actions.resetForm()
                    setFormVisible(false)
                }} >

                {({ values, errors, touched, setFieldValue, initialValues }) => (
                    <Form>
                        <div className={c.header}>
                            {!editibleNote && <Typography variant='h2'>
                                {'Нов' + assets.ending} {assets.text} :
                            </Typography>}
                            <CancelButton callBack={() => setFormVisible(false)} />
                            type {type}
                        </div>

                        {(values.type === 'meeting' || values.type === 'court') && <div>
                            <CheckBox
                                callback={() => {
                                    const newType = values.type === 'court' ? 'meeting' : 'court'
                                    setFieldValue('type', newType)
                                }}
                                checked={values.type === 'court'} />
                            <span>судебное заседание</span>
                        </div>}

                        <div className={c.firstLine}>

                            <FormTextField value={values.title}
                                label={values.type !== 'note' ? 'заголовок' : undefined}
                                name='title' error={errors.title} touched={touched.title}
                                validate={(v) => basicLengthValidate(v, 3)} />

                            {values.type !== 'note' &&
                                <Selector title='приоритет' chosenValue={{ systemValue: values.priority, title: getPriorityText(values.priority as PriorityType).priorityText }}
                                    values={[{ title: 'высокий', systemValue: 'high' }, { title: 'средний', systemValue: 'middle' }, { title: 'низкий', systemValue: 'low' },]}
                                    onChange={(value: string) => setFieldValue('priority', value)}
                                    icon={<PriorityIcon size='26px' />} />
                            }

                        </div>

                        {values.type !== 'note' &&
                            <FormTextField value={values.text}
                                label='описание'
                                name='text' />}

                        <Button type='submit'
                            visible={spotIfAnyFormFieldChanged(initialValues, values, wasAnyFieldChangedFlag, setIfAnyFieldChangedFlag)}
                            disabled={Boolean(Object.keys(errors).length)} >
                            <span>сохранить</span>
                        </Button>

                    </Form>
                )}
            </Formik>

            {(initialValues.type === 'meeting' || initialValues.type === 'task' || initialValues.type === 'court') &&
                <>
                    <Typography variant='h3' >{assets.datesTitle}</Typography>
                    <div className={c.lineWrap}>

                        {type === 'meeting' &&
                            <>
                                <div className={c.pickerWrap} id="startTS">
                                    <label className={c.label}>
                                        <DateRangeIcon />
                                        {localDeadLine && formatDate(new Date(localStartTS))}
                                    </label>
                                    <DateTimePicker currentDate={new Date(localStartTS)}
                                        setValue={(f, v) => setStartTS(v.getTime())}
                                        fieldName='startTS'
                                        title='начало'
                                        top={-390}
                                    />
                                </div>
                                <span>-</span>
                            </>
                        }

                        <div className={c.pickerWrap} id="deadLine">

                            <label className={c.label}>
                                <DateRangeIcon />
                                {localDeadLine && formatDate(new Date(localDeadLine))}
                            </label>

                            <DateTimePicker currentDate={new Date(localDeadLine)}
                                setValue={(f, v) => setDeadLine(v.getTime())}
                                fieldName='deadLine'
                                title={initialValues.type === 'task' ? 'срок' : 'завершение'}
                                top={-420}
                            />
                        </div>
                    </div>
                </>
            }

        </div>
    );
};

export default AddNoteForm;