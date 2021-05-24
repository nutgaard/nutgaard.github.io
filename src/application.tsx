import * as framework from './framework';
import tabs, { TabConfig } from './tabscontroller';
import { fetchRepos, GithubRepo } from './data';
import { withLoader } from './loader';
import githubpages from './githubpages';
import githubrepos from './githubrepos';
import about from './about';

const data: Promise<Array<GithubRepo>> = fetchRepos();
const tabConfig: Array<TabConfig> = [
    { href: '#!pages', description: 'Github pages', content: withLoader(data, githubpages) },
    { href: '#!repos', description: 'Github repos', content: withLoader(data, githubrepos) },
    { href: '#!about', description: 'About', content: about }
];

const validTabConfig = tabConfig.findIndex((tab) => tab.href === window.location.hash) >= 0;
if (!validTabConfig) {
    window.location.hash = tabConfig[0].href;
}

function app() {
    return `
        <div class="application">
            <header class="header dark">
                <h1>Utgaard</h1>
            </header>
            <main class="application__main">
                <div class="tabs">
                    ${tabs(tabConfig)}
                </div>
            </main>
            <footer class="footer dark">
                <h1>Utgaard</h1>
            </footer>
        </div>
    `;
}

framework.start(app, document.getElementById('root'));
