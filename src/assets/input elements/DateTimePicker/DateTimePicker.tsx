import React, { FC, useEffect, useState } from 'react';
import c from './DateTimePicker.module.scss'
import DatePicker from './DatePicker/DatePicker';
import TimePicker from './TimePicker/TimePicker';
import { NoBorderButton } from '../NoBorderButton/NoBorderButton';

interface IDateTimePickerProps {
    currentDate?: Date
    setValue: (field: string, value: Date) => void
    fieldName: string
    showDataPicker: boolean
    controlledPicker?: {  // если идет согласование даты с другим датапикером
        name: string
        value: Date
    }
    top?: number
}

const DateTimePicker: FC<IDateTimePickerProps> = (
    {
        currentDate = new Date(),
        setValue,
        fieldName,
        showDataPicker,
        controlledPicker,
        top = -6
    }: IDateTimePickerProps) => {

    const [pickerEditedDate, setPickerEditedDate] = useState(currentDate)
    //console.log('in PICKER', pickerEditedDate)

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
        <div className={showDataPicker ? c.box : c.hidden} style={{ top: `${top}px` }}>
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

