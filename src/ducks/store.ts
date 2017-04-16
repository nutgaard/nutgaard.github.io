import { AsyncData } from '../components/async/async';
export namespace Store {

    export type GithubRepo = {
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

    export type Github = AsyncData<GithubRepo[]>

    export type Complete = {
        github: Github
    }
}