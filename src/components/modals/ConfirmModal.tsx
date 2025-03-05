import Button from '../ui/Button'

interface ConfirmModalProps {
    isOpen: boolean
    onConfirm: () => void
    onCancel: () => void
    title?: string
    message?: string
}

export default function ConfirmModal({
    isOpen,
    onConfirm,
    onCancel,
    title = 'Confirm',
    message = 'Are you sure you want to proceed?',
}: ConfirmModalProps) {
    if (!isOpen) return null

    return (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded shadow-md w-full max-w-sm'>
                <h2 className='text-lg font-semibold'>{title}</h2>
                <p className='mt-2'>{message}</p>
                <div className='mt-4 flex justify-end gap-4'>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button
                        onClick={onConfirm}
                        classes='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
                        data-testid='confirm-modal-confirm-button'
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}
