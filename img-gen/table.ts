export type Table = {
    headers: string[]
    rows: Array<Row>
}
type Row = string[];

export function compactTable(table: Table, maxColCount: number = 3): Table {
    const { rows, columns } = findOptimalSize(table.rows.length, maxColCount);
    const headers = repeat(table.headers, columns);
    const chunks = chunk(table.rows, rows);
    const nofChunks = chunks.length;
    const chunksizes = Math.max(...chunks.map(it => it.length));
    const defaultValue = table.headers.map(() => "");

    const tableRows: Row[] = [];
    for (let i = 0; i < chunksizes; i++) {
        let row: Row = [];
        for (let chunkIdx = 0; chunkIdx < nofChunks; chunkIdx++) {
            const chunk = chunks[chunkIdx];
            if (i >= chunk.length) {
                row.push(...defaultValue);
            } else {
                const value = chunk[i];
                row.push(...value);
            }
        }
        tableRows.push(row)
    }

    return { headers, rows: tableRows };
}

function findOptimalSize(elements: number, maxCols: number = 1): { rows: number; columns: number; } {
    const maxSquare = maxCols * maxCols;
    if (elements >= maxSquare) {
        return { columns: maxCols, rows: Math.ceil(elements / maxCols) }
    }
    for (let cols = 1; cols < maxCols; cols++) {
        const area = cols * cols;
        if (area >= elements) return { rows: cols, columns: cols };
    }

    throw new Error('could not find suitable square for elements');
}

function repeat<T>(arr: Array<T>, count: number): Array<T> {
    const size = arr.length;
    return new Array(size * count).fill(0).map((_, i) => arr[i % size]);
}

function chunk<T>(arr: Array<T>, chunkSize: number): Array<Array<T>> {
    const nofChunks = Math.ceil(arr.length / chunkSize);
    const chunks: T[][] = new Array(nofChunks).fill(0).map(() => []);

    for (let i = 0; i < arr.length; i++) {
        const chunkIdx = i % nofChunks;
        chunks[chunkIdx].push(arr[i]);
    }

    return chunks;
}

export function asString(table: Table, padding: string = ' ', separator: string = '|'): string {
    const output: string[] = [];
    const columns = table.headers.length;
    const columnWidths = table.headers.map((_, columnIdx) => {
        const header = table.headers[columnIdx].length;
        const values = table.rows.map(it => it [columnIdx].length);
        return Math.max(header, ...values);
    });
    const columnWidthSum = columnWidths.reduce((a, b) => a + b, 0);

    // | text | text |
    // sep + padding + width1 + padding + sep + padding + width2 + padding + sep
    // 3*sep + 4*padding + width1 + width2
    // (col + 1)*sep + (col * 2)*padding + width1 + width2
    const totalWidth = (columns + 1)*separator.length + (columns*2)*padding.length + columnWidthSum;
    const lineseparator = '-'.repeat(totalWidth);

    function formatRow(values: string[]) {
        let str = `${separator}${padding}`;
        str += values
            .map((value, i) => value.padEnd(columnWidths[i], ' '))
            .join(`${padding}${separator}${padding}`);
        str += `${padding}${separator}`;
        return str;
    }

    output.push(formatRow(table.headers));
    output.push(lineseparator);

    for (const row of table.rows) {
        output.push(formatRow(row));
    }

    return output.join('\n');
}
