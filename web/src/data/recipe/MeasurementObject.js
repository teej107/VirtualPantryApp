const descriptor = (value) => {
    return {
        enumerable: true,
        value
    };
};

export default class MeasurementObject {
    constructor(obj) {
        Object.defineProperties(this, {
            name: descriptor(obj.name),
            abbreviation: descriptor(obj.abbreviation),
            conversionRatio: descriptor(obj.conversionRatio)
        });
    }
}