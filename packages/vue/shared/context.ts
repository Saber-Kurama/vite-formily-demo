import { InjectionKey, Ref } from "vue";

// 表单
export const FormSymbol: InjectionKey<Ref<any>> = Symbol("form");
// 字段
export const FieldSymbol: InjectionKey<Ref<any>> = Symbol("field");
// schemaOptions
export const SchemaOptionsSymbol: InjectionKey<Ref<any>> =
  Symbol("schemaOptions");
