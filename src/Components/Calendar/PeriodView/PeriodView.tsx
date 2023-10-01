import { FC } from "react"
import { useAppDispatch } from "../../../redux/hooks"
import { setCalendarDate } from "../../../redux/calendarSlice"
import { getMonthText } from "../../../assets/functions/getMonthText"
import c from './PeriodView.module.scss'
import { NoBorderButton } from "../../../assets/input elements/NoBorderButton/NoBorderButton"
import { Arrow } from "../../../assets/Icons/ArrowIcon/Arrow"


interface IPeriodViewProps {
    currentDate: {
        currentMonth: number
        currentYear: number
        currentDay: number
    }
    viewPeriod: 'month' | 'week'
}

export const PeriodView: FC<IPeriodViewProps> = ({ currentDate, viewPeriod }: IPeriodViewProps) => {

    const dispatch = useAppDispatch()
    const month = getMonthText(currentDate.currentMonth)

    const setViewPeriod = (n: number) => {

        if (viewPeriod === 'month') {
            const anotherMonth = new Date(currentDate.currentYear, currentDate.currentMonth + n)
                .getTime();
            dispatch(setCalendarDate(anotherMonth))
        }
    }

    return <div className={c.period}>

        <div onClick={() => setViewPeriod(-1)}>
            <Arrow vector='left' size={'10'} />
        </div>
        
        <NoBorderButton type="button">
            <div>{month} {currentDate.currentYear}</div>
        </NoBorderButton>

        <div onClick={() => setViewPeriod(1)}>
            <Arrow vector='right' size={'10'} />
        </div>

    </div>
}