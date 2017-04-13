import React, { PropTypes as PT, cloneElement } from 'react';
import classNames from 'classnames';
import matchMedia from './../../utils/match-media';
import './grid.css';

export function getSize() {
    // These sizes must be kept insync with grid.scss mediaqueries
    if (matchMedia("(min-width: 68rem)")) return 'large';
    if (matchMedia("(min-width: 48rem)")) return 'medium';
    return 'small';
}


const cls = (className, small, medium, large) => classNames('grid', className, {
    [`grid--small-${small}`]: true,
    [`grid--medium-${medium}`]: true,
    [`grid--large-${large}`]: true
});

function Grid({ className, small, medium, large, padToMatch, children }){
    const childLength = Array.isArray(children) ? children.length : 1;
    const sizes = { small, medium, large };
    const columns = Number(sizes[getSize()]);

    let padSize = 0;
    if (padToMatch) {
        padSize = ((Math.floor(childLength / columns) + 1) * columns) - childLength;
    }
    const padElements = new Array(padSize).fill(0).map((_, i) => cloneElement(padToMatch, { key: i }));

    return (
        <div className={cls(className, small, medium, large)}>
            {children}
            {padElements}
        </div>
    );
}

Grid.propTypes = {
    className: PT.string,
    small: PT.oneOfType([PT.string, PT.number]),
    medium: PT.oneOfType([PT.string, PT.number]),
    large: PT.oneOfType([PT.string, PT.number]),
    children: PT.arrayOf(PT.node).isRequired,
    padToMatch: PT.element
};

Grid.defaultProps = {
    className: undefined,
    small: 1,
    medium: 2,
    large: 4,
    padToMatch: <div></div>
};

export default Grid;
