import React, { Component } from 'react';
import PT from 'prop-types';
import classNames from 'classnames';
import './tabs.scss';

const btnCls = (index, activeIndex) => classNames('tabs__tabbutton', {
    'tabs__tabbutton--isactive': index === activeIndex
});

class Tabs extends Component {
    constructor(props) {
        super(props);

        if (props.tabTitles.length < 1 || props.children.length < 1) {
            console.error('Must contain children...');
        }
        if (props.tabTitles.length !== props.children.length) {
            console.error(`Tab: Length mismatch, found ${props.tabTitles.length} titles and ${props.children.length} children`);
        }

        this.state = { index: 0 };
    }

    render() {
        const { tabTitles, children } = this.props;

        const activeSection = children[this.state.index];
        const tabElements = tabTitles.map((title, index) => (
            <button className={btnCls(index, this.state.index)} onClick={() => this.setState({ index })} key={`${title}`}>
                <h2>
                    {title}
                </h2>
            </button>
        ));

        return (
            <div className="tabs">
                {tabElements}
                <div className="tabs__content">
                    {activeSection}
                </div>
            </div>
        );
    }
}

Tabs.propTypes = {
    tabTitles: PT.arrayOf(PT.string).isRequired,
    children: PT.arrayOf(PT.element).isRequired
};

export default Tabs;
