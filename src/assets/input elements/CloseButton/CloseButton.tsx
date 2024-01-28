import { FC } from "react"
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { IButtonProps } from "../DeleteButton/DeleteButton";


export const appearingBtnStyles = (visible: boolean) => {
    return {
        pointerEvents: visible ? 'auto' : 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 200ms linear',
        color: '#fff',
    }
}

export const CloseButton: FC<IButtonProps> = ({
    callBack, disabled = false, visible = true, color = undefined
}: IButtonProps) => {

    return <IconButton size="medium"
        sx={() => appearingBtnStyles(visible)}
        disabled={disabled}
        type='button'
        onClick={() => {
            callBack && callBack()
        }} >
        <Close />
    </IconButton>
}


