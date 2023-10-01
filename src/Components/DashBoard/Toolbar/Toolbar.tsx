import { setTool } from '../../../redux/dashboardSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Rect from '../tools/Rect';
import c from './Toolbar.module.scss'


const Toolbar = () => {
    const dispatch = useAppDispatch()
    const canvas = useAppSelector(s => s.dashboard.canvas)

    return <div className={c.wrap}>
        <h2>Tools</h2>
        <button className={c.penBtn}>
            кисть
        </button>

        <button className={c.penBtn} onClick={() => dispatch(setTool(new Rect(canvas))) }>
            прямоугольник
        </button>

        <label>color
            <input type='color' className={c.colorInput} />
        </label>
    </div>

};

export default Toolbar;