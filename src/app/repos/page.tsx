import {fetchRepos} from "@/resources/github";
import githubStatistics from "@/utils/github_statistics";

export default async function Repos() {
    const repos = await fetchRepos();
    const statistics = githubStatistics(repos);

    return (
        <div>
            <p>Found {repos.length} repos</p>

            <pre>{JSON.stringify(statistics, null, 2)}</pre>
        </div>
    );
}
