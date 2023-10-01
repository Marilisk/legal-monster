import { FC, useState } from 'react';
import { getMonthText } from '../../../functions/getMonthText';
import { collectDaysOfMonth } from '../../../functions/collectDaysOfMonth';
import { IPickerDayItem } from '../../../../types/eventsTypes';
import { PickerCeil } from '../PickerCeil/PickerCeil';
import c from './../DateTimePicker.module.scss';
import { Arrow } from '../../../Icons/ArrowIcon/Arrow';

interface IDatePickerProps {
    currentDate: Date
    setValue: (value: Date) => void
    fieldName: string
}

const DatePicker: FC<IDatePickerProps> = ({ currentDate, setValue, fieldName }: IDatePickerProps) => {

    //console.log('DatePicker currentDate', currentDate)

    const timeStamp = currentDate.getTime()
    const [days, setDays] = useState<IPickerDayItem[]>(collectDaysOfMonth(timeStamp))

    const setViewMonth = (n: number) => {
        const anotherMonth = new Date(days[15].date).getMonth() + n
        setDays(collectDaysOfMonth(new Date(new Date(days[15].date).getFullYear(), anotherMonth).getTime()))
    }
    const viewYear = new Date(days[15].date).getFullYear()
    const isThisYear = viewYear !== new Date().getFullYear()


    return (
        <div className={c.wrap}>

            <div className={c.monthSwitcher}>
                <div onClick={() => setViewMonth(-1)}>
                    <Arrow vector='left' size='20' />
                </div>
                <h3>
                    {getMonthText(new Date(days[15].date).getMonth())}{' '}
                    {isThisYear && viewYear}
                </h3>
                <div onClick={() => setViewMonth(1)}>
                    <Arrow vector='right' size='20' />
                </div>

            </div>

            <div className={c.grid}>
                {days.map((el, i) => {

                    const isChosen = el.index === currentDate.getDate()
                        && new Date(el.date).getMonth() === currentDate.getMonth()

                    return <PickerCeil key={i} day={el}
                        setValue={setValue}
                        isThisMonth={new Date(el.date).getMonth() === new Date(days[15].date).getMonth()}
                        isChosen={isChosen} />
                })}
            </div>
        </div>
    );
};

export default DatePicker;