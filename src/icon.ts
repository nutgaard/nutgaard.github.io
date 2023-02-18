const linecount = 10;
const lineSkip = 100 / linecount;
const exclusionLines = new Array(linecount + 1)
    .fill(0)
    .map((_, i) => `
        <line x1="${i * lineSkip}" y1="5" x2="50" y2="37" stroke="black" stroke-width="4">
            <animate attributeName="stroke-width" values="4;8;3;6;4" dur="20s" repeatCount="indefinite"/>
        </line>
    `)
    .join('\n');

export function icon(): string {
    return `
        <svg class="icon" viewbox="0 0 100 100" aria-hidden="true">
            <mask id="icon__mask">
                <rect x="0" y="0" width="100" height="100" fill="white" />
                ${exclusionLines}
                <polygon points="40,30 60,30 60,70 40,70" fill="black"/>
            </mask>
            <rect x="10" y="10" width="80" height="80" rx="10" ry="10" mask="url(#icon__mask)" />
            <polygon points="10,10 90,10 90,13 60,30 40,30 10,13 10,30" fill="white" mask="url(#icon__mask)">
                <animate attributeName="fill" values="white;rgb(158, 16, 163, 100%);white" dur="10s" repeatCount="indefinite"/>
            </polygon>
        </svg>
    `;
}