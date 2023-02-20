import { toArr } from "@formily/shared";
import { BaseField } from "./BaseField";

export class Field extends BaseField {
  displayName = "Field";

  // 字段的属性 组件的props
  // props: IFieldProps<Decorator, Component, TextType, ValueType>;
  props: any;
  constructor(address: any, props: any, form: any, designable: boolean) {
    super();
    this.form = form;
    this.props = props;
    this.designable = designable;
    this.locate(address);
    this.initialize();
  }

  protected initialize() {
    this.component = toArr(this.props.component);
  }

  get value() {
    return this.form.getValuesIn(this.path);
  }

  set value(value) {
    this.setValue(value);
  }
  setValue = (value?: any) => {
    this.form.setValuesIn(this.path, value);
  };
}
