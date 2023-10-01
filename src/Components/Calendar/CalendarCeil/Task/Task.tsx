import { ITask } from '../../../../types/eventsTypes';
import { FC } from "react";
import c from './../CalendarCeil.module.scss'


interface ITaskProps {
    task: ITask
}

export const Task: FC<ITaskProps> = ({ task }: ITaskProps) => {

    return <div className={c.taskWrap} >
        {task.title}
    </div>
}