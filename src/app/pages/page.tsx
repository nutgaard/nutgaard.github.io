import {fetchRepos} from "@/resources/github";
import githubStatistics from "@/utils/github_statistics";

export default async function Pages() {
    const repos = await fetchRepos();
    const pages = repos.filter(it => it.has_pages);
    const statistics = githubStatistics(pages);
    return (
        <div>
            <p>Found {pages.length} repos with pages</p>

            <pre>{JSON.stringify(statistics, null, 2)}</pre>
        </div>
    );
}
