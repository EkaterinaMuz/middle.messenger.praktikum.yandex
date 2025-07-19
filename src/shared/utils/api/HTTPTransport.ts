enum HTTP_STATUS_CODE  {
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
    data?: Record<string, string | number | boolean> | null;
    timeout?: number;
}


function queryStringify(data: Record<string, string | number | boolean>) {
    if(typeof data !== 'object' || !data) {
        throw new Error('Data must be object');
    }

    const keys = Object.keys(data);

    const string =  keys.reduce((acc, key, index) => {
        return `${acc}${key}=${encodeURIComponent(data[key])}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');

    return string;
}


export class HTTPTransport {
    get = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
    };

    post = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    };

    delete = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    };

    put = (url: string, options: RequestOptions = {}): Promise<XMLHttpRequest> => {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };

    request = (url: string, options: RequestOptions, timeout = 5000): Promise<XMLHttpRequest> => {
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
                xhr.open(method, isGet && data ? `${url}${requestUrl}` : url);
            } catch (error) {
                return reject(error);
            }

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = () => {
                if (xhr.status >= HTTP_STATUS_CODE.OK && xhr.status < HTTP_STATUS_CODE.REDIRECTION) {
                    resolve(xhr);
                } else {
                    reject(new Error(`Request failed with status ${xhr.status}`));
                }
            };

            xhr.onabort = () => reject(new Error('Request aborted'));
            xhr.onerror = () => reject(new Error('Network error'));
            xhr.timeout = timeout;
            xhr.ontimeout = () => reject(new Error('Request timed out'));

            try {
                if (method === METHODS.GET || !data) {
                    xhr.send();
                } else {
                    xhr.send(JSON.stringify((data)));
                }
            } catch (error) {
                reject(error);
            }
        });
    };
}
