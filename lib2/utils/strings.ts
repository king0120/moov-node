export function isNonEmptyString(str) {
    return !(str === undefined || str === null || str.length === 0);
}

export function isUrlString(str) {
    if (isNonEmptyString(str)) {
        try {
            new URL(str);
            return true;
        } catch {
            // No-op
        }
    }

    return false;
}
