import {EnthusiasmAction} from '@src/actions';
import {MainState} from '@src/types';
import {
    INCREMENT_ENTHUSIASM,
    DECREMENT_ENTHUSIASM,
} from '@src/constants';

const initState: MainState = {
    count: 2
};

export function mainReducers(state: MainState = initState, action: EnthusiasmAction): MainState {
    switch (action.type) {
        case INCREMENT_ENTHUSIASM:
            console.log(state);
            return {...state, count: state.count + 1};
        case DECREMENT_ENTHUSIASM:
            return {...state, count: Math.max(1, state.count - 1)};
        default:
            return state;
    }
}
