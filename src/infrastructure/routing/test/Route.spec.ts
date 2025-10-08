import Block, { type BlockProps } from '../../../framework/Block';

import { Route } from '../Route';

class FakeBlock extends Block {
    constructor(props?: BlockProps) {
        super(props || {});
    }

    protected render(): string {
        return `<div>Fake Block</div>`;
    }

    protected componentDidMount(): void {
    }
}

describe('Route', () => {
    let root: HTMLElement;

    beforeEach(() => {
        root = document.createElement('div');
        root.id = 'root';
        document.body.appendChild(root);
    });

    afterEach(() => {
        root.remove();
    });

    it('match должен сравнивать строку с pathname', () => {
        const route = new Route('/test', FakeBlock, { rootQuery: 'root' });
        expect(route.match('/test')).toBe(true);
        expect(route.match('/other')).toBe(false);
    });

    it('match должен поддерживать RegExp', () => {
        const route = new Route(/^\/user\/\d+$/, FakeBlock, { rootQuery: 'root' });
        expect(route.match('/user/123')).toBe(true);
        expect(route.match('/post/123')).toBe(false);
    });

    it('render должен создавать блок и вставлять в DOM', () => {
        const route = new Route('/test', FakeBlock, { rootQuery: 'root' });
        route.render();

        const inserted = root.querySelector('div');
        expect(inserted).not.toBeNull();
        expect(inserted?.textContent).toBe('Fake Block');
    });

    it('render не должен пересоздавать блок, если он уже есть', () => {
        const route = new Route('/test', FakeBlock, { rootQuery: 'root' });

        route.render();
        const firstElement = root.querySelector('div');

        route.render();
        const secondElement = root.querySelector('div');

        expect(firstElement).toBe(secondElement);
    });

});
