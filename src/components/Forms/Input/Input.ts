import Block from '../../../framework/Block';
import type { BlockProps } from '../../../framework';
import {isFieldName, validateFormField} from "../../../shared/utils/forms";

import template from './Input.hbs?raw';
import styles from './Input.module.css';

export default class Input extends Block {
  public constructor(props: BlockProps = {}) {
    super({
      inputStyle: styles.input,
      events: {
        blur: (e: Event) => this.handleBlur(e),
      },
      ...props
    });
  }

  private handleBlur(event: Event) {
    const input = event.target as HTMLInputElement;
    const { name, value } = input;

    if(!isFieldName(name)) {
      return;
    }

    this._error = validateFormField(name, value);

    this.setProps({
      value,
      error: this._error ? styles.error  : null
    });

    this.props?.callback?.({ error: this._error });
  }

  public override render() {
    return template;
  }

  public componentDidMount() {

  }

  private _error: string | null = null;
}




