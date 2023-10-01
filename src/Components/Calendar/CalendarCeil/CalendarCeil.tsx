import { FC, memo, useEffect, useState } from "react"
import c from './CalendarCeil.module.scss'
import { ICalendarDayItem } from "../../../types/eventsTypes"
import { useAppDispatch } from "../../../redux/hooks"
import { setEventToForm } from "../../../redux/calendarSlice"
import { Task } from "./Task/Task"

interface ICalendarCeilProps {
    day: ICalendarDayItem
    handleformCaller: (arg1: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
        arg2: Date) => void
    isThisMonth: boolean
    isToday: boolean
    formStartDate: Date
    formPopUpOpened: boolean
}

const CalendarCeil: FC<ICalendarCeilProps> = (
    { day, handleformCaller, isThisMonth, formStartDate, isToday, formPopUpOpened }
        : ICalendarCeilProps) => {

    const dispatch = useAppDispatch()

    const [isTouched, setIsTouched] = useState(false)
    useEffect(() => {
        let touched = day.index === formStartDate.getDate()
            && new Date(day.date).getMonth() === formStartDate.getMonth()
            && formPopUpOpened;
        setIsTouched(touched)
    }, [formStartDate, day.date, day.index, formPopUpOpened])

    let className = c.ceil
    if (!isThisMonth) {
        className = c.anotherCeil
    }
    if (isTouched) {
        className = c.touchedDay
    }
    if (isToday) {
        className = c.today
    }


    return <div>
        <div className={className}
            onClick={(e) => {
                const dateWith9oclock = day.date + 9 * 60 * 60000
                handleformCaller(e, new Date(dateWith9oclock))
            }}
            id="addEvent">
            <span>
                {day.index}
            </span>
            {day.tasks?.map((el, i) => {
                return <div key={i} onClick={() => dispatch(setEventToForm(el))}>
                    <Task task={el} />
                </div>
            })}
            {/* {formStartDate} */}
        </div>
    </div>
}

export default memo(CalendarCeil)

