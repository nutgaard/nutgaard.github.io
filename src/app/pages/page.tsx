import {fetchRepos} from "@/resources/github";
import githubStatistics from "@/utils/github_statistics";
import {GithubStatistics} from "@/components/GithubStatistics";
import {Repositories} from "@/components/Repositories";

export default async function Pages() {
    const repos = await fetchRepos();
    const pages = repos.filter(it => it.has_pages);
    const statistics = githubStatistics(pages);
    return (
        <div>
            <GithubStatistics statistics={statistics} />
            <Repositories repositories={pages} />
        </div>
    );
}
