export async function nextTick(cb?: () => void) {
    return new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve())
    }).then(() => cb?.())
}
