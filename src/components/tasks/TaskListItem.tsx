import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { useTasks } from '../../hooks/useTasks'
import { Task } from '../../types'
import { formatDate } from '../../utils/formatDate'
import ConfirmModal from '../modals/ConfirmModal'
import Button from '../ui/Button'
import Input from '../ui/Input'

interface SortableItemProps extends Task {
    onToggleTask: (id: string) => void
}

export default function TaskListItem({
    id,
    text,
    completed,
    dueDate,
    quote,
    color,
    onToggleTask,
}: SortableItemProps) {
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null)
    const { deleteTask } = useTasks()

    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id })

    const confirmDelete = () => {
        deleteTask(id)
        setTaskToDelete(null)
    }

    const cancelDelete = () => {
        setTaskToDelete(null)
    }

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <>
            <li
                role='listitem'
                style={style}
                className={`my-2 bg-gray-100 rounded shadow flex justify-between p-2 ${color}`}
                ref={setNodeRef}
            >
                <div className='flex justify-between w-full'>
                    <div className='flex flex-col'>
                        <div className='flex gap-2 justify-start mb-1'>
                            <Input
                                type='checkbox'
                                classes='cursor-pointer'
                                checked={completed}
                                onChange={() => onToggleTask(id)}
                                aria-checked={completed}
                                data-testid={`task-${id}-toggle`}
                            />
                            <span
                                className={`my-auto ${
                                    completed
                                        ? 'line-through text-gray-400'
                                        : ''
                                }`}
                            >
                                {text}
                            </span>
                        </div>
                        <div className='py-4 text-sm rounded'>
                            {quote && (
                                <blockquote className='italic'>
                                    “{quote.content}” — {quote.author}
                                </blockquote>
                            )}
                        </div>

                        <div className='flex gap-2'>
                            {dueDate && (
                                <p className='text-xs text-gray-500'>
                                    Due: {formatDate(dueDate)}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className='flex gap-3 justify-center'>
                        <Button
                            classes='text-red-500'
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation()
                                setTaskToDelete(id)
                            }}
                            aria-label='Delete task'
                            data-testid={`task-${id}-delete`}
                        >
                            <Trash size={16} />
                        </Button>
                        <span
                            {...attributes}
                            {...listeners}
                            className='cursor-grab text-gray-500 my-auto'
                            aria-label='Drag handle'
                        >
                            ☰
                        </span>
                    </div>
                </div>
            </li>

            <ConfirmModal
                isOpen={!!taskToDelete}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                title='Delete Task'
                message='Are you sure you want to delete this task?'
            />
        </>
    )
}
