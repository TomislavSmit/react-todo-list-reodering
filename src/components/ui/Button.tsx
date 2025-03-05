interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: (e: React.MouseEvent) => void
    children: React.ReactNode
    classes?: string
}

export default function Button({
    onClick,
    children,
    classes = '',
    ...props
}: ButtonProps) {
    return (
        <button
            onClick={(e) => onClick?.(e)}
            className={`text-blue-500 cursor-pointer rounded px-2 py-1 ${classes}`}
            {...props}
        >
            {children}
        </button>
    )
}
