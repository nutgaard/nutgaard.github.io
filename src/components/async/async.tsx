import * as React from 'react';
import { Component, ReactElement } from 'react';
import Loader from './../loader/loader';

export enum AsyncState {
    NOT_STARTED, RELOADING, LOADING, OK, ERROR
}
const asyncStatePrecedence = [
    AsyncState.ERROR,
    AsyncState.LOADING,
    AsyncState.RELOADING,
    AsyncState.NOT_STARTED,
    AsyncState.OK
];
const loaderStates = [
    AsyncState.LOADING,
    AsyncState.RELOADING,
    AsyncState.NOT_STARTED
];

export interface AsyncData<T> {
    status: AsyncState;
    data: T | null;
    error?: Error;
}

export interface AsyncProps {
    dependencies: AsyncData<any>[] | AsyncData<any>; // tslint:disable-line
    renderer: (...data: any[]) => ReactElement<any>; // tslint:disable-line
}

export function getAsyncState(dependencies: AsyncData<any>[]): AsyncState { // tslint:disable-line
    for (const precedence of asyncStatePrecedence) {
        const dep = dependencies.find((dependency) => dependency.status === precedence);
        if (dep) {
            return precedence;
        }
    }
    return AsyncState.NOT_STARTED;
}

function arrayOf<T>(value: T[] | T): T[] {
    return Array.isArray(value) ? value : [value];
}

class Async extends Component<AsyncProps, {}> {
    render() {
        const dependencies = arrayOf(this.props.dependencies);
        const currentState: AsyncState = getAsyncState(dependencies);

        if (loaderStates.indexOf(currentState) >= 0) {
            return <Loader />;
        } else if (currentState === AsyncState.ERROR) {
            return (
              <p aria-live="assertive" role="alert">Something went wrong...</p>
            );
        }

        const data = dependencies.map((dependency) => dependency.data);
        return this.props.renderer(...data);
    }
}

export default Async;
