import { FC, useState } from 'react';
import c from './ActivityArray.module.scss'
import { ClientActivityType, IActivity } from '../../../../../types/clientsTypes';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import MeetingItem from './MeetingItem/MeetingItem';
import AddNoteForm from './AddNoteForm/AddNoteForm';
import { ActionsItem } from './LastActionItem/ActionItem';
import { fetchDeleteNote, fetchEditNote } from '../../../../../redux/clientsSlice';
import AddActivityBtns from './AddActivityBtns/AddActivityBtns';
import { Collapse, Divider, Typography } from '@mui/material';
import { LoadingDots } from '../../../../../assets/LoadingDots/LoadingDots';


interface IActivityArrayProps {
    array: IActivity[] | undefined
    title: string
    clientId: string
    loadingActivities: string[]
}


const ActivityArray: FC<IActivityArrayProps> = ({ array, title, clientId, loadingActivities }: IActivityArrayProps) => {

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

    const closeForm = () => {
        setFormVisible(false)
        setEditibleNoteItem(undefined)
    }

    if (!array) return <Typography variant='h3'>У этого клиента пока нет активностей</Typography>
    if (!fullName || !authorId) return null


    // ортируем чтобы первыми в массиве были самые ранние события
    const sortedArray = [...array ].sort((note, nextNote) => note.createTimeStamp - nextNote.createTimeStamp)
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

            <Collapse in={isFormVisible && !editibleNote}>
                { isFormVisible && !editibleNote  &&
                    <div>
                        <AddNoteForm fullName={fullName} authorId={authorId}
                            clientId={clientId}
                            closeForm={closeForm}
                            type={formActivityType} />
                    </div> }
            </Collapse>

            {!!todoArray.length &&
                <div className={c.block} >

                    {todoArray.map((el, i) => {

                        const isLoading = loadingActivities.includes(el._id) 

                        if ( isLoading) return <LoadingDots size='small' />

                        return <div key={el._id}>
                            {editibleNote?._id === el._id &&
                                <Collapse in={editibleNote?._id === el._id}>
                                    <div>
                                        <AddNoteForm fullName={fullName} authorId={authorId}
                                            clientId={clientId}
                                            closeForm={closeForm}
                                            editibleNote={editibleNote}
                                            fetchEdit={edit}
                                            type={formActivityType} />
                                    </div>
                                </Collapse>
                            }

                            {el.type === 'court' || el.type === 'meeting' ?
                                <MeetingItem key={`${el._id}${i}-m`}
                                    note={el}
                                    edit={edit}
                                    deleteItem={() => deleteNote(el._id)}
                                    hoveredLine={hoveredLine}
                                    setHoveredLine={setHoveredLine}
                                    setEditableNote={setEditableNote}
                                />
                                :
                                <ActionsItem key={`${el._id}${i}` || `${el.createTimeStamp}${i}`}
                                    note={el}
                                    edit={edit}
                                    deleteItem={() => deleteNote(el._id)}
                                    hoveredLine={hoveredLine}
                                    setHoveredLine={setHoveredLine}
                                    setEditableNote={setEditableNote}
                                />
                            }
                        </div>
                    })}
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


