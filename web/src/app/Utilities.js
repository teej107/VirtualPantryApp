function copyFromObject(array, obj) {
    const newObj = {};
    array.forEach(e => newObj[e] = obj[e]);
    return newObj;
}

function str(truthy, append = "") {
    return truthy ? truthy + " " + append : append;
}

export {copyFromObject, str};