import {App} from '../components/App';
import * as actions from '../actions';
import {connect, Dispatch} from 'react-redux';
import {MainState} from '../types';

export function mapStateToProps(store: MainState) {
    return {
        count: store.count
    };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);