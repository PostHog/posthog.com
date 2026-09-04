import pluralizeWord from 'pluralize'

export const formatCompact = (n: number): string =>
    Intl.NumberFormat('en', { notation: 'compact', compactDisplay: 'short', maximumFractionDigits: 1 }).format(n || 0)

export const parseCompact = (value: string): number => {
    const match = String(value)
        .trim()
        .match(/^([\d.]+)\s*([kmb])?$/i)
    if (!match) return 0
    const suffix = { k: 1e3, m: 1e6, b: 1e9 }[match[2]?.toLowerCase()] ?? 1
    return Number(match[1]) * suffix
}

export const pluralizeUnit = (unit: string, count: number): string => {
    if (!unit) {
        return ''
    }

    // Don't pluralize all-uppercase units like GB, MB, TB.
    if (unit === unit.toUpperCase()) {
        return unit
    }

    return pluralizeWord(unit, count)
}

export const unitWhenNotInLabel = (unit?: string, label?: string): string => {
    if (!unit) return ''
    const unitText = pluralizeUnit(unit, 2)
    const labelHasUnit =
        !!label &&
        (label.toLowerCase().includes(unit.toLowerCase()) || label.toLowerCase().includes(unitText.toLowerCase()))
    return labelHasUnit ? '' : ` ${unitText}`
}

export const afterFirstFree = (amount: number, unit?: string, label?: string): string =>
    amount ? ` after the first ${formatCompact(amount)}${unitWhenNotInLabel(unit, label)}` : ''
