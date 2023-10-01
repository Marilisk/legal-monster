import { FC } from 'react'
import c from './../DateTimePicker.module.scss'
import { IPickerDayItem } from '../../../../types/eventsTypes'


interface IPickerCeilProps {
    setValue: (value: Date) => void
    day: IPickerDayItem
    isThisMonth: boolean
    isChosen: boolean
}


export const PickerCeil: FC<IPickerCeilProps> = ({ day, setValue, isThisMonth, isChosen }: IPickerCeilProps) => {

    const isToday = new Date().getDate() === day.index && new Date().getMonth() === new Date(day.date).getMonth()

    let initCeilClass = c.anotherMonthCeil
    if (isThisMonth) {
        initCeilClass = c.ceil
        if (isChosen) {
            initCeilClass = c.chosenDay
        }
    }

    return <div>
        <div className={initCeilClass}
            onClick={() => {
                if (isThisMonth) {
                    setValue(new Date(day.date))}
                }
            }>
            <span style={isToday ? { color: '#69BFAF' } : undefined} >
                {day.index}
            </span>
        </div>
    </div>
}