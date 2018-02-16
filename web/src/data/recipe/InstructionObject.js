export default class InstructionObject {
    constructor(description, images) {
        this.description = description;
        this.images = images instanceof Array || [];

        Object.defineProperty(this, 'key', {
            value: Math.random()
        })
    }
}