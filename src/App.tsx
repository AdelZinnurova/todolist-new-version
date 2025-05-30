import './App.css'
import {TaskType, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValues = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filters: FilterValues
}

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

function App() {
    const todolistTitle_1 = 'What to learn'
    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: 'What to learn', filters: 'all'},
        {id: todolistId_2, title: 'What to buy', filters: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: 'Lemon', isDone: true},
            {id: v1(), title: 'Mango', isDone: false},
            {id: v1(), title: 'Avocado', isDone: false},
        ]
    })

    // CRUD tasks

    const deleteTasks = (taskId: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
        })
    }

    const createTask = (title: string, todolistId: string) => {
        const newTask = {id: v1(), title, isDone: false};
        setTasks({
            ...tasks,
            [todolistId]: [...tasks[todolistId], newTask]
        })
    }

    const changeFilter = (filter: FilterValues, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter}))
    }

    const changeTaskStatus = (isDone: boolean, taskId: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)
        })
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
