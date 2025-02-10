import {fetchRepos} from "@/resources/github";
import githubStatistics from "@/utils/github_statistics";
import {GithubStatistics} from "@/components/GithubStatistics";
import {Repositories} from "@/components/Repositories";

export default async function Repos() {
    const repos = await fetchRepos();
    const statistics = githubStatistics(repos);

    return (
        <div>
            <GithubStatistics statistics={statistics} />
            <Repositories repositories={repos} />
        </div>
    );
}
