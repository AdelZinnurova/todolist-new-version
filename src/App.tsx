import './App.css'
import {TaskType, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {Button} from "./Button.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";

export type FilterValues = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

function App() {
    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'}
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

    const changeTaskStatus = (isDone: boolean, taskId: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)
        })
    }

    // CRUD todolist

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
    }

    const changeFilter = (filter: FilterValues, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl))
    }

    const createTodolist = (title: string) => {
        const newTodolistId = v1()
        const newTodolist: TodolistType = {id: newTodolistId, title, filter: 'all'}
        const newState = [...todolists, newTodolist]
        setTodolists(newState)
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }

    // UI (view)

    const todolistComponents = todolists.map(tl => {
        let filteredTasks = tasks[tl.id]
        if (tl.filter === 'active') {
            filteredTasks = filteredTasks.filter(task => !task.isDone)
        }
        if (tl.filter === 'completed') {
            filteredTasks = filteredTasks.filter(task => task.isDone)
        }

        return (
            <Todolist
                key={tl.id}
                todolistId={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={filteredTasks}
                deleteTasks={deleteTasks}
                createTask={createTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
                deleteTodolist={deleteTodolist}
            />
        )
    })


    return (
        <div className="app">
            <CreateItemForm createItem={createTodolist}/>
            {todolistComponents}
        </div>
    )
}

export default App
