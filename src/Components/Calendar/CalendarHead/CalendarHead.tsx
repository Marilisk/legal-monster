import { FC } from "react"
import c from './CalendarHead.module.scss'


const fullWeekDays = ['понедельник', 'вторник', 'среда', 'черверг', 'пятница', 'суббота', 'воскресенье']
const shortWeekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

interface ICalendarHeadProps {
    windowWidth: number
}

export const CalendarHead: FC<ICalendarHeadProps> = ({ windowWidth }: ICalendarHeadProps) => {

    const array = windowWidth > 700 ? fullWeekDays : shortWeekDays

    return <div className={c.wrap}>
        {array.map(day => (
            <div key={day} className={c.item}>
                {day}
            </div>
        ))}
    </div>
}