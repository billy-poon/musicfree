import axios, { type AxiosRequestConfig, type Method } from 'axios'
import { shallowMerge } from './object'

// cSpell: ignore khtml
export const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0'

/**
 * @doc https://axios-http.com/docs/intro
 */
export function createHttp(baseURL: string, config?: AxiosRequestConfig) {
    const options: AxiosRequestConfig = {
        ...config,
        headers: {
            'User-Agent': USER_AGENT,
            ...config?.headers,
        },
        baseURL,
    }

    const http = axios.create(options)
    const cookieJar = new CookieJar()
    http.interceptors.request.use((config) => {
        if (config.headers?.Cookie === undefined) {
            const cookie = cookieJar.get()
            if (cookie != null) {
                config.headers = {
                    ...config.headers,
                    'Cookie': cookie
                }
            }
        }

        return config
    })
    http.interceptors.response.use(
        (res) => {
            cookieJar.set(res.headers['set-cookie'])
            return res
        },
        (err) => {
            cookieJar.set(err?.response?.headers?.['set-cookie'])
            throw err
        },
    )

    let referer: string | undefined
    async function request<T = any>(url: string, data?: any, config?: AxiosRequestConfig | Method) {
        const options: AxiosRequestConfig = typeof config === 'string'
            ? { method: config }
            : { ...config }

        if (data != null) {
            const { method = 'GET' } = options
            const payloadMethods = ['PUT', 'POST', 'PATCH']
            const key = payloadMethods.includes(method.toUpperCase())
                ? 'data' : 'params' as const

            options[key] = typeof data === 'object'
                ? shallowMerge(options[key], data)
                : data
        }

        if (referer != null) {
            options.headers = {
                ...options.headers,
                'Referer': referer
            }
        }

        options.url = url
        const res = await http.request<T>(options)
        if (res.headers['content-type']?.startsWith('text/html')) {
            referer = options.url
        }

        return res
    }

    type Request = typeof request
    const result = request as Request & {
        baseURL: string
        raw: <T>(...args: Parameters<Request>) => Promise<T>
    }

    result.baseURL = baseURL
    result.raw = async (...args) => {
        const res = await request(...args)
        return res.data
    }

    return result
}

class CookieJar {
    private dict: Record<string, string> = {}

    set(cookies?: string[]) {
        (cookies ?? []).forEach(x => {
            const [kv] = x.split(';', 2)
            const [k, v] = kv.split('=', 2)
            if (v != null) {
                this.dict[k] = v
            }
        })
    }

    get() {
        const items = Object.entries(this.dict)
        if (items.length > 0) {
            return items.map(([k, v]) => `${k}=${v}`).join('; ')
        }

        return null
    }

    clear() {
        this.dict = {}
    }
}
