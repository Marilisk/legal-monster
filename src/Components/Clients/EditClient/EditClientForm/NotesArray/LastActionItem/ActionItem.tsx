import { FC } from "react"
import { IActivity } from "../../../../../../types/clientsTypes"
import c from './ActionItem.module.scss'
import { smartFormatDate } from "../../../../../../assets/functions/formatDate"
import { DeleteButtonWithConfirm } from "../../../../../../assets/input elements/DeleteButton/DeleteButton"
import { Divider, Paper, Typography } from "@mui/material"
import EditButton from "../../../../../../assets/input elements/EditButton/EditButton"
import { useGetActivityTitleFromType } from "../getPriorityText"
import Result from "./Result"


interface IActionProps {
    note: IActivity
    edit: (arg: IActivity) => void
    deleteItem: () => void
    hoveredLine: string
    setHoveredLine: (arg: string) => void
    setEditableNote?: (arg: IActivity) => void
}

export const ActionsItem: FC<IActionProps> = ({
    note, edit, deleteItem, hoveredLine, setHoveredLine, setEditableNote
}: IActionProps) => {

    const assets = useGetActivityTitleFromType(note.type)


    return <Paper sx={{
        color: note.isDone ? '#7C7D7D' : 'inherit',
        mb: 2,
        background: assets.bgColor
    }}
        className={note.isDone ? c.doneWrap : c.wrap}
        onMouseEnter={() => note._id && note._id !== hoveredLine && setHoveredLine(note._id)}
        onMouseLeave={() => setHoveredLine('')}
    >
        <div className={c.col} >
            <div>
                {
                    note.type !== 'note' && <>
                        {smartFormatDate(new Date(note.deadLine))}
                        <Divider />
                    </>
                }
                <Typography variant="body2">Создано: {note.author.fullName}&nbsp;
                    {smartFormatDate(new Date(Date.parse(note.createdAt)))}  </Typography>
            </div>
        </div>

        <div className={c.titleCol}>
            <div>
                {assets.icon}
                <Typography variant="h6">{note.title}</Typography>
                <div className={c.doneCol}>

                    <DeleteButtonWithConfirm callBack={deleteItem} visible={hoveredLine === note._id}
                        confirmBtnText={note.title || 'запись' + '?'}
                        confirmTitle='Уверены, что хотите удалить '
                    />
                    {
                        setEditableNote &&
                        <EditButton callBack={() => setEditableNote(note)} visible={hoveredLine === note._id} />
                    }
                </div>
            </div>
            {note.type !== 'note' &&
                <div>{note.text}</div>
            }
            {note.type !== 'note' && note.type !== 'document' &&
                <Result
                    result={note.result}
                    isDone={note.isDone}
                    editResult={(v) => edit({ ...note, isDone: true, result: v })}
                />
            }
        </div>

    </Paper>
}
