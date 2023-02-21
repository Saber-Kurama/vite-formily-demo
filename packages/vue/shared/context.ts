import { InjectionKey, Ref } from "vue";
import { Schema } from "../../json-schema";

// 表单
export const FormSymbol: InjectionKey<Ref<any>> = Symbol("form");
// 字段
export const FieldSymbol: InjectionKey<Ref<any>> = Symbol("field");
// schemaMarkup
export const SchemaMarkupSymbol: InjectionKey<Ref<Schema>> =
  Symbol("schemaMarkup");
// schema
export const SchemaSymbol: InjectionKey<Ref<Schema>> = Symbol("schema");
// schemaExpression
export const SchemaExpressionScopeSymbol: InjectionKey<
  Ref<Record<string, any>>
> = Symbol("schemaExpression");
// schemaOptions
export const SchemaOptionsSymbol: InjectionKey<Ref<any>> =
  Symbol("schemaOptions");
