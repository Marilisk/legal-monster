import { useEffect, useState, RefObject } from 'react'
import { SalesPhaseType } from '../../../../../types/clientsTypes'


export const useCorrector = (chosenItemRef: RefObject<HTMLDivElement>, pipeline: SalesPhaseType[], wrapper: RefObject<HTMLDivElement>, container:RefObject<HTMLDivElement>) => {

    const [leftCord, setLeftCord] = useState(0)

    useEffect(() => {
        const isChosenLast = chosenItemRef.current?.innerText === pipeline[pipeline.length -1 ]?.title
        let containerRectRight = 0
        let chosenItemRectRight = 0
        let chosenItemRectLeft = 0
        let wrapperRectLeft = wrapper.current?.getBoundingClientRect().left || 0
        let extraSpace = chosenItemRef.current?.getBoundingClientRect().width || 0
        if (container.current) {
            const containerRect = container.current.getBoundingClientRect()
            containerRectRight = containerRect.right
            //setWrapperRectLeft(wrapper.current?.getBoundingClientRect().left || 0)
            if (chosenItemRef.current) {
                const chosenItemRect = chosenItemRef.current.getBoundingClientRect()
                chosenItemRectRight = chosenItemRect.right
                chosenItemRectLeft = chosenItemRect.left
            }
        }
        // если выбранный элемент правее правой границы контейнера :
        if (chosenItemRectRight > containerRectRight && container.current && chosenItemRef.current) {    
            if (isChosenLast) extraSpace = 0   
            setLeftCord( - (chosenItemRectRight - containerRectRight) - (extraSpace || 0) - 12 )
            // если выбранный элемент левее левой границы контейнера :
        } else if (chosenItemRectLeft < wrapperRectLeft && container.current && chosenItemRef.current && wrapper.current) {            
            setLeftCord( 0 )   
        }
    }, [chosenItemRef.current, pipeline, container, wrapper])

    return leftCord
}