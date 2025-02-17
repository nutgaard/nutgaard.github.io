import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import {GithubRepo} from "@/resources/github";
import css from './Repositories.module.css';
import {Grid} from "@/components/Grid";

type Props = {
    repositories: Array<GithubRepo>;
}
type RepoProps = {
    repository: GithubRepo;
}

function Respository(props: RepoProps) {
    const link = repoUrl(props.repository)
    const anchorProps = {
        ...link.props,
        className: css.repositoryLink
    };
    const imgSrc = props.repository.has_pages ? props.repository.name : 'missing';

    return (
        React.createElement(link.type, anchorProps, (
            <div className={css.repository}>
                <Image
                    src={`/repo-img/${imgSrc}.png`}
                    alt=""
                    width="100"
                    height="100"
                />
                <div>
                    <h3>{props.repository.name}</h3>
                    <p>{props.repository.description}</p>
                </div>
            </div>
        ))
    );
}

type LinkDescription = {
    type: React.ElementType;
    props: React.AnchorHTMLAttributes<HTMLAnchorElement>;
};
function repoUrl(repo: GithubRepo): LinkDescription {
    if (repo.name == 'nutgaard.github.io') {
        return {
            type: Link,
            props: {
                href: '/pages'
            }
        };
    } else {
        return {
            type: 'a',
            props: {
                href: `//github.utgaard.xyz/${repo.name}`
            }
        }
    }
}

export function Repositories(props: Props) {
    return (
        <Grid className={css.wrapper}>
            {
                props.repositories.map((it) => (
                    <Respository key={it.name} repository={it} />
                ))
            }
        </Grid>
    );
}