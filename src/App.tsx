import './App.css'
import {TaskType, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValues = 'all' | 'active' | 'completed'

function App() {
    const todolistTitle_1 = 'What to learn'

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'React', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValues>('all')


    const deleteTasks = (taskId: string) => {
        const newState = tasks.filter(t => t.id !== taskId);
        setTasks(newState)
    }

    const createTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false};
        setTasks([...tasks, newTask])
    }

    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }

    const changeTaskStatus = (isDone: boolean, taskId: string) => {
        const newState = tasks.map(t => t.id === taskId ? {...t, isDone} : t)
        setTasks(newState)
    }


    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }

    return (
        <div className="app">
            <Todolist
                title={todolistTitle_1}
                tasks={filteredTasks}
                deleteTasks={deleteTasks}
                createTask={createTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    )
}

export default App
