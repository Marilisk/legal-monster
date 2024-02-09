import { FC } from "react"
import { CrossIcon } from "../../Icons/CrossIcon/CrossIcon"
import { IconButton } from "@mui/material"
import { appearingBtnStyles } from "../DeleteButton/DeleteButton"
import withConfirmDialog from "../ConfirmDialog/ConfirmDialog"

interface IButtonProps {
    callBack?: () => void
    disabled?: boolean
    visible?: boolean
}

export const CancelButton: FC<IButtonProps> = ({ callBack, disabled = false, visible = true }: IButtonProps) => {

    return <IconButton
        sx={() => appearingBtnStyles(visible)}
        disabled={disabled}
        type='button'
        onClick={callBack} >
        <CrossIcon size="22px" color="#C8CACA" />
    </IconButton>

}

export const CancelButtonWithConfirm = withConfirmDialog(CancelButton)



