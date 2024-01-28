import { FC, useContext } from 'react'
import { Button } from '../button/Button'
import c from './ConfirmDialog.module.scss'
import { CloseModalContext, createModal } from '../../../utils/DialogCreator/DialogCreator'
import { IWithConfirmDialog } from './ConfirmDialog'
import { Typography } from '@mui/material'


interface IProps {
    text?: string
    action: () => void
    title?: string
}

const ConfirmDialog: FC<IProps> = ({ text, action, title }: IProps) => {

    const {closeModal} = useContext(CloseModalContext)

    return (
        <div className={c.wrap}>
            <Typography variant='h3'>{title}</Typography>
            <p>{text}</p>
            <div className={c.btnsWrap}>
            <Button
                callBack={() => {
                    action()
                    closeModal()
                }} >
                <div>да</div>
            </Button>

            <Button callBack={closeModal} >
                <div>отмена</div>
            </Button>
            </div>
        </div>
    )
}

export const openConfirm = (props: IWithConfirmDialog) => {
    createModal({
        component: <ConfirmDialog
            text={props.text}
            title={props.confirmTitle}
            action={props.callBack}
            {...props}
        />
    })
} 
