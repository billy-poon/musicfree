import type { AxiosResponse } from 'axios'
import qs from 'qs'
import { Cache } from '../utils/cache'
import { loadHTML } from '../utils/dom'
import { createHttp, USER_AGENT } from '../utils/http'
import { isMusicSheet } from '../utils/type'

const http = createHttp('https://www.2t58.com')
const requestHttp: typeof http.raw = async (url, data, config) => {
    try {
        return await http.raw(url, data, config)
    } catch (err) {
        const response: AxiosResponse = (err as any).response
        if (response != null) {
            if (response.status === 403) {
                const cookies = response.headers['set-cookie']
                if (cookies != null && cookies.length > 0) {
                    return http.raw(url, data, config)
                }
            }
        }

        throw err
    }
}

const platform = '爱听音乐'

const plugin = {
    platform,

    author: __author__,
    version: __version__,
    srcUrl: __plugin_url__,

    async getTopLists() {
        const url = '/list/top.html'
        const html = await requestHttp(url)
        const $ = loadHTML(html)

        const items = $('.ilingku_fl > li > a[href]').toArray()
            .map<MusicFree.IMusicSheetItem>(x => {
                const $x = $(x)
                return {
                    id: $x.attr('href')!,
                    title: $x.text().trim(),
                }
            })

        return [{
            title: 'TOP榜单',
            data: [
                { id: url, title: '飙升榜' },
                ...items
            ]
        }]
    },

    async getTopListDetail(topListItem, page?) {
        const { id: url } = topListItem
        const sheet = await requestSheet(url, page)

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
        return result
    },

    async getMediaSource(mediaItem) {
        let { url } = mediaItem
        if (url == null) {
            const media = await requestMediaInfo(mediaItem.id)
            if (media != null) {
                url = media.url
            }
        }

        return url != null
            ? { url, userAgent: USER_AGENT }
            : null
    },

    async getLyric(musicItem) {
        let { rawLrc } = musicItem
        if (rawLrc == null) {
            const lyrics = await requestLyrics(musicItem.id)
            if (lyrics?.lrc != null) {
                rawLrc = lyrics?.lrc
            }
        }

        return rawLrc != null
            ? { rawLrc }
            : null
    },

    async search(query, page, type) {
        const data: MusicFree.IMusicItem[] = []
        if (type === 'music') {
            const url = '/so/' + encodeURIComponent(query) + '.html'
            const result = await requestSheet(url, page)
            if (result != null) {
                return result
            }
        }

        return { isEnd: true, data }
    },

    async getRecommendSheetTags() {
        const html = await requestHttp('/playtype/index.html')

        const $ = loadHTML(html)
        const items = $('.ilingku_fl').toArray()
            .map<MusicFree.ITagGroup>(x => {
                const [title, ...list] = $(x).find('li').toArray()
                const data = list.map<MusicFree.ITag>(y => {
                    const $link = $(y).find('a[href]')
                    return {
                        id: $link.attr('href')!,
                        title: $link.text().trim(),
                    }
                })

                return {
                    title: $(title).text().trim().replace(/[:：]+/, ''),
                    data
                }
            })

        const [first, ...rest] = items
        return {
            pinned: first.data,
            data: rest
        }
    },

    async getRecommendSheetsByTag(tag, page) {
        const pageURL = page != null
            ? getPageURL(tag.id !== '' ? tag.id : '/playtype/index.html', page)
            : tag.id
        if (pageURL != null) {
            const html = await requestHttp(pageURL)
            const $ = loadHTML(html)
            const data = $('ul.play > li .name a[href]').toArray()
                .map<MusicFree.IMusicSheetItem>(x => {
                    const $x = $(x)
                    const href = $x.attr('href')!
                    const [, preferId] = /\/(\w+).html/.exec(href) ?? []
                    return {
                        id: preferId ?? href,
                        title: $x.text().trim(),
                    }
                })

            const isEnd = $('.page a').last().text().trim() !== '尾页'
            return { isEnd, data }
        }

        return { isEnd: true, data: [] }
    },

    async getMusicSheetInfo(sheetItem, page) {
        const result = await requestSheet(sheetItem.id, page)
        if (result != null) {
            const { isEnd, data } = result
            return { isEnd, musicList: data }
        }

        return { isEnd: true, musicList: [] }
    },

    async importMusicSheet(urlLike) {
        const data = await requestHttp(urlLike)

        if (isMusicSheet(data)) {
            return (data.musicList ?? [])
                .filter(x => x.platform == null || x.platform === platform)
        } else if (typeof data === 'string') {
            const sheet = parseMusicSheet(data)
            if (!sheet.isEnd && urlLike.startsWith(http.baseURL)) {
                const url = urlLike.slice(http.baseURL.length)
                let page = 2
                while (true) {
                    const pageURL = getPageURL(url, page++)
                    if (pageURL == null) break;

                    const pageSheet = await requestSheet(pageURL)
                    if (pageSheet?.data) {
                        sheet.data.push(...pageSheet.data)
                    }

                    if (pageSheet == null || pageSheet.isEnd) {
                        break
                    }
                }
            }
            return sheet.data
        }

        return []
    },
} satisfies MusicFree.Plugin

export default plugin

/**
 * @see https://www.2t58.com/list/top.html
 */
async function requestSheet(url: string, page?: number) {
    if (!url.endsWith('.html')) {
        url = `/playlist/${url}.html`
    }

    const pageURL = page != null && page > 1
        ? getPageURL(url, page) : url
    if (pageURL != null) {
        const html = await requestHttp(pageURL)
        if (typeof html === 'string') {
            return parseMusicSheet(html)
        }
    }

    return null
}

function parseMusicSheet(html: string) {
    const $ = loadHTML(html)

    const $playList = $('.play_list')
    const data = $playList.find('a[href][target=_mp3]').toArray()
        .map<MusicFree.IMusicItem>(x => {
            const $x = $(x)
            const id = $x.attr('href')!
            const text = $x.text().trim()
            return { id, ...parseMusicTitle(text) }
        })


    let title: string | null = null
    const $title = $playList.find('.title > h1').first()
    if ($title != null) {
        title = $title.text().trim()
    }

    const isEnd = $playList.find('.page a').last().text().trim() !== '尾页'
    if (title === '歌单歌曲列表') {
        data.forEach(x => {
            const { artist, title } = x
            x.title = artist ?? ''
            x.artist = title
        })
    }

    return { title, data, isEnd }

}

function getPageURL(url: string, page: number) {
    const [, prefix, suffix = ''] = /(.+)\.html([?#].*)?/.exec(url) ?? []
    if (prefix != null) {
        return `${prefix}/${page}.html${suffix}`
    }

    return null
}

const cache = new Cache<MusicItem>(100)
interface MusicItem extends Partial<MusicFree.IMusicItem> {
    id: string
    playInfo: {
        id: string
        type: string
        mediaInfo?: {
            lkid: string
            pic: string
            url: string
        },
        lyricsInfo?: {
            lrc: string
        }
    }
}

/**
 * @see https://www.2t58.com/song/d2tkY21raw.html
 */
async function requestMusic(musicId: string): Promise<MusicItem | null> {
    const cached = cache.get(musicId)
    if (cached != null) {
        return cached
    }

    const html = await requestHttp<string>(musicId)
    const $ = loadHTML(html)
    const script = ($('.main + script').html() ?? '').slice(0, 100)
    const [, type, id] = /player\("(.+)",\s*"(.+)"\)/.exec(script) ?? []
    if (type != null && id != null) {
        const title = $('.djname').remove('a').text().trim()
        const result: MusicItem = {
            ...(title !== '' ? parseMusicTitle(title) : {}),
            id: musicId,
            playInfo: { id, type }
        }
        const artwork = $('#mcover').attr('src') ?? ''
        if (artwork !== '') {
            result.artwork = artwork
        }

        cache.set(musicId, result)
        return result
    }

    return null
}

function parseMusicTitle(val: string): Pick<MusicFree.IMusicItem, 'artist' | 'title'> {
    // 大头针 Official - 你看你看月亮的脸 (（深情大合唱版）)
    const [, x1, y1] = /^(.+)-(.+)$/.exec(val) ?? []
    if (x1 != null && y1 != null) {
        return {
            artist: x1.trim(),
            title: y1.trim()
        }
    }

    // 光头佬《大风车 (抖音热搜版)[MP3_LRC]
    const [, x2, y2] = /^(.+)《(.+)》/.exec(val) ?? []
    if (x2 != null && y2 != null) {
        return {
            artist: x2.trim(),
            title: y2.trim()
        }
    }

    return { title: val }
}

async function requestMediaInfo(musicId: string) {
    const music = await requestMusic(musicId)
    if (music != null) {
        const { mediaInfo } = music.playInfo
        if (mediaInfo != null) {
            return mediaInfo
        }

        /**
         * {
         *   "msg": 1,
         *   "lkid": 1036200,
         *   "pic": "https://img1.kuwo.cn/star/albumcover/300/s4s56/89/2225743619.jpg",
         *   "url": "https://er-sycdn.kuwo.cn/c436222db26ad24a24d9ccbf2d1ed314/6932790f/resource/30106/trackmedia/C200002697Tm1yiCLZ.m4a?from=vip"
         * }
         */
        const { id, type } = music.playInfo
        const res = await requestHttp<MusicItem['playInfo']['mediaInfo']>('/js/play.php', null, {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({ id, type }),
            responseType: 'json'
        })

        if (res?.url != null) {
            music.playInfo.mediaInfo = res
            cache.set(musicId, music)

            return res
        }
    }

    return null
}

async function requestLyrics(musicId: string) {
    const music = await requestMusic(musicId)
    if (music != null) {
        const { lyricsInfo } = music.playInfo
        if (lyricsInfo != null) {
            return lyricsInfo
        }

        const mediaInfo = music.playInfo.mediaInfo
            ?? await requestMediaInfo(musicId)

        if (mediaInfo?.lkid != null) {
            /**
             * {
             *   "lrc": "..."
             * }
             */
            const res = await requestHttp<MusicItem['playInfo']['lyricsInfo']>('https://js.eev3.com/lrc.php', { cid: mediaInfo.lkid }, {
                responseType: 'json'
            })

            if (res?.lrc != null) {
                music.playInfo.lyricsInfo = res
                cache.set(musicId, music)

                return res
            }

        }
    }

    return null
}
