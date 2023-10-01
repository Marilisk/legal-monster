import { NavLink, useParams } from 'react-router-dom';
import c from './LeftNavigationBar.module.scss'
import { FC } from 'react';


export interface ILeftNavigationBarProps {
    items: {
        title: string
        link: string
        amount?: number
    }[]
}


export const LeftNavigationBar: FC<ILeftNavigationBarProps> = ({ items }: ILeftNavigationBarProps) => {

    const params = useParams()
    
    return <div className={c.wrap}>

        {items.map((el, i) => {
            const lastParamArr = el.link.split('/')
            const lastParam = lastParamArr[lastParamArr.length - 1]
            return <NavLink key={i} to={el.link} 
                className={({ isActive }) => ( (isActive && lastParam === params['*']) || (params['*'] === '' && lastParamArr.length < 3 )   ) ? c.activeItem : c.item}>
                <div className={c.btn}>
                    {el.title}
                </div>
            </NavLink>
        })}

    </div>
};