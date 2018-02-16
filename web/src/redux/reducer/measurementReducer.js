const defaultState = () => {
    return {measurements: {}};
};

export const SET_MEASUREMENTS = "SET_MEASUREMENTS";

export default (state = defaultState(), action) => {
    switch (action.type) {
        case SET_MEASUREMENTS:
            return {...state, measurements: action.payload};
    }
    return state;
}

export const setMeasurements = (measurements) => {
    return {
        type: SET_MEASUREMENTS,
        payload: measurements
    };
};