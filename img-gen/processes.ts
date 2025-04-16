import * as core from '@actions/core';
import {GithubRepo} from "@/resources/github";
import {ListBlobResultBlob} from "@vercel/blob";
import {Page} from "puppeteer";
import paths from "node:path";
import os from "node:os";
import {compactTable, Table} from "./table";

export type Action = IgnoreAction | DeleteAction | UpdateAction | CreateAction;
export type ActionType = Action['action'];
type IgnoreAction = {
    action: 'IGNORE';
    repository: GithubRepo;
    ignoreReason: string;
}
type DeleteAction = {
    repository: GithubRepo;
    action: 'DELETE';
    blob: ListBlobResultBlob;
}
type UpdateAction = {
    repository: GithubRepo;
    action: 'UPDATE';
    blob: ListBlobResultBlob;
}
type CreateAction = {
    repository: GithubRepo;
    action: 'CREATE';
}
export function needsBrowser({action}: Action): boolean {
    return action == 'UPDATE' || action == 'CREATE';
}


export function analyze(
    repositories: GithubRepo[],
    blobs: ListBlobResultBlob[]
): Action[] {
    const actions: Action[] = [];
    const blobLookup = blobs.reduce((acc, blob) => {
        acc[blob.pathname] = blob;
        return acc;
    }, {} as Record<string, ListBlobResultBlob>);

    for (const repository of repositories) {
        const expectedFilename = `${repository.name}.png`;
        const blob = blobLookup[expectedFilename];
        let action: ActionType;

        if (!blob) {
            action = repository.has_pages ? 'CREATE' : 'IGNORE'
            actions.push({ repository, action, ignoreReason: 'It will use 404.svg' });
        } else if (!repository.has_pages) {
            action = 'DELETE'
            actions.push({ repository, blob, action });
        } else {
            action = blob.uploadedAt < new Date(repository.updated_at) ? 'UPDATE' : 'IGNORE'
            actions.push({ repository, blob, action, ignoreReason: 'Already up to to date.' });
        }
    }

    return actions;
}

export type SummaryAction = { name: string; action: ActionType };
export async function addSummaryToOutput(actions: SummaryAction[]) {
    const actionCount = actions.reduce((acc, action) => {
        const count = acc[action.action] ?? 0;
        acc[action.action] = count + 1;
        return acc;
    }, {} as Record<ActionType, number>);

    core.summary.addHeading('Summary');
    core.summary.addTable([
        [header('Action'), header('Count')],
        ...Object.entries(mapValues(actionCount, it => it.toString()))
    ]);

    core.summary.addBreak();
    core.summary.addHeading('Actions taken');

    const actionsTable: Table = compactTable({
        headers: ['Repository', 'Action'],
        rows: actions.map((it) => [it.name, it.action])
    });

    core.summary.addTable([
        actionsTable.headers.map(it => ({ data: it, header: true })),
        ...actionsTable.rows
    ]);

    await core.summary.write();
}

const header = (data: string) => ({ data, header: true })
const mapValues = <S extends string, T, V>(record: Record<S, T>, fn: (value: T) => V): Record<S, V> => {
    return Object.fromEntries(
        Object.entries(record).map(([key, value]) => [key, fn(value as T)])
    ) as Record<S, V>;
}

export type Screenshot = {
    filename: string;
    filepath: string;
}

const tmpdir = os.tmpdir();
export async function screenshot(page: Page, repo: GithubRepo): Promise<Screenshot> {
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