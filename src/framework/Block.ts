import Handlebars from 'handlebars';

import EventBus from './EventBus';

export interface BlockProps {
  events?: Record<string, (e: Event) => void>;
  callback?: (props: BlockProps) => void;
  attr?: Record<string, string>;
  [key: string]: unknown;
}

export default abstract class Block<Props extends BlockProps = BlockProps> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  protected _element: HTMLElement | null = null;

  protected _id: number = Math.floor(100000 + Math.random() * 900000);

  protected props: BlockProps;

  protected children: Record<string, Block>;

  protected lists: Record<string, unknown>;

  protected eventBus: () => EventBus;

  protected constructor(propsWithChildren: Props) {
    const eventBus = new EventBus();
    const { props, children, lists } = this._getChildrenPropsAndProps(propsWithChildren);

    this.props = this._makePropsProxy({ ...props });
    this.children = children;
    this.lists = this._makePropsProxy({ ...lists });
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  protected init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }
  public destroy() {
    this._unregisterEvents(this.eventBus());
      this._removeEvents();
      this._element = null;
  }

  protected abstract componentDidMount(): void

  protected componentDidUpdate?(): void

    protected abstract render(): string

    protected addAttributes(): void {
        const { attr = {} } = this.props;

        Object.entries(attr).forEach(([key, value]) => {
            if (this._element) {
                this._element.setAttribute(key, value as string);
            }
        });
    }
    public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }


  public setProps = (nextProps: BlockProps): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  public element(): HTMLElement {
    if (!this._element) {
      throw new Error('Element is not created');
    }
    return this._element;
  }

    private _addEvents(): void {
        const { events = {} } = this.props;

        Object.keys(events).forEach(eventName => {
            if (this._element) {
                this._element.addEventListener(eventName, events[eventName]);
            }
        });
    }

    private _removeEvents(): void {
        const { events = {} } = this.props;

        Object.keys(events).forEach(eventName => {
            if (this._element && events[eventName] !== undefined) {
                this._element.removeEventListener(eventName, events[eventName]);
            }
        });
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _unregisterEvents(eventBus: EventBus) {
        eventBus.off(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.off(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.off(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.off(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _componentDidMount() {
        this.componentDidMount();
        Object.values(this.children).forEach(child => {child.dispatchComponentDidMount();});
    }

    private _componentDidUpdate(): void {
        this._removeEvents();
        this._render();
    }

    private _getChildrenPropsAndProps(propsAndChildren: BlockProps): {
        children: Record<string, Block>,
        props: BlockProps,
        lists: Record<string, Block[]>
    } {
        const children: Record<string, Block> = {};
        const props: BlockProps = {};
        const lists: Record<string, Block[]> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {

            if (value instanceof Block) {
                children[key] = value;
            } else if (Array.isArray(value)) {
                lists[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props, lists };
    }

    private _render(): void {
        const propsAndStubs: Record<string, unknown> = { ...this.props };

        const tmpId =  Math.floor(100000 + Math.random() * 900000);

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        });

        Object.entries(this.lists).forEach(([key]) => {

            propsAndStubs[key] = `<div data-id="__l_${tmpId}"></div>`;

        });

        const fragment = this._createDocumentElement('template');
        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

        Object.values(this.children).forEach(child => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

            if (stub) {
                stub.replaceWith(child.element());
            }
        });

        Object.entries(this.lists).forEach(([, child]) => {
            const listCont = this._createDocumentElement('template');

            if(!Array.isArray(child)) {
                return;
            }

            child.forEach((item: unknown) => {
                if (item instanceof Block) {
                    listCont.content.append(item.element());
                } else {
                    listCont.content.append(`${item}`);
                }
            });
            const stub = fragment.content.querySelector(`[data-id="__l_${tmpId}"]`);
            if (stub) {
                stub.replaceWith(listCont.content);
            }
        });

        const newElement = fragment.content.firstElementChild as HTMLElement;
        if (this._element && newElement) {
            this._element.replaceWith(newElement);
        }
        this._element = newElement;
        this._addEvents();
        this.addAttributes();
    }

  private _makePropsProxy(props: Record<string, unknown>): Record<string, unknown> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target, prop:  string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop:  string, value: unknown) {
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU);
        return true;
      },
      deleteProperty() {
        throw new Error('No access');
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }
}
