export const formatDate = (date: Date) => {

    const isNoon = date.getHours() === 0 && date.getMinutes() === 0

    const options: Intl.DateTimeFormatOptions = !isNoon ? {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    } : {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }
    
    const timeformat = new Intl.DateTimeFormat('ru-RU', options)
    const dateAndTime = timeformat.format(date)

    return dateAndTime
}

export const brieflyformatDate = (date: Date) => {

    const isNoon = date.getHours() === 0 && date.getMinutes() === 0

    const options: Intl.DateTimeFormatOptions = !isNoon ? {
        weekday: "short",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    } : {
        weekday: "short",
        //year: "numeric",
        month: "long",
        day: "numeric",
    }
    const timeformat = new Intl.DateTimeFormat('ru-RU', options)
    const dateAndTime = timeformat.format(date)

    return dateAndTime
}