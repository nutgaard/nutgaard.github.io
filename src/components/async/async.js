import React, { PropTypes as PT } from 'react';
import Loader from './../loader/loader';

function Async({ dependency, children }){
    if (dependency.isLoading) {
        return <Loader />
    }
    return children();
}

Async.propTypes = {};

export default Async;
