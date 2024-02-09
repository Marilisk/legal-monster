import { FC, memo, useEffect, useState } from 'react';
import { ClientActivityType, IActivity, PriorityType } from '../../../../../../types/clientsTypes';
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
import Selector from '../../../../../../assets/input elements/Selector/Selector';
import { useGetActivityTitleFromType, getPriorityText } from '../getPriorityText';
import { PriorityIcon } from '../../../../../../assets/Icons/PriorityIcon';
import CheckBox from '../../../../../../assets/input elements/checkbox/CheckBox';
import { Typography } from '@mui/material';
import { ChangeNoteFormEvent, useGetInitialValues, useGetPickerValues } from './hooks';

interface IAddNoteFormProps {
    fullName: string
    authorId: string
    clientId: string
    closeForm: () => void
    editibleNote?: IActivity
    fetchEdit?: (arg: IActivity) => void
    type: ClientActivityType
}


const AddNoteForm: FC<IAddNoteFormProps> = ({
    editibleNote,
    fullName,
    authorId,
    clientId,
    closeForm,
    fetchEdit,
    type,
}: IAddNoteFormProps) => {

    const dispatch = useAppDispatch()

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

    const [values, setValues] = useState(initialValues)
    
    const [wasFormTouched, setFormWasTouched] = useState(false)

    useEffect(() => {
        setValues(initialValues)
    }, [ editibleNote?._id, type ])

    const handleChange = (line: ChangeNoteFormEvent) => {
        if (!wasFormTouched) setFormWasTouched(true)
        setValues({ ...values, [line.field]: line.value })
    }

    const handleSubmit = () => {
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
        setValues(initialValues)
        closeForm()
    }

    const assets = useGetActivityTitleFromType(values.type)

    return (
        <div className={c.wrap} onClick={(e) => handleOpenDatePicker(e, dispatch)}>
            <div className={c.header}>
                {!editibleNote && <Typography variant='h2'>
                    {'Нов' + assets.ending} {assets.text} :
                </Typography>}
                <CancelButton callBack={closeForm} />
            </div>

            {(values.type === 'meeting' || values.type === 'court') && <div>
                <CheckBox
                    callback={() => {
                        const newType = values.type === 'court' ? 'meeting' : 'court'
                        handleChange({ field: 'type', value: newType })
                    }}
                    checked={values.type === 'court'} />
                <span>судебное заседание</span>
            </div>}

            <div className={c.firstLine}>

                <FormTextField value={values.title}
                    label={values.type !== 'note' ? 'заголовок' : undefined}
                    validate={(v) => basicLengthValidate(v, 3)}
                    onChange={(v) => handleChange({ field: 'title', value: v })}
                    multiline={values.type === 'note'}
                />
                {
                    values.type !== 'note' &&
                    <Selector title='приоритет'
                        chosenValue={{ systemValue: values.priority, title: getPriorityText(values.priority as PriorityType).priorityText }}
                        values={[{ title: 'высокий', systemValue: 'high' }, { title: 'средний', systemValue: 'middle' }, { title: 'низкий', systemValue: 'low' },]}
                        onChange={(v) => handleChange({ field: 'priority', value: v })}
                        icon={<PriorityIcon size='26px' />}
                    />
                }
            </div>

            {values.type !== 'note' &&
                <FormTextField
                    value={values.text}
                    label='описание'
                    onChange={(v) => handleChange({ field: 'text', value: v })}
                />}

            {(values.type === 'meeting' || values.type === 'task' || values.type === 'court') &&
                <>
                    <Typography variant='h3' >{assets.datesTitle}</Typography>
                    <div className={c.lineWrap}>

                        {values.type === 'meeting' &&
                            <>
                                <div className={c.pickerWrap} id="startTS">
                                    <label className={c.label}>
                                        <DateRangeIcon />
                                        {localDeadLine && formatDate(new Date(localStartTS))}
                                    </label>
                                    <DateTimePicker currentDate={new Date(localStartTS)}
                                        setValue={(_, v) => setStartTS(v.getTime())}
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
                                setValue={(_, v) => setDeadLine(v.getTime())}
                                fieldName='deadLine'
                                title={values.type === 'task' ? 'срок' : 'завершение'}
                                top={-420}
                            />
                        </div>
                    </div>
                </>
            }

            <Button type='submit'
                visible={wasFormTouched}
                callBack={handleSubmit}
            // disabled={Boolean(Object.keys(errors).length)}
            >
                сохранить
            </Button>
        </div>
    );
};

export default memo(AddNoteForm);