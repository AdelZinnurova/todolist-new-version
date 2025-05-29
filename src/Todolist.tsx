import {Button} from "./Button.tsx";
import {ChangeEvent, useState} from "react";
import {FilterValues} from "./App.tsx";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    createTask: (title: string) => void
    deleteTasks: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    changeTaskStatus: (isDone: boolean, taskId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = ({title, tasks, deleteTasks, createTask, changeFilter, changeTaskStatus}: TodolistPropsType) => {
    const [taskTitle, setTaskTitle] = useState('')

    const tasksList = tasks.length === 0
        ? <span>Your list is empty</span>
        : <ul>
            {tasks.map(task => {
                return (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = event.target.checked
                                changeTaskStatus(newStatusValue, task.id)
                            }}
                        />
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
                <Button onClick={() => changeFilter('all')} title={'All'}/>
                <Button onClick={() => changeFilter('active')} title={'Active'}/>
                <Button onClick={() => changeFilter('completed')} title={'Completed'}/>
            </div>
        </div>
    );
};