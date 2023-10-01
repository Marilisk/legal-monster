import { ICalendarDayItem } from "../../types/eventsTypes"

export function getLastDayOfMonth(year: number, month: number) {
    const result = new Date(year, month + 1, 0).getDate()
    return result
}

export function collectDaysOfMonth(init: number) {

    const date = new Date(init)
    const firstDay = new Date(date.getFullYear(), date.getMonth())
    const prevMonth = firstDay.getMonth() - 1
    const lastDayOfPrevMonth = getLastDayOfMonth(date.getFullYear(), prevMonth)
    const daysInMonth = getLastDayOfMonth(date.getFullYear(), date.getMonth())

    // определяем день недели 1 числа месяца
    const firstDayWeekDay = firstDay.getDay()

    let days: ICalendarDayItem[] = []
    let n = 1
    while (n <= daysInMonth) {
        const dateForArray = new Date(date.getFullYear(), date.getMonth(), n)
        days.push({
            index: n,
            date: dateForArray.getTime(),
            dayOfWeek: dateForArray.getDay(),
            tasks: []
        })
        n++
    }
    if (firstDayWeekDay !== 0) {
        let startExtraDays = firstDayWeekDay - 1
        let minDay = lastDayOfPrevMonth - startExtraDays
        for (let i = lastDayOfPrevMonth; i > minDay; i--) {
            const year = prevMonth === 11 ? date.getFullYear() - 1 : date.getFullYear()
            const dateForArray = new Date(year, prevMonth, i)
            days.unshift({
                index: i,
                date: dateForArray.getTime(),
                dayOfWeek: dateForArray.getDay(),
                tasks: []
            })
        }
    }
    if (days.length < 35) {
        let endExtraDays = 35 - days.length
        for (let i = 1; i <= endExtraDays; i++) {
            const year = date.getMonth() === 11 ? date.getFullYear() + 1 : date.getFullYear()
            const dateForArray = new Date(year, date.getMonth() + 1 , i)
            days.push({
                index: i,
                date: dateForArray.getTime(),
                dayOfWeek: dateForArray.getDay(),
                tasks: []
            })
        }
    }

    return days
}