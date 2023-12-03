import React, { FC } from 'react'
import { NoBorderButton } from '../../../../../../assets/input elements/NoBorderButton/NoBorderButton'
import { ClientActivityType, IActivity } from '../../../../../../types/clientsTypes'
import c from './AddActivityBtns.module.scss'

interface IAddActivityBtns {
    areNoActivities: boolean
    title: string
    isFormVisible: boolean
    setFormVisible: (arg: boolean) => void
    setFormActivityType: (arg: ClientActivityType ) => void
}

const AddActivityBtns: FC<IAddActivityBtns> = ({ areNoActivities, title, setFormVisible, isFormVisible, setFormActivityType }: IAddActivityBtns) => {

    const  btns = [
        'Прикрепить заметку', '', '', ''
    ]

    const handleClick = (type: ClientActivityType) => {
        if (!isFormVisible) setFormVisible(true)
        setFormActivityType(type)
    }

    return <div className={c.header} >
        <h3>{areNoActivities ? 'пока не было активности...' : title} </h3>
        <div className={c.wrap}>
        <NoBorderButton type='button' callBack={() => handleClick('note') } visible={!isFormVisible}>
            <div>прикрепить заметку</div>
        </NoBorderButton>

        <NoBorderButton type='button' callBack={() => handleClick('task') } visible={!isFormVisible}>
            <div>создать задачу</div>
        </NoBorderButton>

        <NoBorderButton type='button' callBack={() => handleClick('meeting') } visible={!isFormVisible}>
            <div>добавить встречу</div>
        </NoBorderButton>

        <NoBorderButton type='button' callBack={() => handleClick('document') } visible={!isFormVisible}>
            <div>загрузить документ</div>
        </NoBorderButton>
        </div>
    </div>

}


export default AddActivityBtns