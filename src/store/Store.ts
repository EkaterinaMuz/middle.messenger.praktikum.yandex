import EventBus, { StoreEvents } from "../framework/EventBus";

import type { Indexed } from "./utils";
import { set } from "./utils";

class Store extends EventBus {
    private state: Indexed = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);

        this.emit(StoreEvents.Updated);
    };
}

export default new Store();
