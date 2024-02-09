import { memo, FC } from 'react';
import { Checkbox } from '@mui/material';


interface ICheckBoxProps {
    callback: (v: boolean) => void
    checked?: boolean
}

const CheckBox: FC<ICheckBoxProps> = ({ callback, checked }: ICheckBoxProps) => {

    const handleChange = () => {
        callback(!checked)
    }

    return <Checkbox
        onChange={handleChange}
        checked={checked} />

};

export default memo(CheckBox);
