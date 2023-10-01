import { PriorityType } from "../../../../../types/clientsTypes"


export const getPriorityText = (systemPriority: PriorityType) => {
    const text = systemPriority === 'high' ? 'высокий' : systemPriority === 'middle' ? 'средний' : 'низкий'
    const color = systemPriority === 'high' ? '#F65B5D' : systemPriority === 'middle' ? '#FFA310' : '#5CABF5'
    return {text, color}
}