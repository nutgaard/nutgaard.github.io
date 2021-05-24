import { GithubRepo } from './data';
import statistics from './statistics';

function repolink(repo: GithubRepo) {
    return `
        <a class="github__repo github__repo--haspages" href="//www.github.com/nutgaard/${repo.name}/">
            <h3>${repo.name}</h3>
            <p>${repo.description || ''}</p>
        </a>
    `;
}

export default function githubrepos(repos: Array<GithubRepo>) {
    const minRows = Math.ceil(repos.length / 3)
    const padSize = (minRows * 3) - repos.length;
    const padding = new Array(padSize)
        .fill(0)
        .map(() => `<div class="github__emptyrepo"></div>`);

    const repolinks = repos
        .map(repolink)
        .concat(padding)
        .join('\n');

    return `
        <div class="github">
            ${statistics(repos)}
            <div class="grid grid--small-1 grid--medium-2 grid--large-3">
                ${repolinks}        
            </div>
        </div>
    `;
}
