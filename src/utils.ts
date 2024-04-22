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
