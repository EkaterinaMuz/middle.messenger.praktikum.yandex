import { Route} from "./Route";
import { type BlockConstructor } from "./Route";

export class Router {
    private constructor() {}

    public static getInstance(): Router {
        if (!Router.instance) {
            Router.instance = new this();
        }

        return Router.instance;
    }

    public init() {
        window.onpopstate = () => {
            this._onChangeRoute(window.location.pathname);
        };

        this._onChangeRoute(window.location.pathname);
    }

    public register(pathname: string | RegExp, block: BlockConstructor) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);

        return this;
    }

    public registerFallback(block: BlockConstructor) {
        this._fallback = block;

        return this;
    }

    public getIdParam() {
        const path = window.location.pathname;

        return path.split('/').pop();
    }

    private _onChangeRoute(pathname: string) {
        const route = this.getRoute(pathname);
        console.log(pathname, 'pathname');

        if (!route && this._fallback) {
            const fallback = new Route(pathname, this._fallback, {rootQuery: this._rootQuery});

            this._currentRoute = fallback;

            fallback.render();

            return this;
        }

        if (this._currentRoute) {
            console.log(pathname, 'destroy');
            this._currentRoute.destroy();
        }

        this._currentRoute = route;
        console.log(route, 'route');
        route?.render();
    }

    public readonly go = (pathname: string) => {
        this.history.pushState({}, "", pathname);

        this._onChangeRoute(pathname);
    };

    public readonly back = () => {
        this.history.back();
    };

    private getRoute(pathname: string): Route | undefined {
        return this.routes.find(route => route.match(pathname));
    }

    private static instance: Router;

    private readonly routes: Route[] = [];
    private readonly history = window.history;
    private readonly _rootQuery = 'root';
    private _currentRoute: Route | undefined = undefined;
    private _fallback: BlockConstructor | null = null;
}
