function copyFromObject(array, obj) {
    const newObj = {};
    array.forEach(e => newObj[e] = obj[e]);
    return newObj;
}

export {copyFromObject};