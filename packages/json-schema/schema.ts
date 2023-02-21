import { each, instOf, isFn } from "@formily/shared";
import { Component } from "vue";
import { reducePatches } from "./patches";
import { transformFieldProps } from "./transformer";
import {
  ISchema,
  ISchemaTransformerOptions,
  SchemaKey,
  SchemaProperties,
} from "./types";

export class Schema<Message = any> implements ISchema {
  // 父类
  parent?: Schema;
  // 当前根
  root?: Schema;
  name?: SchemaKey;
  title?: Message;

  // properties 属性
  properties?: Record<string, Schema<Message>>;

  constructor(json: ISchema, parent?: Schema) {
    if (parent) {
      this.parent = parent;
      this.root = parent.root;
    } else {
      this.root = this;
    }
    return this.fromJSON(json);
  }

  fromJSON = (json: ISchema) => {
    if (!json) return this;
    if (Schema.isSchemaInstance(json)) return json;
    console.log("json----", json);
    each(reducePatches(json), (value, key) => {
      if (isFn(value) && !key.includes("x-")) return;
      if (key === "properties") {
        this.setProperties(value);
      } else if (key === "patternProperties") {
        // this.setPatternProperties(value);
      } else if (key === "additionalProperties") {
        // this.setAdditionalProperties(value);
      } else if (key === "items") {
        // this.setItems(value);
      } else if (key === "additionalItems") {
        // this.setAdditionalItems(value);
      } else if (key === "$ref") {
        // this.fromJSON(this.findDefinitions(value));
      } else {
        this[key] = value;
      }
    });
    return this;
  };

  addProperty = (key: SchemaKey, schema: ISchema<Message>) => {
    this.properties = this.properties || {};
    this.properties[key] = new Schema(schema, this);
    this.properties[key].name = key;
    return this.properties[key];
  };

  setProperties = (properties: SchemaProperties<Message>) => {
    for (const key in properties) {
      this.addProperty(key, properties[key]);
    }
    return this;
  };

  toFieldProps = (options?: ISchemaTransformerOptions): any => {
    return transformFieldProps(this, options);
  };

  static getOrderProperties = (
    schema: ISchema = {},
    propertiesName: keyof ISchema = "properties"
  ) => {
    const orderProperties = <{ schema: any; key: string }[]>[];
    const unorderProperties = <{ schema: any; key: string }[]>[];
    for (const key in schema[propertiesName]) {
      const item = schema[propertiesName][key];
      const index = item["x-index"];
      if (!isNaN(index)) {
        orderProperties[index] = { schema: item, key };
      } else {
        unorderProperties.push({ schema: item, key });
      }
    }
    return orderProperties.concat(unorderProperties).filter((item) => !!item);
  };

  static isSchemaInstance = (value: any): value is Schema => {
    return instOf(value, Schema);
  };
}
