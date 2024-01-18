import { FC, PropsWithChildren } from "react"
import c from './Button.module.scss'

interface IButtonProps extends PropsWithChildren {
    type?: 'submit' | 'button'
    callBack?: () => void
    disabled?: boolean
    visible?: boolean
}

export const Button: FC<IButtonProps> = ({ type = 'button',
    callBack,
    children,
    disabled,
    visible = true,
}: IButtonProps) => {

    return <button className={visible ? c.btn : c.hiddenBtn}
        disabled={disabled}
        type={type}
        onClick={callBack}>
        {children}
    </button>

}