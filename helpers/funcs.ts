export function mapObjectToQuery (obj: {
    [key: string]: string | number | null | undefined
}, fromBeginning: boolean | null) {
    return Object.keys(obj).map((key, index) => obj[key] && `${fromBeginning && index === 0 ? '?' : '&'}${key}=${String(obj[key])}`).join('')
}