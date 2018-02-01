function copyFromObject(array, obj) {
    const newObj = {};
    array.forEach(e => newObj[e] = obj[e]);
    return newObj;
}

function toClassName(truthy, append) {
    return truthy ? truthy + " " + append : append;
}

function toArray(obj) {
    return obj instanceof Array ? obj : [obj];
}

function copyArray(array) {
    return array instanceof Array ? array.slice() : [array];
}

export {copyFromObject, toClassName, copyArray, toArray};