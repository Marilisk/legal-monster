import { FC } from "react"
import c from './RadioBtnsGroup.module.scss'

interface IRadioBtnsGroupProps {
    values: string[]
    chosenValue: string
    name: string
    onChange: (val: string) => void
}

export const RadioBtnsGroup: FC<IRadioBtnsGroupProps> = ({ values, chosenValue, name, onChange }: IRadioBtnsGroupProps) => {

    const inputWidth = 100 / values.length

    return <div className={c.radioWrap}>

        {values.map(el => (
            <label key={el} style={{width: `${inputWidth}%`}} >

                <input type='radio' name={name} value={el} 
                    checked={chosenValue === el} 
                    onChange={() => onChange(el)}
                    />

                <div>
                    <span>{el}</span>
                </div>
                
            </label>
        ))}
    </div>
}