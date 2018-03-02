import store from '../redux/store';
import MeasurementObject from "./recipe/MeasurementObject";
import axios from "axios/index";
import InstructionObject from "./recipe/InstructionObject";
import IngredientObject from "./recipe/IngredientObject";

const CONFIG = {
    baseURL: 'http://localhost:8080/api/',
    transformResponse: [(data) => JSON.parse(data)]
};

const REQUEST = axios.create(CONFIG);

const fetchMeasurements = (callback) => {
    REQUEST.get('measurements')
        .then(response => response.data._embedded.measurements)
        .then(measurements => {
            const measurementTable = measurements.reduce((measurementTable, measurement) => {
                const href = measurement._links.self.href;
                measurementTable[href] = new MeasurementObject(measurement);
                return measurementTable;
            }, {});
            callback(measurementTable);
        });
};

const fetchRecipe = (href, callback) => {
    REQUEST.get(href).then(response => response.data).then(recipe => {

        recipe.ingredients = recipe.ingredients.map(ingredient => {
            return new IngredientObject(ingredient, store.getState().measurement.measurements[ingredient._links.measurement.href]);
        });
        recipe.instructions = recipe.instructions.map((instruction, index) => {
            return new InstructionObject(index, instruction.description, instruction.images);
        });
        callback(recipe);
    });
};

export default {
    fetchMeasurements
};