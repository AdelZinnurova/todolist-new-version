import './App.css'
import {TaskType, Todolist} from "./Todolist.tsx";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {AppBar, Box, Container, CssBaseline, Grid, IconButton, Paper, Switch, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import {containerSx} from "./Todolist.styles.ts";
import {NavButton} from "./NavButton.ts";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {amber, indigo} from "@mui/material/colors";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC, createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";

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
    //
    // const [todolists, setTodolists] = useState<TodolistType[]>([
    //     {id: todolistId_1, title: 'What to learn', filter: 'all'},
    //     {id: todolistId_2, title: 'What to buy', filter: 'all'}
    // ])

    let initialState: TodolistType[] = [
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'}
    ]

    const [todolists, despathTodolists] = useReducer(todolistsReducer, initialState)

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

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)
        })
    }

    // CRUD todolist

    const deleteTodolist = (todolistId: string) => {
        const action = deleteTodolistAC(todolistId)
        despathTodolists(action)
        delete tasks[todolistId]
    }

    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        despathTodolists(action)
        setTasks({...tasks, [action.payload.id]: []})
    }

    const changeFilter = (filter: FilterValues, todolistId: string) => {
        const action = changeTodolistFilterAC({id: todolistId, filter})
        despathTodolists(action)
    }

    const changeTodolistTitle = (title: string, todolistId: string) => {
       const action = changeTodolistTitleAC({id: todolistId, title})
        despathTodolists(action)
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
            <Grid key={tl.id}>
                <Paper elevation={1} sx={{p: "15px"}}>
                    <Todolist
                        todolistId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={filteredTasks}
                        deleteTasks={deleteTasks}
                        createTask={createTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        deleteTodolist={deleteTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    const [isDarkMode, setIsDarkMode] = useState(false)

    const theme = createTheme({
        palette: {
            primary: indigo,
            secondary: amber,
            mode: isDarkMode? 'dark' : 'light'
        },
    })

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static">
                    <Toolbar>
                        <Container sx={containerSx}>
                            <IconButton color="inherit">
                                <MenuIcon/>
                            </IconButton>
                            <Box>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.secondary.main}>FAQ</NavButton>
                                <Switch onChange={() => setIsDarkMode(!isDarkMode)}/>
                            </Box>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg">
                    <Grid container sx={{p: "15px 0"}}>
                        <CreateItemForm createItem={createTodolist}/>
                    </Grid>
                    <Grid container spacing={6}>
                        {todolistComponents}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default App
