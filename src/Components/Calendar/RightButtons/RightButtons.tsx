import { FC } from "react"
import c from './RightButtons.module.scss'
import { RefreshIcon } from "../../../assets/Icons/RefreshIcon"
import { FilterIcon } from "../../../assets/Icons/FilterIcon"
import { TuneIcon } from "../../../assets/Icons/TuneIcon"
import { PrintIcon } from "../../../assets/Icons/PrintIcon"


interface IRightButtonsProps {

}

export const RightButtons: FC<IRightButtonsProps> = ({ }: IRightButtonsProps) => {
   
 

    return <div className={c.rightBths}>
                <button onClick={() => window.location.reload()}>
                    <RefreshIcon />
                </button>
                <button>
                    <FilterIcon />
                    <span>фильтр</span>
                </button>
                <button>
                    <TuneIcon />
                    <span>настройки</span>
                </button>
                <button>
                    <PrintIcon />
                </button>
            </div>

}