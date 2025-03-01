import 'server-only';

const defaultHeaders: RequestInit = {
    headers: {
        'content-type': 'application/json'
    }
}

export async function get<TData extends object>(url: string, init: RequestInit = {}): Promise<TData> {
    const response = await fetch(url, {
        ...defaultHeaders,
        ...init,
        method: 'GET'
    });
    return handleResponse(response);
}

export async function post(
    url: string,
    body: object | string,
    init?: RequestInit
) {
    const postConfig: RequestInit = {
        ...defaultHeaders,
        ...init,
        method: 'POST',
        body: JSON.stringify(body)
    }
    const response = await fetch(url, postConfig);
    return handleResponse(response);
}

async function handleResponse<TData>(response: Response): Promise<TData> {
    const contentType = response.headers.get('content-type') ?? '';
    if (!response.ok) {
        return Promise.reject(await response.json());
    } else if (contentType.includes('application/json')) {
        return response.json() as Promise<TData>;
    } else if (contentType.includes('text/plain')) {
        return response.text() as unknown as  Promise<TData>;
    } else {
        return Promise.resolve({} as TData);
    }
}