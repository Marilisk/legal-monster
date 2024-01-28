import { FC } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import withConfirmDialog from "../ConfirmDialog/ConfirmDialog";

export interface IButtonProps {
    callBack?: () => void
    disabled?: boolean
    visible?: boolean
    color?: string
}

export const appearingBtnStyles = (visible: boolean) => {
    return {
        pointerEvents: visible ? 'auto' : 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 200ms linear'
    }
}

export const DeleteButton: FC<IButtonProps> = ({
    callBack, disabled = false, visible = true, color = undefined
}: IButtonProps) => {

    return <IconButton size="medium"
        sx={() => appearingBtnStyles(visible)}
        disabled={disabled}
        type='button'
        onClick={() => {
            callBack && callBack()
        }} >
        <DeleteIcon />
    </IconButton>
}

export const DeleteButtonWithConfirm = withConfirmDialog(DeleteButton)
