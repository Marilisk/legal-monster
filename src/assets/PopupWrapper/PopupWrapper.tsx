import { FC, PropsWithChildren, useContext } from 'react';
import c from './PopupWrapper.module.scss'
import { CloseModalContext } from '../../utils/DialogCreator/DialogCreator';
import { CloseButton } from '../input elements/CloseButton/CloseButton';


interface IPopupWrapperProps extends PropsWithChildren {
    title: string
}

const PopupWrapper: FC<IPopupWrapperProps> = ({
    title,
    children,
}: IPopupWrapperProps) => {

    const {closeModal} = useContext(CloseModalContext)


    return <div className={c.container} >
        <div className={c.header}>
            <p>{title}</p>
            <CloseButton callBack={closeModal} />
        </div>
        {children}
    </div>
};

export default PopupWrapper;

