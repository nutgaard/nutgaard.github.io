import {GithubRepo} from "@/resources/github";

function maxBy<T>(list: Array<T>, extract: (arg: T) => number | string): T | null {
    if (list.length === 0) {
        return null;
    }
    const initial : T = list[0];
    return list.reduce(findMax(extract), initial)
}

function findMax<T>(extract: (arg: T) => number | string): (value: T, other: T) => T {
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
type RepoWithValue = {
    repo: GithubRepo;
    count: number
}
export type GithubStatistics = {
    count: number;
    lastUpdated: GithubRepo;
    mostWatched: RepoWithValue;
    mostForked: RepoWithValue;
    mostOpenIssues: RepoWithValue;
    mostStars: RepoWithValue;
};

export default function githubStatistics(repos: Array<GithubRepo>): GithubStatistics {
    const lastUpdated  = maxBy(repos, (repo) => repo.pushed_at) || notFoundRepo;
    const mostWatched  = maxBy(repos, (repo) => repo.watchers_count) || notFoundRepo;
    const mostForked  = maxBy(repos, (repo) => repo.forks_count) || notFoundRepo;
    const mostIssues  = maxBy(repos, (repo) => repo.open_issues_count) || notFoundRepo;
    const mostStars  = maxBy(repos, (repo) => repo.stargazers_count) || notFoundRepo;

    return {
        count: repos.length,
        lastUpdated,
        mostWatched: { repo: mostWatched, count: mostWatched.watchers_count },
        mostForked: { repo: mostForked, count: mostForked.forks_count },
        mostOpenIssues: { repo: mostIssues, count: mostIssues.open_issues_count },
        mostStars: { repo: mostStars, count: mostStars.stargazers_count },
    };
}
