import './App.css'
import {TaskPropsType, Todolist} from "./Todolist.tsx";


function App() {
    const todolistTitle_1 = 'What to learn'
    const todolistTitle_2 = 'What to buy'

    const tasks_1: TaskPropsType[] = [
        {id: 1, title: 'HTML', isDone: false},
        {id: 1, title: 'CSS', isDone: false},
        {id: 1, title: 'React', isDone: false},
    ]

    const tasks_2: TaskPropsType[] = [
        {id: 1, title: 'Avocado', isDone: false},
        {id: 1, title: 'Lemon', isDone: false},
        {id: 1, title: 'Meat', isDone: false},
    ]

    return (
        <div className="app">
            <Todolist
                title={todolistTitle_1}
                tasks={tasks_1}
            />
            <Todolist
                title={todolistTitle_2}
                tasks={tasks_2}
            />
        </div>
    )
}

export default App
