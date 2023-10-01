import { FC, useState } from "react";
import c from './../ClientLine/ClientLine.module.scss';
import { PhaseFilters } from "../PhaseFilters/PhaseFilters";
import { Arrow } from "../../../assets/Icons/ArrowIcon/Arrow";
import { IClient, SalesPhaseType } from "../../../types/clientsTypes";

interface ITableHeaderProps {
    openedFilter: string
    salesPipeline: SalesPhaseType[] | undefined
    clients: IClient[]
}


export const TableHeader: FC<ITableHeaderProps> = ({ openedFilter, salesPipeline, clients }: ITableHeaderProps) => {

    const [hoveredEl, setHoveredEl] = useState('')

    const handleHover = (e: React.MouseEvent) => {
        const id = ((e.target as HTMLElement).closest('[id]') as HTMLElement).id
        setHoveredEl(id)
    }

    if (!salesPipeline) return null

    return <div className={c.headerLine} onMouseOver={handleHover} onMouseLeave={() => setHoveredEl('')}>

        <TableHeadItem name='nameCol' isHovered={hoveredEl === 'nameCol'} label='название' />

        <TableHeadItem name='personCol' isHovered={hoveredEl === 'personCol'} label='контакт'
            accordeon={{element: <div>CHILD</div>, opened: openedFilter === 'personCol'}} />

        <TableHeadItem name='phaseCol' isHovered={hoveredEl === 'phaseCol'} label="фаза"
            accordeon={{
                element: <PhaseFilters salesPipeline={salesPipeline} clients={clients} />,
                opened: openedFilter === 'phaseCol',
            }} />

        <TableHeadItem name='nextEventCol' isHovered={hoveredEl === 'nextEventCol'} label='ближайшая задача' />

    </div>
}

interface ITableHeadItemProps {
    name: string
    isHovered: boolean
    label?: string
    child?: JSX.Element
    accordeon?: {
        element: JSX.Element 
        opened: boolean
    }
}

export const TableHeadItem: FC<ITableHeadItemProps> = ({ name, isHovered, label, child, accordeon }: ITableHeadItemProps) => {


    return <div className={`c.${name}`} id={name}>
        <p>{label}</p>
        {child}
        <div className={accordeon?.opened ? c.accordeon : c.hiddenAccordeon}>
            {accordeon?.element}
        </div>
        <div className={isHovered ? c.arrowOn : c.arrowOff}>
            <Arrow vector="right" size="10" />
        </div>

    </div>
}

