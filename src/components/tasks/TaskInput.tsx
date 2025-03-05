import { Save } from 'lucide-react'
import { useState } from 'react'
import { useTasks } from '../../hooks/useTasks'
import Button from '../ui/Button'
import DatePickerInput from '../ui/DatePickerInput'
import Input from '../ui/Input'

export default function TaskInput() {
    const [text, setText] = useState('')
    const [dueDate, setDueDate] = useState<string | undefined>()
    const { addTask } = useTasks()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!text.trim()) return

        addTask(text, dueDate)
        setText('')
        setDueDate(undefined)
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4'>
                <div className='w-full'>
                    <Input
                        type='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder='Add a new task'
                        classes='w-full'
                    />
                </div>

                <div className='flex items-center justify-between w-full'>
                    <div className='w-full'>
                        <DatePickerInput
                            value={dueDate}
                            onChange={setDueDate}
                        />
                    </div>

                    <Button type='submit' data-testid='add-task-button'>
                        <Save />
                    </Button>
                </div>
            </div>
        </form>
    )
}
