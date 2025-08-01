export type EventCallback = (...args: string[]) => void;

export enum StoreEvents {
    Updated = 'updated',
}

export default class EventBus {
  private readonly listeners: Record<string, EventCallback[]>;

  public constructor() {
    this.listeners = {};
  }

  public on(event: string, callback: EventCallback): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  public off(event: string, callback: EventCallback): void {
    if (!this.listeners[event]) {
      throw new Error(`No event: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback,
    );
  }

  public emit(event: string, ...args: string[]): void {
    if (!this.listeners[event]) {
      throw new Error(`No event: ${event}`);
    }

    this.listeners[event].forEach(listener => {
      listener(...args);
    });
  }
}
