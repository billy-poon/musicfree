let _fiberKey: string | undefined
export function getFiber(el: HTMLElement, fiberKey?: string): unknown {
    const key = fiberKey ?? _fiberKey
    if (key != null) {
        return (el as any)[key]
    }

    fiberKey = Object.keys(el).find(x => x.startsWith('__reactFiber$'))
    if (fiberKey != null) {
        _fiberKey = fiberKey
        return getFiber(el, fiberKey)
    }
}
