import resolve from '@rollup/plugin-node-resolve'
import path from 'path'
import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import svg from 'rollup-plugin-svg'
import url from 'url'

// import terser from '@rollup/plugin-terser'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

export default defineConfig({
    input: path.join(__dirname, 'src/index.ts'),
    output: {
        format: 'umd',
        file: path.join(__dirname, 'dist/extra.js'),
    },
    external: [],
    plugins: [
        esbuild({
            charset: 'utf8'
        }),
        svg(),
        resolve(),
    ],
})
