import { ITask } from "../../../types/eventsTypes"


export const getInitialValues = (startDate: Date, editibleTask: ITask | null = null) => {

    let result;

    result = editibleTask ?
        {
            startDate: new Date(editibleTask.startDate.timeStamp),
            finishDate: new Date(editibleTask.finishDate.timeStamp),
            title: editibleTask.title,
            description: editibleTask.description,
            client: {
                clientId: editibleTask.client
            },
            type: editibleTask.type,
            _id: editibleTask._id
        }
        :
        {
            startDate: startDate,
            finishDate: new Date(startDate.getTime() + 3600000),
            title: '',
            description: '',
            client: {
                clientId: 'dkjbn498'
            },
            type: 'заседание',
            _id: 'spok9'
        }

    return result
}