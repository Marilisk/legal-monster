import { FC } from 'react';
import { IIconProps } from './CrossIcon/CrossIcon';


export const DoneTask:FC<IIconProps> = ({ color = '#69BFAF', size = '20px' }: IIconProps) => {

    return <svg xmlns="http://www.w3.org/2000/svg" fill={color} height={size} viewBox="0 -960 960 960" width={size}>
    <path d="m381-242 453-453-43-43-410 410-211-211-43 43 254 254Zm0 85L42-496l128-128 211 211 410-410 128 128-538 538Z"/>
    </svg>
}