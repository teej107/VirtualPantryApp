export default class IngredientObject {
    constructor(obj, measurement) {
        this.amount = obj ? obj.amount : 0;
        this.measurement = measurement;
        this.name = obj ? obj.name : "";
        this.key = Math.random();
    }
}