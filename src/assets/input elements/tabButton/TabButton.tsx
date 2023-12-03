import { FC, useMemo } from "react"
import c from './TabButton.module.scss'

interface ITabButtonProps {
    //type: 'submit' | 'button'
    callBack?: () => void
    children: JSX.Element | string
    disabled?: boolean
    visible?: boolean
    isActive: boolean
}

export const TabButton: FC<ITabButtonProps> = ({ isActive, callBack, children, disabled, visible = true }: ITabButtonProps) => {

    const style = useMemo(() => {
        let style = c.btn
        if (isActive) style = c.activeBtn
        if (!visible) style = c.hiddenBtn
        return style
    }, [isActive, visible, ])
    
    return <button className={style}
        disabled={disabled}
        type='button'
        onClick={callBack}>
        {children}
    </button>

}