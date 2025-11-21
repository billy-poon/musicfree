const g = global as any
g.__author__ = ''
g.__version__ = ''
g.__plugin_url__ = ''

async function main() {
    const { default: plugin } = await import('./plugins/gequbao')

    // const result = await plugin.getTopLists()

    // const result = await plugin.getTopListDetail({
    //     id: '/hot-music/',
    //     title: '热门歌曲',
    // })

    // const music: MusicFree.IMusicItem = {
    //     id: '/music/486',
    //     title: '泡沫',
    // }
    // const result = {
    //     music: await plugin.getMusicInfo(music),
    //     source: await plugin.getMediaSource(music),
    //     lyric: await plugin.getLyric(music),
    // }

    // const result = await plugin.search('想你的夜', 1, 'music')
    const result = await plugin.importMusicSheet('http://dl.pqb.uctrl.com/files/musicfree-music-sheet_0FsRZVwi52W_9XYLQKjsy.json')

    console.log(JSON.stringify(result, null, 2))
}

main()
