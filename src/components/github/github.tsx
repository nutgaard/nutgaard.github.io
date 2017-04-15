import * as React from 'react';
import Grid from './../grid/grid';
import Async, { AsyncData, AsyncState } from './../async/async';
import GithubRepoData from './githubrepodata';
import './github.css';
import GithubRepo from './github-repo';
import GithubStatistics from './github-statistics';

class Github extends React.Component<{}, AsyncData<GithubRepoData[]>> {
    constructor(props: {}) {
        super(props);

        this.state = {
            isLoading: AsyncState.NOT_STARTED,
            data: null
        };

        this.renderer = this.renderer.bind(this);
    }

    componentDidMount() {
        // Fixture for development...
        // const data = require('./../../fixtures/github_repos.json');
        // this.setState({ isLoading: false, data });
        // setTimeout(() => {
        // }, 1000);

        // Real integration
        fetch('https://api.github.com/users/nutgaard/repos?per_page=100')
            .then((resp) => resp.json())
            .then((data) => this.setState({ isLoading: AsyncState.OK, data }));
    }

    renderer() {
        const repos = this.state.data!
            .map((repo) => ({ repo, date: new Date(repo.pushed_at) }))
            .sort((a, b) => {
                if (a.repo.has_pages && b.repo.has_pages) {
                    return (new Date(a.date) > new Date(b.date) ? -1 : 1);
                } else if (a.repo.has_pages) {
                    return -1;
                } else if (b.repo.has_pages) {
                    return 1;
                }
                return new Date(a.date) > new Date(b.date) ? -1 : 1;
            })
            .map(({ repo }) => repo);

        const repoElements = repos
            .map((repo) => <GithubRepo key={repo.name} repo={repo}/>);

        return (
            <div className="github">
                <GithubStatistics repos={repos}/>
                <Grid className="github__repos" large="3" padToMatch={<div className="github__emptyrepo"/>}>
                    {repoElements}
                </Grid>
            </div>
        );
    }

    render() {
        return (
            <Async dependencies={[this.state]} renderer={this.renderer} />
        );
    }
}

export default Github;
