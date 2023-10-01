import { FC } from "react"
import { Field } from "formik"
import c from './RadioBtnsGroup.module.scss'

interface IRadioBtnsGroupProps {
    values: string[]
    chosenValue: string
    name: string
}

export const RadioBtnsGroup: FC<IRadioBtnsGroupProps> = ({ values, chosenValue, name }: IRadioBtnsGroupProps) => {

    const inputWidth = 100 / values.length

    return <div className={c.radioWrap}>

        {values.map(el => (
            <label key={el} style={{width: `${inputWidth}%`}} >

                <Field type='radio' name={name} value={el} 
                    checked={chosenValue === el} />

                <div>
                    <span>{el}</span>
                </div>
                
            </label>
        ))}
    </div>
}