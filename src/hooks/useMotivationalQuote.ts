import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { getQuotes } from '../api/quotes'
import { Quote } from '../types'

export function useMotivationalQuote() {
    const [quotes, setQuotes] = useState<Quote[] | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)

        async function fetchQuote() {
            try {
                const { data, error } = await getQuotes()

                if (error) {
                    toast.error(error)
                    return
                }

                setQuotes(data)
            } catch (error) {
                console.error('Failed to fetch quote:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchQuote()
    }, [])

    return { quotes, loading }
}
