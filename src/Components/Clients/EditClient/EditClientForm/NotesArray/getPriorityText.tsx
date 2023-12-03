import { ClientActivityType, PriorityType } from "../../../../../types/clientsTypes"
import CommentIcon from '@mui/icons-material/Comment';
import GavelIcon from '@mui/icons-material/Gavel';
import Groups2Icon from '@mui/icons-material/Groups2';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ArticleIcon from '@mui/icons-material/Article';

export const getPriorityText = (systemPriority: PriorityType) => {
    const text = systemPriority === 'high' ? 'высокий' : systemPriority === 'middle' ? 'средний' : 'низкий'
    const color = systemPriority === 'high' ? '#F65B5D' : systemPriority === 'middle' ? '#FFA310' : '#5CABF5'
    return { text, color }
}


export const getActivityTitleFromType = (type: ClientActivityType) => {
    // const text = type === 'high' ? 'высокий' : systemPriority === 'middle' ? 'средний' : 'низкий'
    // const color = type === 'high' ? '#F65B5D' : systemPriority === 'middle' ? '#FFA310' : '#5CABF5'

    let text = 'Заметка'
    let icon = <CommentIcon />;
    let color = 'main'
    let ending = 'ая'

    switch (type) {
        case 'court':
            text = 'судебное заседание'
            ending = 'ое'
            color = '#BF7C80'
            icon = <GavelIcon />;
            break;
        case 'document':
            text = 'документ'
            ending = 'ый'
            icon = <ArticleIcon />
            color="#73A4BF"
            break;
        case 'meeting':
            text = 'встреча'
            icon = <Groups2Icon />
            color= "#60BF78"
            break;
        case 'task':
            text = 'задача'
            color = '#8E69BF'
            icon = <TaskAltIcon />
            break;
        
    }


    return { text, icon, color, ending }
}