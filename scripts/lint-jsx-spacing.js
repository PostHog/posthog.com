#!/usr/bin/env node

const fs = require('fs') // eslint-disable-line @typescript-eslint/no-var-requires
const glob = require('glob') // eslint-disable-line @typescript-eslint/no-var-requires

function normalizeIndentation(lines) {
    const result = []
    let inCodeBlock = false
    let inJsx = false

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

        if (inJsx) {
            result.push('  ' + trimmedLine)
        } else {
            // Everything else gets no indentation
            result.push(trimmedLine)
        }

        // Check for JSX tags to track if we're inside JSX
        const hasOpeningTag = /<[^/\s>]+[^>]*>/.test(trimmedLine) && !trimmedLine.includes('/>')
        const hasClosingTag = /<\/[^>]+>/.test(trimmedLine)

        if (hasOpeningTag) inJsx = true
        if (hasClosingTag) inJsx = false
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
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const hasClosingJsxTag = /<\/[^>]+>/.test(line.trim())
        const isCallToAction = line.trim().includes('CallToAction')

        if (hasClosingJsxTag && !isCallToAction && result.length > 0 && result[result.length - 1].trim() !== '') {
            result.push('')
        }
        result.push(line)
    }
    return result
}

function addEmptyLineAfterOpeningTags(lines) {
    const result = []
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        result.push(line)

        const trimmedLine = line.trim()
        const isHeader = /^#{1,6}\s/.test(trimmedLine)
        const hasOpeningJsxTag = /<[^/][^>]*>/.test(trimmedLine)
        const isCallToAction = trimmedLine.includes('CallToAction')

        if ((hasOpeningJsxTag || isHeader) && !isCallToAction && i < lines.length - 1) {
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
