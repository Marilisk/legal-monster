import { ChangeEvent, ComponentType, FC } from 'react'
import { IButtonProps } from '../DeleteButton/DeleteButton'
import { openConfirm } from './Confirm'

interface IComfirmHoc {
  ButtonComponent: ComponentType<IButtonProps>
  // buttonProps: 
}
export const withConfirmHoc = ({ ButtonComponent }: IComfirmHoc) => {


  return <ButtonComponent />


}

export interface IWithConfirmDialog extends IButtonProps {
  confirmTitle: string;
  text?: string;
  acceptBtnText?: string;
  confirmBtnText: string;
  cancleBtnText?: string;
  // onConfirm?: (event?: ChangeEvent<HTMLButtonElement>) => void;
  onCancel?: () => void;
  onAccept?: () => void;
  /**
   * если вернуть true, то конфирм вызван не будет
   */
  callBack: () => void
}

function withConfirmDialog<IButtonProps>(Component: ComponentType<IButtonProps>): FC<IWithConfirmDialog> {
  return ({
    confirmTitle,
    // onConfirm,
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
      let disableConfirm: boolean | undefined = false
      /* if (callBack) {
        // disableConfirm = callBack(e)
      } */
      /* if (onConfirm && !disableConfirm) { */
        try {
          await openConfirm({
            text: confirmBtnText,
            confirmTitle: confirmTitle,
            confirmBtnText,
            callBack: callBack,
          })
          // console.log(res)
          // callBack && callBack()
        } catch (error) {
          onCancel && onCancel()
        }
      /* } */
    }
    return <Component
      {...props as IButtonProps } 
      callBack={onClickButton}
    />
  }
} 

export default withConfirmDialog