import { useState, useEffect, RefObject } from "react"

/**
 * вычисляет расстояние до границ окна для позиционирования модального окна посередине
 * 
 */

export function useGetPosition(modalRef: RefObject<HTMLDivElement>) {

    const [left, setLeft] = useState<number>()
    const [top, setTop] = useState<number>()
    const handleResize = () => {
        //console.log('resize')
        const width = modalRef.current?.clientWidth
        const height = modalRef.current?.clientHeight
        //const anHeight = modalRef.current?.getBoundingClientRect()
        //console.log('anHeight', anHeight)
        if (width) setLeft(width / 2)
        if (height) setTop(height / 2)
    }

    //handleResize()
    //console.log('modalRef.current?.clientHeight', modalRef.current?.clientHeight)

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [modalRef.current?.clientWidth, modalRef.current?.clientHeight])

    useEffect(() => {
        handleResize()
    }, [])

    return {left, top}
}
