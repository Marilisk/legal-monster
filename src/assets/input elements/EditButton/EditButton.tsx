import { IconButton } from '@mui/material'
import { FC } from 'react'
import { IButtonProps, appearingBtnStyles } from '../DeleteButton/DeleteButton'
import EditIcon from '@mui/icons-material/Edit';


const EditButton:FC<IButtonProps> = ({
    callBack, disabled = false, visible = true, color = undefined
}: IButtonProps) => {


  return <IconButton size="medium"
  sx={() => appearingBtnStyles(visible)}
  disabled={disabled}
  type='button'
  onClick={callBack} >
  <EditIcon />
</IconButton>
}

export default EditButton