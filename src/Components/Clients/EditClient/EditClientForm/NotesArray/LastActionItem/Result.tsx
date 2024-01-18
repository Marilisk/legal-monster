import { Divider, Typography } from '@mui/material'
import { FC, useState } from 'react'
import c from './ActionItem.module.scss'
import TextField from '../../../../../../assets/input elements/TextField/TextField'
import DoneButton from '../../../../../../assets/input elements/DoneButton/DoneButton'
import { useAppSelector } from '../../../../../../redux/hooks'
import { selectIsOwner } from '../../../../../../redux/authSlice'

interface IProps {
    result?: string
    isDone?: boolean
    editResult: (v: string) => void
}

const Result: FC<IProps> = ({ result, isDone, editResult }) => {

    const [text, setText] = useState('')

    // todo сделать настройку разрешать ли изменять завершенные события рядовым пользователям
    const isOwner = useAppSelector(selectIsOwner)
    const canEditCompletedActions = useAppSelector(s => s.auth.loginData.data?.powers.canEditCompletedActions)

    const canEditDoneResult = isDone || isOwner || canEditCompletedActions

    return (
        <div className={c.result}>
            <Divider />

            {result?.length ?
                <div>
                    <Typography variant='h6'>Результат: </Typography>
                    <div>
                        <Typography>{result}</Typography>
                    </div>
                </div>
                :
                <>
                    {
                        canEditDoneResult &&
                        <>
                            <TextField
                                value={text}
                                label='Результат'
                                onChange={setText}
                            />
                            <div>
                                <DoneButton
                                    tooltipText='записать результат и отметить действие выполненным'
                                    callBack={() => editResult(text)}
                                    // confirmQuestion='вы уверены, что хотите отметить действие выполненным?'
                                />
                            </div>
                        </>
                    }
                </>

            }

        </div>
    )
}

export default Result
