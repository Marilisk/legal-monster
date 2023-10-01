import { FC, memo } from "react"
import c from './PhaseFilters.module.scss';
import CheckBox from "../../../assets/input elements/checkbox/CheckBox";
import { IClient, SalesPhaseType } from "../../../types/clientsTypes";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setClientsFilter } from "../../../redux/clientsSlice";

interface IPhaseFiltersProps {
    salesPipeline: SalesPhaseType[]
    clients: IClient[]
}


const Presenter: FC<IPhaseFiltersProps> = ({ salesPipeline, clients }: IPhaseFiltersProps) => {

    const dispatch = useAppDispatch()
    const excludedPhases = useAppSelector(s => s.clients.clientsFilters.excludedPhases)

    const clientsPhasesNums:number[] = []
    clients.forEach(client => clientsPhasesNums.push(client.phase.number))

    const setFilter = (filter: number) => {
        const isChecked = excludedPhases.includes(filter) 
        dispatch(setClientsFilter({
            property: 'excludedPhases', 
            values: isChecked ? 
                [...excludedPhases.filter(el => el !== filter)] 
                : [...excludedPhases, filter]
        }))
    }

    const setAllFilters = () => {
        dispatch(setClientsFilter({
            property: 'excludedPhases', 
            values: excludedPhases.length ? [] 
                : clientsPhasesNums
        }))
    }

    return <div className={c.wrap}>

        <div className={c.all}>
            <label>
                <CheckBox checked={!excludedPhases.length} callback={() => setAllFilters()} />
                <h2>все</h2>
                <span className={c.amount}>{clients.length}</span>
            </label>
        </div>

        {salesPipeline.map((phase, i) => {
            
            let amount = 0
            clientsPhasesNums.forEach(n => { if (phase.stepNumber === n) amount++ } )

            if (amount) {
                return <div key={i} className={c.filterItem}>
                <label>
                    <CheckBox checked={!excludedPhases.includes(phase.stepNumber)}
                        callback={() => setFilter(phase.stepNumber)} />
                    <div style={{ border: `1px solid ${phase.color}`, background: `${phase.color}` }} />
                    <span className={c.labelText}>
                        {phase.title}
                    </span>
                    <span className={c.amount}>{amount > 0 && amount}</span>
                </label>
            </div>
            } else return null            
        })}

    </div>
}

export const PhaseFilters = memo(Presenter)