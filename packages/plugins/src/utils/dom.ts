import { Cheerio, load } from 'cheerio'

export type $Element = Cheerio<any>

export function loadHTML(html: any) {
    return load(html)
}

export type TableCell = {
    type: 'link' | 'image',
    text: string
    url: string
} | {
    type: 'text'
    text: string
    url?: never
}

export function parseTable($el: $Element) {
    function parseCell($cell: $Element): TableCell {
        const $anchor = $cell.find('a[href]').first()
        if ($anchor.length > 0) {
            return {
                type: 'link',
                text: $anchor.text().trim(),
                url: $anchor.attr('href')!,
            }
        }
        const text = $cell.text().trim()
        if (text === '') {
            const $image = $cell.find('img[src]').first()
            if ($image.length > 0) {
                return {
                    type: 'image',
                    text: $image.attr('alt') ?? '',
                    url: $image.attr('src')!,
                }
            }
        }

        return {
            type: 'text',
            text,
        }
    }

    const $ = (el: any) => $el._make(el)
    const result = $el.find('tr').toArray()
        .map(x => $(x).children().toArray()
            .map(y => parseCell($(y)))
        )

    return result

}
