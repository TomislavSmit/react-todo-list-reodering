import { format } from 'date-fns'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

interface DatePickerInputProps {
    value: string | undefined
    onChange: (date: string | undefined) => void
}

export default function DatePickerInput({
    value,
    onChange,
}: DatePickerInputProps) {
    return (
        <DatePicker
            selected={value ? new Date(value) : null}
            onChange={(date) => {
                if (date) {
                    onChange(format(date, 'yyyy-MM-dd'))
                } else {
                    onChange(undefined)
                }
            }}
            dateFormat='yyyy-MM-dd'
            placeholderText='Select due date'
            className='p-2 rounded bg-gray-100 shadow w-full'
            popperClassName='shadow-lg'
        />
    )
}
