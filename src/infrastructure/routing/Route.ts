import type Block from "../../framework/Block";
import { type BlockProps } from "../../framework";

import { render } from "../utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BlockConstructor<T extends BlockProps = any> = new (...args: any[]) => Block<T>;

export class Route {
    constructor(pathname: string | RegExp, view: BlockConstructor, props: Record<'rootQuery', string>) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    destroy() {
        if (this._block) {
            this._block.destroy();
        }
    }

    public match(pathname: string) {
        if (this._pathname instanceof RegExp) {
            return this._pathname.test(pathname);
        }
        return pathname === this._pathname;
    }

    public render() {
        if (!this._block || !this._block.element()) {
            console.log('this._block');
            this._block = new this._blockClass();
            if (!this._block ) {
                return;
            }
            render(this._props.rootQuery, this._block);

            return;
        }
        console.log('this._block');
        render(this._props.rootQuery, this._block);
    }

    private readonly _blockClass: BlockConstructor;
    private readonly _props;
    private readonly  _pathname: string | RegExp  = '';
    private _block: Block | null = null;
}
