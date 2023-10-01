import { FC } from "react"
import c from './Button.module.scss'

interface IButtonProps {
    type: 'submit' | 'button'
    callBack?: () => void
    children: JSX.Element
    disabled?: boolean
    visible?: boolean
}

export const Button: FC<IButtonProps> = ({ type, callBack, children, disabled, visible = true }: IButtonProps) => {

    return <button className={visible ? c.btn : c.hiddenBtn}
        disabled={disabled}
        type={type}
        onClick={callBack}>
        {children}
    </button>

}