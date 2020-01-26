import { GithubRepo } from './data';

function maxBy<T>(list: Array<T>, extract: (T) => number | string): T | null {
    if (list.length === 0) {
        return null;
    }
    const initial : T = list[0];
    return list.reduce(findMax(extract), initial)
}

function findMax<T>(extract: (T) => number | string): (value: T, other: T) => T {
    return (value: T, other : T) => {
        const exValue : number | string = extract(value);
        const exOther : number | string = extract(other);
        if (typeof exValue === 'string' && typeof exOther === 'string') {
            return exValue.localeCompare(exOther) >= 0 ? value : other;
        } else {
            return exValue > exOther ? value : other
        }
    }
}

const notFoundRepo : GithubRepo = {
    name: 'Not found',
    has_pages: false,
    watchers_count: 0,
    fork: false,
    forks_count: 0,
    open_issues_count: 0,
    stargazers_count: 0,
    pushed_at: '',
    updated_at: '',
};

export default function statistics(repos: Array<GithubRepo>) {
    const lastupdated  = maxBy(repos, (repo) => repo.pushed_at) || notFoundRepo;
    const mostWatched  = maxBy(repos, (repo) => repo.watchers_count) || notFoundRepo;
    const mostForked  = maxBy(repos, (repo) => repo.forks_count) || notFoundRepo;
    const mostIssues  = maxBy(repos, (repo) => repo.open_issues_count) || notFoundRepo;
    const mostStars  = maxBy(repos, (repo) => repo.stargazers_count) || notFoundRepo;
    return `
    <div class="grid github__statistics grid--small-1 grid--medium-2 grid--large-3">
        <p><b>Number of repositories: </b>${repos.length}</p>
        <p><b>Latest update: </b>${lastupdated.name}</p>
        <p><b>Most watchers: </b>${mostWatched.name} (${mostWatched.watchers_count})</p>
        <p><b>Most forked: </b>${mostForked.name} (${mostForked.forks_count})</p>
        <p><b>Most open issues: </b>${mostIssues.name} (${mostIssues.open_issues_count})</p>
        <p><b>Most stars: </b>${mostStars.name} (${mostStars.stargazers_count})</p>
    </div>
    `
}
