import {Button} from "./Button.tsx";
import {ChangeEvent, useState} from "react";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    createTask: (title: string) => void
    deleteTasks: (taskId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = ({title, tasks, deleteTasks, createTask}: TodolistPropsType) => {
    const [taskTitle, setTaskTitle] = useState('')

    const tasksList = tasks.length === 0
        ? <span>Your list is empty</span>
        : <ul>
            {tasks.map(task => {
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <Button
                            title={'x'}
                            onClick={() => deleteTasks(task.id)}
                        />
                    </li>
                )
            })}
        </ul>


    return (
        <div className='todolist'>
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setTaskTitle(event.target.value)}
                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                        if (event.key === 'Enter') {
                            createTask(taskTitle)
                            setTaskTitle('')
                        }
                    }}
                />
                <Button
                    title={'+'}
                    onClick={() => {
                        createTask(taskTitle)
                        setTaskTitle('')
                    }}
                />
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