import { useAuth } from '../hooks/useAuth'
import SignInModal from './modals/SignInModal'
import Button from './ui/Button'

export default function Header() {
    const { user, signOut, isSignInModalOpen, onSetIsSignInModalOpen } =
        useAuth()

    return (
        <header className='w-full px-4 py-2 mb-6 shadow-lg flex justify-between items-center'>
            <div className='text-xl font-bold'>My To-Do App</div>
            <div className='p-2'>
                {user ? (
                    <div className='flex gap-4 items-center'>
                        <p>Signed in as {user.name}</p>
                        <Button onClick={signOut}>Sign Out</Button>
                    </div>
                ) : (
                    <Button onClick={() => onSetIsSignInModalOpen(true)}>
                        Sign In
                    </Button>
                )}
            </div>

            <SignInModal isOpen={isSignInModalOpen} />
        </header>
    )
}
