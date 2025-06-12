import {FilterValues, TodolistType} from "../app/App.tsx";
import {v1} from "uuid";

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionType = DeleteTodolistActionType | CreateTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

const initialState: TodolistType[] = []

export const todolistsReducer = (todolists: TodolistType[] = initialState, action: ActionType): TodolistType[] => {
    switch (action.type) {
        case "delete_todolist": {
            const {id} = action.payload
            return todolists.filter(tl => tl.id !== id)
        }
        case "create_todolist": {
            const {id, title} = action.payload
            return [...todolists, {id, title, filter: 'all'}]
        }
        case "change_todolist_title": {
            const {id, title} = action.payload
            return todolists.map(tl => tl.id === id ? {...tl, title} : tl)
        }
        case "change_todolist_filter": {
            const {id, filter} = action.payload
            return todolists.map(tl => tl.id === id ? {...tl, filter} : tl)
        }
        default:
            return todolists
    }
}

export const deleteTodolistAC = (id: string) => ({
    type: "delete_todolist",
    payload: {
        id: id
    }
} as const)

export const createTodolistAC = (title: string) => ({
    type: "create_todolist",
    payload: {
        title: title,
        id: v1()
    }
} as const)

export const changeTodolistTitleAC = (payload: {id: string, title: string}) => ({
    type: "change_todolist_title",
    payload
} as const)

export const changeTodolistFilterAC = (payload: {id: string, filter: FilterValues}) => ({
    type: "change_todolist_filter",
    payload
} as const)