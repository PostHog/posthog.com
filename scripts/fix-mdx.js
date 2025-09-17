#!/usr/bin/env node

const fs = require('fs') // eslint-disable-line @typescript-eslint/no-var-requires
const glob = require('glob') // eslint-disable-line @typescript-eslint/no-var-requires

// Components that should be excluded from spacing rules
const EXCEPTED_COMPONENTS = ['CallToAction']

function isExceptedComponent(line) {
    return EXCEPTED_COMPONENTS.some((component) => line.includes(component))
}

function normalizeIndentation(lines) {
    const result = []
    let inCodeBlock = false

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const trimmedLine = line.trim()

        // Check for code block boundaries
        if (trimmedLine.startsWith('```')) {
            inCodeBlock = !inCodeBlock
            result.push(line)
            continue
        }

        // If inside code block, preserve original formatting
        if (inCodeBlock) {
            result.push(line)
            continue
        }

        // Empty lines get no indentation
        if (trimmedLine === '') {
            result.push('')
            continue
        }

        // Never indent - just use trimmed line
        result.push(trimmedLine)
    }

    return result
}

function removeMultipleEmptyLines(lines) {
    return lines.filter((line, index) => {
        if (line.trim() === '' && index > 0 && lines[index - 1].trim() === '') {
            return false
        }
        return true
    })
}

function addEmptyLineBeforeClosingTags(lines) {
    const result = []
    let inCodeBlock = false

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const trimmedLine = line.trim()

        // Check for code block boundaries
        if (trimmedLine.startsWith('```')) {
            inCodeBlock = !inCodeBlock
            result.push(line)
            continue
        }

        // Skip if inside code block
        if (inCodeBlock) {
            result.push(line)
            continue
        }

        const hasClosingJsxTag = /^<\/[^>]+>$/.test(trimmedLine)
        const isExcepted = isExceptedComponent(trimmedLine)

        if (hasClosingJsxTag && !isExcepted && result.length > 0 && result[result.length - 1].trim() !== '') {
            result.push('')
        }
        result.push(line)
    }
    return result
}

function addEmptyLineAfterOpeningTags(lines) {
    const result = []
    let inCodeBlock = false

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const trimmedLine = line.trim()

        // Check for code block boundaries
        if (trimmedLine.startsWith('```')) {
            inCodeBlock = !inCodeBlock
            result.push(line)
            continue
        }

        result.push(line)

        // Skip if inside code block
        if (inCodeBlock) {
            continue
        }

        const isHeader = /^#{1,6}\s/.test(trimmedLine)
        const hasSelfClosingJsxTag = /^<[^/\s>]+[^>]*\/>$/.test(trimmedLine)
        const hasOpeningJsxTag = /^<[^/\s>]+[^>]*>$/.test(trimmedLine) && !hasSelfClosingJsxTag
        const isExcepted = isExceptedComponent(trimmedLine)

        if ((hasOpeningJsxTag || hasSelfClosingJsxTag || isHeader) && !isExcepted && i < lines.length - 1) {
            const nextLine = lines[i + 1]
            if (nextLine !== undefined && nextLine.trim() !== '') {
                result.push('')
            }
        }
    }
    return result
}

const RULES = [
    normalizeIndentation,
    removeMultipleEmptyLines,
    addEmptyLineBeforeClosingTags,
    addEmptyLineAfterOpeningTags,
]

function enforceSpacingRules(content) {
    let lines = content.split('\n')

    for (const rule of RULES) {
        lines = rule(lines)
    }

    return lines.join('\n')
}

function processFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8')
    const correctedContent = enforceSpacingRules(content)

    if (content !== correctedContent) {
        fs.writeFileSync(filePath, correctedContent)
    }
}

// Get file patterns from command line args or default to MDX files
const patterns = process.argv.slice(2)
if (patterns.length === 0) {
    console.error('Error: Please specify file patterns or paths to process.')
    console.error('Examples:')
    console.error('  node scripts/lint-jsx-spacing.js "contents/docs/feature-flags/*.mdx"')
    console.error('  node scripts/lint-jsx-spacing.js contents/docs/feature-flags/*.md')
    process.exit(1)
}

console.log('=== The magical MDX fixer ===')

patterns.forEach((pattern) => {
    const files = glob.sync(pattern)
    files.forEach(processFile)
})

console.log('=== No more gatsby 404s! ===')
