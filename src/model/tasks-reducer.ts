import {TasksStateType} from "../App.tsx";
import {CreateTodolistActionType, DeleteTodolistActionType} from "./todolists-reducer.ts";

const initialState: TasksStateType = {}

type ActionType = DeleteTodolistActionType | CreateTodolistActionType


export const tasksReducer =(tasks: TasksStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "create_todolist": {
            const {id} = action.payload
            return {...tasks, [id]: []}
        }
        case "delete_todolist": {
            const {id} = action.payload
            delete tasks[id]
            return {...tasks}
        }


        default:
            return tasks
    }
}