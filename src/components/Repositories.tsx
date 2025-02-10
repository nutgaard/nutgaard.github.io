import {GithubRepo} from "@/resources/github";
import css from './Repositories.module.css';
import {Grid} from "@/components/Grid";

type Props = {
    repositories: Array<GithubRepo>;
}
type RepoProps = {
    repository: GithubRepo;
}

const hrefBase = '//github.utgaard.xyz'
function Respository(props: RepoProps) {
    return (
        <a
            href={`${hrefBase}/${props.repository.name}`}
            className={css.repository}
        >
            <h3>{props.repository.name}</h3>
            <p>{props.repository.description}</p>
        </a>
    );
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