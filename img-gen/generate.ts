import 'server-only';

import puppeteer, {Page} from 'puppeteer';
import {fetchRepos, GithubRepo} from '@/resources/github';

const repos = await fetchRepos();
const pages = repos.filter(it => it.has_pages);
console.log(`Found ${repos.length} repositories, ${pages.length} with pages`);

if (1 == 1) process.exit(0);

const browser = await puppeteer.launch();
const page = await browser.newPage();

for (const ghPage of pages) {
    console.log(`Screenshooting ${ghPage.name}`);
    await screenshot(page, ghPage);
}

await browser.close();


async function screenshot(page: Page, repo: GithubRepo) {
    if (repo.name == 'nutgaard.github.io') {
        await page.goto(`https://www.utgaard.xyz/pages`);
    } else {
        await page.goto(`https://github.utgaard.xyz/${repo.name}`);
    }

    await page.setViewport({width: 1024, height: 1024});

    await page.screenshot({
        path: `./public/repo-img/${repo.name}.png`
    });
}