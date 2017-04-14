import * as React from 'react';
import { Component, ReactElement } from 'react';
import Loader from './../loader/loader';

export interface AsyncData {
    isLoading: boolean;
}

export interface AsyncProps<T extends AsyncData> {
    dependency: T;
    renderer: (t: T) => ReactElement<any>; // tslint:disable-line
}

class Async<T extends AsyncData> extends Component<AsyncProps<T>, {}> {
    render() {
        if (this.props.dependency.isLoading) {
            return <Loader />;
        }
        return this.props.renderer(this.props.dependency);
    }
}

export default Async;
