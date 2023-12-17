import { ClientActivityType, PriorityType } from "../../../../../types/clientsTypes"
import CommentIcon from '@mui/icons-material/Comment';
import GavelIcon from '@mui/icons-material/Gavel';
import Groups2Icon from '@mui/icons-material/Groups2';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ArticleIcon from '@mui/icons-material/Article';
import { hexToRgb } from "@mui/material";
import { useEffect, useState } from "react";

export const getPriorityText = (systemPriority: PriorityType) => {
    const priorityText = systemPriority === 'high' ? 'высокий' : systemPriority === 'middle' ? 'средний' : 'низкий'
    const priorityColor = systemPriority === 'high' ? '#F65B5D' : systemPriority === 'middle' ? '#FFA310' : '#5CABF5'
    return { priorityText, priorityColor }
}

const iconsx = {
    marginRight: '10px'
}

export const useGetActivityTitleFromType = (type: ClientActivityType) => {

    const [text, setText] = useState('Заметка')
    const [icon, setIcon] = useState(<CommentIcon sx={iconsx} />)
    const [color, setColor] = useState('#FFA500')
    const [ending, setEnding] = useState('ая')
    const [datesTitle, setDatesTitle] = useState('')

    function change() {
        switch (type) {
            case 'court':
                setText('судебное заседание')
                setEnding('ое')
                setColor('#BF7C80')
                setIcon(<GavelIcon sx={iconsx} />)
                setDatesTitle('Дата')
                break;
            case 'document':
                setText('документ')
                setEnding('ый')
                setIcon(<ArticleIcon sx={iconsx} />)
                setColor("#73A4BF")
                break;
            case 'meeting':
                setText('встреча')
                setIcon(<Groups2Icon sx={iconsx} />)
                setColor("#60BF78")
                setDatesTitle('Даты')
                break;
            case 'task':
                setText('задача')
                setColor('#8E69BF')
                setIcon(<TaskAltIcon sx={iconsx} />)
                setDatesTitle('крайний срок')
                break;
        }
    }

    useEffect(() => {
        change()
    }, [type])

    const bgColor = hexToRgb(color).slice(0, -1) + ', 0.1)'

    return { text, icon, color, ending, bgColor, datesTitle }
}