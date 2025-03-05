import { useState } from 'react'
import TaskContext from '../context/TaskContext'
import { Filters, Task } from '../types'

const tasksMock: Task[] = [
    {
        id: '1',
        text: 'Task 1',
        completed: false,
        createdAt: '2025-03-01',
        dueDate: '2025-03-10',
        quote: { content: 'Quote 1', author: 'Author 1' },
        color: 'bg-white',
    },
    {
        id: '2',
        text: 'Task 2',
        completed: true,
        createdAt: '2025-03-02',
        dueDate: '2025-03-11',
        quote: { content: 'Quote 2', author: 'Author 2' },
        color: 'bg-white',
    },
]

export function TestTaskProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>(tasksMock)

    const deleteTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleTask = (id: string) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        )
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                filter: Filters.All,
                setFilter: () => {},
                addTask: () => {},
                toggleTask,
                deleteTask,
                sortBy: 'createdAt',
                onSetSortBy: () => {},
                onSetTasks: setTasks,
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}
