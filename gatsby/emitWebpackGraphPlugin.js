const fs = require('fs')
const path = require('path')

// Emits a compact static/dynamic module graph for the eager-graph budget check
// (scripts/bundle/check-eager-graph.mjs). Only wired into the production
// `build-javascript` stage, and only when EMIT_WEBPACK_STATS=true, so it never slows
// local dev or normal CI builds.
//
// webpack 5 exposes the distinction we need directly on each module:
//   - module.dependencies  -> synchronous (STATIC) edges
//   - module.blocks        -> AsyncDependenciesBlock[], the dynamic import() edges
// We resolve each dependency to its target module via compilation.moduleGraph and key
// everything by a dense integer index (module.identifier() strings are unique but huge).
class EmitWebpackGraphPlugin {
    constructor(outputPath) {
        this.outputPath = outputPath
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('EmitWebpackGraphPlugin', (compilation, callback) => {
            try {
                this.writeGraph(compilation)
            } catch (error) {
                compilation.warnings.push(
                    new Error(`EmitWebpackGraphPlugin: failed to write webpack graph: ${error.stack || error}`)
                )
            }
            callback()
        })
    }

    writeGraph(compilation) {
        const { moduleGraph, chunkGraph } = compilation
        const moduleList = [...compilation.modules]
        const indexOf = new Map()
        moduleList.forEach((module, i) => indexOf.set(module, i))

        const sizeOf = (module) => {
            try {
                return module.size() || 0
            } catch {
                return 0
            }
        }

        const collectBlockTargets = (block, into) => {
            for (const dependency of block.dependencies || []) {
                const target = moduleGraph.getModule(dependency)
                const targetIndex = target && indexOf.get(target)
                if (targetIndex !== undefined) {
                    into.add(targetIndex)
                }
            }
            for (const nested of block.blocks || []) {
                collectBlockTargets(nested, into)
            }
        }

        const modules = {}
        moduleList.forEach((module, i) => {
            const staticTargets = new Set()
            for (const dependency of module.dependencies || []) {
                const target = moduleGraph.getModule(dependency)
                const targetIndex = target && indexOf.get(target)
                if (targetIndex !== undefined && targetIndex !== i) {
                    staticTargets.add(targetIndex)
                }
            }
            const dynamicTargets = new Set()
            for (const block of module.blocks || []) {
                collectBlockTargets(block, dynamicTargets)
            }
            modules[i] = {
                name: module.readableIdentifier(compilation.requestShortener),
                size: sizeOf(module),
                static: [...staticTargets],
                dynamic: [...dynamicTargets],
            }
        })

        const entrypoints = {}
        for (const [name, entrypoint] of compilation.entrypoints) {
            const chunk = entrypoint.getEntrypointChunk()
            const roots = []
            for (const module of chunkGraph.getChunkEntryModulesIterable(chunk)) {
                const moduleIndex = indexOf.get(module)
                if (moduleIndex !== undefined) {
                    roots.push(moduleIndex)
                }
            }
            entrypoints[name] = { roots }
        }

        fs.mkdirSync(path.dirname(this.outputPath), { recursive: true })
        fs.writeFileSync(this.outputPath, JSON.stringify({ entrypoints, modules }))
    }
}

module.exports = { EmitWebpackGraphPlugin }
