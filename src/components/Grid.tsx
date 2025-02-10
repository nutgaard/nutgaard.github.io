import React, {PropsWithChildren} from "react";
import css from './Grid.module.css';

type Props = PropsWithChildren<{
    as?: string;
    className?: string;
}>

export function Grid({
    as = 'section',
    className,
    children,
}: Props) {
    return React.createElement(as, { className: `${css.wrapper} ${className ?? ''}` }, children)
}