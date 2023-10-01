import  { FC } from 'react';
import c from './../DateTimePicker.module.scss'

interface IHourCeilProps {
    value: number
    onHourChange: (hour: number) => void
    isChosen: boolean
}


const HourCeil:FC<IHourCeilProps> = ({value, onHourChange, isChosen}:IHourCeilProps) => {
    return (
        <div className={isChosen ? c.chosenTimeCell : c.timeCeil}
            onClick={() => onHourChange(value)}>
            {value}
        </div>
    );
};

export default HourCeil;