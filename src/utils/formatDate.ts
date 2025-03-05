import { format } from 'date-fns'

export function formatDate(
    date?: string,
    formatString: string = 'dd MMM yyyy'
) {
    if (!date) return

    return format(date, formatString)
}
