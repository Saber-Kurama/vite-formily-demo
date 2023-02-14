import { JSXComponent } from "@formily/core/esm/types";
import { FormPath } from "../../shared/path";

export class Form {
  // 模型标签
  displayName = "Form";
  // 表单 ID
  id: string;
  // 表单字段
  fields: any = {};
  constructor(props: any) {
    console.log(props);
  }
  /** 创建字段 **/

  createField = (props: any): any => {
    const address = FormPath.parse(props.basePath).concat(props.name);
    const identifier = address.toString();
    // if (!identifier) return;
    // if (!this.fields[identifier] || this.props.designable) {
    //   batch(() => {
    //     new Field(address, props, this, this.props.designable);
    //   });
    //   this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE);
    // }
    // return this.fields[identifier] as any;
  };
}
