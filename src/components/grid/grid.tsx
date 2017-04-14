import * as React from 'react';
import { cloneElement, ReactElement } from 'react';
import * as classNames from 'classnames';
import matchMedia from './../../utils/match-media';
import './grid.css';

export function getSize() {
    // These sizes must be kept insync with grid.scss mediaqueries
    if (matchMedia('(min-width: 68rem)')) {
        return 'large';
    }
    if (matchMedia('(min-width: 48rem)')) {
        return 'medium';
    }
    return 'small';
}

const cls = (className: string, small: string, medium: string, large: string) => classNames('grid', className, {
    [`grid--small-${small}`]: true,
    [`grid--medium-${medium}`]: true,
    [`grid--large-${large}`]: true
});

interface GridProps {
    className?: string;
    small?: string;
    medium?: string;
    large?: string;
    padToMatch?: ReactElement<any> // tslint:disable-line
}

class Grid extends React.Component<GridProps, {}> {
    public static defaultProps: Partial<GridProps> = {
        className: '',
        small: '1',
        medium: '2',
        large: '4',
        padToMatch: <div />
    };

    render() {
        const { className, small, medium, large, padToMatch, children } = this.props;
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
}

export default Grid;
