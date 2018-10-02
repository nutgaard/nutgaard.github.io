import { createElement } from 'react';
import PT from 'prop-types';

function addBreaks(text, rules) {
    return rules.reduce((nText, rule) => rule(nText), text);
}

export function camelCase(text) {
    return text.split(/(?=[A-Z][^A-Z])/g).join('\u00ad');
}

function Softbreak({ tag, rules, children, ...props }){
    const softBreakedChild = addBreaks(children, rules);
    return (
        createElement(tag, props, softBreakedChild)
    );
}

Softbreak.propTypes = {
    tag: PT.string,
    rules: PT.arrayOf(PT.func),
    children: PT.string.isRequired
};

Softbreak.defaultProps = {
    tag: 'span',
    rules: [camelCase]
};

export default Softbreak;
