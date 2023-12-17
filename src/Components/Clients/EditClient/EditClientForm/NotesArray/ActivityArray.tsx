import { FC, useEffect, useState } from 'react';
import c from './ActivityArray.module.scss'
import { ClientActivityType, IActivity } from '../../../../../types/clientsTypes';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import MeetingItem from './MeetingItem/MeetingItem';
import AddNoteForm from './AddNoteForm/AddNoteForm';
import { NoBorderButton } from '../../../../../assets/input elements/NoBorderButton/NoBorderButton';
import { ActionsItem } from './LastActionItem/ActionItem';
import { fetchDeleteNote, fetchEditNote, syncEditClient } from '../../../../../redux/clientsSlice';
import AddActivityBtns from './AddActivityBtns/AddActivityBtns';
import { Divider, Typography } from '@mui/material';

interface IActivityArrayProps {
    array: IActivity[] | undefined
    title: string
    clientId: string
}


const ActivityArray: FC<IActivityArrayProps> = ({ array, title, clientId }: IActivityArrayProps) => {

    const authUser = useAppSelector(s => s.auth.loginData.data)
    const fullName = authUser?.fullName
    const authorId = authUser?._id
    const [isFormVisible, setFormVisible] = useState(false)
    const [editibleNote, setEditibleNoteItem] = useState<IActivity | undefined>()
    const [hoveredLine, setHoveredLine] = useState('')

    const [formActivityType, setFormActivityType] = useState<ClientActivityType>('note')

    const dispatch = useAppDispatch()

    const edit = (editableNote: IActivity) => {
        dispatch(fetchEditNote(editableNote))
    }

    const deleteNote = (noteId: string) => {
        dispatch(fetchDeleteNote({ noteId, clientId }))
    }

    const setEditableNote = (note: IActivity) => {
        setFormVisible(true)
        setEditibleNoteItem(note)
    }

    // console.log('editibleNote', editibleNote)

    if (!fullName || !authorId) return null

    // ортируем чтобы первыми в массиве были самые ранние события
    const sortedArray = [...array || []].sort((note, nextNote) => note.deadLine - nextNote.deadLine)
    const currentItemIdx = 0 // показываем в таблице куррент айтем самое раннее событие

    const doneArray = sortedArray.filter(el => el.isDone)
    const todoArray = sortedArray.filter(el => !el.isDone)

    return (
        <div className={c.arrayWrapper}>
            <AddActivityBtns areNoActivities={!array || !array.length}
                title={title}
                setFormVisible={setFormVisible}
                isFormVisible={isFormVisible}
                setFormActivityType={setFormActivityType} />

            {/*   {Boolean(array?.length) &&
                <CurrentNote note={todoArray[currentItemIdx]} />} */}

            <div className={isFormVisible ? c.form : c.hiddenForm}>
                <AddNoteForm fullName={fullName} authorId={authorId}
                    clientId={clientId}
                    setFormVisible={setFormVisible}
                    editibleNote={editibleNote}
                    fetchEdit={edit}
                    type={formActivityType} />
            </div>

            {!!todoArray.length &&
                <div className={c.block} >
                    
                    <Typography variant='h2'>Предстоящие действия</Typography>

                    {todoArray.map((el, i) => {

                        if (el.type === 'court' || el.type === 'meeting') {
                            return <MeetingItem key={`${el._id}${i}-m`}
                                note={el}
                                edit={edit}
                                deleteItem={() => deleteNote(el._id)}
                                hoveredLine={hoveredLine}
                                setHoveredLine={setHoveredLine}
                                setEditableNote={setEditableNote}
                            />
                        }
                        return <ActionsItem key={`${el._id}${i}` || `${el.createTimeStamp}${i}`}
                            note={el}
                            edit={edit}
                            deleteItem={() => deleteNote(el._id)}
                            hoveredLine={hoveredLine}
                            setHoveredLine={setHoveredLine}
                            setEditableNote={setEditableNote}
                        />
                    }
                    )}
                </div>
            }

            {!!doneArray.length &&
                <div className={c.block}>
                    <Divider />
                    <Typography variant='h2'>Завершённые действия</Typography>
                    {doneArray.map((el, i) => <ActionsItem key={`${el._id}${i}` || `${el.createTimeStamp}${i}`}
                        note={el} edit={edit}
                        deleteItem={() => deleteNote(el._id)}
                        hoveredLine={hoveredLine}
                        setHoveredLine={setHoveredLine} />)}
                </div>
            }

        </div>
    );
};

export default ActivityArray;


