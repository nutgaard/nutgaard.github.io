import 'server-only';

import {fetchRepos, GithubRepo} from "@/resources/github";
import githubStatistics from "@/utils/github_statistics";
import {GithubStatistics} from "@/components/GithubStatistics";
import {LinkDescription, Repositories} from "@/components/Repositories";
import Link from "next/link";

export default async function Pages() {
    const repos = await fetchRepos();
    const pages = repos.filter(it => it.has_pages);
    const statistics = githubStatistics(pages);

    return (
        <div>
            <GithubStatistics statistics={statistics} />
            <Repositories repositories={pages} linkGenerator={linkGenerator} />
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