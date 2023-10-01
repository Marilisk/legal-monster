import { FC } from "react"
import c from './../CancelButton/CancelButton.module.scss'

interface IButtonProps {
    callBack?: () => void
    disabled?: boolean
    visible?: boolean
    color?: string
}

export const DeleteButton: FC<IButtonProps> = ({ callBack, disabled = false, visible = true, color = undefined }: IButtonProps) => {

    return <button className={visible ? c.btn : c.hiddenBtn}
        disabled={disabled}
        type='button'
        onClick={callBack} >
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill={color} height="22px" viewBox="0 -960 960 960" width="22px">
                <path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z" />
            </svg>
        </div>

    </button>

}