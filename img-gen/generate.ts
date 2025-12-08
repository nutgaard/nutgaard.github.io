import puppeteer, {Browser, Page} from 'puppeteer';
import {del, list, put} from '@vercel/blob';
import {fetchRepos} from '@/resources/github';
import {addSummaryToOutput, analyze, needsBrowser, screenshot, SummaryAction} from "./processes";

let browser: Browser | undefined = undefined;
let page: Page;

const repositories = await fetchRepos();
const pages = repositories.filter(it => it.has_pages);
console.log(`Found ${repositories.length} repositories, ${pages.length} with pages`);

const blobsStorage = await list({ limit: pages.length + 10 });
console.log(`Found ${blobsStorage.blobs.length} blobs, (hasMore: ${blobsStorage.hasMore})`);

const actionsToTake = analyze(repositories, blobsStorage.blobs);
const startBrowser = actionsToTake.some(needsBrowser);
if (startBrowser) {
    console.log('Starting browser...');
    browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ]
    });
    page = await browser.newPage();
}

let i = 1;
const summary: SummaryAction[] = [];

const missingImage = blobsStorage.blobs.find(it => it.pathname == '404.svg');
if (!missingImage) {
    summary.push({ name: '404.svg', action: 'CREATE' });
    await put(`404.svg`, Bun.file('./img-gen/missing.svg').stream(), { access: 'public' });
}

for (const actionToTake of actionsToTake) {
    const { repository, action } = actionToTake;
    console.log(`[${(i++).toString().padStart(3, '0')}] Processing ${repository.name}`);
    summary.push({ name: repository.name, action });

    if (action == 'DELETE') {
        console.log(`\tDeleting old image ${actionToTake.blob.url}`);
        await del(actionToTake.blob.url);
    } else if (action == 'CREATE') {
        console.log(`\tScreenshotting ${repository.name} because image was missing.`);
        // eslint-disable-next-line @typescript-eslint/no-extra-non-null-assertion
        const { filename, filepath } = await screenshot(page!!, repository);
        console.log(`\tUploading ${filename}.`);
        await put(filename, Bun.file(filepath).stream(), { access: 'public' });
    } else if (action == 'UPDATE') {
        console.log(`\tScreenshotting ${repository.name} because of updated repository.`);
        // eslint-disable-next-line @typescript-eslint/no-extra-non-null-assertion
        const { filename, filepath } = await screenshot(page!!, repository);
        console.log(`\tUploading ${filename}.`);
        await put(filename, Bun.file(filepath).stream(), { access: 'public' });
        console.log(`\tDeleting old image ${actionToTake.blob.url}`);
        await del(actionToTake.blob.url)
    } else {
        console.log(`\tSkipping ${repository.name}. ${actionToTake.ignoreReason}`);
    }
}

if (browser) {
    await browser.close();
}

await addSummaryToOutput(summary);