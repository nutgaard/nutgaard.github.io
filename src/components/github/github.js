import React, { Component, PropTypes as PT } from 'react';
import Async from './../async/async';
import './github.css';

class Github extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: undefined
        };
    }

    componentDidMount() {
        fetch("https://api.github.com/users/nutgaard/repos")
            .then((resp) => resp.json())
            .then((data) => this.setState({ isLoading: false, data }));
    }

    render() {
        return (
            <Async dependency={this.state}>
                {() => (
                    <div className="github">
                        <h1>Here it is</h1>
                        <pre>
                            This is were I would but the github statistics...
                        </pre>
                    </div>
                )}
            </Async>
        );
    }
}

Github.propTypes = {};

export default Github;
