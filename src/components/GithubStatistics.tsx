import {GithubStatistics as Statistics} from "@/utils/github_statistics";
import css from './GithubStatistics.module.css';
import {PropsWithChildren} from "react";
import {Grid} from "@/components/Grid";

type Props = {
    statistics: Statistics;
}
type EntryProps = PropsWithChildren<{
    heading: string;
}>;

function Entry(props: EntryProps) {
    return (
        <div>
            <dt>{props.heading}:&nbsp;</dt>
            <dd>{props.children}</dd>
        </div>
    )
}

export function GithubStatistics(props: Props) {
    const statistics = props.statistics;
    return (
        <Grid as="dl" className={css.wrapper}>
            <Entry heading="Number of repositories">{statistics.count}</Entry>
            <Entry heading="Latest update">
                {statistics.lastUpdated.name}
            </Entry>
            <Entry heading="Most watchers">
                {statistics.mostWatched.repo.name}
                &nbsp;
                ({statistics.mostWatched.count})
            </Entry>
            <Entry heading="Most forked">
                {statistics.mostForked.repo.name}
                &nbsp;
                ({statistics.mostForked.count})
            </Entry>
            <Entry heading="Most open issues">
                {statistics.mostOpenIssues.repo.name}
                &nbsp;
                ({statistics.mostOpenIssues.count})
            </Entry>
            <Entry heading="Most stars">
                {statistics.mostStars.repo.name}
                &nbsp;
                ({statistics.mostStars.count})
            </Entry>
        </Grid>
    )
}