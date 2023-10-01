import { FC } from 'react';
import c from './PopupHeader.module.scss'
import { CrossIcon } from '../Icons/CrossIcon/CrossIcon';
import { EditIcon } from '../Icons/EditIcon';
import { DeleteButton } from '../input elements/DeleteButton/DeleteButton';


interface IPopupHeaderProps {
    title: string
    handleClose?: () => void
    setEditible?: () => void
    content?: JSX.Element
    id?: string
    handleDelete?: () => void
}

const PopupHeader: FC<IPopupHeaderProps> = ({ title, handleClose, setEditible, content, id, handleDelete }: IPopupHeaderProps) => {


    return <div className={c.container} id={id}>
        <div className={c.wrap}>
            <p>{title}</p>
            <button onClick={setEditible} type='button'>
                <EditIcon color='#fff' size={30} />
            </button>
            {/* <button onClick={handleClose} type='button'>
                <CrossIcon color='#fff' size='30' />
            </button> */}

            <DeleteButton callBack={handleDelete} visible={!!handleDelete}
                color='#fff' />


        </div>
        {content}
    </div>
};

export default PopupHeader;

