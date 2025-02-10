"use client";
import {usePathname} from "next/navigation";
import Link from "next/link";
import css from './NavLink.module.css';

type NavLinkProps = {
    href: string;
    children: React.ReactNode;
}

export function NavLink(props: NavLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === props.href;
    return (
        <Link
            href={props.href}
            className={isActive ? `${css.link} ${css.active}` : `${css.link}`}
            prefetch={false}
        >
            {props.children}
        </Link>
    );
}