import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    classes?: string
    children?: React.ReactNode
}

export default function Input({
    onChange,
    classes = '',
    children,
    ...props
}: InputProps) {
    return (
        <input
            onChange={onChange}
            className={`p-2 rounded my-auto bg-gray-100  shadow flex justify-between ${classes} ${
                children ? 'pl-10' : ''
            }`}
            {...props}
        />
    )
}
