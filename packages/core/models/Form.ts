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
    console.log("===============", props.name);
    const address = FormPath.parse(props.basePath).concat(props.name);
    console.log("===============address", this);
    const identifier = address.toString();
    if (!identifier) return;
    if (!this.fields[identifier] || this.props.designable) {
      // batch(() => {
      new Field(address, props, this, this.props.designable);
      // });
      // this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE);
    }
    console.log("identifier----", identifier);
    console.log("this.fields[identifier]----", this.fields[identifier]);
    return this.fields[identifier] as any;
  };
}
