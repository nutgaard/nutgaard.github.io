import puppeteer, {Page} from 'puppeteer';
import {fetchRepos, GithubRepo} from '@/resources/github';
import { list, put } from '@vercel/blob';
import * as paths from 'node:path';
import os from "node:os";

const tmpdir = os.tmpdir();
const repos = await fetchRepos();
const pages = repos.filter(it => it.has_pages);
console.log(`Found ${repos.length} repositories, ${pages.length} with pages`);

const browser = await puppeteer.launch({
    headless: true,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
    ]
});
const page = await browser.newPage();

const blobsStorage = await list({ limit: pages.length + 10 });
console.log(`Found ${blobsStorage.blobs.length} blobs, (hasMore: ${blobsStorage.hasMore})`);

const missingImage = blobsStorage.blobs.find(it => it.pathname == '404.svg');
if (!missingImage) {
    await put(`404.svg`, Bun.file('./img-gen/missing.svg').stream(), { access: 'public' });
}

let i = 1;
for (const repo of repos) {
    console.log(`[${(i++).toString().padStart(3, '0')}] Processing ${repo.name}`);
    const filename = `${repo.name}.png`;
    const lastUpdateToRepo = new Date(repo.updated_at);

    const blob = blobsStorage.blobs.find((blob) => {
        return blob.pathname == filename
    });

    if (blob) {
        if (!repo.has_pages) {
            console.log('\tMissing image already uploaded.')
        } else if (blob.uploadedAt < lastUpdateToRepo) {
            console.log(`\tScreenshotting ${repo.name} because of updated repository.`);
            const { filename, filepath } = await screenshot(page, repo);
            console.log(`\tUploading ${filename}.`);
            await put(filename, Bun.file(filepath).stream(), { access: 'public' });
        } else {
            console.log('\tImage of GH-pages already updated.')
        }
    } else {
        if (repo.has_pages) {
            console.log(`\tScreenshotting ${repo.name} because image was missing.`);
            const { filename, filepath } = await screenshot(page, repo);
            console.log(`\tUploading ${filename}.`);
            await put(filename, Bun.file(filepath).stream(), { access: 'public' });
        } else {
            console.log(`\tSkipping, it will use 404.svg.`);
        }
    }
}

await browser.close();

type Screenshot = {
    filename: string;
    filepath: string;
}
async function screenshot(page: Page, repo: GithubRepo): Promise<Screenshot> {
    if (repo.name == 'nutgaard.github.io') {
        await page.goto(`https://www.utgaard.xyz/pages`);
    } else {
        await page.goto(`https://github.utgaard.xyz/${repo.name}`);
    }

    await page.setViewport({width: 1024, height: 1024});

    const filename = `${repo.name}.png`;
    const filepath = paths.join(tmpdir, filename);
    await page.screenshot({
        path: filepath
    });

    return { filename, filepath }
}