export function shallowMerge<T, U>(obj: T, ...data: U[]): U extends Partial<T> ? T : T & U {
    const result: any = { ...obj }
    data.forEach(x => {
        if (x != null) {
            Object.entries(x)
                .forEach(([k, v]) => {
                    if (v != null && v !== '') {
                        result[k] = v
                    }
                })
        }
    })

    return result
}
