import { beforeEach, expect, test } from 'vitest'
import { createTodolistAC, deleteTodolistAC } from './todolists-reducer'
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
    tasksReducer
} from './tasks-reducer'
import { TasksStateType } from '../App'

let startState: TasksStateType

beforeEach(() => {
    startState = {
        todolistId1: [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false },
        ],
        todolistId2: [
            { id: '1', title: 'bread', isDone: false },
            { id: '2', title: 'milk', isDone: true },
            { id: '3', title: 'tea', isDone: false },
        ],
    }
})

test('должен добавить пустой массив для нового тудулиста', () => {
    const endState = tasksReducer(startState, createTodolistAC('New todolist'))

    const keys = Object.keys(endState)
    expect(keys).toHaveLength(3)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    expect(newKey).toBeDefined()
    expect(endState[newKey!]).toEqual([])
})

test('должен удалить свойство с тасками при удалении тудулиста', () => {
    const endState = tasksReducer(startState, deleteTodolistAC('todolistId2'))

    expect(Object.keys(endState)).toHaveLength(1)
    expect(endState.todolistId2).toBeUndefined()
})

test('должен удалить правильную таску', () => {
    const endState = tasksReducer(
        startState,
        deleteTaskAC({ todolistId: 'todolistId2', taskId: '2' })
    )
    expect(endState.todolistId2).toHaveLength(2)
    expect(endState.todolistId2.every(t => t.id !== '2')).toBe(true)
})

test('должен добавить таску в нужный массив', () => {
    const endState = tasksReducer(
        startState,
        createTaskAC({ todolistId: 'todolistId2', title: 'juice' })
    )

    expect(endState.todolistId1).toHaveLength(3)        // первая без изменений
    expect(endState.todolistId2).toHaveLength(4)        // во второй стало +1
    const newTask = endState.todolistId2[3]             // последний элемент
    expect(newTask.id).toBeDefined()
    expect(newTask.title).toBe('juice')
    expect(newTask.isDone).toBe(false)
})

test('должен менять статус правильной таски', () => {
    const endState = tasksReducer(
        startState,
        changeTaskStatusAC({ todolistId: 'todolistId2', taskId: '2', isDone: false })
    )
    const changed = endState.todolistId2.find(t => t.id === '2')!
    expect(changed.isDone).toBe(false)
})

test('должен менять заголовок правильной таски', () => {
    const newTitle = 'What to delete'
    const endState = tasksReducer(
        startState,
        changeTaskTitleAC({ taskId: '2', title: newTitle, todolistId: 'todolistId2' })
    )
    const changed = endState.todolistId2.find(t => t.id === '2')!
    expect(changed.title).toBe(newTitle)
})
