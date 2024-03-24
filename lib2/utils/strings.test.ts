import test from "ava";
import { isNonEmptyString, isUrlString } from "./strings.js";

test("isNonEmptyString", (t) => {
    const fails = [undefined, null, ""];
    const passes = ["1", "234"];

    for (let x of fails) {
        t.is(isNonEmptyString(x), false);
    }
    for (let x of passes) {
        t.is(isNonEmptyString(x), true);
    }
});

test("isUrlString", (t) => {
    const fails = [undefined, null, "", "https", "moov.io"];
    const passes = ["https://moov.io", "https://docs.moov.io/api/#hash"];

    for (let x of fails) {
        t.is(isUrlString(x), false);
    }
    for (let x of passes) {
        t.is(isUrlString(x), true);
    }
});
