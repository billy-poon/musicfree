import { nextTick } from './promise'

export function createElement<T = HTMLElement>(html: string) {
    const el = document.createElement('div')
    el.innerHTML = html
    return el.children[0] as T
}

export async function downloadFile(content: string | Blob, filename: string) {
    const blob = typeof content === 'string'
        ? new Blob([content])
        : content

    const url = URL.createObjectURL(blob)
    let link: HTMLAnchorElement | undefined
    try {
        link = createElement<HTMLAnchorElement>(`<a href="${url}"></a>`)
        link.download = filename

        document.body.appendChild(link)
        link.click()

        await nextTick()
        document.body.removeChild(link)
    } finally {
        URL.revokeObjectURL(url)
        if (link != null) {
            link.parentElement?.removeChild(link)
        }
    }
}
