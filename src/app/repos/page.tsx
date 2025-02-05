import {fetchRepos} from "@/resources/github";

export default async function Repos() {
    const repos = await fetchRepos();
    return (
        <div>
            <p>Found {repos.length} repos</p>
        </div>
    );
}
