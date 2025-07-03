import Block from '../../../framework/Block';
import type { BlockProps } from '../../../framework';

import formItemTemplate from './FormItem.hbs?raw';
import formItemStyles from './FormItem.module.css';
import { Input } from '../Input';

export default class FormItem extends Block {
  public constructor(props: BlockProps = {}) {
    super({
      input: new Input({
        ...props,
        callback: (props: BlockProps = {}) => this.componentDidUpdate(props),
      }),
      formItem: formItemStyles.formItem,
      labelStyle: formItemStyles.formItem__label,
      ...props
    });
  }

  public override render() {
    return formItemTemplate;
  }

  public override componentDidUpdate(props: BlockProps = {}) {
    this.setProps({
      error: {
        text: props.error,
        styles: formItemStyles.error,
      }
    });
  }

  public componentDidMount() {}
}




