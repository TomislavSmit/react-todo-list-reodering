import { format } from 'date-fns'
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useMotivationalQuote } from '../hooks/useMotivationalQuote'
import { Filters, SortBy, Task } from '../types'
import {
    sortTasksByCreatedAtAsc,
    sortTasksByDueDateAsc,
    sortTasksByDueDateDesc,
} from '../utils/sortingTasks'
import { getRandomColor } from '../utils/taskColors'

interface TaskContextProps {
    tasks: Task[]
    filter: Filters
    setFilter: (filter: Filters) => void
    addTask: (text: string, dueDate?: string) => void
    toggleTask: (id: string) => void
    deleteTask: (id: string) => void
    sortBy: SortBy
    onSetSortBy: (sortBy: SortBy) => void
    onSetTasks: (tasks: Task[]) => void
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined)

const initialTasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]')

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks)
    const [filter, setFilter] = useState<Filters>(Filters.All)
    const [sortBy, setSortBy] = useState<SortBy>('createdAt')

    const { quotes } = useMotivationalQuote()

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const addTask = async (text: string, dueDate?: string) => {
        const quote = quotes
            ? quotes[Math.floor(Math.random() * quotes.length)]
            : undefined

        const newTask: Task = {
            id: crypto.randomUUID(),
            text,
            completed: false,
            dueDate: dueDate || undefined,
            createdAt: format(new Date(), 'yyyy-MM-dd'),
            quote,
            color: getRandomColor(),
        }

        setTasks([...tasks, newTask])
        toast.success('Task added!')
    }

    const toggleTask = async (id: string) => {
        const task = tasks.find((t) => t.id === id)
        if (!task) return

        setTasks(
            tasks.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        )
    }

    const deleteTask = async (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id))
        toast.success('Task deleted!')
    }

    const onSetSortBy = (sortBy: SortBy) => {
        setSortBy(sortBy)
    }

    const onSetTasks = (tasks: Task[]) => {
        setTasks(tasks)
    }

    const filteredAndSortedTasks = useMemo(() => {
        if (!tasks) return []
        let filtered = [...tasks]

        if (filter === Filters.Active) {
            filtered = filtered.filter((task) => !task.completed)
        } else if (filter === Filters.Completed) {
            filtered = filtered.filter((task) => task.completed)
        }

        switch (sortBy) {
            case 'dueDateAsc':
                return sortTasksByDueDateAsc(filtered)
            case 'dueDateDesc':
                return sortTasksByDueDateDesc(filtered)
            case 'createdAt':
                return sortTasksByCreatedAtAsc(filtered)
            default:
                return filtered
        }
    }, [tasks, filter, sortBy])

    return (
        <TaskContext.Provider
            value={{
                tasks: filteredAndSortedTasks,
                filter,
                setFilter,
                addTask,
                toggleTask,
                deleteTask,
                sortBy,
                onSetSortBy,
                onSetTasks,
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContext
