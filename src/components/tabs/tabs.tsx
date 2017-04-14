import * as React from 'react';
import { Children } from 'react';
import * as classNames from 'classnames';
import './tabs.css';

const btnCls = (index: number, activeIndex: number) => classNames('tabs__tabbutton', {
    'tabs__tabbutton--isactive': index === activeIndex
});

interface TabsProps {
    tabTitles: string[];
}
interface TabsState {
    index: number;
}

class Tabs extends React.Component<TabsProps, TabsState> {
    constructor(props: TabsProps) {
        super(props);

        this.state = { index: 0 };
    }

    render() {
        const { tabTitles, children } = this.props;

        if (tabTitles.length < 1 || Children.count(children) < 1) {
            console.error('Must contain children...'); // tslint:disable-line
        }
        if (tabTitles.length !== Children.count(children)) {
            console.error(`Tab: Length mismatch, found ${tabTitles.length} titles and ${Children.count(children)} children`); // tslint:disable-line
        }

        const activeSection = children![this.state.index];
        const tabElements = tabTitles.map((title, index) => (
            <button className={btnCls(index, this.state.index)} onClick={() => this.setState({ index })}
                    key={`${title}`}>
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

export default Tabs;
