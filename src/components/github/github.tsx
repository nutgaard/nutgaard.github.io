import * as React from 'react';
import Grid from './../grid/grid';
import Async, { AsyncData } from './../async/async';
import Softbreak from './../softbreak';
import './github.css';

function maxBy<T>(list: T[], property: string): T {
    return list.reduce(
        (maxElement, element) => maxElement[property] > element[property] ? maxElement : element,
        { [property]: -Infinity } as any // tslint:disable-line
    );
}

interface GithubRepoData {
    has_pages: boolean;
    name: string;
    description: string;
    watchers_count: number;
    fork: boolean;
    forks_count: number;
    open_issues_count: number;
    stargazers_count: number;
    pushed_at: string;
}

class GithubRepo extends React.Component<{ repo: GithubRepoData }, {}> {
    render() {
        const { repo } = this.props;
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
                <Softbreak tag="h3">{repo.name}</Softbreak>
                <p>{repo.description}</p>
            </div>
        );
    }
}

class GithubStatistics extends React.Component<{ repos: GithubRepoData[] }, {}> {
    render() {
        const { repos } = this.props;

        const NOFrepos = repos.length;

        const lastUpdated = repos[0] ? repos[0].name : 'Unknown';
        const mostWatchers = maxBy(repos, 'watchers_count');
        const mostForks = maxBy(repos.filter((repo) => !repo.fork), 'forks_count');
        const mostIssues = maxBy(repos, 'open_issues_count');
        const mostStars = maxBy(repos, 'stargazers_count');

        return (
            <Grid className="github__statistics" large="3">
                <p><b>Number of repositories: </b>{NOFrepos}</p>
                <p><b>Latest update: </b>{lastUpdated}</p>
                <p><b>Most watchers: </b>{mostWatchers.name} ({mostWatchers.watchers_count})</p>
                <p><b>Most forked: </b>{mostForks.name} ({mostForks.forks_count})</p>
                <p><b>Most open issues: </b>{mostIssues.name} ({mostIssues.open_issues_count})</p>
                <p><b>Most stars: </b>{mostStars.name} ({mostStars.stargazers_count})</p>
            </Grid>
        );
    }
}

interface GithubData extends AsyncData {
    data: GithubRepoData[];
}

const GithubAsync = Async as new() => Async<GithubData>;

class Github extends React.Component<{}, GithubData> {
    constructor(props: {}) {
        super(props);

        this.state = {
            isLoading: true,
            data: undefined
        };
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
            .then((data) => this.setState({ isLoading: false, data }));
    }

    render() {

        return (
            <GithubAsync dependency={this.state as GithubData}>
                {() => {
                    const repos = this.state.data
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
                }}
            </GithubAsync>
        );
    }
}

export default Github;
