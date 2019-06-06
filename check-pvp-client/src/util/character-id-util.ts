export function getNameAndRealm(
    raw: string
): { name: string; realm: string } {
    const split = raw.split('-');
    let name = '';
    let realm = '';
    if (split.length === 2) {
        name = split[0];
        realm = split[1];
    }

    return {
        name,
        realm,
    };
}
