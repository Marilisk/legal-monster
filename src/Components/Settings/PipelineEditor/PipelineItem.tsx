import { useState, FC, ChangeEvent } from 'react'
import c from './PipelineEditor.module.scss' 
import { SalesPhaseType } from '../../../types/clientsTypes'
import ColorPicker from '../../../assets/input elements/ColorPicker/ColorPicker'
import { NoBorderButton } from '../../../assets/input elements/NoBorderButton/NoBorderButton'
import { DoneIcon } from '../../../assets/Icons/DoneIcon'
import { CrossIcon } from '../../../assets/Icons/CrossIcon/CrossIcon'
import { CloseButton } from '../../../assets/input elements/CloseButton/CloseButton'


interface IPipeLineItemProps {
    element: SalesPhaseType
    saveItem: (arg1: SalesPhaseType, arg2: number) => void
    onDelete: () => void
    index: number
}

export const PipeLineItem: FC<IPipeLineItemProps> = ({ element, saveItem, onDelete, index }: IPipeLineItemProps) => {

    const [title, handleChangeTitle] = useState(element.title)
    const [color, handleChangeColor] = useState<string | undefined>(element.color)
    const [isEditible, setIsEditible] = useState(false)



    return <div className={c.itemWrap}>
        <div className={c.number}>
            {element.stepNumber}
        </div>

        <div className={c.colorDot} style={{ background: color || 'ffffff' }} />

        <div className={c.title}>
            <input value={title}
                className={isEditible ? c.editibleTitle : c.disabledTitle}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeTitle(e.target.value)} />
        </div>

        {isEditible && <ColorPicker name='color' value={color} onChange={handleChangeColor} />}

        <div className={c.editBtn}>
            <NoBorderButton type='button' >
                {isEditible ?
                    <div onClick={() => {
                        saveItem({ stepNumber: element.stepNumber, title, color }, index)
                        setIsEditible(false)
                    }} >
                        <DoneIcon size='14px' />
                    </div>
                    :
                    <div onClick={() => setIsEditible(true)} >
                        <span>изменить</span>
                    </div>
                }
            </NoBorderButton>
        </div>
      
        <div className={c.deleteBtn}>
            
            <NoBorderButton type='button'>
                <div onClick={onDelete} >
                    <CrossIcon color='#69BFAF' size='14px' />
                </div>
            </NoBorderButton>
        </div>

        <CloseButton callBack={onDelete} />
    </div>

}