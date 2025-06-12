import {TasksStateType} from "../app/App.tsx";
import {
    createTodolistAC,
    CreateTodolistActionType,
    deleteTodolistAC,
    DeleteTodolistActionType
} from "./todolists-reducer.ts";
import {createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

export type DeleteTasksActionType = ReturnType<typeof deleteTaskAC>
export type CreateTasksActionType = ReturnType<typeof createTaskAC>
export type ChangeTasksStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTasksTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionType =
    DeleteTodolistActionType
    | CreateTodolistActionType
    | DeleteTasksActionType
    | CreateTasksActionType
    | ChangeTasksStatusActionType
    | ChangeTasksTitleActionType


export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id];
        })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
})

export const tasksReducer2 = (tasks: TasksStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "delete_tasks": {
            const {taskId, todolistId} = action.payload
            return {
                ...tasks,
                [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
            }
        }
        case "create_task": {
            const {todolistId, title} = action.payload
            return {
                ...tasks,
                [todolistId]: [...tasks[todolistId], {id: nanoid(), title: title, isDone: false}]
            }
        }
        case "change_task_status": {
            const {isDone, taskId, todolistId} = action.payload
            return {
                ...tasks,
                [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)
            }
        }
        case "change_task_title": {
            const {taskId, title, todolistId} = action.payload
            return {
                ...tasks,
                [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)
            }
        }
        default:
            return tasks
    }
}

export const deleteTaskAC = (payload: { taskId: string, todolistId: string }) => ({
    type: "delete_tasks",
    payload

} as const)

export const createTaskAC = (payload: { title: string, todolistId: string }) => ({
    type: "create_task",
    payload
} as const)

export const changeTaskStatusAC = (payload: { isDone: boolean, taskId: string, todolistId: string }) => ({
    type: "change_task_status",
    payload
} as const)

export const changeTaskTitleAC = (payload: { taskId: string, title: string, todolistId: string }) => ({
    type: "change_task_title",
    payload
} as const)
