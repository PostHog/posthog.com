export function findStaleMappings(
    mapping: Record<string, string[]>,
    toolNames: ReadonlySet<string>
): Record<string, string[]> {
    return Object.fromEntries(
        Object.entries(mapping)
            .map(([operationId, names]) => [operationId, names.filter((name) => !toolNames.has(name))] as const)
            .filter(([, names]) => names.length > 0)
    )
}
