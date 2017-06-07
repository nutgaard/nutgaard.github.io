export namespace Domain {
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
}