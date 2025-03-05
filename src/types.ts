export interface Task {
    id: string
    text: string
    completed: boolean
    dueDate?: string
    createdAt: string
    quote?: Quote
    color: string
}

export interface Quote {
    content: string
    author: string
}

export enum Filters {
    All = 'all',
    Active = 'active',
    Completed = 'completed',
}

export interface User {
    id: string
    name: string
}

export type SortBy = 'dueDateAsc' | 'dueDateDesc' | 'createdAt'
