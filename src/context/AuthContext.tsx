import { createContext, ReactNode, useState } from 'react'
import { User } from '../types'

interface AuthContextType {
    user: User | null
    signIn: () => void
    signOut: () => void
    isSignInModalOpen: boolean
    onSetIsSignInModalOpen: (isOpen: boolean) => void
    loadingSignIn: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)
    const [loadingSignIn, setLoadingSignIn] = useState(false)

    const signIn = () => {
        setLoadingSignIn(true)
        setTimeout(() => {
            // Mocked user data
            setUser({ id: '1', name: 'John Doe' })
            setIsSignInModalOpen(false)
            setLoadingSignIn(false)
        }, 1000)
    }

    const signOut = () => {
        setUser(null)
    }

    const onSetIsSignInModalOpen = (isOpen: boolean) => {
        setIsSignInModalOpen(isOpen)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                signOut,
                isSignInModalOpen,
                onSetIsSignInModalOpen,
                loadingSignIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
