import React, { Component, PropTypes as PT } from 'react';
import Async from './../async/async';
import './github.css';

function GithubRepo({ repo }) {
    if (repo.has_pages) {
        const url = `http://www.utgaard.xyz/${repo.name}`;
        return (
            <a href={url} className="github__repo github__repo--haspages">
                <h3>{repo.name}</h3>
                <p>{repo.description}</p>
            </a>
        );
    }
    return (
        <div className="github__repo">
            <h3>{repo.name}</h3>
            <p>{repo.description}</p>
        </div>
    );
}

class Github extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: undefined
        };
    }

    componentDidMount() {
        fetch("https://api.github.com/users/nutgaard/repos?per_page=100")
            .then((resp) => resp.json())
            .then((data) => this.setState({ isLoading: false, data }));
    }

    render() {
        return (
            <Async dependency={this.state}>
                {() => {
                    const repos = this.state.data
                        .map((repo) => ({ repo, date: new Date(repo.pushed_at)}))
                        .filter(({date}) => date.getFullYear() >= 2016)
                        .sort((a, b) => {
                            if (a.repo.has_pages && b.repo.has_pages) {
                                return (new Date(a.date) > new Date(b.date) ? -1 : 1);
                            } else if (a.repo.has_pages) {
                                return -1;
                            } else if (b.repo.has_pages) {
                                return 1;
                            }
                            return new Date(a.date) > new Date(b.date) ? -1 : 1;
                        })
                        .map(({repo}) => <GithubRepo key={repo.name} repo={repo} />);

                    return (
                        <div className="github">
                            {repos}
                        </div>
                    );
                }}
            </Async>
        );
    }
}

Github.propTypes = {};

export default Github;
