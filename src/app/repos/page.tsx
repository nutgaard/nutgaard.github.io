import 'server-only';

import {fetchRepos, GithubRepo} from "@/resources/github";
import githubStatistics from "@/utils/github_statistics";
import {GithubStatistics} from "@/components/GithubStatistics";
import {LinkDescription, Repositories} from "@/components/Repositories";
import {list} from "@vercel/blob";

export default async function Repos() {
    const repos = await fetchRepos();
    const statistics = githubStatistics(repos);
    const blobsResponse = await list({ limit: repos.length + 20 });
    const imageMap = blobsResponse.blobs.reduce((acc, blob) => {
        acc[blob.pathname] = blob.url;
        return acc;
    }, {} as Record<string, string>);

    return (
        <div>
            <GithubStatistics statistics={statistics} />
            <Repositories
                repositories={repos}
                linkGenerator={linkGenerator}
                imageMap={imageMap}
            />
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