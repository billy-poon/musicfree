export function isMusicSheet(val: unknown): val is MusicFree.IMusicSheetItem {
    const { musicList } = (val as MusicFree.IMusicSheetItem) ?? {}
    return Array.isArray(musicList)
}
