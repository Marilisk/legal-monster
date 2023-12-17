import React, { FC, useEffect, useState } from 'react';
import c from './DateTimePicker.module.scss'
import DatePicker from './DatePicker/DatePicker';
import TimePicker from './TimePicker/TimePicker';
import { NoBorderButton } from '../NoBorderButton/NoBorderButton';
import { useAppSelector } from '../../../redux/hooks';
import { Typography } from '@mui/material';

interface IDateTimePickerProps {
    currentDate?: Date
    setValue: (field: string, value: Date) => void
    fieldName: string // picker Id
    showDataPicker?: boolean
    controlledPicker?: {  // если согласование даты с другим датапикером, чета не работает. Проще юзэффектом править дату второго пикера 
        name: string
        value: Date
    }
    top?: number
    title?: string
}

const DateTimePicker: FC<IDateTimePickerProps> = (
    {
        currentDate = new Date(),
        setValue,
        fieldName,
        showDataPicker,
        controlledPicker,
        top = -6,
        title,
    }: IDateTimePickerProps) => {

    const datePickerPopUp = useAppSelector(s => s.calendar.datePickerPopUp)
    const open = showDataPicker ? showDataPicker :  datePickerPopUp.id === fieldName

    const [pickerEditedDate, setPickerEditedDate] = useState(currentDate)
    
    useEffect(() => {
        setPickerEditedDate(currentDate)
    }, [currentDate])

    const confirm = () => {
        setValue(fieldName, pickerEditedDate)
        const isFinishInvalid = controlledPicker && controlledPicker?.value.getTime() < pickerEditedDate.getTime()
        if (isFinishInvalid) {
            const value = new Date(pickerEditedDate.getTime() + 3600000)
            setValue(controlledPicker.name, value)
        }
    }

    return <div className={c.container}>
        <div className={open ? c.box : c.hidden} style={{ top: `${top}px` }}>

            { title && <div className={c.titleBox}>
                <Typography variant='h2' m={1} >{title}</Typography>
            </div> }

            <div className={c.flex}>
                <DatePicker currentDate={pickerEditedDate} setValue={setPickerEditedDate} fieldName={fieldName} />
                <TimePicker currentDate={pickerEditedDate} setValue={setPickerEditedDate} fieldName={fieldName} />
            </div>
            <div className={c.btnsWrap}>
                <NoBorderButton type='button' callBack={confirm}>
                    <div id='saveBtn' >
                        сохранить
                    </div>
                </NoBorderButton>

                <NoBorderButton type='button'>
                    <div id='cancelBtn'>отменить</div>
                </NoBorderButton>
            </div>

        </div>
    </div>
};

export default React.memo(DateTimePicker);

