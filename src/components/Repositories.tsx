import React from "react";
import Image from 'next/image';
import {GithubRepo} from "@/resources/github";
import css from './Repositories.module.css';
import {Grid} from "@/components/Grid";
import {PadlockSvg} from "./PadlockSvg";

type Props = {
    repositories: Array<GithubRepo>;
    imageMap: Record<string, string>;
    linkGenerator(repository: GithubRepo): LinkDescription;
}
type RepoProps = {
    repository: GithubRepo;
    imageMap: Record<string, string>
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

    const imgSrc = props.imageMap[`${props.repository.name}.png`]
        ?? props.imageMap['404.svg'];

    return (
        React.createElement(link.type, anchorProps, (
            <div className={css.repository}>
                <div className={css.repositoryImage}>
                    <Image
                        src={imgSrc}
                        alt=""
                        width="100"
                        height="100"
                    />
                    {props.repository.private && <PadlockSvg className={css.overlay}/>}
                </div>
                <div>
                    <h3>{props.repository.name}</h3>
                    <p>{props.repository.description}</p>
                </div>
            </div>
        ))
    );
}

export function Repositories({ repositories, linkGenerator, imageMap }: Props) {
    return (
        <Grid className={css.wrapper}>
            {
                repositories.map((it) => (
                    <Respository key={it.name} repository={it} linkGenerator={linkGenerator} imageMap={imageMap}/>
                ))
            }
        </Grid>
    );
}