import { FC } from 'react';
import c from './LoadingDots.module.scss';

interface IProps {
    size?: 'small' | 'allPage'
}

export const LoadingDots:FC<IProps> = ({ size = 'allPage' }:IProps) => {

    return <div className={ size === 'allPage' ? c.loader : c.smallLoader}>
        <span/> <span/> <span/>
    </div>
}