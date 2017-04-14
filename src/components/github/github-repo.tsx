import * as React from 'react';
import GithubRepoData from './githubrepodata';
import Softbreak from '../softbreak';

class GithubRepo extends React.Component<{ repo: GithubRepoData }, {}> {
    render() {
        const { repo } = this.props;
        if (repo.has_pages) {
            const url = `http://www.utgaard.xyz/${repo.name}`;
            return (
                <a href={url} className="github__repo github__repo--haspages">
                    <h3>{repo.name}</h3>
                    <p>{repo.description}</p>
                </a>
            );
        }
        return (
            <div className="github__repo">
                <Softbreak tag="h3">{repo.name}</Softbreak>
                <p>{repo.description}</p>
            </div>
        );
    }
}

export default GithubRepo;