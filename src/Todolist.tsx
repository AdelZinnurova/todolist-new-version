import {Button} from "./Button.tsx";
import {ChangeEvent} from "react";
import {FilterValues} from "./App.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    todolistId: string
    filter: FilterValues
    createTask: (title: string, todolistId: string) => void
    deleteTasks: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValues, todolistId: string) => void
    changeTaskStatus: (isDone: boolean, taskId: string, todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = ({
                             title,
                             tasks,
                             todolistId,
                             filter,
                             deleteTasks,
                             createTask,
                             changeFilter,
                             changeTaskStatus,
                             deleteTodolist
                         }: TodolistPropsType) => {

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
                                changeTaskStatus(newStatusValue, task.id, todolistId)
                            }}
                        />
                        <span>{task.title}</span>
                        <Button
                            title={'x'}
                            onClick={() => deleteTasks(task.id, todolistId)}
                        />
                    </li>
                )
            })}
        </ul>

    const createTaskHandler = (title: string) => {
        createTask(title, todolistId)
    }


    return (
        <div className='todolist'>
            <h3>
                {title}
                <Button
                    title={'x'}
                    onClick={() => deleteTodolist(todolistId)}
                />
            </h3>
            <CreateItemForm createItem={createTaskHandler}/>
            {tasksList}
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''}
                        onClick={() => changeFilter('all', todolistId)}
                        title={'All'}
                />
                <Button className={filter === 'active' ? 'active-filter' : ''}
                        onClick={() => changeFilter('active', todolistId)}
                        title={'Active'}
                />
                <Button className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => changeFilter('completed', todolistId)}
                        title={'Completed'}
                />
            </div>
        </div>
    );
};