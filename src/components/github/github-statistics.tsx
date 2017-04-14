import * as React from 'react';
import GithubRepoData from './githubrepodata';
import Grid from '../grid/grid';

function maxBy<T>(list: T[], property: string): T {
    return list.reduce(
        (maxElement, element) => maxElement[property] > element[property] ? maxElement : element,
        { [property]: -Infinity } as any // tslint:disable-line
    );
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

export default GithubStatistics;