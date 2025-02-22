import 'server-only';

import {fetchRepos, GithubRepo} from "@/resources/github";
import githubStatistics from "@/utils/github_statistics";
import {GithubStatistics} from "@/components/GithubStatistics";
import {LinkDescription, Repositories} from "@/components/Repositories";
import Link from "next/link";
import {list, ListBlobResultBlob} from '@vercel/blob';

export default async function Pages() {
    const repos = await fetchRepos();
    const pages = repos.filter(it => it.has_pages);
    const statistics = githubStatistics(pages);
    const blobsResponse = await list({ limit: repos.length + 20 });
    const imageMap = blobsResponse.blobs.reduce((acc, blob) => {
        acc[blob.pathname] = blob.url;
        return acc;
    }, {} as Record<string, string>);

    return (
        <div>
            <GithubStatistics statistics={statistics} />
            <Repositories
                repositories={pages}
                linkGenerator={linkGenerator}
                imageMap={imageMap}
            />
        </div>
    );
}

function linkGenerator(repo: GithubRepo): LinkDescription {
    if (repo.name == 'nutgaard.github.io') {
        return {
            type: Link,
            props: {
                href: '/pages'
            }
        };
    } else {
        return {
            type: 'a',
            props: {
                href: `//github.utgaard.xyz/${repo.name}`
            }
        }
    }
}