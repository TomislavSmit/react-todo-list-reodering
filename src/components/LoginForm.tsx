import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAuth } from '../hooks/useAuth'
import Button from './ui/Button'
import Input from './ui/Input'

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginForm() {
    const { signIn, onSetIsSignInModalOpen, loadingSignIn } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    return (
        <form onSubmit={handleSubmit(signIn)} className='space-y-4'>
            <div>
                <Input
                    type='email'
                    placeholder='Email'
                    {...register('email')}
                    classes='w-full'
                />
                {errors.email && (
                    <p className='text-red-500 text-sm mt-1'>
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div>
                <Input
                    type='password'
                    placeholder='Password'
                    {...register('password')}
                    classes='w-full'
                />
                {errors.password && (
                    <p className='text-red-500 text-sm mt-1'>
                        {errors.password.message}
                    </p>
                )}
            </div>

            <div className='mt-4 flex justify-end gap-2'>
                <Button
                    onClick={() => onSetIsSignInModalOpen(false)}
                    disabled={loadingSignIn}
                >
                    Cancel
                </Button>
                <Button
                    type='submit'
                    disabled={loadingSignIn}
                    classes={`px-4 py-2 text-white ${
                        loadingSignIn
                            ? 'cursor-not-allowed bg-blue-300'
                            : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                    {loadingSignIn ? 'Signing in...' : 'Sign In'}
                </Button>
            </div>
        </form>
    )
}
