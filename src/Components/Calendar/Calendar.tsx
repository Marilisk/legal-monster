import { FC, useEffect, useState } from "react"
import c from './Calendar.module.scss'
import CalendarCeil from "./CalendarCeil/CalendarCeil"
import { CalendarHead } from "./CalendarHead/CalendarHead"
import { AddEventForm } from "./AddEventForm/AddEventForm"
import { Button } from "../../assets/input elements/button/Button"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { callFormPopUp, setCalendarDate, setTasks } from "../../redux/calendarSlice"
import { ITask } from "../../types/eventsTypes"
import { PeriodView } from "./PeriodView/PeriodView"
import { RightButtons } from "./RightButtons/RightButtons"
import { useWindowWidthWatcher } from "../../assets/hooks/useWindowWidthWatcher"
import { getLeftFormCord } from "../../assets/functions/getLeftFormCord"


const getMopTasks = (queryMonth: number) => {

    const startDateTimeStamp = new Date(2023, 3, 24, 13).getTime()
    const endDateTimeStamp = new Date(2023, 3, 24, 15).getTime()

    const array: ITask[] = [{
        startDate: {
            year: 2023,
            month: 3,
            day: 24,
            timeStamp: startDateTimeStamp,
        },
        finishDate: {
            year: 2023,
            month: 3,
            day: 24,
            timeStamp: endDateTimeStamp
        },
        _id: '123gh',
        title: 'встреча с Олегом',
        description: 'очень важная',
        owner: {
            userId: '123gываh',
            userName: '123gываh',
            authorId: '123gываh',
        },
        client: {
            clientId: '123gываh',
        },
        type: 'задача'
    }]

    return array.filter(el => el.startDate.month === queryMonth)
}

export const Calendar: FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const now = Date.now()
        dispatch(setCalendarDate(now))
    }, [dispatch])

    let windowWidth = useWindowWidthWatcher()

    const stateDate = useAppSelector(s => s.calendar.currentDate)
    const currentDate = {
        currentMonth: new Date(stateDate).getMonth(),
        currentYear: new Date(stateDate).getFullYear(),
        currentDay: new Date(stateDate).getDate(),
    }

    const initDate = useAppSelector(s => s.calendar.date)
    const viewPeriod = useAppSelector(s => s.calendar.viewPeriod)
    const days = useAppSelector(s => s.calendar.days.items)

    const [formStartDate, setFormStartDate] = useState<Date>(new Date(initDate));
    const handleformCaller = (e: React.MouseEvent, startDate: Date) => {
        setFormStartDate(startDate)
        let leftFormCord = getLeftFormCord(e, windowWidth)
        dispatch(callFormPopUp({
            offsetTop: (e.currentTarget as HTMLElement).offsetTop,
            offsetLeft: leftFormCord,
            id: ((e.target as HTMLElement).closest('[id]') as HTMLElement).id,
        }))
    };
    const handleCloseForm = (value: string) => {
        dispatch(callFormPopUp(value))
    };
    const formPopUp = useAppSelector(s => s.calendar.addEventFormPopUp)
    const open = Boolean(formPopUp.id === 'addEvent');
    const formClass = open ? c.form : c.hiddenForm;

    useEffect(() => {
        const tasks = getMopTasks(currentDate.currentMonth)
        if (tasks) {
            dispatch(setTasks(tasks))
        }
        //dispatch(fetchTasks(month))
    }, [dispatch, currentDate.currentMonth])


    return <div className={c.wrap}>

        <div className={c.flexHead}>
            <PeriodView currentDate={currentDate} viewPeriod={viewPeriod} />
            <div className={c.viewPeriod}>
                <div className={viewPeriod === 'week' ? c.chosenPeriodName : c.periodName}>неделя</div>
                <div className={viewPeriod === 'month' ? c.chosenPeriodName : c.periodName}>месяц</div>
            </div>
            <Button type="button">
                <div id="addEvent" onClick={(e) => handleformCaller(e, new Date(initDate))}>добавить</div>
            </Button>
            <RightButtons />
        </div>

        <CalendarHead windowWidth={windowWidth} />

        <div className={c.grid}>
            {days.map((el, i) => {
                const isThisMonth = new Date(el.date).getMonth() === currentDate.currentMonth
                const isToday = el.index === new Date().getDate()
                return <CalendarCeil key={i} day={el} 
                    handleformCaller={handleformCaller} 
                    isThisMonth={isThisMonth}
                    isToday={isToday}
                    formStartDate={formStartDate}
                    formPopUpOpened={open} />
            })}
        </div>

        <div className={formClass}
            id='addEvent'
            style={{ left: formPopUp.left + 'px' }}>
            <AddEventForm popUp={formPopUp} handleCloseForm={handleCloseForm} startDate={formStartDate} />
        </div>
    </div>
}