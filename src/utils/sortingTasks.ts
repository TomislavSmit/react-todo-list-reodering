import { Task } from '../types'

export function sortTasksByDueDateAsc(tasks: Task[]) {
    return [...tasks].sort((a, b) =>
        (a.dueDate || '').localeCompare(b.dueDate || '')
    )
}

export function sortTasksByDueDateDesc(tasks: Task[]) {
    return [...tasks].sort((a, b) =>
        (b.dueDate || '').localeCompare(a.dueDate || '')
    )
}

export function sortTasksByCreatedAtAsc(tasks: Task[]) {
    return [...tasks].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
}

export function sortTasksByCreatedAtDesc(tasks: Task[]) {
    return [...tasks].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}
