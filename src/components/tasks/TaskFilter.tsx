import { SortAsc, SortDesc } from 'lucide-react'
import { useTasks } from '../../hooks/useTasks'
import { Filters } from '../../types'
import Button from '../ui/Button'

export default function TaskFilter() {
    const { filter, setFilter, sortBy, onSetSortBy } = useTasks()

    const iconSize = 18
    const iconColor = sortBy === 'createdAt' ? 'text-gray-400' : 'text-blue-500'

    const filterValues = Object.values(Filters)

    const handleSortByDueDate = () => {
        switch (sortBy) {
            case 'createdAt':
                onSetSortBy('dueDateAsc')
                break
            case 'dueDateAsc':
                onSetSortBy('dueDateDesc')
                break
            case 'dueDateDesc':
                onSetSortBy('createdAt')
                break
        }
    }

    const renderIcon = () => {
        switch (sortBy) {
            case 'createdAt':
                return <SortDesc size={iconSize} className={iconColor} />
            case 'dueDateAsc':
                return <SortAsc size={iconSize} className={iconColor} />
            case 'dueDateDesc':
                return <SortDesc size={iconSize} className={iconColor} />
        }
    }

    return (
        <div>
            <div className='flex gap-2 mb-2 justify-between'>
                <div>
                    {filterValues.map((filterValue) => (
                        <Button
                            key={filterValue}
                            onClick={() => setFilter(filterValue)}
                            classes={`px-2 py-0 rounded-2xl text-sm ${
                                filter === filterValue ? 'bg-gray-200' : ''
                            }`}
                        >
                            {filterValue}
                        </Button>
                    ))}
                </div>

                <div className='flex'>
                    <Button
                        onClick={handleSortByDueDate}
                        title='Sort by due date'
                    >
                        {renderIcon()}
                    </Button>
                </div>
            </div>
        </div>
    )
}
