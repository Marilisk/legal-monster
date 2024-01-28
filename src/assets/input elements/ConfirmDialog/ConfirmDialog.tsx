import { ComponentType, FC } from 'react'
import { IButtonProps } from '../DeleteButton/DeleteButton'
import { openConfirm } from './Confirm'


export interface IWithConfirmDialog extends IButtonProps {
  confirmTitle: string
  text?: string
  acceptBtnText?: string
  confirmBtnText: string
  cancleBtnText?: string
  onCancel?: () => void
  onAccept?: () => void
  callBack: () => void
}

function withConfirmDialog<IButtonProps>(Component: ComponentType<IButtonProps>): FC<IWithConfirmDialog> {
  return ({
    confirmTitle,
    callBack,
    onCancel,
    onAccept,
    text,
    confirmBtnText,
    acceptBtnText,
    cancleBtnText,
    ...props
  }) => {

    async function onClickButton(e: any) {
        try {
          await openConfirm({
            text: confirmBtnText,
            confirmTitle: confirmTitle,
            confirmBtnText,
            callBack: callBack,
          })
        } catch (error) {
          onCancel && onCancel()  // это кажется не отрабатывает никогда
        }
    }
    return <Component
      {...props as IButtonProps } 
      callBack={onClickButton}
    />
  }
} 

export default withConfirmDialog