const copyFromObject = (array, obj) => {
    const newObj = {};
    array.forEach(e => newObj[e] = obj[e]);
    return newObj;
};

const toClassName = (truthy, append) => {
    return truthy ? truthy + " " + append : append;
};

const toArray = (obj) => {
    return obj instanceof Array ? obj : [obj];
};

const copyArray = (array) => {
    return array instanceof Array ? array.slice() : [array];
};

export {copyFromObject, toClassName, copyArray, toArray};