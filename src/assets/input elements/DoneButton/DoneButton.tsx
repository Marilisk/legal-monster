import { IconButton, Tooltip } from '@mui/material'
import { FC } from 'react'
import { IButtonProps, appearingBtnStyles } from '../DeleteButton/DeleteButton'
import CheckIcon from '@mui/icons-material/Check';

interface IProps extends IButtonProps {
  tooltipText?: string
}

const DoneButton: FC<IProps> = ({
  callBack, disabled = false, visible = true, color, tooltipText,
}: IProps) => {


  return <Tooltip title={tooltipText} >
    <IconButton size="medium"
      sx={() => appearingBtnStyles(visible)}
      disabled={disabled}
      type='button'
      onClick={callBack} >
      <CheckIcon />
    </IconButton>
  </Tooltip>
}

export default DoneButton