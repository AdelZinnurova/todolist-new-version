import './App.css'
import {TaskType, Todolist} from "./Todolist.tsx";
import {useState} from "react";
import {v1} from "uuid";


function App() {
    const todolistTitle_1 = 'What to learn'

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'React', isDone: false},
    ])


    const deleteTasks = (taskId: string) => {
        const newState = tasks.filter(t => t.id !== taskId);
        setTasks(newState)
    }

    const createTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false};
        setTasks([...tasks, newTask])
    }

    const changeFilter = () => {}

    return (
        <div className="app">
            <Todolist
                title={todolistTitle_1}
                tasks={tasks}
                deleteTasks={deleteTasks}
                createTask={createTask}
            />
        </div>
    )
}

export default App
