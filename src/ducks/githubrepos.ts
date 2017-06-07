import { ThunkAction } from 'redux-thunk';
import { AsyncState } from '../components/async/async';
import { Store } from './store';
import { Domain } from '../domain';

export type Action = {
    type: 'START',
} | {
    type: 'OK',
    payload: Domain.GithubRepo[]
} | {
    type: 'FAILED',
    error: Error
};

const initalState: Store.Github = {
    status: AsyncState.NOT_STARTED,
    data: null
};

export default function reducer(state: Store.Github = initalState, action: Action): Store.Github {
    switch (action.type) {
        case 'START':
            return { ...state, status: AsyncState.LOADING };
        case 'OK':
            return { ...state, status: AsyncState.OK, data: action.payload };
        case 'FAILED':
            return { ...state, status: AsyncState.ERROR, error: action.error };
        default:
            const _exhaustiveCheck: never = action;
            return _exhaustiveCheck;
    }
}

export function fetchRepos(): ThunkAction<void, Store.Complete, void> {
    return (dispatch, getState) => {
        const state = getState();
        if (state.github.status === AsyncState.OK) {
            return;
        }

        dispatch({ type: 'START' });
        return fetch('https://api.github.com/users/nutgaard/repos?per_page=100')
            .then((resp) => resp.json())
            .then(
                (json) => dispatch({ type: 'OK', payload: json }),
                (err) => dispatch({ type: 'FAILED', error: err })
            );
    };
}
