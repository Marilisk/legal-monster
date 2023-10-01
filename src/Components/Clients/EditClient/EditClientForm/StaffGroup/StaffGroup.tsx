import { FC, useState } from 'react';
import { IUser } from '../../../../../types/userTypes';
import c from './StaffGroup.module.scss'
import { CrossIcon } from '../../../../../assets/Icons/CrossIcon/CrossIcon';
import { Arrow } from '../../../../../assets/Icons/ArrowIcon/Arrow';
import { useAppDispatch } from '../../../../../redux/hooks';
import { fetchEditClientStaff } from '../../../../../redux/clientsSlice';


interface IStaffGroupProps {
    variantsArray: IUser[]
    valuesArray: string[]
    //setFieldValue: (arg1: string, arg2: string[], arg3: boolean) => void
    name: 'lawyers' | 'managers'
    title: string
    clientId: string
}

const StaffGroup: FC<IStaffGroupProps> = ({ variantsArray, valuesArray, name, title, clientId }: IStaffGroupProps) => {

    const [areVarsExpanded, setVarsExpanded] = useState(false)
    const dispatch = useAppDispatch()

    const handleChange = (newValuesArr: string[]) => {
        dispatch(fetchEditClientStaff({staffName: name, newValuesArr, clientId}))
    }


    return <div className={c.wrap} /* style={{border: '1px solid red'}} */>
        <h3>{title}</h3>
        <div className={c.flex}>
            <div className={c.chosen}>

                {valuesArray.length ? valuesArray.map((el, i) => {

                    return <div className={c.manager} key={el}
                        onClick={() => {
                            const newArr = valuesArray.filter(val => val !== el)
                            handleChange(newArr)
                        }} >
                        <span>{(variantsArray.find(man => man._id === el))?.fullName}</span>
                        <CrossIcon color='##734B4D' size='16' />
                    </div>
                })
                    :
                    <div className={c.manager}>не выбраны</div>}
            </div>

            <div className={c.variantsWrap} onMouseLeave={() => setVarsExpanded(false)}>

                <div className={c.header}
                    onMouseEnter={() => setVarsExpanded(true)}
                    onClick={() => setVarsExpanded(!areVarsExpanded)}>
                    {(valuesArray.length !== variantsArray.length) ?
                        <>
                            <p>сотрудники</p>
                            <Arrow size='10' vector={areVarsExpanded ? 'up' : 'down'} />
                        </>
                        :
                        <p>все сотрудники прикреплену к этому клиенту</p>
                    }
                </div>

                <div className={(areVarsExpanded && valuesArray.length !== variantsArray.length) ? c.varsSelect : c.varsNone}>
                    {variantsArray.map(el => {
                        const isChosen = valuesArray.findIndex(man => man === el._id) < 0
                        return <div key={el._id}
                            onClick={() => {
                                handleChange([...valuesArray, el._id])
                                setVarsExpanded(false)
                            }}
                            className={isChosen ? c.variant : c.none} >
                            {el.fullName}
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>
};

export default StaffGroup;