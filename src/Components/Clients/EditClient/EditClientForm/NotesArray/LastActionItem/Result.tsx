import { Divider, Typography } from '@mui/material'
import { FC, useState } from 'react'
import c from './ActionItem.module.scss'

import { DoneTask } from "../../../../../../assets/Icons/DoneTask"
import { NoBorderButton } from '../../../../../../assets/input elements/NoBorderButton/NoBorderButton'
import { DoneIcon } from '../../../../../../assets/Icons/DoneIcon'
import FormTextField from '../../../../../../assets/input elements/formTextField/FormTextField'

interface IProps {
    result?: string
    isDone?: boolean
    checkIsDone: () => void
    editResult: (v: string) => void
}

const Result: FC<IProps> = ({ result, isDone, checkIsDone }) => {

    const [text, setText] = useState('')



    return (
        <div /* className={c.col} */>
            
            <Typography variant="subtitle2">Результат:</Typography>

            <FormTextField 
                value={text}
                name='addResult'
                
                />

            {result}
                {
                    !isDone ?
                        <>
                        <DoneIcon />
                            <NoBorderButton type="button" small
                                callBack={checkIsDone} >
                                <div>отметить выполненным</div>
                            </NoBorderButton>
                        </>
                        :
                        <DoneTask />
                }
        </div>
    )
}

export default Result