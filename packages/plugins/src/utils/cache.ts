export class Cache<T> {
    readonly items: {
        key: string
        value: T
    }[] = []

    constructor(
        readonly size = 100
    ) {}

    private find(key: string) {
        const index = this.items.findIndex(x => x.key === key)
        return index < 0 ? null : {
            index,
            item: this.items[index]
        }
    }

    get(key: string, reset = true) {
        const entry = this.find(key)
        if (entry == null) {
            return null
        }

        const result = entry.item.value
        if (reset) {
            this.items.splice(entry.index, 1)
            this.items.push(entry.item)
        }

        return result
    }

    set(key: string, value: T) {
        this.remove(key)
        this.items.push({ key, value })

        if (this.items.length > this.size) {
            this.items.shift()
        }
    }

    remove(key: string) {
        const entry = this.find(key)
        if (entry != null) {
            this.items.splice(entry.index, 1)
            return entry.item.value
        }

        return null
    }
}
