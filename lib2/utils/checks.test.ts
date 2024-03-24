import test from "ava";
import {
  check,
  checkArray,
  checkArrayLength,
  checkString,
  checkUrl,
} from "./checks.js";

test("check", (t) => {
  const throws = [undefined, null];
  const notThrows = [false, true, "", {}];

  for (let x of throws) {
    t.throws(() => check(x).or());
  }
  for (let x of notThrows) {
    t.notThrows(() => check(x).or());
  }
});

test("checkString", (t) => {
  const throws = [undefined, null, ""];
  const notThrows = ["a", "1"];

  for (let x of throws) {
    t.throws(() => checkString(x).or());
  }
  for (let x of notThrows) {
    t.notThrows(() => checkString(x).or());
  }
});

test("checkUrl", (t) => {
  const throws = [undefined, null, "", "http", "moov.io"];
  const notThrows = ["https://moov.io", "https://docs.moov.io/api/#hash"];

  for (let x of throws) {
    t.throws(() => checkUrl(x).or());
  }
  for (let x of notThrows) {
    t.notThrows(() => checkUrl(x).or());
  }
});

test("checkArray", (t) => {
  const throws = [undefined, null, {}];
  const notThrows = [[], [1], ["one", 2]];

  for (let x of throws) {
    t.throws(() => checkArray(x).or());
  }
  for (let x of notThrows) {
    t.notThrows(() => checkArray(x).or());
  }
});

test("checkArrayLength", (t) => {
  const throws = [undefined, null, {}, []];
  const notThrows = [[1], ["one", 2]];

  for (let x of throws) {
    t.throws(() => checkArrayLength(x).or());
  }
  for (let x of notThrows) {
    t.notThrows(() => checkArrayLength(x).or());
  }
});
