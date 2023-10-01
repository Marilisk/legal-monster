

export interface ITask {
    startDate: {
        day: number
        year: number
        month: number
        timeStamp: EpochTimeStamp
    }
    finishDate: {
        day: number
        year: number
        month: number
        timeStamp: EpochTimeStamp
    }
    _id: string
    title: string
    description: string
    owner: {
        userId: string
        userName: string
        authorId: string
    }
    client: {
        clientId: string
    }
    type: 'задача' | 'встреча' | 'заседание' | 'совещание'
    
}

export interface ICalendarDayItem {
    index: number
    date: /* Date */number 
    dayOfWeek: number
    tasks: ITask[]
}


export interface IPickerDayItem {
    index: number
    date: /* Date */number
    dayOfWeek: number
}