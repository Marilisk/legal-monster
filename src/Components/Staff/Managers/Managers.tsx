import React from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { StaffLine } from '../StaffLine/StaffLine';

const Managers = () => {

    const managers = useAppSelector(s => s.staff.managers.items)

    return (
        <div>
            {managers.map(manager => (
                <StaffLine key={manager._id} user={manager} />
            ))}
        </div>
    );
};

export default Managers;