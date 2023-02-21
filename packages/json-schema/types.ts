export interface ISchemaTransformerOptions {
  scope?: any;
}

export type Stringify<P extends { [key: string]: any }> = {
  /**
   * Use `string & {}` instead of string to keep Literal Type for ISchema#component and ISchema#decorator
   */
  [key in keyof P]?: P[key] | string;
};

// Scheam 的 properties
export type SchemaProperties<Message> = Record<string, ISchema<Message>>;

export type SchemaPatch = (schema: ISchema) => ISchema;

export type SchemaKey = string | number;

// 定义一下 Scheam 类型
export type ISchema<Message = any> = Stringify<{
  version?: string;
  name?: SchemaKey;
  title?: Message;

  properties?: SchemaProperties<Message>;
}>;
