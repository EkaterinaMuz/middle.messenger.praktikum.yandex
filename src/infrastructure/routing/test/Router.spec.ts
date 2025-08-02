import Block, { type BlockProps } from '../../../framework/Block';
import {Route} from "../Route.ts";
import {Router} from "../Router.ts";

class DummyBlock extends Block {
    constructor(props?: BlockProps) {
        super(props || {});
    }

    protected render(): string {
        return `<div>Dummy Block</div>`;
    }

    protected componentDidMount(): void {
    }
}


describe('Router', () => {
    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (Router as any).instance = undefined;

        const root = document.createElement('div');
        root.id = 'root';
        document.body.appendChild(root);

        window.history.pushState({}, '', '/');
    });

    it('getInstance должен возвращать singleton', () => {
        const r1 = Router.getInstance();
        const r2 = Router.getInstance();
        expect(r1).toBe(r2);
    });

    it('register должен добавлять маршрут', () => {
        const router = Router.getInstance();
        router.register('/test', DummyBlock);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const routes = (router as any).routes;

        expect(routes.length).toBe(1);
        expect(routes[0]).toBeInstanceOf(Route);
    });

    it('getIdParam должен возвращать последний сегмент пути', () => {
        window.history.pushState({}, '', '/page/12345');
        const router = Router.getInstance();
        const param = router.getIdParam();

        expect(param).toBe('12345');
    });

    it('go должен менять pathname и вызывать _onChangeRoute', () => {
        const router = Router.getInstance();
        router.register('/new', DummyBlock);
        router.go('/new');

        expect(window.location.pathname).toBe('/new');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((router as any)._currentRoute?.match('/new')).toBe(true);
    });

    it('back должен перемещать по истории', done => {
        const router = Router.getInstance();
        router.register('/first', DummyBlock);
        router.register('/second', DummyBlock);

        router.go('/first');
        router.go('/second');

        expect(window.location.pathname).toBe('/second');

        router.back();

        setTimeout(() => {
            expect(window.location.pathname).toBe('/first');
            done();
        }, 100);
    });

    it('init должен вызывать _onChangeRoute с текущим путем', () => {
        const router = Router.getInstance();
        window.history.pushState({}, '', '/init-check');
        router.register('/init-check', DummyBlock);
        router.init();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((router as any)._currentRoute?.match('/init-check')).toBe(true);
    });

    it('если маршрут не найден, используется fallback', () => {
        const router = Router.getInstance();
        router.registerFallback(DummyBlock);
        window.history.pushState({}, '', '/unknown-route');
        router.init();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const route = (router as any)._currentRoute;
        expect(route).toBeDefined();
        expect(route?.match('/unknown-route')).toBe(true);
    });
});
