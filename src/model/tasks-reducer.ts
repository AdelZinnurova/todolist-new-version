import {TasksState} from "../app/App.tsx";
import {
    createTodolistAC,
    deleteTodolistAC,
} from "./todolists-reducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {TaskType} from "../Todolist.tsx";

export const deleteTaskAC = createAction<{ taskId: string, todolistId: string }>('tasks/deleteTasks')
export const createTaskAC = createAction<{ title: string, todolistId: string }>('tasks/createTasks')
export const changeTaskStatusAC = createAction<{
    isDone: boolean,
    taskId: string,
    todolistId: string
}>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{
    taskId: string,
    title: string,
    todolistId: string
}>('tasks/changeTasksTitle')

const initialState: TasksState = {}

export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id];
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTaskAC, (state, action) => {
            const tasksArr = state[action.payload.todolistId]
            const index = tasksArr.findIndex((t: TaskType) => t.id === action.payload.taskId)
            if (index > -1) tasksArr.splice(index, 1)
        })
        .addCase(createTaskAC, (state, action) => {
            const tasksArr = state[action.payload.todolistId]
            tasksArr.unshift({id: nanoid(), title: action.payload.title, isDone: false})
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const task = state[action.payload.todolistId].find((t: TaskType) => t.id === action.payload.taskId)
            if (task) task.isDone = action.payload.isDone
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const task = state[action.payload.todolistId].find((t: TaskType) => t.id === action.payload.taskId)
            if (task) task.title = action.payload.title
        })

})
