import { FC } from "react"
import { IActivity } from "../../../../../../types/clientsTypes"
import c from './ActionItem.module.scss'
import { DoneTask } from "../../../../../../assets/Icons/DoneTask"
import { NoBorderButton } from "../../../../../../assets/input elements/NoBorderButton/NoBorderButton"
import { brieflyformatDate } from "../../../../../../assets/functions/formatDate"
import { DeleteButton } from "../../../../../../assets/input elements/DeleteButton/DeleteButton"
import { Card, CardContent, Paper } from "@mui/material"


interface IActionProps {
    note: IActivity
    edit: (arg: IActivity) => void
    deleteItem: () => void
    hoveredLine: string
    setHoveredLine: (arg: string) => void
    setEditableNote?: (arg: IActivity) => void
}

export const ActionsItem: FC<IActionProps> = ({ note, edit, deleteItem, hoveredLine, setHoveredLine, setEditableNote }: IActionProps) => {



    return <Paper sx={{ color: note.isDone ? '#C8CACA' : 'inherit' }} className={note.isDone ? c.doneWrap : c.wrap} /* key={note._id} */
        onMouseEnter={() => note._id && note._id !== hoveredLine && setHoveredLine(note._id)}
        onMouseLeave={() => setHoveredLine('')}
    >
        <div className={c.col}>{note.author.fullName}</div>
        <div className={c.titleCol}>
            <div>{note.title}</div>
            {note.type !== 'note' &&
                <div>{note.text}</div>
            }

        </div>

        <div className={c.col}>

            Результат:
            {note.result}
        </div>



        <div className={c.col}>{brieflyformatDate(new Date(note.deadLine))}</div>
        <div className={c.doneCol}>

            {
                !note.isDone ?
                    <>
                        <NoBorderButton type="button" small
                            callBack={() => edit({ ...note, isDone: true })} >
                            <div>отметить выполненным</div>
                        </NoBorderButton>
                    </>
                    :
                    <DoneTask />
            }

            <DeleteButton callBack={deleteItem} visible={hoveredLine === note._id} />
            {setEditableNote && <button onClick={() => setEditableNote(note)} >редактировать</button>}

        </div>
    </Paper>
}
