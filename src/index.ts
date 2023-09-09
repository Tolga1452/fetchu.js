export enum RequestMethod {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Delete = 'DELETE',
    Patch = 'PATCH',
    Options = 'OPTIONS'
};

export interface Headers {
    [header: string]: string;
};

export interface Request {
    method: RequestMethod;
    url: string;
    headers: Headers;
    body?: any;
};

export interface Response {
    ok: boolean;
    status: number;
    statusText: string;
    headers: Headers;
    body?: any;
    raw: ResponseInit;
};

export interface Callback {
    isOk?: (response: Response) => void;
    isNotOk?: (response: Response) => void;
};

export async function request(request: Request, callback: Callback = {}): Promise<Response> {
    let rawResponse = await fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body: typeof request.body === 'string' ? request.body : JSON.stringify(request.body)
    });

    let response = {
        ok: rawResponse.status >= 200 && rawResponse.status < 300,
        status: rawResponse.status,
        statusText: rawResponse.statusText,
        headers: rawResponse.headers as unknown as Headers,
        body: await rawResponse.json().catch(() => rawResponse.text().catch(() => rawResponse.body)),
        raw: rawResponse
    };

    if (response.ok && callback.isOk) callback.isOk(response);
    if (!response.ok && callback.isNotOk) callback.isNotOk(response);

    return response;
};