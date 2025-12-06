import qs from 'qs'
import { loadHTML, parseTable } from '../utils/dom'
import { createHttp, USER_AGENT } from '../utils/http'
import { shallowMerge } from '../utils/object'
import { isMusicSheet } from '../utils/type'


const http = createHttp('https://www.gequbao.com').raw

const platform = '歌曲宝'

const plugin = {
    platform,

    author: __author__,
    version: __version__,
    srcUrl: __plugin_url__,

    async getTopLists() {
        return [{
            title: '排行',
            data: [
                {
                    id: '/hot-music',
                    title: '热门推荐',
                },
                // {
                //     id: '/top/week-download',
                //     title: '周下载榜'
                // },
            ]
        }]
    },

    async getTopListDetail(topListItem, page?) {
        const sheet = await requestSheet(topListItem.id, page)

        const { isEnd, title, data = [] } = sheet ?? {}
        return {
            ...topListItem,
            isEnd,
            title: title || topListItem.title,
            musicList: data,
        }
    },

    async getMusicInfo(musicBase) {
        const result = await requestMusic(musicBase.id)
        if (result != null) {
            return {
                ...musicBase,
                ...result,
            }
        }

        return null
    },

    async getMediaSource(mediaItem) {
        let { url } = mediaItem
        if (url == null) {
            const music = await requestMusic(mediaItem.id)
            if (music?.url != null) {
                url = music.url
            }
        }

        return url != null
            ? { url, userAgent: USER_AGENT }
            : null
    },

    async getLyric(musicItem) {
        let { rawLrc } = musicItem
        if (rawLrc == null) {
            const music = await requestMusic(musicItem.id)
            if (music?.rawLrc != null) {
                rawLrc = music.rawLrc
            }
        }

        return rawLrc != null
            ? { rawLrc }
            : null
    },

    async search(query, page, type) {
        const data: MusicFree.IMusicItem[] = []
        if (type === 'music') {
            const url = '/s/' + encodeURIComponent(query)
            const html = await http(url)
            const $ = loadHTML(html)
            const notfound = $('#search-notfound-btn')[0]
            if (notfound?.parent != null) {
                $(notfound.parent).find('.row').toArray()
                    .forEach(x => {
                        const $anchor = $(x).find('.col-content > a[href]').first()
                        if ($anchor.length > 0) {
                            data.push({
                                id: $anchor.attr('href')!,
                                title: $anchor.find('.music-title').text().trim(),
                                artist: $anchor.find('.text-jade').text().trim(),
                            })
                        }
                    })
            }
        }

        return { isEnd: true, data }
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

/**
 * @see https://www.gequbao.com/hot-music
 */
async function requestSheet(url: string, page?: number) {
    const pagedURL = page != null && page > 1
        ? `${url}/${page}`
        : url

    const html = await http(pagedURL, { page })
    const $ = loadHTML(html)

    const thead = $('table > thead.thead-light')[0]
    const table = thead.parent
    if (table == null) {
        return null
    }

    const [head, first, ...rest] = parseTable($(table))
    if (head == null || first == null) {
        return null
    }

    const indexMap = {
        title: head.findIndex(x => x.text === '歌名'),
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

            const artist = x[indexMap.artist].text ?? null

            return { id, title, artist } satisfies MusicFree.IMusicItem
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

/**
 * @see https://www.gequbao.com/music/486
 */
async function requestMusic(url: string): Promise<Partial<MusicFree.IMusicItem> | null> {
    const cache = cacheList.find(x => x.id === url)
    if (cache != null) {
        return cache
    }

    const html = await http<string>(url)
    const [, app_json] = /window\.appData\s*=\s*(\{.+\});/.exec(html) ?? []
    /**
     * {
     *         "mp3_id": 486,
     *         "play_id": "Q15WVyVUAw8GQAxcAiZeBFpSRFoIAyICB19XSFxYVHAaUVZRUlhZUXNVVF1TRFE=",
     *         "mp3_title": "\u6ce1\u6cab",
     *         "mp3_author": "G.E.M.\u9093\u7d2b\u68cb",
     *         "mp3_type": 0,
     *         "mp3_cover": "http:\/\/img1.kuwo.cn\/star\/albumcover\/500\/24\/35\/4281428590.jpg",
     *         "mp3_duration": "04:18",
     *         "mp3_extra_urls": [
     *             {
     *                 "id": 1839475,
     *                 "share_link": "https:\/\/pan.quark.cn\/s\/835934f46c76",
     *                 "type": "\u5938\u514b",
     *                 "color": "#118AB2",
     *                 "compel_wap": false
     *             }
     *         ],
     *         "ap_preload": "metadata",
     *         "is_robot": false,
     *         "extra_url_compel": false,
     *         "lrc_is_empty": false,
     *         "ad_type": 1,
     *         "extra_recommend_wap_url": "https:\/\/yun.139.com\/shareweb\/#\/w\/i\/2qidExRaC852h",
     *         "down_alert_ad": ""
     *     }
     */
    try {
        const app_data: {
            play_id?: string
            mp3_title?: string
            mp3_author?: string
            mp3_cover?: string
        } = JSON.parse(app_json)

        const {
            play_id,
            mp3_title: title,
            mp3_author: artist,
            mp3_cover: artwork,
        } = app_data ?? {}

        if (play_id != null) {
            /**
             * {
             *     "code": 1,
             *     "data": {
             *         "url": "https:\/\/er-sycdn.kuwo.cn\/56a1afe17e4a34d4c003b97175e058c5\/6919fddd\/resource\/30106\/trackmedia\/M500003CL1jU1Wgcit.mp3?bitrate$128&from=vip",
             *         "is_while_url": false,
             *         "ut": false
             *     },
             *     "msg": "\u64cd\u4f5c\u6210\u529f"
             * }
             */
            const res = await http<{
                data?: {
                    url?: string
                }
            }>('/api/play-url', null, {
                method: 'POST',
                headers: {
                    'x-requested-with': 'XMLHttpRequest',
                    'content-type': 'application/x-www-form-urlencoded',
                },
                data: qs.stringify({ id: play_id }),
                responseType: 'json',
            })

            const mp3_url = res?.data?.url ?? ''
            if (mp3_url !== '') {
                let result: Partial<MusicFree.IMusicItem> = {
                    id: url,
                    url: mp3_url,
                }

                const $ = loadHTML(html)
                const rawLrc = $('#content-lrc').text().trim()

                result = shallowMerge(result, { title, artist, artwork, rawLrc })

                cacheList.push(result)
                if (cacheList.length > CACHE_SIZE) {
                    cacheList.shift()
                }

                return result
            }
        }

    } catch (err) {
        console.error(err)
    }

    return null
}
