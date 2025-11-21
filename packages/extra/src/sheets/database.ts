import Dexie, { type Table } from 'dexie'

const musicRefSymbol = '$$ref'

/**
 * @see https://github.com/maotoumao/MusicFreeDesktop/blob/master/src/renderer/core/db/music-sheet-db.ts
 */
class MusicSheetDB extends Dexie {
    // 歌单信息，其中musicList只存有platform和id
    declare sheets: Table<IMusic.IDBMusicSheetItem>
    // musicStore 存有歌单内保存所有的音乐信息
    declare musicStore: Table<
        IMusic.IMusicItem & {
            [musicRefSymbol]: number // 某个歌曲在歌单中被引用几次，数字
        }
    >
    declare localMusicStore: Table<IMusic.IMusicItem & {
        $$localPath: string // 本地地址
    }>

    constructor() {
        super("musicSheetDB")

        this.version(1.1).stores({
            sheets: "&id, title, artist, createAt, $$sortIndex",
            musicStore: "[platform+id], title, artist, album",
            /** 本地音乐 */
            localMusicStore: "[platform+id], title, artist, album, $$localPath",
        })
    }
}

const musicSheetDB = new MusicSheetDB()

window.$musicSheetDB = musicSheetDB
export default musicSheetDB
