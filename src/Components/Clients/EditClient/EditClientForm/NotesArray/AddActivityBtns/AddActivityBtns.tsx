import { FC } from 'react'
import { NoBorderButton } from '../../../../../../assets/input elements/NoBorderButton/NoBorderButton'
import { ClientActivityType } from '../../../../../../types/clientsTypes'
import c from './AddActivityBtns.module.scss'
import { Collapse } from '@mui/material'

interface IAddActivityBtns {
    areNoActivities: boolean
    title: string
    isFormVisible: boolean
    setFormVisible: (arg: boolean) => void
    setFormActivityType: (arg: ClientActivityType) => void
}

const AddActivityBtns: FC<IAddActivityBtns> = ({ areNoActivities, title, setFormVisible, isFormVisible, setFormActivityType }: IAddActivityBtns) => {

    const btns = [
        'Прикрепить заметку', '', '', ''
    ]

    const handleClick = (type: ClientActivityType) => {
        if (!isFormVisible) setFormVisible(true)
        setFormActivityType(type)
    }

    return <div className={c.header} >
        <h3>{areNoActivities ? 'пока не было активности...' : title} </h3>
        <Collapse in={!isFormVisible}>
            <div className={c.wrap}>
                <NoBorderButton type='button' callBack={() => handleClick('note')} >
                    прикрепить заметку
                </NoBorderButton>

                <NoBorderButton type='button' callBack={() => handleClick('task')} >
                    создать задачу
                </NoBorderButton>

                <NoBorderButton type='button' callBack={() => handleClick('meeting')} >
                    добавить встречу
                </NoBorderButton>

                <NoBorderButton type='button' callBack={() => handleClick('document')} >
                    загрузить документ
                </NoBorderButton>
            </div>
        </Collapse>
    </div>

}


export default AddActivityBtns