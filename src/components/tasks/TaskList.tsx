import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { toast } from 'react-hot-toast'
import { useTasks } from '../../hooks/useTasks'
import { reorderTasks } from '../../utils/reorderTasks'
import TaskListItem from './TaskListItem'

export default function TaskList() {
    const { tasks, onSetTasks, toggleTask, sortBy } = useTasks()

    const handleDragEnd = async ({ active, over }: DragEndEvent) => {
        if (sortBy !== 'createdAt') {
            toast.error('Cannot reorder while sorting by date')
            return
        }
        if (active.id !== over?.id) {
            const reordered = reorderTasks(tasks, active.id, over?.id)

            onSetTasks(reordered)
        }
    }

    return (
        <div className='space-y-2'>
            <DndContext
                sensors={useSensors(
                    useSensor(PointerSensor),
                    useSensor(KeyboardSensor, {
                        coordinateGetter: sortableKeyboardCoordinates,
                    })
                )}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={tasks}
                    strategy={verticalListSortingStrategy}
                >
                    <ul>
                        {tasks.map((task) => (
                            <TaskListItem
                                key={task.id}
                                id={task.id}
                                text={task.text}
                                completed={task.completed}
                                dueDate={task.dueDate}
                                createdAt={task.createdAt}
                                onToggleTask={toggleTask}
                                quote={task.quote}
                                color={task.color}
                            />
                        ))}
                    </ul>
                </SortableContext>
            </DndContext>
        </div>
    )
}
