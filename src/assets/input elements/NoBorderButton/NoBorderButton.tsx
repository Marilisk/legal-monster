import { FC, ReactNode } from "react"
import c from './NoBorderButton.module.scss'
import { Button } from "@mui/material"

interface IButtonProps {
    type: 'submit' | 'button'
    callBack?: () => void
    children: JSX.Element | ReactNode
    disabled?: boolean
    visible?: boolean
    small?: boolean
}

export const NoBorderButton: FC<IButtonProps> = ({ type, callBack, children, disabled, visible = true, small = false }: IButtonProps) => {

    return <Button className={visible ? c.btn : c.hiddenBtn}
        style={small ? {width: 'auto', padding: '0 10px'} : {width: '120px'}}
        disabled={disabled}
        type={type}
        onClick={callBack} >
        {children}
    </Button>

}