import { memo, FC, useState } from 'react';
import c from './CheckBox.module.scss';


interface ICheckBoxProps {
    //value: boolean
    callback: (e: React.ChangeEvent<HTMLInputElement>) => void
    /**
     * @name of input
     * 
     */
    name?: string
    checked?: boolean
}

const CheckBox: FC<ICheckBoxProps> = ({ /* value, */ callback, name, checked }: ICheckBoxProps) => {

    /* const [inputValue, setInputValue] = useState(value) */

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //setInputValue(!inputValue)
        callback(e)
    }

    return <input className={c.checkBox}
        type='checkbox'
        name={name}
        onChange={handleChange}
        checked={checked} />

};

export default memo(CheckBox);