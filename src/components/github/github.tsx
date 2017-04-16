import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { fetchRepos } from '../../ducks/githubrepos';
import { Store } from '../../ducks/store';
import './github.css';
import GithubRepo from './github-repo';
import GithubStatistics from './github-statistics';
import Grid from '../grid/grid';
import Async from '../async/async';

interface StateProps {
    github: Store.Github;
}

interface DispatchProps {
    actions: {
        fetchRepos: () => ThunkAction<void, Store.Complete, void>
    };
}

class Github extends React.Component<StateProps & DispatchProps, {}> {
    constructor(props: StateProps & DispatchProps) {
        super(props);

        this.renderer = this.renderer.bind(this);
    }

    componentDidMount() {
        this.props.actions.fetchRepos();
    }

    renderer() {
        const repos = this.props.github.data!
            .map((repo) => ({ repo, date: new Date(repo.pushed_at) }))
            .sort((a, b) => {
                if (a.repo.has_pages && b.repo.has_pages) {
                    return (new Date(a.date) > new Date(b.date) ? -1 : 1);
                } else if (a.repo.has_pages) {
                    return -1;
                } else if (b.repo.has_pages) {
                    return 1;
                }
                return new Date(a.date) > new Date(b.date) ? -1 : 1;
            })
            .map(({ repo }) => repo);

        const repoElements = repos
            .map((repo) => <GithubRepo key={repo.name} repo={repo}/>);

        return (
            <div className="github">
                <GithubStatistics repos={repos}/>
                <Grid className="github__repos" large="3" padToMatch={<div className="github__emptyrepo"/>}>
                    {repoElements}
                </Grid>
            </div>
        );
    }

    render() {
        return (
            <Async dependencies={this.props.github} renderer={this.renderer}/>
        );
    }
}

const mapStateToProps = (state: Store.Complete): StateProps => {
    return { github: state.github };
};
const mapDispatchToProps = (dispatch: Dispatch<Store.Complete>) => ({
    actions: bindActionCreators({ fetchRepos }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Github);
