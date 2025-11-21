import resolve from '@rollup/plugin-node-resolve'
import path from 'path'
import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import url from 'url'

// import terser from '@rollup/plugin-terser'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const external = []

const plugins = [
    esbuild({
        charset: 'utf8'
    }),
    resolve(),
    // terser(),
]

export default defineConfig({
    input: path.join(__dirname, 'src/extra.ts'),
    output: {
        format: 'umd',
        file: path.join(__dirname, 'dist/extra.js'),
    },
    external,
    plugins,
})
