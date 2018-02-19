export default class InstructionObject {
    constructor(index, description, images) {
        if (typeof index !== 'number')
            throw new TypeError("index not a number");

        this.index = index;
        this.description = description;
        this.images = images instanceof Array || [];
        this.key = Math.random();
    }
}