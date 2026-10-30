/**
 * Single source of truth for how the PostHog wizard command string is assembled.
 *
 * `buildWizardCommand` builds the inline command (the consolidated WizardCommand): the displayed
 * command is always the clean form, while the copied command always pins `-y` and `@latest`.
 * `buildSchemaCommand` handles the schema-driven card, appending an optional subcommand to arbitrary
 * base strings.
 */

/**
 * Inline wizard command. The display is always the clean `npx @posthog/wizard …`; the copy always
 * pins `-y` (auto-confirms the npx prompt) and `@latest` (freshness). There is intentionally no flag
 * to toggle `@latest` — it is always copied, never displayed. The subcommand is appended last, to both.
 *
 * `fullCommand` is the escape hatch for call sites that need to state the whole command themselves
 * (an author writing raw MDX, a non-wizard command). It is shown and copied verbatim — no `-y`, no
 * `@latest`, no subcommand — because the point is that what you typed is what ships. `copyOverride`
 * lets those call sites still copy something different from what they display.
 */
export function buildWizardCommand({
    subcommand,
    fullCommand,
    copyOverride,
}: {
    subcommand?: string
    fullCommand?: string
    copyOverride?: string
}): {
    displayCommand: string
    copyCommand: string
} {
    if (fullCommand) {
        return { displayCommand: fullCommand, copyCommand: copyOverride || fullCommand }
    }
    const tail = subcommand ? ` ${subcommand}` : ''
    return {
        displayCommand: `npx @posthog/wizard${tail}`,
        copyCommand: copyOverride || `npx -y @posthog/wizard@latest${tail}`,
    }
}

/**
 * Schema-based card command: append an optional subcommand to arbitrary base strings
 * (`schema.defaultCommand` / `schema.defaultCopyCommand`). Returns `copyCommand: undefined`
 * when nothing overrides the display so the card copies the displayed text verbatim (preserves the
 * MCP `npx @posthog/wizard mcp add` flow, which has no separate copy string).
 */
export function buildSchemaCommand({
    base,
    copyBase,
    subcommand,
}: {
    base: string
    copyBase?: string
    subcommand?: string
}): { displayCommand: string; copyCommand?: string } {
    const commandSuffix = subcommand ? ` ${subcommand}` : ''
    const displayCommand = `${base}${commandSuffix}`
    const copyCommand = copyBase || subcommand ? `${copyBase ?? base}${commandSuffix}` : undefined
    return { displayCommand, copyCommand }
}
