import React from 'react';
import './loader.scss';

const open = '{';
const close = '}';

function Loader() {
    return (
        <div className="loader">
            <span>{open}</span>
            <span>{close}</span>
        </div>
    );
}

Loader.propTypes = {};

export default Loader;
