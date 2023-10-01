import { FC, useEffect, useState } from 'react';
import c from './NotesArray.module.scss'
import { INote } from '../../../../../types/clientsTypes';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import CurrentNote from './CurrentNote/CurrentNote';
import AddNoteForm from './AddNoteForm/AddNoteForm';
import { NoBorderButton } from '../../../../../assets/input elements/NoBorderButton/NoBorderButton';
import { ActionsItem } from './LastActionItem/ActionItem';
import { fetchDeleteNote, fetchEditNote, fetchGetClientNotes, syncEditClient } from '../../../../../redux/clientsSlice';

interface INotesArrayProps {
    array: INote[] | undefined
    title: string
    clientId: string
}

interface IAddNoteBtnProps {
    array: INote[] | undefined
    title: string
    isFormVisible: boolean
    setFormVisible: (arg: boolean) => void
}

const AddNoteBtn: FC<IAddNoteBtnProps> = ({ array, title, setFormVisible, isFormVisible }: IAddNoteBtnProps) => {


    return <div className={c.header} >
        <h3>{(!array || !array.length) ? 'пока не было активности...' : title} </h3>
        <NoBorderButton type='button' callBack={() => setFormVisible(!isFormVisible)} visible={!isFormVisible}>
            <div>добавить</div>
        </NoBorderButton>
    </div>

}

const NotesArray: FC<INotesArrayProps> = ({ array, title, clientId }: INotesArrayProps) => {

    const authUser = useAppSelector(s => s.auth.loginData.data)
    const fullName = authUser?.fullName
    const authorId = authUser?._id
    const [isFormVisible, setFormVisible] = useState(false)
    const [hoveredLine, setHoveredLine] = useState('')

    const dispatch = useAppDispatch()
    const edit = (editableNote: INote) => {
        /* const editableIndex = array?.findIndex(el => el._id === editableNote._id)
        const newArr = [...array || []]
        if (editableIndex !== -1 && editableIndex !== undefined) newArr[editableIndex] = editableNote
        dispatch(syncEditClient({
            _id: clientId, fieldName: 'notes',
            values: newArr
        })) */
        dispatch(fetchEditNote(editableNote))
    }
    const deleteNote = (noteId: string) => {
        dispatch(fetchDeleteNote({noteId, clientId}))
    }
    useEffect(() => {
        if (!array) {
            dispatch(fetchGetClientNotes(clientId))
        }
    }, [])

    if (!fullName || !authorId) return null

    // ортируем чтобы первыми в массиве были самые ранние события
    const sortedArray = [...array || []].sort((note, nextNote) => note.deadLine - nextNote.deadLine)
    const currentItemIdx = 0 // показываем в таблице куррент айтем самое раннее событие

    const doneArray = sortedArray.filter(el => el.isDone)
    const todoArray = sortedArray.filter(el => !el.isDone)

    return (
        <div className={c.arrayWrapper}>
            <AddNoteBtn array={array}
                title={title}
                setFormVisible={setFormVisible}
                isFormVisible={isFormVisible} />

            {Boolean(array?.length) &&
                <CurrentNote note={todoArray[currentItemIdx]} />}

            <div className={isFormVisible ? c.form : c.hiddenForm}>
                <AddNoteForm array={array || []} fullName={fullName} authorId={authorId}
                    clientId={clientId}
                    setFormVisible={setFormVisible} />
            </div>

            {!!todoArray.length &&
                <div className={c.block}>
                    <h3>Предстоящие действия</h3>
                    {todoArray.map((el, i) => <ActionsItem key={`${el._id}${i}` || `${el.createTimeStamp}${i}`}
                        note={el}
                        edit={edit}
                        deleteItem={() => deleteNote(el._id)}
                        hoveredLine={hoveredLine}
                        setHoveredLine={setHoveredLine} />
                    )}
                </div>
            }

            {!!doneArray.length &&
                <div className={c.block}>
                    <h3>Завершённые действия</h3>
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

export default NotesArray;


