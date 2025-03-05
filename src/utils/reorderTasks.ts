import { UniqueIdentifier } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Task } from '../types'

export const reorderTasks = (
    tasks: Task[],
    activeId: UniqueIdentifier,
    overId: UniqueIdentifier | undefined
) => {
    const oldIndex = tasks.findIndex((task) => task.id === activeId)
    const newIndex = tasks.findIndex((task) => task.id === overId)

    return arrayMove(tasks, oldIndex, newIndex)
}
