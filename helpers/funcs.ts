export function mapObjectToQuery (obj: object, fromBeginning: boolean | null) {
    return Object.keys(obj).map((key, index) => obj[key] && `${fromBeginning && index === 0 ? '?' : '&'}${key}=${obj[key]}`).join('')
}