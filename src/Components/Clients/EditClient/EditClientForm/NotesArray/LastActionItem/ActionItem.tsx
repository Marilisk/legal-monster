import { FC } from "react"
import { IActivity } from "../../../../../../types/clientsTypes"
import c from './ActionItem.module.scss'
import { DoneTask } from "../../../../../../assets/Icons/DoneTask"
import { NoBorderButton } from "../../../../../../assets/input elements/NoBorderButton/NoBorderButton"
import { brieflyformatDate, smartFormatDate } from "../../../../../../assets/functions/formatDate"
import { DeleteButton } from "../../../../../../assets/input elements/DeleteButton/DeleteButton"
import { Card, CardContent, Divider, Paper, Typography, hexToRgb } from "@mui/material"
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

    console.log('******************note.createdAt', note.createdAt)
    console.log(new Date(Date.parse(note.createdAt)))

    return <Paper sx={{ color: note.isDone ? '#7C7D7D' : 'inherit', mb: 2, background: assets.bgColor }} className={note.isDone ? c.doneWrap : c.wrap}
        onMouseEnter={() => note._id && note._id !== hoveredLine && setHoveredLine(note._id)}
        onMouseLeave={() => setHoveredLine('')}
    >
        <div className={c.col} >
            <div>
                {note.type !== 'note' && <>
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
                <Typography variant="h3">{note.title}</Typography>
                <div className={c.doneCol}>


                    <DeleteButton callBack={deleteItem} visible={hoveredLine === note._id} />

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
            <>
                {/* <div>
                    <Divider />
                    <Typography variant="subtitle2">Результат:</Typography>
                    {note.result}

                    <>
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
                    </>
                </div> */}
                <Result
                    result={note.result}
                    checkIsDone={() => edit({ ...note, isDone: true }) }
                    isDone={note.isDone}
                    editResult={(v) => edit({ ...note, result: v  }) }
                        
                />
                </>
            }

        </div>




    </Paper>
}
