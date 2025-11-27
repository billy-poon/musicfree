import { nextTick } from '../utils/promise'

(function setup() {
    const ee = getDownloaderEmitter()
    const pm = getPluginManager()
    if (ee == null || pm == null) {
        return nextTick(setup)
    }

    console.log('Setup downloader hooks...')

    ee.on('Downloaded', async (items) => {
        const fs = getFsUtil()
        if (fs == null) return

        for (const x of items) {
            const { path: musicFile } = x.$?.downloadData ?? {}
            if (musicFile == null) continue

            const { rawLrc } = await pm.callPluginMethod(x, 'getLyric', x) ?? {}
            if (rawLrc == null) continue

            const lyricFile = getLyricFilename(musicFile)

            await fs.writeFile(lyricFile, rawLrc)
                .catch(console.error)

            console.log('Write: %s => %s', musicFile, lyricFile)
            // console.log('%s:\n%s', lyricFile, rawLrc)
        }
    })

    ee.on('RemoveDownload', async (items) => {
        const fs = getFsUtil()
        if (fs == null) return

        for (const x of items) {
            const { path: musicFile } = x.$?.downloadData ?? {}
            if (musicFile == null) continue

            const lyricFile = getLyricFilename(musicFile)
            await fs.rimraf(lyricFile)
                .catch(console.error)

            console.log('Remove: %s => %s', musicFile, lyricFile)
        }
    })

    // ee.on('DownloadStatusUpdated', (...args) => {
    //     console.log('DownloadStatusUpdated', args)
    // })
})()

function getLyricFilename(musicFilename: string, lyricExt = '.lrc') {
    const extname = window.path.extname(musicFilename)
    return musicFilename.slice(0, -extname.length) + lyricExt
}

function getFsUtil() {
    const util = window['@shared/utils'] as {
        fs?: FsUtil
    }

    const val = util?.fs
    return typeof val?.writeFile === 'function'
        ? val : null
}

interface FsUtil {
    writeFile(file: string, data: string): Promise<string>
    rimraf(path: string | string[], options?: any): Promise<boolean>
}

function getPluginManager() {
    const val = window['@shared/plugin-manager'] as PluginManager
    return typeof val?.callPluginMethod === 'function'
        ? val : null
}

interface PluginManager {
    callPluginMethod(plugin: IPluginDelegateLike, method: 'getLyric', music: IMusic.IMusicItem): Promise<IGetLyricResult | null>
}

interface IPluginDelegateLike {
    platform?: string
    hash?: string
}

interface IGetLyricResult {
    rawLrc: string
}

function getDownloaderEmitter() {
    const val = window.$downloaderEmitter as DownloaderEmitter
    return typeof val?.on === 'function'
        ? val : null
}

type Events = {
    'Downloaded': [items: IMusic.IMusicItem[]]
    'DownloadStatusUpdated': [items: any],
    'RemoveDownload': [items: IMusic.IMusicItem[]],
}

interface DownloaderEmitter {
    on<E extends keyof Events>(type: E, handler: (...args: Events[E]) => void): void
}
