import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import TaskList from '../components/tasks/TaskList'
import { Task } from '../types'
import { reorderTasks } from '../utils/reorderTasks'
import { TestTaskProvider } from './TestTaskProvider'

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

describe('TaskList component', () => {
    it('renders tasks from context', () => {
        render(
            <TestTaskProvider>
                <TaskList />
            </TestTaskProvider>
        )

        expect(screen.getByText('Task 1')).toBeInTheDocument()
        expect(screen.getByText('Task 2')).toBeInTheDocument()
    })

    it('deletes tasks correctly', async () => {
        render(
            <TestTaskProvider>
                <TaskList />
            </TestTaskProvider>
        )

        expect(screen.getByTestId('task-1-delete')).toBeInTheDocument()
        expect(screen.getByTestId('task-2-delete')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId('task-1-delete'))

        const confirmDelete = screen.getByTestId('confirm-modal-confirm-button')
        expect(confirmDelete).toBeInTheDocument()

        fireEvent.click(confirmDelete)
        expect(screen.queryByTestId('task-1-delete')).not.toBeInTheDocument()
    })

    it('toggles tasks correctly', async () => {
        render(
            <TestTaskProvider>
                <TaskList />
            </TestTaskProvider>
        )

        expect(screen.getByTestId('task-1-toggle')).toBeInTheDocument()
        expect(screen.getByTestId('task-2-toggle')).toBeInTheDocument()

        fireEvent.click(screen.getByTestId('task-1-toggle'))
        expect(screen.getByTestId('task-1-toggle')).toHaveAttribute(
            'aria-checked',
            'true'
        )
    })

    it('reorders tasks correctly', () => {
        const result = reorderTasks(tasksMock, '1', '2')

        expect(result[0].id).toBe('2')
        expect(result[1].id).toBe('1')
    })
})
