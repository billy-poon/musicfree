import { createElement, downloadFile } from '../utils/dom'
import { nextTick } from '../utils/promise'
import { getFiber } from '../utils/react'
import musicSheetDB from './database'

document.addEventListener('contextmenu', async (e) => {
    const sheet = await getMusicSheet(e.target as HTMLElement)
    if (sheet != null) {
        await nextTick()
        showMenu(sheet)
    }
})

function showMenu(sheet: IMusic.IDBMusicSheetItem) {
    const menu = document.querySelector('.context-menu--single-column-container')
    if (menu?.checkVisibility()) {
        const item = createElement(`
            <div class="menu-item" role="button" style="height: 32px;">
                <div class="menu-item-icon"></div>
                <span>导出歌单</span>
            </div>
        `)
        item.onclick = () => exportMusicSheet(sheet)
        menu.append(item)
    }
}

async function exportMusicSheet(sheet: IMusic.IDBMusicSheetItem) {
    const data = {
        ...sheet,
        musicList: await resolveMusicList(sheet.musicList ?? [])
    }

    const json = JSON.stringify(data, (k, v) => {
        return k.startsWith('$') ? undefined : v
    }, 2)

    downloadFile(json, `musicfree-music-sheet_${sheet.id}.json`)
}

async function resolveMusicList(items: IMusic.IMusicSummary[]) {
    const result: IMusic.IMusicItem[] = []
    for (const x of items) {
        const { platform, id } = x
        const item = await musicSheetDB.musicStore.get([platform, id])
        if (item != null) {
            result.push(item)
        }
    }

    return result
}

async function getMusicSheet(el: HTMLElement) {
    const key = getKey(el)
    if (key != null) {
        return musicSheetDB.sheets.get(key)
    }
}

function getKey(el: HTMLElement): string | null {
    if (!el.classList.contains('side-bar--list-item-container')) {
        const parent = el.closest('.side-bar--list-item-container')
        if (parent != null) {
            return getKey(parent as HTMLElement)
        }
    }

    const fiber = getFiber(el) as Fiber
    return fiber.return?.key ?? null
}

interface Fiber {
    return?: {
        key?: string
    }
}
