import { useAppSelector } from '../../../redux/hooks';
import { StaffLine } from '../StaffLine/StaffLine';

const Lawyers = () => {

    const lawyers = useAppSelector(s => s.staff.lawyers.items)

    return (
        <div>
            {lawyers.map(lawyer => (
                <StaffLine key={lawyer._id} user={lawyer} />
            ))}
        </div>
    );
};

export default Lawyers;