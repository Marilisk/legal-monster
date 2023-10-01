import { FC } from 'react';
import c from './../DateTimePicker.module.scss';
import HourCeil from './HourCeil';

interface ITimePickerProps {
    currentDate: Date
    setValue: (value: Date) => void
    fieldName: string
}

const hours = [ 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8,]
const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55,]

const TimePicker: FC<ITimePickerProps> = ({ currentDate, setValue, fieldName }: ITimePickerProps) => {

    
    const onHourChange = (hour: number) => {
        const newDate = new Date(currentDate.setHours(hour))
        setValue(newDate)
    }
    const onMinChange = (min: number) => {
        const newDate = new Date(currentDate.setMinutes(min))
        setValue(newDate)
    }


    return (
        <div className={c.timeWrap}>

            <div className={c.hoursWrap}>
                <h3>часы</h3>
                <div className={c.hours}>
                {hours.map(el => <HourCeil key={el} value={el} 
                    onHourChange={onHourChange}
                    isChosen={el === currentDate.getHours()} />)}
                </div>
            </div>

            <div className={c.hoursWrap}>
                <h3>минуты</h3>
                <div className={c.hours}>
                {minutes.map(el => <HourCeil key={el} value={el} 
                    onHourChange={onMinChange}
                    isChosen={el === currentDate.getMinutes()} />)}
                </div>
            </div>

        </div>
    );
};

export default TimePicker;