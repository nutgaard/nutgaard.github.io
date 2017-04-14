import * as React from 'react';
import './loader.css';

const open = '{';
const close = '}';

class Loader extends React.Component<{}, {}> {
    render() {
        return (
            <div className="loader">
                <span>{open}</span>
                <span>{close}</span>
            </div>
        );
    }
}

export default Loader;
