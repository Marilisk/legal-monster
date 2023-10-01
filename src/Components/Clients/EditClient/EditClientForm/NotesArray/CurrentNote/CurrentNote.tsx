import { FC } from 'react';
import c from './CurrentNote.module.scss'
import { INote } from '../../../../../../types/clientsTypes';
import { formatDate } from '../../../../../../assets/functions/formatDate';
import { PriorityIcon } from '../../../../../../assets/Icons/PriorityIcon';
import { DateRangeIcon } from '../../../../../../assets/Icons/DateRangeIcon';
import { getPriorityText } from '../getPriorityText';

interface ICurrentNoteProps {
    note: INote
}

const CurrentNote: FC<ICurrentNoteProps> = ({ note }: ICurrentNoteProps) => {

    if (!note) return null
    let date
    if (note.deadLine) {
        date = formatDate(new Date(note.deadLine))
    }

    const {text, color} = getPriorityText(note.priority)

    return (
        <div className={c.currentItem}>
            <div className={c.currentTitle}>{note.title}</div>
            <div className={c.currentText}>{note.text}</div>

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
                            <PriorityIcon size='32px' color={color} />
                        </div>
                        <div>{text}</div>
                    </div>
                </div>
                <div>
                    <div className={c.name}>автор</div>
                    <div className={c.part}>
                        <div>{note.author.fullName}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentNote;