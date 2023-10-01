import { useEffect, useRef } from 'react';
import c from './Canvas.module.scss'
import { useAppDispatch } from '../../../redux/hooks';
import { setCanvas, setTool } from '../../../redux/dashboardSlice';
import Brush from '../tools/Brush';

const Canvas = () => {
    const dispatch = useAppDispatch()
    const canvasRef = useRef<null | HTMLCanvasElement>(null)


    useEffect(() => {
        dispatch(setCanvas(canvasRef.current))
        dispatch(setTool(new Brush(canvasRef.current)))
        if (canvasRef.current) {
            console.log('new Brush', new Brush(canvasRef.current))
        }
    }, [])

    return <div className={c.canvasWrap}>
            <canvas ref={canvasRef} width={600} height={400} />
        </div>
    
};

export default Canvas;