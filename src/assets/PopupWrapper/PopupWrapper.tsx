import { FC, PropsWithChildren } from 'react';
import c from './PopupWrapper.module.scss'


interface IPopupWrapperProps extends PropsWithChildren {
    title: string
}

const PopupWrapper: FC<IPopupWrapperProps> = ({
    title,
    children,
}: IPopupWrapperProps) => {


    return <div className={c.container} >
        <div className={c.header}>
            <p>{title}</p>
        </div>
        {children}
    </div>
};

export default PopupWrapper;

