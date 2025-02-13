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
    return (
        <a
            href={repoUrl(props.repository)}
            className={css.repository}
        >
            <h3>{props.repository.name}</h3>
            <p>{props.repository.description}</p>
        </a>
    );
}
function repoUrl(repo: GithubRepo): string {
    if (repo.name == 'nutgaard.github.io') {
        return '/';
    } else {
        return `'//github.utgaard.xyz'/${repo.name}`;
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