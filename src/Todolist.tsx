// import {Button} from "./Button.tsx";
import {ChangeEvent} from "react";
import {FilterValues} from "./App.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Box, Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {containerSx, getListItemSx} from "./Todolist.styles.ts";

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
    changeTodolistTitle: (title: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = ({
                             title,
                             tasks,
                             filter,
                             todolistId,
                             deleteTasks,
                             createTask,
                             changeFilter,
                             changeTaskStatus,
                             deleteTodolist,
                             changeTodolistTitle,
                             changeTaskTitle
                         }: TodolistPropsType) => {

    const tasksList = tasks.length === 0
        ? <span>Your list is empty</span>
        : <List>
            {tasks.map(task => {

                const changeTaskTitleHandler = (title: string) => {
                    changeTaskTitle(task.id, title, todolistId)
                }

                return (
                    <ListItem
                        disablePadding
                        key={task.id}
                        sx={getListItemSx(task.isDone)}
                    >
                        <Checkbox
                            size="small"
                            checked={task.isDone}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = event.target.checked
                                changeTaskStatus(newStatusValue, task.id, todolistId)
                            }}
                        />
                        <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
                        <IconButton onClick={() => deleteTasks(task.id, todolistId)}>
                            <HighlightOffIcon/>
                        </IconButton>
                    </ListItem>
                )
            })}
        </List>

    const createTaskHandler = (title: string) => {
        createTask(title, todolistId)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(title, todolistId)
    }


    return (
        <div className='todolist'>
            <h3>
                <EditableSpan title={title} changeTitle={changeTodolistTitleHandler}/>
                <IconButton onClick={() => deleteTodolist(todolistId)}>
                    <HighlightOffIcon/>
                </IconButton>
            </h3>
            <CreateItemForm createItem={createTaskHandler}/>
            {tasksList}
            <Box sx={containerSx}>
                <Button
                    onClick={() => changeFilter('all', todolistId)}
                    variant="contained"
                    size="small"
                    disableElevation
                    color={filter === 'all' ? 'secondary' : 'primary'}
                    sx={{m: "0 3px"}}
                >
                    All
                </Button>
                <Button
                    onClick={() => changeFilter('active', todolistId)}
                    variant="contained"
                    size="small"
                    disableElevation
                    color={filter === 'active' ? 'secondary' : 'primary'}
                    sx={{m: "0 3px"}}
                >
                    Active
                </Button>
                <Button
                    onClick={() => changeFilter('completed', todolistId)}
                    variant="contained"
                    size="small"
                    disableElevation
                    color={filter === 'completed' ? 'secondary' : 'primary'}
                    sx={{m: "0 3px"}}
                >
                    Completed
                </Button>
            </Box>
        </div>
    );
};