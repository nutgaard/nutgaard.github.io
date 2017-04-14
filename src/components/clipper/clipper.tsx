import * as React from 'react';
import * as classNames from 'classnames';
import './clipper.css';

const cls = (className: string | undefined) => classNames('clipper', className);

interface ClipperProps {
    Tag?: string;
    className?: string;
    hoverClipPath?: string;
    focusClipPath?: string;
    clipPath?: string;
    [propName: string]: any; // tslint:disable-line
}

interface ClipperState {
    hover: boolean;
    focus: boolean;
}

enum ClippeStateUpdate {
    hover, focus
}

class Clipper extends React.Component<ClipperProps, ClipperState> {
    public static defaultProps: Partial<ClipperProps> = {
        Tag: 'h1',
        clipPath: 'polygon(calc(50% - 1rem) 0, calc(50% + 1rem) 0, 50% 20%, 50% 20%)',
        hoverClipPath: 'polygon(10% 0, 90% 0, 57% 100%, 32% 76%)',
        focusClipPath: 'polygon(10% 0, 90% 0, 57% 60%, 32% 36%)',
        className: undefined
    };

    constructor(props: ClipperProps) {
        super(props);

        this.state = { hover: false, focus: false };

        this.onDomEnter = this.onDomEnter.bind(this);
        this.onDomLeave = this.onDomLeave.bind(this);
    }

    onDomEnter(dom: ClippeStateUpdate) {
        const stateProp = ClippeStateUpdate[dom];
        return () => this.setState({ [stateProp]: true } as any); // tslint:disable-line
    }

    onDomLeave(dom: ClippeStateUpdate) {
        const stateProp = ClippeStateUpdate[dom];
        return () => this.setState({ [stateProp]: false } as any); // tslint:disable-line
    }

    render() {
        const { Tag, className, children, hoverClipPath, focusClipPath, clipPath, ...props } = this.props;

        const overlayStyle = {
            clipPath: (() => {
                if (this.state.hover) {
                    return hoverClipPath;
                }
                if (this.state.focus) {
                    return focusClipPath;
                }
                return clipPath;
            })()
        };

        const SafeTag = Tag!;
        return (
            <SafeTag
                className={cls(className)}
                onMouseEnter={this.onDomEnter(ClippeStateUpdate.hover)}
                onMouseLeave={this.onDomLeave(ClippeStateUpdate.hover)}
                onFocus={this.onDomEnter(ClippeStateUpdate.focus)}
                onBlur={this.onDomLeave(ClippeStateUpdate.focus)}
                {...props}
            >
                <div className="clipper__element">{children}</div>
                <div className="clipper__element clipper__overlay" style={overlayStyle} aria-hidden="true">
                    {children}
                </div>
            </SafeTag>
        );
    }
}

export default Clipper;
