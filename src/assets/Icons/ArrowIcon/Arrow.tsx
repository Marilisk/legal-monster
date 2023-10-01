import { FC } from "react";
import c from './Arrow.module.scss'

interface IArrowProps {
    vector: 'right' | 'left' | 'down' | 'up'
    size: string
    color?: string
}

export const Arrow: FC<IArrowProps> = ({ vector, size, color }: IArrowProps) => {

    let deg
    switch (vector) {
        case 'right':
            deg = 45
            break
        case 'left':
            deg = 225
            break
        case 'down':
            deg = 135
            break
        case 'up':
            deg = 315
            break
    }

    return <div className={c.arrow}
        style={{ width: `${size}px`, height: `${size}px`, transform: `rotate(${deg}deg)`,
        border: `solid ${color || '#69BFAF'}`, 
        borderWidth: '3px 3px 0 0', }} >

    </div>
}