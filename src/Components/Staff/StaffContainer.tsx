import { LeftNavigationBar } from "./StaffNavigation/LeftNavigationBar";
import c from './StaffContainer.module.scss'
import { Route, Routes } from "react-router-dom";
import InviteStaff from "./InviteStaff/InviteStaff";
import Managers from "./Managers/Managers";
import Lawyers from "./Lawyers/Lawyers";
import { useAppSelector } from "../../redux/hooks";



const StaffContainer = () => {

    const managersAmount = useAppSelector(s => s.staff.managers.items.length)
    const lawyersAmount = useAppSelector(s => s.staff.lawyers.items.length)

    const staffNavigationBtns = [
        {title: 'пригласить сотрудника', link: '/staff'},
        {title: 'менеджеры', link: '/staff/managers', amount: managersAmount},
        {title: 'юристы', link: '/staff/lawyers', amount: lawyersAmount},
    ]

    return <div className={c.wrap}>

            <LeftNavigationBar items={staffNavigationBtns} />

            <div>
                <Routes>
                    <Route path='/' element={<InviteStaff />} />
                    <Route path='/managers' element={<Managers />} />
                    <Route path='/lawyers' element={<Lawyers />} />
                </Routes>
            </div>
        </div>
        
};

export default StaffContainer;