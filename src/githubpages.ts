import { GithubRepo } from './data';
import statistics from './statistics';

function pagelink(repo: GithubRepo) {
    return `
        <a class="github__repo github__repo--haspages" href="//www.utgaard.xyz/${repo.name}/">
            <h3>${repo.name}</h3>
            <p>${repo.description || ''}</p>
        </a>
    `;
}

export default function githubpages(repos: Array<GithubRepo>) {
    const reposWithPages = repos.filter(({ has_pages }) => has_pages);

    const minRows = Math.ceil(reposWithPages.length / 3)
    const padSize = (minRows * 3) - reposWithPages.length;
    const padding = new Array(padSize)
        .fill(0)
        .map(() => `<div class="github__emptyrepo"></div>`);

    const pagelinks = reposWithPages
        .map(pagelink)
        .concat(padding)
        .join('\n');

    return `
        <div class="github">
            ${statistics(reposWithPages)}
            <div class="grid grid--small-1 grid--medium-2 grid--large-3">
                ${pagelinks}        
            </div>
        </div>
    `;
}
