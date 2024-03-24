import { isNonEmptyString, isUrlString } from "./strings.js";

const orThrow = {
    or: (msg) => {
        throw new TypeError(msg);
    },
};

const orNothing = {
    or: () => {},
};

export function check(any) {
    return !(any === undefined || any === null) ? orNothing : orThrow;
}

export function checkString(str) {
    return isNonEmptyString(str) ? orNothing : orThrow;
}

export function checkUrl(url) {
    return isUrlString(url) ? orNothing : orThrow;
}

export function checkArray(arr) {
    return check(arr) && arr.constructor === Array ? orNothing : orThrow;
}

export function checkArrayLength(arr) {
    return checkArray(arr) && arr.length > 0 ? orNothing : orThrow;
}
