import React, { Component, PropTypes as PT } from 'react';
import classNames from 'classnames';
import './clipper.css';

const cls = (className) => classNames('clipper', className);

class Clipper extends Component {
    constructor(props) {
        super(props);

        this.state = { hover: false, focus: false };

        this.onDomEnter = this.onDomEnter.bind(this);
        this.onDomLeave = this.onDomLeave.bind(this);
    }

    onDomEnter(dom) {
        return () => this.setState({ [dom]: true });
    }

    onDomLeave(dom) {
        return () => this.setState({ [dom]: false });
    }

    render() {
        const { Tag, className, children, hoverClipPath, focusClipPath, clipPath, ...props } = this.props;

        const overlayStyle = {
            clipPath: (() => {
                if (this.state.hover) {
                    return hoverClipPath
                }
                if (this.state.focus) {
                    return focusClipPath;
                }
                return clipPath;
            })()
        };

        return (
            <Tag
                className={cls(className)}
                onMouseEnter={this.onDomEnter('hover')}
                onMouseLeave={this.onDomLeave('hover')}
                onFocus={this.onDomEnter('focus')}
                onBlur={this.onDomLeave('focus')}
                {...props}
            >
                <div className="clipper__element">
                    {children}
                </div>
                <div className="clipper__element clipper__overlay" style={overlayStyle} aria-hidden="true">
                    {children}
                </div>
            </Tag>
        );
    }
}

Clipper.propTypes = {
    Tag: PT.string,
    clipPath: PT.string,
    hoverClipPath: PT.string,
    focusClipPath: PT.string
};
Clipper.defaultProps = {
    Tag: 'h1',
    clipPath: 'polygon(calc(50% - 1rem) 0, calc(50% + 1rem) 0, 50% 20%, 50% 20%)',
    hoverClipPath: 'polygon(10% 0, 90% 0, 57% 100%, 32% 76%)',
    focusClipPath: 'polygon(10% 0, 90% 0, 57% 60%, 32% 36%)'
};

export default Clipper;
