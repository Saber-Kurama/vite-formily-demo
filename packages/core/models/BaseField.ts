import { FormPath } from "@formily/core";
import { Form } from "./Form";
import { locateNode } from "../shared/internals";

export class BaseField<TextType = any> {
  // 字段标题
  title: TextType;
  // 字段描述
  description: TextType;

  // 是否是可设计
  // todo： 做什么？
  designable: boolean;
  // 字段节点路径
  address: FormPath;
  // 字段数据路径 会过滤掉 虚拟节点
  path: FormPath;
  // 所属Form模型的实例
  form: Form;

  // 表单和字段进行了关联
  // todo:
  locate(address: any) {
    this.form.fields[address.toString()] = this as any;
    locateNode(this as any, address);
  }
}
