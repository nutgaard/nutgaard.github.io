export interface GithubRepo {
    name: string;
    has_pages: boolean;
    description?: string;
    watchers_count: number;
    fork: boolean;
    forks_count: number;
    open_issues_count: number;
    stargazers_count: number;
    pushed_at: string;
    updated_at: string;
}

async function fetchTo<T>(url: string): Promise<T> {
    return fetch(url)
        .then((resp) => resp.json());
}

const url = (page: number) => `https://api.github.com/users/nutgaard/repos?per_page=100&page=${page}`;
export async function fetchRepos(): Promise<Array<GithubRepo>> {
    let page = 1;
    let repos : Array<GithubRepo> = [];
    let shouldContinue = true;
    try {
        do {
            const lastRequest = await fetchTo<Array<GithubRepo>>(url(page));
            repos = repos.concat(lastRequest);
            page++;
            shouldContinue = lastRequest.length === 100;
        } while (shouldContinue);

        return Promise.resolve(sort(repos));
    } catch (e) {
        return Promise.reject(e)
    }
}

export async function fetchReposLocal(): Promise<Array<GithubRepo>> {
    return new Promise((resolve, reject) => {
        reject(new Error('Failed to fetch data...'));
        //setTimeout(() => resolve(sort(data)), 400);
    });
}

function sort(list: Array<GithubRepo>): Array<GithubRepo> {
    return list
        .sort((a, b) => {
            const aPage = a.has_pages;
            const bPage = b.has_pages;

            if (aPage == bPage) {
                return -1 * a.pushed_at.localeCompare(b.pushed_at);
            }  else if (aPage) {
                return -1;
            } else {
                return 1;
            }

            return 0;
        });
}
