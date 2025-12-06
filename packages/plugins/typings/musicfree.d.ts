/**
 * @doc https://musicfree.catcat.work/plugin/protocol.html
 */
declare namespace MusicFree {
    interface Plugin {
        /** 插件名称 */
        platform: string
        /** 插件作者 */
        author?: string
        /** 插件版本号, 默认 "0.0.0" */
        version?: string
        /** 匹配的安卓版 APP 版本号, 默认 ">0.0.0" */
        appVersion?: string
        /** 插件更新地址 */
        srcUrl?: string
        /** 主键, 默认 ["id"] */
        primaryKey?: string[]
        /** 缓存策略 */
        cacheControl?: 'no-cache' | 'no-store' | 'cache'
        /** 提示文案 */
        hints?: {
            /** 导入歌单的浮层/弹窗上的提示文案 */
            importMusicSheet?: string[]
            /** 导入单曲的浮层/弹窗上的提示文案 */
            importMusicItem?: string[]
        },
        /** 用户变量 */
        userVariables?: {
            /** 该变量的键 */
            key: string
            /** 该变量展示在软件面板中的名称，可选 */
            title?: string
        }[]
        /** 支持的搜索类型  */
        supportedSearchType?: SearchType[]

        search?<T extends SearchType>(query: string, page: number, type: T): Promise<ISearchResult<T>>

        getMediaSource?(mediaItem: IMusicItem, quality?: Quality): Promise<IMediaSourceResult | null>

        getMusicInfo?(musicBase: IMusicItem): Promise<Partial<IMusicItem> | null>

        getLyric?(musicItem: IMusicItem): Promise<ILyricSource | null>

        getAlbumInfo?(albumItem: IAlbumItem, page: number): Promise<IGetAlbumInfoResult>

        getMusicSheetInfo?(sheetItem: IMusicSheetItem, page: number): Promise<IGetSheetInfoResult>

        getArtistWorks?<T extends ArtistMediaType>(artistItem: IArtistItem, page: number, type: T): Promise<ISearchResult<T>>

        importMusicItem?(urlLike: string): Promise<IMusicItem>

        importMusicSheet?(urlLike: string): Promise<IMusicItem[]>

        getTopLists?(): Promise<IMusicSheetGroupItem[]>

        getTopListDetail?(topListItem: IMusicSheetItem, page?: number): Promise<ITopListInfoResult>

        getRecommendSheetTags?(): Promise<IGetRecommendSheetTagsResult>

        getRecommendSheetsByTag?(tag: ITag, page?: number): Promise<IGetRecommendSheetsByTagResult>

        // getMusicComments(...)
    }

    interface IMediaItem {
        platform?: string
        id: string// | number
    }
    interface IMusicItem extends IMediaItem {
        title: string
        artwork?: string
        artist?: string
        url?: string
        lrc?: string
        rawLrc?: string
    }
    interface IAlbumItem extends IMediaItem { }
    interface IArtistItem extends IMediaItem { }
    interface IMusicSheetItem extends IMediaItem {
        title: string
        musicList?: IMusicItem[]
        description?: string
    }

    // type SearchType = 'music' | 'sheet' | 'album' | 'artist' | 'lyric'
    type SearchResultType = {
        music: IMusicItem
        sheet: IMusicSheetItem
        album: IAlbumItem
        artist: IArtistItem
        lyric: IMusicItem
    }
    type SearchType = keyof SearchResultType

    interface ISearchResult<T extends SearchType> {
        isEnd?: boolean
        data: Partial<SearchResultType[T]>[]
    }

    type Quality = 'low' | 'standard' | 'high' | 'super'
    interface IMediaSourceResult {
        /** 请求URL所需要的headers */
        headers?: Record<string, string>
        /** 请求URL所需要的user-agent */
        userAgent?: string
        /** 音源 */
        url: string
    }

    interface ILyricSource {
        rawLrc?: string // 文本格式的歌词
        translation?: string // 文本格式的翻译
    }

    interface IGetAlbumInfoResult {
        isEnd?: boolean
        musicList: IMusicItem[]
        albumItem?: Partial<IAlbumItem>
    }

    interface IGetSheetInfoResult {
        isEnd?: boolean
        musicList: IMusicItem[]
        sheetItem?: Partial<IMusicSheetItem>
    }

    type ArtistMediaType = 'music' | 'album'

    /** 榜单分组信息 */
    interface IMusicSheetGroupItem {
        title?: string
        data: IMusicSheetItem[]
    }

    interface ITopListInfoResult {
        isEnd?: boolean
        topListItem?: IMusicSheetItem
        musicList?: IMusicItem[]
    }

    interface ITag {
        // tag 的唯一标识
        id: string
        // tag 标题
        title: string
    }

    interface ITagGroup {
        // 分组标题
        title: string
        // tag 列表
        data: ITag[]
    }

    interface IGetRecommendSheetTagsResult {
        // 固定的tag
        pinned?: ITag[]
        // 更多面板中的tag
        data?: ITagGroup[]
    }

    interface IGetRecommendSheetsByTagResult {
        isEnd: boolean
        data: Array<IMusicSheetItem>
    }
}
