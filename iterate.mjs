/**
 * Object prototype chain properties generator
 * @param {Object} object - object whose properties are to be generated
 * @param {Object} filter - object with property descriptor values which should generated properties have
 */
export function* iterateProperties(object, filter = undefined) {
    //recursively yield all properties of prototypes chain till Object.prototype object
    let prototype = Object.getPrototypeOf(object)
    if (prototype) {
        yield* iterateProperties(prototype, filter)
    }
    
    let properties = Object.getOwnPropertyNames(object)
    let descriptors = Object.getOwnPropertyDescriptors(object)
    for (let objProperty of properties) {
        if (filter) {
            //skip property when some descriptor doesnt match filter
            if (Object.keys(filter).some(filterPropKey => descriptors[objProperty][filterPropKey] != filter[filterPropKey])) {
                continue;
            }
        }
        yield objProperty
    }
}

