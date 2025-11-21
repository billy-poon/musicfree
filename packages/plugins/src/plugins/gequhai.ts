import qs from 'qs'
import { type $Element, loadHTML, parseTable } from '../utils/dom'
import { createHttp, USER_AGENT } from '../utils/http'
import { shallowMerge } from '../utils/object'
import { isMusicSheet } from '../utils/type'


const http = createHttp('https://www.gequhai.com').raw

const platform = '歌曲海'

const plugin = {
    platform,

    author: __author__,
    version: __version__,
    srcUrl: __plugin_url__,

    async getTopLists() {
        const html = await http('/')
        const $ = loadHTML(html)

        const result: MusicFree.IMusicSheetGroupItem[] = []
        function parseRank($el: $Element) {
            return {
                id: $el.attr('href')!,
                title: $el.text().trim(),
                // description: '',
            }
        }

        const rankTitle = '排行'
        const rankElement = $('#navbarSupportedContent .navbar-nav .dropdown-toggle').toArray()
            .find(x => $(x).text().trim() === rankTitle)
        if (rankElement != null) {
            const data = $(rankElement.parent!)
                .find('a.dropdown-item[href]').toArray()
                .map(x => parseRank($(x)))
                // 排除“热门歌手榜”，因不是歌单
                .filter(x => x.id !== '/singer')

            if (data.length > 0) {
                result.push({ title: rankTitle, data })
            }
        }

        // cSpell: ignore ilingku_singerlist
        const hotSearch = $('.ilingku_singerlist').first()
        if (hotSearch.length > 0) {
            const data = $(hotSearch)
                .find('a[href]').toArray()
                .map(x => parseRank($(x)))

            if (data.length > 0) {
                result.push({ title: '热搜', data })
            }
        }

        return result
    },

    async getTopListDetail(topListItem, page?) {
        const { id: url } = topListItem
        const sheet = typeof url === 'string'
            ? await requestSheet(url, page)
            : null

        const { isEnd, title, data = [] } = sheet ?? {}
        return {
            ...topListItem,
            isEnd,
            title: title || topListItem.title,
            musicList: data,
        }
    },

    async getMusicInfo(musicBase) {
        const { id: url } = musicBase
        if (typeof url === 'string') {
            const result = await requestMusic(url as string)
            if (result != null) {
                return {
                    ...musicBase,
                    ...result,
                }
            }
        }

        return null
    },

    async getMediaSource(mediaItem) {
        let { url } = mediaItem
        if (url == null) {
            const { id } = mediaItem
            if (typeof id === 'string') {
                const music = await requestMusic(id)
                if (music?.url != null) {
                    url = music.url
                }
            }
        }

        return url != null
            ? { url, userAgent: USER_AGENT }
            : null
    },

    async getLyric(musicItem) {
        let { rawLrc } = musicItem
        if (rawLrc == null) {
            const { id } = musicItem
            if (typeof id === 'string') {
                const music = await requestMusic(id)
                if (music?.rawLrc != null) {
                    rawLrc = music.rawLrc
                }
            }
        }

        return rawLrc != null
            ? { rawLrc }
            : null
    },

    async search(query, page, type) {
        if (type === 'music') {
            const result = await requestSheet(
                '/s/' + encodeURIComponent(query),
                page
            )

            if (result != null) {
                return result
            }
        }

        return { isEnd: true, data: [] }
    },

    async importMusicSheet(urlLike) {
        const data = await http(urlLike, null, {
            responseType: 'json'
        })

        if (isMusicSheet(data)) {
            return (data.musicList ?? [])
                .filter(x => x.platform == null || x.platform === platform)
        }

        return []
    },
} satisfies MusicFree.Plugin

export default plugin

async function requestSheet(url: string, page?: number) {
    const html = await http(url, { page })
    const $ = loadHTML(html)

    const table = $('#myTable')[0] ?? $('#myTables')[0]
    if (table == null) {
        return null
    }

    const [head, first, ...rest] = parseTable($(table))
    if (head == null || first == null) {
        return null
    }

    const indexMap = {
        index: head.findIndex(x => x.text === '序号'),
        artwork: first.findIndex(x => x.type === 'image'),
        title: head.findIndex(x => ['歌曲', '歌名'].includes(x.text)),
        artist: head.findIndex(x => x.text === '歌手'),
    }

    const data = [first, ...rest]
        .map(x => {
            const titleCell = x[indexMap.title]
            if (titleCell?.type !== 'link') {
                return null
            }

            const id = titleCell.url
            const title = titleCell.text

            // const index = x[indexMap.index]?.text ?? null
            const artwork = x[indexMap.artwork]?.type === 'image'
                ? x[indexMap.artwork].url : undefined
            const artist = x[indexMap.artist].text ?? null

            return { id, title, artwork, artist } satisfies MusicFree.IMusicItem
        })
        .filter(Boolean) as MusicFree.IMusicItem[]

    let title: string | null = null
    const $title = $('.jumbotron').first()
    if ($title != null) {
        $title.find('small').remove()
        title = $title.text().trim()
    }

    const $lastPage = $('.pagination .page-link').last()
    const isEnd = $lastPage.length == 0 || $lastPage.hasClass('disabled')

    return { title, data, isEnd }
}

const CACHE_SIZE = 100
const cacheList: Partial<MusicFree.IMusicItem>[] = []

async function requestMusic(url: string): Promise<Partial<MusicFree.IMusicItem> | null> {
    const cache = cacheList.find(x => x.id === url)
    if (cache != null) {
        return cache
    }

    const html = await http<string>(url)
    const [, mp3_id] = /window\.play_id\s*=\s*'(.+)'/.exec(html) ?? []
    const [, mp3_type = '0'] = /window\.mp3_type\s*=\s*(\d+)/.exec(html) ?? []
    if (mp3_id == null) {
        return null
    }

    const type = Number.parseInt(mp3_type)
    if (type !== 0) {
        // https://www.gequhai.com/play/2510283
        return null
    }

    /**
     * succeed: https://www.gequhai.com/play/125
     * {
     *     "code": 200,
     *     "data": {
     *         "url": "https:\/\/lv-sycdn.kuwo.cn\/f13c30361ad63d34714f3018844493ad\/6919cf20\/resource\/30106\/trackmedia\/M500000vbSLz0MwU8O.mp3",
     *         "is_while_url": false
     *     },
     *     "msg": "ok!"
     * }
     * failed: https://www.gequhai.com/play/2510283
     * {
     *     "code": 100,
     *     "data": {
     *         "url": "",
     *         "is_while_url": false
     *     },
     *     "msg": "\u8be5\u6b4c\u66f2\u65e0\u5728\u7ebf\u97f3\u6e90,\u60a8\u53ef\u4ee5\u5c06\u5b83\u4e0b\u8f7d\u5230\u672c\u5730\u8fdb\u884c\u64ad\u653e !"
     * }
     */
    const res = await http<{
        data?: {
            url?: string
        }
    }>('/api/music', null, {
        method: 'POST',
        headers: {
            'x-custom-header': 'SecretKey',
            'x-requested-with': 'XMLHttpRequest',
            'content-type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({ id: mp3_id, type }),
        responseType: 'json',
    })

    const mp3_url = res?.data?.url ?? ''
    if (mp3_url === '') {
        return null
    }

    let result: Partial<MusicFree.IMusicItem> = {
        id: url,
        url: mp3_url,
        // mp3Id: mp3_id,
        // mp3Type: mp3_type,
    }

    const $ = loadHTML(html)
    const [, title] = /window\.mp3_title\s*=\s*'(.+)'/.exec(html) ?? []
    const [, artist] = /window\.mp3_author\s*=\s*'(.+)'/.exec(html) ?? []
    const [, artwork] = /window\.mp3_cover\s*=\s*'(.+)'/.exec(html) ?? []
    const rawLrc = $('#content-lrc2').text().trim()

    result = shallowMerge(result, { title, artist, artwork, rawLrc })

    cacheList.push(result)
    if (cacheList.length > CACHE_SIZE) {
        cacheList.shift()
    }

    return result
}
