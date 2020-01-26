import * as framework from './framework';

export function withLoader<T>(request: Promise<T>, component: (data: T) => string): () => string {
    let data: T | null = null;
    let error: Error | null = null;
    request.then((content) => {
        data = content;
        framework.render();
    }, (e) => {
        error = e;
        framework.render();
    }).catch((e) => {
        error = e;
        framework.render();
    });

    return () => {
        if (error !== null) {
            return `
                <div class="error">
                    <h1>Obs</h1>
                    <p>Failed to fetch: ${error.message}</p>
                </div>
            `;
        } else if (data === null) {
            return loader()
        } else {
            return component(data);
        }
    }
}

export default function loader() {
    return `
        <div class="loader">
            <span>{</span>
            <span>}</span>
        </div>
    `;
}
