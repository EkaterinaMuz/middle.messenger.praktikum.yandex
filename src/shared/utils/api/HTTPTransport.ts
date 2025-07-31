export enum HTTP_STATUS_CODE  {
    INFO = 100,
    OK = 200,
    REDIRECTION = 300,
    CLIENT_ERROR = 400,
    SERVER_ERROR = 500
}

export const METHODS  = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PUT: 'PUT'
};


export interface RequestOptions extends RequestInit {
    // method?: METHODS;
    headers?: Record<string, string>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: Record<string, any>;
    timeout?: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function queryStringify(data: Record<string, any>) {
    if(typeof data !== 'object' || !data) {
        throw new Error('Data must be object');
    }

    const keys = Object.keys(data);

    return keys.reduce((acc, key, index) => {
        return `${acc}${key}=${encodeURIComponent(data[key])}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}


export class HTTPTransport {
    public constructor(baseApiMethod: string = '/') {
        this.baseApiMethod = baseApiMethod;
    }
    public readonly get = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
        return this.request(`${HTTPTransport.HOST}/${this.baseApiMethod}/${url}`, { ...options, method: METHODS.GET }, options.timeout);
    };

    public readonly post = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
        return this.request(`${HTTPTransport.HOST}/${this.baseApiMethod}/${url}`, { ...options,
            method: METHODS.POST,
            headers: {
                 'Content-Type': 'application/json',
                // ...options.headers
            }
        },
            options.timeout);
    };

    public readonly delete = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
        return this.request(`${HTTPTransport.HOST}/${this.baseApiMethod}/${url}`, { headers: {'Content-type': 'application/json'}, ...options, method: METHODS.DELETE }, options.timeout);
    };

    public readonly put = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
        const isFormData = options.data instanceof FormData;
        return this.request(`${HTTPTransport.HOST}/${this.baseApiMethod}/${url}`, {
            headers: {
                ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
                ...options.headers
            },
            method: METHODS.PUT, ...options }, options.timeout);
    };

    private readonly request = (url: string, options: RequestOptions, timeout = 5000): Promise<XMLHttpRequest> => {
        const { method, data, headers = {} } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject(new Error('No method specified'));
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            let requestUrl = url;
            if (isGet && data) {
                if (typeof data === 'object') {
                    requestUrl = `${url}${queryStringify(data)}`;
                } else {
                    reject(new Error('Invalid data type for GET request'));
                    return;
                }
            }

            try {
                xhr.open(method, isGet && data ? requestUrl : url);
            } catch (error) {
                return reject(error);
            }

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.withCredentials = true;

            xhr.onload = () => {
                if (xhr.status >= HTTP_STATUS_CODE.OK && xhr.status < HTTP_STATUS_CODE.REDIRECTION) {
                    resolve(xhr);
                } else {
                    reject(xhr);
                }
            };

            xhr.onabort = () => reject(new Error('Request aborted'));
            xhr.onerror = () => reject(new Error('Network error'));
            xhr.timeout = timeout;
            xhr.ontimeout = () => reject(new Error('Request timed out'));

            try {
                if (method === METHODS.GET || !data) {
                    xhr.send();
                } else if (data instanceof FormData) {
                    xhr.send(data);
                } else {
                    xhr.send(JSON.stringify(data));
                }
            } catch (error) {
                reject(error);
            }
        });
    };

    private static HOST = 'https://ya-praktikum.tech/api/v2';
    private readonly baseApiMethod: string = '';
}
