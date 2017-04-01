import React, { PropTypes as PT } from 'react';
import './loader.css';

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
