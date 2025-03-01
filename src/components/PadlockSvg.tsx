const stroke = "#2a2a2a";
const strokeWidth = "3px";
const fill = "#d4ff26";

export function PadlockSvg(props: { className: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className={props.className}>
            <rect
                x="40"
                y="80"
                width="120"
                height="100"
                rx="8"
                ry="8"
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
            />
            <path
                d="M70 81 L70 41 C70 21 130 21 130 41 L130 81 L145 81 145 36 C145 6 55 6 55 36 L55 81 70 81"
                fill={fill}
                stroke={stroke}
                strokeWidth="3px"
                strokeLinecap="round"
            />
        </svg>
    );
}