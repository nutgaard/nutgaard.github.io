const PADDING = 7;
const LINE_GAP = 31;
const TOKEN_GAP = 12;

const pink = (width: number): Segment => ({ width, color: '#be1254' });
const cyan = (width: number): Segment => ({ width, color: '#4ba2b8' });
const purple = (width: number): Segment => ({ width, color: '#8860c7' });
const green = (width: number): Segment => ({ width, color: '#669919' });
const yellow = (width: number): Segment => ({ width, color: '#c2bb5e' });

type Segment = number | {
    width: number;
    color: string;
}
type Line = Segment[];
const lines: Line[] = [
    [145, 95],
    [63, 120, 78],
    [],
    [pink(106), 77, 118],
    [pink(65), 65, 90],
    [pink(135), cyan(260)],
    [145, 440],
    [],
    [pink(145), purple(95), cyan(142), yellow(240)],
    [pink(63), green(120), yellow(78)],
    [],
    [pink(108), yellow(74), 120],
    [pink(65), cyan(65), 90],
    [pink(135), cyan(390), yellow(600)],
    [145, 260],
    [pink(145), yellow(450)],
    [64, 120, 75],
    [],
    [pink(110), 80, 120],
    [pink(70), green(60), 90],
    [pink(134), cyan(260)],
    [305, 140]
]

function buildRects(): React.ReactNode[] {
    const rects: React.ReactNode[] = [];
    let x = PADDING;
    let y = PADDING;

    for (const line of lines) {
        x = PADDING;
        for (const segment of line) {
            const color = typeof segment === 'number' ? undefined : segment.color;
            const width = typeof segment === 'number' ? segment : segment.width;

            const key = `${x}_${y}`
            rects.push(<Rect key={key} x={x} y={y} width={width} color={color} />)

            x+= width + TOKEN_GAP
        }
        y += LINE_GAP;
    }

    return rects;
}

type RectProps = {
    x: number;
    y: number;
    width: number;
    color?: string;
}
function Rect({
    x,
    y,
    width,
    color = "#595545"
}: RectProps) {
    return (
        <rect x={x} y={y} width={width} height="14" rx="6" fill={color} />
    )
}

const rects = buildRects();
export function MissingCodeSvg() {
    console.log('fn', buildRects.toString());
    return (
        <svg viewBox="0 0 700 700">
            <rect width="700" height="700" fill="#282922"/>
            {rects}
        </svg>
    );
}