'use strict'
import { iterateProperties } from "./iterate.mjs";



test('filter enumerable', () => {
    let o = {
        a: 1,
        b: 2,
        c: 3
      }
    let p = Object.create(o);
    Object.defineProperty(p, "a", {
          value: 10,
          writable: false,
          enumerable: true,
      });
    let iterator = iterateProperties(p, {enumerable: true});
    
    expect(iterator.next().value).toBe('a');
    expect(iterator.next().value).toBe('b');
    expect(iterator.next().value).toBe('c');
    expect(iterator.next().value).toBe('a');
  });