const prepareCondition = ({ key, value }) => ({
    key,
    pattern: value === undefined ? null : new RegExp(`^(?:${value})$`),
})

const matchCondition = (url, { key, pattern }) => {
    const values = url.searchParams.getAll(key)
    if (!values.length) return null
    const value = values[values.length - 1]
    if (!pattern) return { [key]: value }
    const match = pattern.exec(value)
    return match ? match.groups || {} : null
}

exports.createRedirectMatcher = (rules) => {
    const preparedRules = rules.map((rule) => ({
        pattern: new RegExp(rule.src),
        location: rule.headers.Location,
        status: rule.status,
        has: (rule.has || []).map(prepareCondition),
        missing: (rule.missing || []).map(prepareCondition),
    }))

    return (url) => {
        for (const rule of preparedRules) {
            const match = rule.pattern.exec(url.pathname)
            if (!match) continue
            const conditionMatches = rule.has.map((condition) => matchCondition(url, condition))
            if (
                conditionMatches.some((condition) => condition === null) ||
                rule.missing.some((condition) => matchCondition(url, condition) !== null)
            ) {
                continue
            }

            const captures = Object.assign({}, ...conditionMatches)
            const destination = rule.location.replace(/\$(\d+|[A-Za-z][A-Za-z0-9_]*)/g, (_, name) =>
                /^\d+$/.test(name) ? match[Number(name)] || '' : encodeURIComponent(captures[name] || '')
            )
            const location = new URL(destination, url.origin)
            const destinationKeys = new Set(location.searchParams.keys())
            if (!location.search) {
                location.search = url.search
            } else {
                for (const [key, value] of url.searchParams) {
                    if (!destinationKeys.has(key)) {
                        location.searchParams.append(key, value)
                    }
                }
            }

            const fragment = location.hash || (destination.includes('#') ? '#' : '')
            return {
                location: destination.startsWith('/')
                    ? `${location.pathname}${location.search}${fragment}`
                    : location.href,
                status: rule.status,
            }
        }

        return null
    }
}
