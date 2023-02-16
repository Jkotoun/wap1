'use strict'
import { iterateProperties } from "./iterate.mjs";

//helper functions and constants
function getAllGeneratorValues(iterator) {
  let props = [];
  for (let prop of iterator) {
    props.push(prop);
  }
  return props;
}
const protoObjProps = Object.getOwnPropertyNames(Object.prototype)
const o = {
  a: 1,
  b: 2,
  c: 3
}

test('prototype object', () => {
  let iterator = iterateProperties(Object.prototype);
  expect(getAllGeneratorValues(iterator)).toEqual(protoObjProps)
})


test('simple object - all props', () => {

  let obj = Object.create(o)
  let iterator = iterateProperties(obj)
  let expected = [...protoObjProps, 'a', 'b', 'c']
  expect(getAllGeneratorValues(iterator)).toEqual(expected)
});

test('filter simple', () => {
  let obj = Object.create(o)
  Object.defineProperty(obj, "non-writable", {
    'value': 0,
    'writable': false,
  });

  let iterator = iterateProperties(obj, { writable: false })
  expect(getAllGeneratorValues(iterator)).toEqual(['non-writable'])
})

test('filter complex', () => {
  let obj = Object.create(o)
  Object.defineProperty(obj, "nonwritable-enumerable", {
    value: 80,
    enumerable: true,
    writable: false
  });
  let iterator = iterateProperties(obj, { writable: false, enumerable: true })
  expect(getAllGeneratorValues(iterator)).toEqual(['nonwritable-enumerable'])

})

test('filter-out-all', () => {
  let obj = Object.create(o)
  Object.defineProperty(obj, "nonwritable-enumerable", {
    enumerable: true,
    writable: true
  });
  let iterator = iterateProperties(obj, { writable: false, enumerable: true, value: 90 })
  expect(getAllGeneratorValues(iterator)).toEqual([])

})

test('nonexisting prop', () => {
  let obj = Object.create(o)
  Object.defineProperty(obj, "nonwritable-enumerable", {
    enumerable: true,
    writable: true
  });
  let iterator = iterateProperties(obj, { undefprop: true })
  expect(getAllGeneratorValues(iterator)).toEqual([])

})