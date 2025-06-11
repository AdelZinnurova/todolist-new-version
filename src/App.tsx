import './App.css'
import {TaskType, Todolist} from "./Todolist.tsx";
import {useState} from "react";
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
} from "./model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
} from "./model/tasks-reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/store.ts";

export type TasksState = Record<string, TaskType[]>

export type FilterValues = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}


function App() {

    const todolists = useSelector<RootState, TodolistType[]>((state) => state.todolists)
    const tasks = useSelector<RootState, TasksState>((state) => state.tasks)
    const dispatch = useDispatch()

    // CRUD tasks

    const deleteTasks = (taskId: string, todolistId: string) => {
        const action = deleteTaskAC({todolistId, taskId})
        dispatch(action)
    }

    const createTask = (title: string, todolistId: string) => {
        const action = createTaskAC({title, todolistId})
        dispatch(action)
    }

    const changeTaskStatus = (isDone: boolean, taskId: string, todolistId: string) => {
        const action = changeTaskStatusAC({isDone, taskId, todolistId})
        dispatch(action)
    }

    const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        const action = changeTaskTitleAC({title, taskId, todolistId})
        dispatch(action)
    }

    // CRUD todolist

    const deleteTodolist = (todolistId: string) => {
        const action = deleteTodolistAC(todolistId)
        dispatch(action)
    }

    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatch(action)
    }

    const changeFilter = (filter: FilterValues, todolistId: string) => {
        const action = changeTodolistFilterAC({id: todolistId, filter})
        dispatch(action)
    }

    const changeTodolistTitle = (title: string, todolistId: string) => {
        const action = changeTodolistTitleAC({id: todolistId, title})
        dispatch(action)
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
            mode: isDarkMode ? 'dark' : 'light'
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
