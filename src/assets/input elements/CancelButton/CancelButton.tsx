import { FC } from "react"
import c from './CancelButton.module.scss'
import { CrossIcon } from "../../Icons/CrossIcon/CrossIcon"

interface IButtonProps {
    callBack?: () => void
    disabled?: boolean
    visible?: boolean
}

export const CancelButton: FC<IButtonProps> = ({ callBack, disabled = false, visible = true }: IButtonProps) => {

    return <button className={visible ? c.btn : c.hiddenBtn}
        disabled={disabled}
        type='button'
        onClick={callBack} >
            <CrossIcon size="22px" color="#C8CACA" />
    </button>

}