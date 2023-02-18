declare global {
    interface Window {
        golUpdate: number;
    }
}

const cellSize = 16; // px
const gridDimension = 200;
const verticalLines = new Array(gridDimension).fill(0).map((_, i) => `<line x1="${i * cellSize}" y1="0" x2="${i * cellSize}" y2="${cellSize * gridDimension}"/>`)
const horizontalLines = new Array(gridDimension).fill(0).map((_, i) => `<line x1="0" y1="${i * cellSize}" x2="${cellSize * gridDimension}" y2="${i * cellSize}"/>`)
let cells = new Array(gridDimension).fill(0)
    .map(() => new Array(gridDimension).fill(0));


const gliderGun = `
00000000000000000000000000000000000000
00000000000000000000000001000000000000
00000000000000000000000101000000000000
00000000000001100000011000000000000110
00000000000010001000011000000000000110
01100000000100000100011000000000000000
01100000000100010110000101000000000000
00000000000100000100000001000000000000
00000000000010001000000000000000000000
00000000000001100000000000000000000000
00000000000000000000000000000000000000
`;

placeAt(cells, 20, 30, gliderGun);
placeAt(cells, 50, 30, gliderGun);
placeAt(cells, 20, 70, gliderGun);
placeAt(cells, 50, 70, gliderGun);

function placeAt(grid: number[][], x: number, y: number, pattern: string) {
    const arrayPattern = pattern.trim()
        .split('\n')
        .map(it => it.split(''));

    for (let i = 0; i < arrayPattern.length; i++) {
        for (let j = 0; j < arrayPattern[i].length; j++) {
            grid[x + i][y + j] = arrayPattern[i][j] === '0' ? 0 : 1;
        }
    }
}
let timeoutRef: number = -1;
function setupRefresh() {
    timeoutRef = window.setInterval(refresh, 200);
}

function updateCells() {
    const neighours = new Array(gridDimension).fill(0).map(() => new Array(gridDimension).fill(0));
    for (let i = 0; i < gridDimension; i++) {
        for (let j = 0; j < gridDimension; j++) {
            if (cells[i][j] === 1) {
                for (let k = -1; k < 2; k++) {
                    for (let l = -1; l < 2; l++) {
                        if (k == 0 && l == 0) continue;
                        neighours[(i + k + gridDimension) % gridDimension][(j + l + gridDimension) % gridDimension]++;
                    }
                }
            }
        }
    }

    for (let i = 0; i < gridDimension; i++) {
        for (let j = 0; j < gridDimension; j++) {
            const n = neighours[i][j];
            const alive = cells[i][j] === 1;
            if (alive && (n === 2 || n === 3)) {
                cells[i][j] = 1;
            } else if (!alive && n === 3) {
                cells[i][j] = 1;
            } else {
                cells[i][j] = 0;
            }
        }
    }
}
function drawCells() {
    const cellsOut = [];
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            if (cells[i][j] === 1) {
                cellsOut.push(`<circle cx="${j * cellSize + (cellSize / 2)}" cy="${i * cellSize +(cellSize / 2)}" r="${4}" fill="black" stroke-width="1" stroke="black"/>`)
            }
        }
    }
    return cellsOut.join('');
}
function refresh() {
    updateCells();
    document.querySelector('.cells').innerHTML = drawCells();
}

function gameOfLife() {
    if (timeoutRef === -1) {
        setupRefresh();
    }

    return `
        <svg viewBox="400 200 1312 960" style="position: absolute;z-index: -1">
            <style>line { stroke: black; }</style>
            <animate attributeName="viewBox" values="400 200 1312 960;600 400 1312 960;400 600 1312 960;200 400 1312 960;400 200 1312 960" dur="60s" repeatCount="indefinite"/>
            ${verticalLines.join('')}
            ${horizontalLines.join('')}
            <g class="cells">${drawCells()}</g>
            <rect x="0" y="0" width="${cellSize * gridDimension}" height="${cellSize * gridDimension}" fill="white" fill-opacity="0.9"/>
        </svg>
    `;
}


export default gameOfLife;