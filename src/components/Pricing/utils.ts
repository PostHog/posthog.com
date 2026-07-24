import pluralizeWord from 'pluralize'

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
