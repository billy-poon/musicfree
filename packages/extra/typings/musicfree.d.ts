declare namespace IMusic {
    interface IMusicSummary {
        platform: string
        id: string | number
    }

    interface IMusicItem extends IMusicSummary {
        title: string
        artist?: string
        $?: {
            downloadData?: {
                path: string
                quality: 'low' | 'standard' | 'high' | 'super'
            }
        }
    }

    interface IDBMusicSheetItem {
        id: string
        createAt: number
        artwork?: string
        $$sortIndex?: number
        musicList?: IMusicSummary[]
    }
}
