import type Block from "../../framework/Block";

export function render(root: string, block: Block) {
    const rootContainer = document.getElementById(`${root}`);

    if (!rootContainer) {
        throw new Error('no root container found');
    }

    if (!block.element()) {
        return;
    }

    rootContainer.appendChild(block.element() as Node);

}
