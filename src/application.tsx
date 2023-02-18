import * as framework from './framework';
import tabs, { TabConfig } from './tabscontroller';
import { fetchRepos, GithubRepo } from './data';
import { withLoader } from './loader';
import githubpages from './githubpages';
import githubrepos from './githubrepos';
import about from './about';
import {icon} from "./icon";
import gameOfLife from "./game-of-life";

if (process.env.DEV) {
    console.log("Is dev mode...")
    require('./mock');
}

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
    const [tabLinks, tabContent] = tabs(tabConfig);
    return `
        ${gameOfLife()}
        <h1 style="color: #0C0E14">Utgaard</h1>
    `;
    // return `
    //     <div class="application">
    //         <header class="header">
    //             ${icon()}
    //             <h1>
    //                 <span class="sr-only">U</span>
    //                 <span>tgaard</span>
    //             </h1>
    //         </header>
    //         ${tabLinks}
    //         ${tabContent}
    //     </div>
    // `;
}

framework.start(app, document.getElementById('root'));
