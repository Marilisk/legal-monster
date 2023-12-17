import { FC } from 'react';
import c from './MeetingItem.module.scss'
import { IActivity } from '../../../../../../types/clientsTypes';
import { smartFormatDate } from '../../../../../../assets/functions/formatDate';
import { PriorityIcon } from '../../../../../../assets/Icons/PriorityIcon';
import { DateRangeIcon } from '../../../../../../assets/Icons/DateRangeIcon';
import { useGetActivityTitleFromType, getPriorityText } from '../getPriorityText';
import { Card, Typography } from '@mui/material';
import { DeleteButton } from '../../../../../../assets/input elements/DeleteButton/DeleteButton';
import EditButton from '../../../../../../assets/input elements/EditButton/EditButton';

interface IMeetingItemProps {
    note: IActivity
    edit: (arg: IActivity) => void
    deleteItem: () => void
    hoveredLine: string
    setHoveredLine: (arg: string) => void
    setEditableNote?: (arg: IActivity) => void
}

const MeetingItem: FC<IMeetingItemProps> = ({
    note, edit, deleteItem, hoveredLine, setHoveredLine, setEditableNote
}: IMeetingItemProps) => {

    //  if (!note) return null
    let date
    if (note.deadLine) {
        date = smartFormatDate(new Date(note.deadLine))
    }

    const { priorityText, priorityColor } = getPriorityText(note.priority)
    const assets = useGetActivityTitleFromType(note.type)

    return (
        <Card sx={{ mb: 2 }}
            onMouseEnter={() => note._id && note._id !== hoveredLine && setHoveredLine(note._id)}
            onMouseLeave={() => setHoveredLine('')}
        >

            <div className={c.header} style={{ background: assets.bgColor }}>
                <div className={c.currentTitle}>
                    <div className={c.titleHead}>
                        {assets.icon}
                        <Typography variant='h3'>{note.title}</Typography>
                    </div>

                    <div>
                        <DeleteButton callBack={deleteItem} visible={hoveredLine === note._id} />
                        { setEditableNote &&
                            <EditButton callBack={ () => setEditableNote(note) } visible={ hoveredLine === note._id } />
                        }
                    </div>

                </div>
                <div className={c.currentText}>{note.text}</div>
            </div>

            <div className={c.currentFields}>
                <div>
                    <div className={c.name}>срок</div>
                    <div className={c.part}>
                        <DateRangeIcon size='24px' />
                        <div>{date || 'нет даты'}</div>
                    </div>
                </div>
                <div>
                    <div className={c.name}>приоритет</div>
                    <div className={c.part}>
                        <div>
                            <PriorityIcon size='32px' color={priorityColor} />
                        </div>
                        <div>{priorityText}</div>
                    </div>
                </div>
                <div>
                    <div className={c.name}>автор</div>
                    <div className={c.part}>
                        <div>{note.author.fullName}
                            <Typography variant="body2">{note.author.fullName}&nbsp;
                                {smartFormatDate(new Date(Date.parse(note.createdAt)))} </Typography></div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default MeetingItem;