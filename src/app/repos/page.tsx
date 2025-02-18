import 'server-only';

import {fetchRepos, GithubRepo} from "@/resources/github";
import githubStatistics from "@/utils/github_statistics";
import {GithubStatistics} from "@/components/GithubStatistics";
import {LinkDescription, Repositories} from "@/components/Repositories";

export default async function Repos() {
    const repos = await fetchRepos();
    const statistics = githubStatistics(repos);

    return (
        <div>
            <GithubStatistics statistics={statistics} />
            <Repositories repositories={repos} linkGenerator={linkGenerator}/>
        </div>
    );
}

function linkGenerator(repo: GithubRepo): LinkDescription {
    return {
        type: 'a',
        props: {
            href: `https://github.com/nutgaard/${repo.name}`
        }
    }
}