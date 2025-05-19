import {Button} from "./Button.tsx";

type TodolistPropsType = {
    title: string
    tasks: TaskPropsType[]
}

export type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = ({title, tasks}: TodolistPropsType) => {
    const tasksList = tasks.length === 0
        ? <span>Your list is empty</span>
        : <ul>
            {tasks.map(task => {
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                    </li>
                )
            })}
        </ul>


    return (
        <div className='todolist'>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            {tasksList}
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
        </div>
    );
};