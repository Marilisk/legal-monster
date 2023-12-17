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

    const isNoon = date.getHours() === 0 && date.getMinutes() === 0  // нужно чтобы нулевое время не выводил

    const options: Intl.DateTimeFormatOptions = !isNoon ? {
        weekday: "short",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    } : {
        weekday: "short",
        month: "long",
        day: "numeric",
    }
    const timeformat = new Intl.DateTimeFormat('ru-RU', options)
    const dateAndTime = timeformat.format(date)

    return dateAndTime
}



/**
    * даты, создающиеся в Mongo, например createdAt, нужно сначала парсить для корректного преобразования:
    *
    * smartFormatDate(new Date(Date.parse(note.createdAt))) 
    *
    */

export const smartFormatDate = (date: Date) => {

    const isNoon = date.getHours() === 0 && date.getMinutes() === 0  // нужно чтобы нулевое время не выводил

    const weekTimeStamp = 604800000
    const isSoon = (date.getTime() - Date.now()) < weekTimeStamp && (date.getTime() - Date.now()) > -604800000

    let options: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric",
        year: "numeric",
    }

    if (isSoon) {
        if (!isNoon) {
            options = {
                weekday: "short",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric"
            }
        } else {
            options = {
                weekday: "short",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric"
            }
        }
    }

    // console.log('in formatDate', date)


    const timeformat = new Intl.DateTimeFormat('ru-RU', options)
    const dateAndTime = timeformat.format(date)

    return dateAndTime
}