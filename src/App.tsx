import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { TaskProvider } from './context/TaskContext'
import HomePage from './pages/HomePage'

export default function App() {
    return (
        <AuthProvider>
            <TaskProvider>
                <HomePage />
                <Toaster
                    position='bottom-right'
                    toastOptions={{
                        style: {
                            background: '#fff',
                            color: '#333',
                        },
                    }}
                />
            </TaskProvider>
        </AuthProvider>
    )
}
