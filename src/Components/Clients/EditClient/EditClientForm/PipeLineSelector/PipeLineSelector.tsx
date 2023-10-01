import { FC, useRef, useState, DragEvent, UIEvent, useEffect, MouseEvent } from 'react'
import c from './PipeLineSelector.module.scss'
import { DoneIcon } from '../../../../../assets/Icons/DoneIcon';
import { SalesPhaseType } from '../../../../../types/clientsTypes';
import { useCorrector } from './hooks';
import { useSelector } from 'react-redux';
import { useAppSelector } from '../../../../../redux/hooks';

interface IPipeLineSelectorProps {
    value: number
    setFieldValue: (n: number) => void
    //pipeline: SalesPhaseType[]
    setIfAnyFieldChangedFlag?: (arg: boolean) => void
}

const PipeLineSelector: FC<IPipeLineSelectorProps> = ({
    value,
    setFieldValue,
    //pipeline,
    setIfAnyFieldChangedFlag,
}: IPipeLineSelectorProps) => {

    const pipeline = useAppSelector(s => s.clients.salesPipeline)
    const chosenItemRef = useRef<HTMLDivElement>(null)
    const container = useRef<HTMLDivElement>(null)
    const wrapper = useRef<HTMLDivElement>(null)
    const leftCord = useCorrector(chosenItemRef, pipeline, wrapper, container)

    const setValue = (stepNumber: number) => {
        if (setIfAnyFieldChangedFlag) setIfAnyFieldChangedFlag(true)
        setFieldValue(stepNumber)
    }


    return (
        <div className={c.wrapper} ref={wrapper} >
            <div className={c.container} ref={container} style={{ left: leftCord + 'px' }} >

                {pipeline.map((stage, i) => {
                    let itemClassName = stage.stepNumber === value ? c.chosenItem : c.futureItem
                    if (stage.stepNumber < value) itemClassName = c.passedItem

                    return <div key={i}
                        ref={itemClassName === c.chosenItem ? chosenItemRef : null}
                        className={itemClassName}
                        onClick={() => setValue(stage.stepNumber) }>
                        {itemClassName === c.passedItem &&
                            <div className={c.iconWrap}>
                                <DoneIcon size='14px' />
                            </div>
                        }
                        <p>{stage.title}</p>
                    </div>
                })}

            </div>

            {/* {pipeline.length > 6 && <Arrow vector='right' size='16px' />} */}

        </div>
    );
};

export default PipeLineSelector;