import React from 'react'
import type { Language } from 'prism-react-renderer'
import './prismGlobal'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-swift'
import 'prismjs/components/prism-dart'
import 'prismjs/components/prism-elixir'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-kotlin'
import 'prismjs/components/prism-groovy'
import 'prismjs/components/prism-csharp'

type LanguageMap = {
    [key: string]: {
        language:
            | Language
            | 'html'
            | 'xml'
            | 'shell'
            | 'php'
            | 'ruby'
            | 'swift'
            | 'dart'
            | 'elixir'
            | 'java'
            | 'rust'
            | 'kotlin'
            | 'groovy'
            | 'vue'
            | 'svelte'
            | 'astro'
            | 'csharp'
        label: React.ReactNode
    }
}

const languageMap: LanguageMap = {
    js: {
        language: 'javascript',
        label: 'JavaScript',
    },
    'js-web': {
        language: 'javascript',
        label: 'Web',
    },
    ts: {
        language: 'typescript',
        label: 'TypeScript',
    },
    jsx: {
        language: 'jsx',
        label: 'JSX',
    },
    tsx: {
        language: 'jsx',
        label: 'TSX',
    },
    mdx: {
        language: 'jsx',
        label: 'MDX',
    },
    javascript: {
        language: 'javascript',
        label: 'JavaScript',
    },
    json: {
        language: 'json',
        label: 'JSON',
    },
    swift: {
        language: 'swift',
        label: 'Swift',
    },
    dart: {
        language: 'dart',
        label: 'Dart',
    },
    node: {
        language: 'javascript',
        label: 'Node.js',
    },
    go: {
        language: 'go',
        label: 'Go',
    },
    php: {
        language: 'php',
        label: 'PHP',
    },
    java: {
        language: 'java',
        label: 'Java',
    },
    ruby: {
        language: 'ruby',
        label: 'Ruby',
    },
    xml: {
        language: 'xml',
        label: 'XML',
    },
    elixir: {
        language: 'elixir',
        label: 'Elixir',
    },
    llm: {
        language: 'markdown',
        label: 'LLM prompt',
    },
    segment: {
        language: 'javascript',
        label: 'Segment',
    },
    shell: {
        language: 'shell',
        label: (
            <div className="flex items-center space-x-1.5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3 h-3"
                >
                    <polyline points="4 17 10 11 4 5" />
                    <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
                <span className="font-semibold">Terminal</span>
            </div>
        ),
    },
    bash: {
        language: 'bash',
        label: (
            <div className="flex items-center space-x-1.5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3 h-3"
                >
                    <polyline points="4 17 10 11 4 5" />
                    <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
                <span className="font-semibold">Terminal</span>
            </div>
        ),
    },
    android: {
        language: 'java',
        label: 'Android',
    },
    kotlin: {
        language: 'kotlin',
        label: 'Kotlin',
    },
    android_kotlin: {
        language: 'kotlin',
        label: 'Android',
    },
    gradle_kotlin: {
        language: 'kotlin',
        label: 'Gradle',
    },
    gradle_groovy: {
        language: 'groovy',
        label: 'Gradle',
    },
    objectivec: {
        language: 'objectivec',
        label: 'Objective-C',
    },
    html: {
        language: 'html',
        label: 'HTML',
    },
    yaml: {
        language: 'yaml',
        label: 'YAML',
    },
    rust: {
        language: 'rust',
        label: 'Rust',
    },
    python: {
        language: 'python',
        label: 'Python',
    },
    sql: {
        language: 'sql',
        label: 'SQL',
    },
    ios: {
        language: 'objectivec',
        label: 'iOS',
    },
    ios_swift: {
        language: 'swift',
        label: 'iOS',
    },
    'react-native': {
        language: 'jsx',
        label: 'React Native',
    },
    react: {
        language: 'jsx',
        label: 'React',
    },
    vue: {
        language: 'html',
        label: 'Vue',
    },
    svelte: {
        language: 'html',
        label: 'Svelte',
    },
    astro: {
        language: 'javascript',
        label: 'Astro',
    },
    flutter: {
        language: 'dart',
        label: 'Flutter',
    },
    hog: {
        language: 'rust',
        label: 'Hog',
    },
    csharp: {
        language: 'csharp',
        label: 'C#',
    },
}

export default languageMap
