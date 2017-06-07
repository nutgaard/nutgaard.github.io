import { AsyncData } from '../components/async/async';
import { Domain } from '../domain';

export namespace Store {
    export type Github = AsyncData<Domain.GithubRepo[]>

    export type Complete = {
        github: Github
    }
}