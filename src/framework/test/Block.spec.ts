import Block, { type BlockProps } from '../Block';

class TestBlock extends Block {
    public mounted = false;

    constructor(props: BlockProps) {
        super(props);
    }

    protected componentDidMount(): void {
        this.mounted = true;
    }

    protected render(): string {
        return `<div class="test">Hello {{name}}</div>`;
    }
}

describe('Block', () => {
    let root: HTMLElement;

    beforeEach(() => {
        root = document.createElement('div');
        root.id = 'root';
        document.body.appendChild(root);
    });

    afterEach(() => {
        root.remove();
    });

    test('должен создать DOM-элемент после render', () => {
        const block = new TestBlock({ name: 'World' });
        const element = block.element();
        expect(element).toBeInstanceOf(HTMLElement);
        expect(element?.classList.contains('test')).toBe(true);
        expect(element?.textContent).toContain('Hello World');
    });

    test('componentDidMount вызывается при dispatchComponentDidMount', () => {
        const block = new TestBlock({ name: 'Mount' });
        block.dispatchComponentDidMount();
        expect(block.mounted).toBe(true);
    });

    test('setProps обновляет данные и вызывает перерендер', () => {
        const block = new TestBlock({ name: 'Old' });
        const oldContent = block.element()?.textContent;

        block.setProps({ name: 'New' });
        const newContent = block.element()?.textContent;

        expect(oldContent).toContain('Old');
        expect(newContent).toContain('New');
    });

    test('setChildren вызывает FLOW_CDU и сохраняет ребёнка', () => {
        const child = new TestBlock({ name: 'Child' });
        const parent = new TestBlock({ name: 'Parent' });

        parent.setChildren('childKey', child);
        expect(parent['children']['childKey']).toBe(child);
    });

    test('destroy удаляет элемент и отписывает события', () => {
        const block = new TestBlock({ name: 'Destroy' });
        const el = block.element();

        block.destroy();

        expect(block.element()).toBeNull();
        expect(el?.isConnected).toBe(false);
    });

    test('addAttributes добавляет атрибуты', () => {
        const block = new TestBlock({
            name: 'Attr',
            attr: {
                'data-test': '123',
                'aria-label': 'label',
            },
        });

        const el = block.element();
        expect(el?.getAttribute('data-test')).toBe('123');
        expect(el?.getAttribute('aria-label')).toBe('label');
    });
});
