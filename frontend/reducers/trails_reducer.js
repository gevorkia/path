import { RECEIVE_TRAIL } from "../actions/trail_actions";

const trailReducer = (state= {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_TRAIL:
            // debugger
            nextState[action.trail.id] = action.trail
            return nextState;
        default:
            return state;
    }
}

export default trailReducer;