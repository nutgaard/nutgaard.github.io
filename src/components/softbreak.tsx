import * as React from 'react';
import { createElement } from 'react';

function addBreaks(text: string, rules: ((a: string) => string)[]) {
    return rules.reduce((nText, rule) => rule(nText), text);
}

export function camelCase(text: string) {
    return text.split(/(?=[A-Z][^A-Z])/g).join('\u00ad');
}

interface SoftbreakProps {
    tag?: string;
    rules?: ((text: string) => string)[];
}

class Softbreak extends React.Component<SoftbreakProps, {}> {
    public static defaultProps: Partial<SoftbreakProps> = {
        tag: 'span',
        rules: [camelCase]
    };

    render() {
        const { tag, rules, ...restProps } = this.props;
        const softBreakedChild = addBreaks(this.props.children as string, rules as ((a: string) => string)[]);
        return (
            createElement(tag, restProps, softBreakedChild)
        );
    }
}

export default Softbreak;
