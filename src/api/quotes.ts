import { Quote } from '../types'
import { API_URL } from '../utils/constants'

interface QuotesResponse {
    data?: Quote[]
    error?: string
}

export async function getQuotes(): Promise<QuotesResponse> {
    try {
        const response = await fetch(`${API_URL}quotes`)

        if (!response.ok) {
            return { error: 'Failed to fetch quotes' }
        }

        const data: Quote[] = await response.json()

        return { data }
    } catch (error) {
        console.error('Failed to fetch quotes:', error)
        return { error: 'Failed to fetch quotes' }
    }
}
