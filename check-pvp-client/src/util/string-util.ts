export function isEqualIgnoringCase(a: string, b: string) {
    return a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0;
}