import Block from '../../framework/Block';
import type { BlockProps } from '../../framework';

import template from './Footer.hbs?raw';

export default class Footer extends Block {
    public constructor(props: BlockProps = {}) {
        super({
            ...props
        });
    }

    public override render() {
        return template;
    }

    public componentDidMount() {

    }
}





