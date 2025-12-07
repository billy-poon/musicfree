import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import { config } from 'dotenv'
import { globSync } from 'fs'
import path from 'path'
import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import url from 'url'
import pkg from './package.json' with { type: 'json' }

config({
    path: [
        `.env-${process.env.NODE_ENV}`,
        '.env',
    ]
})
// import terser from '@rollup/plugin-terser'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const external = [
    'axios',
    'big-integer',
    'cheerio',
    'crypto-js',
    'dayjs',
    'he',
    'qs',
    'webdav',
]

const author = process.env.PLUGIN_AUTHOR || pkg.author.name || undefined
const version = process.env.PLUGIN_VERSION || pkg.version || undefined
const baseURL = process.env.PLUGIN_BASE_URL || undefined

const plugins = [
    replace({
        preventAssignment: true,
        values: {
            '__author__': JSON.stringify(author),
            '__version__': JSON.stringify(version),
            '__plugin_url__': (filename) => {
                let val
                if (baseURL != null) {
                    const basename = path.basename(filename).replace(/\.ts$/, '.js')
                    val = url.resolve(baseURL, basename)
                }

                return JSON.stringify(val)
            }
        }
    }),
    esbuild({
        charset: 'utf8'
    }),
    // https://musicfree.catcat.work/plugin/caution.html
    // https://www.cnblogs.com/chanwahfung/p/13101063.html
    // https://www.npmjs.com/package/@rollup/plugin-babel
    babel({
        babelrc: false,
        presets: ['@babel/preset-env'],
        extensions: ['.js', '.mjs', '.ts', '.mts'],
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        targets: {
            // chrome: '46',
            android: 45,
        },
    }),
    // terser(),
]

const items = globSync(path.join(__dirname, 'src/plugins/*.ts'))
const result = items.map(x => defineConfig({
    input: x,
    output: {
        format: 'commonjs',
        file: path.join(
            'dist',
            path.basename(x).replace(/\.ts$/, '.js')
        )
    },
    external,
    plugins,
}))

export default result
