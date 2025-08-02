import { HTTPTransport, queryStringify } from '../HTTPTransport';

class XHRMock {
    static readonly UNSENT = 0;
    static readonly OPENED = 1;
    static readonly HEADERS_RECEIVED = 2;
    static readonly LOADING = 3;
    static readonly DONE = 4;

    open = jest.fn();
    send = jest.fn();
    setRequestHeader = jest.fn();

    onload: ((e?: ProgressEvent) => void) | null = null;
    onerror: ((e?: ProgressEvent) => void) | null = null;
    ontimeout: ((e?: ProgressEvent) => void) | null = null;

    private _status = 200;
    get status() {
        return this._status;
    }
    set status(code: number) {
        this._status = code;
    }
}

describe('HTTPTransport', () => {
    let transport: HTTPTransport;

    beforeEach(() => {

        const mockConstructor = jest.fn(() => new XHRMock());

        Object.assign(mockConstructor, {
            UNSENT: XHRMock.UNSENT,
            OPENED: XHRMock.OPENED,
            HEADERS_RECEIVED: XHRMock.HEADERS_RECEIVED,
            LOADING: XHRMock.LOADING,
            DONE: XHRMock.DONE,
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global as any).XMLHttpRequest = mockConstructor as unknown as  typeof XMLHttpRequest;

        transport = new HTTPTransport('auth');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('queryStringify', () => {
        it('должен сериализовать объект в query строку', () => {
            const result = queryStringify({ a: 1, b: 'test value' });
            expect(result).toBe('?a=1&b=test%20value');
        });
    });

    describe('GET', () => {
        it('должен вызвать open с GET и вернуть xhr при статусе 200', async () => {
            const promise = transport.get('test', { data: { id: 123 } });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const xhrInstance = ((global as any).XMLHttpRequest as unknown as jest.Mock).mock.results[0].value as XHRMock;

            setTimeout(() => {
                xhrInstance.status = 200;
                xhrInstance.onload!({} as ProgressEvent);
            }, 0);

            await expect(promise).resolves.toBe(xhrInstance);
            expect(xhrInstance.open).toHaveBeenCalledWith('GET', expect.stringContaining('?id=123'));
        });

        it('должен reject если data не объект', async () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await expect(transport.get('test', { data: 'invalid' as any }))
                .rejects.toThrow('Invalid data type for GET request');
        });
    });

    describe('POST', () => {
        it('должен вызвать open с POST и отправить JSON', async () => {
            const promise = transport.post('login', {
                data: { login: 'user', password: 'pass' },
            });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const xhrInstance = ((global as any).XMLHttpRequest as unknown as jest.Mock).mock.results[0].value as XHRMock;

            setTimeout(() => {
                xhrInstance.status = 200;
                xhrInstance.onload!({} as ProgressEvent);
            }, 0);

            await expect(promise).resolves.toBe(xhrInstance);

            expect(xhrInstance.open).toHaveBeenCalledWith('POST', expect.any(String));
            expect(xhrInstance.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(xhrInstance.send).toHaveBeenCalledWith(JSON.stringify({ login: 'user', password: 'pass' }));
        });
    });

    describe('DELETE', () => {
        it('должен отправлять DELETE запрос', async () => {
            const promise = transport.delete('user/123', { data: { hard: true } });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const xhrInstance = ((global as any).XMLHttpRequest as unknown as jest.Mock).mock.results[0].value as XHRMock;

            setTimeout(() => {
                xhrInstance.status = 200;
                xhrInstance.onload!({} as ProgressEvent);
            }, 0);

            await expect(promise).resolves.toBe(xhrInstance);

            expect(xhrInstance.open).toHaveBeenCalledWith('DELETE', expect.any(String));
        });
    });

    describe('Обработка ошибок', () => {
        it('должен reject, если метод не указан', async () => {
            await expect(transport['request']('/broken', {})).rejects.toThrow('No method specified');
        });

        it('должен reject если статус ответа >= 400', async () => {
            const promise = transport.get('fail');

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const xhrInstance = ((global as any).XMLHttpRequest as unknown as jest.Mock).mock.results[0].value as XHRMock;

            setTimeout(() => {
                xhrInstance.status = 500;
                xhrInstance.onload!({} as ProgressEvent);
            }, 0);

            await expect(promise).rejects.toBe(xhrInstance);
        });

        it('должен reject при сетевой ошибке', async () => {
            const promise = transport.get('error');

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const xhrInstance = ((global as any).XMLHttpRequest as unknown as jest.Mock).mock.results[0].value as XHRMock;

            setTimeout(() => {
                xhrInstance.onerror!({} as ProgressEvent);
            }, 0);

            await expect(promise).rejects.toThrow('Network error');
        });

        it('должен reject при таймауте', async () => {
            const promise = transport.get('timeout', { timeout: 1 });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const xhrInstance = ((global as any).XMLHttpRequest as unknown as jest.Mock).mock.results[0].value as XHRMock;

            setTimeout(() => {
                xhrInstance.ontimeout!({} as ProgressEvent);
            }, 0);

            await expect(promise).rejects.toThrow('Request timed out');
        });
    });
});
