const g = global as any
g.__author__ = ''
g.__version__ = ''
g.__plugin_url__ = ''

async function main() {
    const { default: plugin } = await import('./plugins/2t58')

    // const result = await plugin.getTopLists()

    // const result = await plugin.getTopListDetail({
    //     id: '/hot-music/',
    //     title: '热门歌曲',
    // })

    // const music: MusicFree.IMusicItem = {
    //     id: '/song/d2tkY21raw.html',
    //     title: '那些花儿',
    // }
    // const result = {
    //     music: await plugin.getMusicInfo(music),
    //     source: await plugin.getMediaSource(music),
    //     lyric: await plugin.getLyric(music),
    // }

    // const result = await plugin.search('红风车', 2, 'music')
    // const result = await plugin.importMusicSheet('http://dl.pqb.uctrl.com/files/musicfree-music-sheet_0FsRZVwi52W_9XYLQKjsy.json')
    // const result = await plugin.importMusicSheet('https://www.2t58.com/playlist/ZHZzZG54dm5kbQ.html')

    const result = {
        tags: await plugin.getRecommendSheetTags(),
        sheets: await plugin.getRecommendSheetsByTag({
            id: '/playtype/huaijiu.html',
            title: '怀旧'
        }, 2)
    }

    console.log(JSON.stringify(result, null, 2))
}

main()
