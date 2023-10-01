import { FC } from 'react';
import c from './ColorPicker.module.scss'


interface IColorPickerProps {
    name: string
    value: string | undefined
    onChange: (arg: string) => void
}

const ColorPicker: FC<IColorPickerProps> = ({ name, value, onChange }: IColorPickerProps) => {



    return (
        <div className={c.colorInput}>
            <label>
                <span>цвет</span>
                <input name={name}
                    value={value}
                    type='color'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.value)} />
                {/* <div className={c.colorDot} style={{ background: value || 'ffffff' }} /> */}
            </label>

        </div>
    );
};

export default ColorPicker;