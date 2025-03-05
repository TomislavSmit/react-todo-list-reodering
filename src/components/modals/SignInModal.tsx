import LoginForm from '../LoginForm'

interface SignInModalProps {
    isOpen: boolean
}

export default function SignInModal({ isOpen }: SignInModalProps) {
    if (!isOpen) return null

    return (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded shadow-md w-full max-w-sm'>
                <h2 className='text-lg font-semibold mb-2'>Sign In</h2>

                <LoginForm />
            </div>
        </div>
    )
}
