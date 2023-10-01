import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import c from './Header.module.scss';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchLogout } from "../../redux/authSlice";

interface IHeader {
    isAuth: boolean
}

export const Header: FC<IHeader> = ({ isAuth }: IHeader) => {

    const dispatch = useAppDispatch()
    const userName = useAppSelector(s => s.auth.loginData.data?.fullName)
    const role = useAppSelector(s => s.auth.loginData.data?.role)
    

    return <div className={c.wrapper}>
        <div className={c.header}>

            <Link to='/'>
                <h1>MONSTER <span>SYSTEMS</span></h1>
            </Link>

            <div className={c.linksWrapper} >

                <NavLink to='/projects'
                    className={({ isActive }) => isActive ? c.activeLink : c.Link}>
                    <div>Дела</div>
                </NavLink>

                <NavLink to='/'
                    className={({ isActive }) => isActive ? c.activeLink : c.Link}>
                    <div>Клиенты</div>
                </NavLink>

                <NavLink to='/calendar'
                    className={({ isActive }) => isActive ? c.activeLink : c.Link}>
                    <div>Календарь</div>
                </NavLink>

                <NavLink to='/staff'
                    className={({ isActive }) => isActive ? c.activeLink : c.Link}>
                    <div>Сотрудники</div>
                </NavLink>

                <NavLink to='/settings'
                    className={({ isActive }) => isActive ? c.activeLink : c.Link}>
                    <div>Настройки</div>
                </NavLink>

                <NavLink to='/dashboard'
                    className={({ isActive }) => isActive ? c.activeLink : c.Link}>
                    <div>Доска</div>
                </NavLink>

                <NavLink to='/login'
                    className={({ isActive }) => isActive ? c.activeLink : c.Link}>
                    {isAuth ?
                        <div onClick={() => dispatch(fetchLogout())}>
                            Выйти {userName}, {role}
                        </div>
                        :
                        <div  >
                            Войти
                        </div>}
                </NavLink>
            </div>
        </div>

    </div>
}



