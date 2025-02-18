import React from "react";
import Image from 'next/image';
import {GithubRepo} from "@/resources/github";
import css from './Repositories.module.css';
import {Grid} from "@/components/Grid";

type Props = {
    repositories: Array<GithubRepo>;
    linkGenerator(repository: GithubRepo): LinkDescription;
}
type RepoProps = {
    repository: GithubRepo;
    linkGenerator(repository: GithubRepo): LinkDescription;
}
export type LinkDescription = {
    type: React.ElementType;
    props: React.AnchorHTMLAttributes<HTMLAnchorElement>;
};

function Respository(props: RepoProps) {
    const link = props.linkGenerator(props.repository)
    const anchorProps = {
        ...link.props,
        className: css.repositoryLink
    };

    const imgSrc = props.repository.has_pages ? `/repo-img/${props.repository.name}.png` : '/repo-img/missing.svg';
    return (
        React.createElement(link.type, anchorProps, (
            <div className={css.repository}>
                <Image
                    src={imgSrc}
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

export function Repositories({ repositories, linkGenerator }: Props) {
    return (
        <Grid className={css.wrapper}>
            {
                repositories.map((it) => (
                    <Respository key={it.name} repository={it} linkGenerator={linkGenerator}/>
                ))
            }
        </Grid>
    );
}