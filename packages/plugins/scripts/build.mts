import { globSync, writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import pkg from '../package.json' with { type: 'json' }

const __dirname = path.dirname(fileURLToPath(import.meta.url))

interface PluginRegistry {
    plugins: PluginDefinition[]
    desc?: string
}

interface PluginDefinition {
    url: string
    name: string
    version?: string
}

function isPlugin(val: unknown): val is MusicFree.Plugin & { srcUrl: string } {
    if (val != null) {
        const p = val as MusicFree.Plugin
        return typeof p.platform === 'string'
            && typeof p.srcUrl === 'string'
    }

    return false
}

async function main() {
    const plugins: PluginDefinition[] = []

    const items = globSync(path.join(__dirname, '../dist/**/*.js'))
    for (const x of items) {
        try {
            const { default: plugin } = await import(x)
            if (isPlugin(plugin)) {
                const { srcUrl: url, platform: name, version } = plugin
                const definition: PluginDefinition = { url, name }
                if (version != null) {
                    definition.version = version
                }

                plugins.push(definition)
            }
        }
        catch { }
    }

    if (plugins.length > 0) {
        const registry: PluginRegistry = {
            desc: pkg.description,
            plugins,
        }

        const json = JSON.stringify(registry, null, 2)
        const output = path.join(__dirname, '../dist/plugins.json')
        writeFileSync(output, json)

        console.log('\n✓ [%d] plugins registered:\n  ', plugins.length, output)
    } else {
        console.warn('\n✗ no plugins registered.')
    }

}

main()
