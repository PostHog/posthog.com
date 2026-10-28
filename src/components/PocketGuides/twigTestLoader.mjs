import { existsSync, readFileSync } from 'node:fs'
import { registerHooks } from 'node:module'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

// Node's test runner strips TypeScript, but JSX and browser assets need a loader.
// Keep package imports on Node's normal resolver so missing published exports fail.
registerHooks({
    resolve(specifier, context, nextResolve) {
        if (specifier.startsWith('.')) {
            const url = new URL(specifier, context.parentURL)
            for (const suffix of ['', '.tsx', '.ts', '/index.ts']) {
                const candidate = new URL(`${url.href}${suffix}`)
                if (/\.tsx?$/.test(candidate.pathname) && existsSync(candidate)) {
                    return { url: candidate.href, shortCircuit: true }
                }
            }
        }
        return nextResolve(specifier, context)
    },
    load(url, context, nextLoad) {
        if (/\.(css|jpg)$/.test(url)) {
            return { format: 'module', source: `export default ${JSON.stringify(url)}`, shortCircuit: true }
        }
        if (/\.tsx?$/.test(url)) {
            return {
                format: 'module',
                source: ts.transpileModule(readFileSync(fileURLToPath(url), 'utf8'), {
                    fileName: fileURLToPath(url),
                    compilerOptions: {
                        module: ts.ModuleKind.ESNext,
                        target: ts.ScriptTarget.ES2022,
                        jsx: ts.JsxEmit.ReactJSX,
                    },
                }).outputText,
                shortCircuit: true,
            }
        }
        return nextLoad(url, context)
    },
})
