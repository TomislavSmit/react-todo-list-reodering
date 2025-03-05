import { fireEvent, render, screen } from '@testing-library/react'
import TaskInput from '../components/tasks/TaskInput'
import { TaskProvider } from '../context/TaskContext'

test('allows users to add tasks', async () => {
    render(
        <TaskProvider>
            <TaskInput />
        </TaskProvider>
    )

    const input = screen.getByPlaceholderText('Add a new task')
    const button = screen.getByTestId('add-task-button')

    fireEvent.change(input, { target: { value: 'Test Task' } })
    expect(input).toHaveValue('Test Task')

    fireEvent.click(button)
    expect(input).toHaveValue('')
})
