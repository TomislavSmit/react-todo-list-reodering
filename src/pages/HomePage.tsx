import Header from '../components/Header'
import TaskFilter from '../components/tasks/TaskFilter'
import TaskInput from '../components/tasks/TaskInput'
import TaskList from '../components/tasks/TaskList'

export default function HomePage() {
    return (
        <>
            <Header />
            <div className='max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg space-y-2'>
                <h1 className='text-xl font-bold mb-4'>To-Do List</h1>
                <TaskInput />
                <TaskFilter />
                <TaskList />
            </div>
        </>
    )
}
