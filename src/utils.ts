import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function toFixedMin(num: number, minDecimals: number): string {
    let str = num.toString()
    const parts = str.split('.')
    if (parts.length < 2 || parts[1].length < minDecimals) {
        str = num.toFixed(minDecimals)
    }
    return str
}

export function flattenStrapiResponse(response: any): any {
    if (!response) return null

    if (Array.isArray(response)) {
        return response.map((item) => flattenStrapiResponse(item))
    }

    if (typeof response === 'object') {
        if (response.data) {
            const flattened = flattenStrapiResponse(response.data)
            return { ...flattened }
        }

        if (response.attributes) {
            return {
                id: response.id,
                ...flattenStrapiResponse(response.attributes),
            }
        }

        const flattened = {}
        for (const [key, value] of Object.entries(response)) {
            if (key !== 'data' && key !== 'attributes') {
                flattened[key] = flattenStrapiResponse(value)
            }
        }
        return flattened
    }

    return response
}
