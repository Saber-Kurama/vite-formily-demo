import { FormPath } from "@formily/core";
import { JSXComponent } from "@formily/core/esm/types";
import { Field } from "./Field";
// import { FormPath } from "../../shared/path";

export class Form {
  // 模型标签
  displayName = "Form";
  // 表单 ID
  id: string;
  // 表单值
  values: any = {};
  // 表单字段
  fields: any = {};
  // 表单的属性
  // props: IFormProps<ValueType>;
  props: any; // 这个字段的意义 一些非 class的属性 比如 designable
  // filed 的 path 与 address 的映射关系
  indexes: Record<string, string> = {};

  constructor(props: any) {
    console.log(props);
    this.initialize(props);
  }

  protected initialize(props: any) {
    this.props = { ...props };
  }
  /** 创建字段 **/

  // 表单 和  field 进行关联
  createField = (props: any): any => {
    const address = FormPath.parse(props.basePath).concat(props.name);
    const identifier = address.toString();
    if (!identifier) return;
    if (!this.fields[identifier] || this.props.designable) {
      // batch(() => {
      new Field(address, props, this, this.props.designable);
      // });
      // this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE);
    }
    return this.fields[identifier] as any;
  };

  /** 状态操作模型 **/

  //  设置单个值
  setValuesIn = (pattern: any, value: any) => {
    FormPath.setIn(this.values, pattern, value);
  };

  // 获取单个值
  getValuesIn = (pattern: any) => {
    return FormPath.getIn(this.values, pattern);
  };
}
