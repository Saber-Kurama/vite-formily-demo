// RecursionField; 递归

import { isFn, isValid } from "@formily/shared";
import { computed, h, inject, markRaw, shallowRef } from "vue";
import { Schema } from "../../json-schema";
import { useField } from "../hooks";
import { SchemaOptionsSymbol } from "../shared/context";
import Field from "./Field";

const resolveEmptySlot = (slots: Record<any, (...args: any[]) => any[]>) => {
  return Object.keys(slots).length
    ? h("div", { style: "display:contents;" }, slots)
    : undefined;
};

const RecursionField = {
  name: "RecursionField",
  inheritAttrs: false,
  props: {
    // schema 的对象数据
    schema: {
      required: true,
    },
    name: [String, Number],
    // 值渲染自己
    onlyRenderSelf: {
      type: Boolean,
      default: undefined,
    },
    // 属性
    mapProperties: {},
    // 过滤
    filterProperties: {},
  },
  setup(props) {
    const parentRef = useField();
    const optionsRef = inject(SchemaOptionsSymbol);
    const createSchema = (schemaProp: any) => markRaw(new Schema(schemaProp));
    const fieldSchemaRef = computed(() => createSchema(props.schema));
    console.log("schema", props.schema);
    console.log("schema", fieldSchemaRef.value);

    const getPropsFromSchema = (schema: Schema) =>
      schema?.toFieldProps?.({
        ...(optionsRef?.value || {}),
        // get scope() {
        //   return lazyMerge(optionsRef.value.scope, scopeRef.value);
        // },
      });
    const fieldPropsRef = shallowRef(getPropsFromSchema(fieldSchemaRef.value));
    // const fieldPropsRef = shallowRef(fieldSchemaRef.value);
    console.log("fieldPropsReffieldPropsRef", fieldPropsRef.value);

    const getBasePath = () => {
      // todo: 如果是只读 为啥不一样呢
      if (props.onlyRenderProperties) {
        return props.basePath ?? parentRef?.value?.address.concat(props.name);
      }
      return props.basePath ?? parentRef?.value?.address;
    };

    return () => {
      const basePath = getBasePath();
      const fieldProps = fieldPropsRef.value;
      // 按属性生成插槽
      const generateSlotsByProperties = (scoped = false) => {
        if (props.onlyRenderSelf) return {};
        const properties = Schema.getOrderProperties(fieldSchemaRef.value);
        console.log("properties", properties, fieldSchemaRef.value);
        if (!properties.length) return {};
        const renderMap: Record<string, ((field?: any) => unknown)[]> = {};
        const setRender = (key: string, value: (field?: any) => unknown) => {
          if (!renderMap[key]) {
            renderMap[key] = [];
          }
          renderMap[key].push(value);
        };

        properties.forEach(({ schema: item, key: name }, index) => {
          let schema: Schema = item;
          if (isFn(props.mapProperties)) {
            const mapped = props.mapProperties(item, name);
            if (mapped) {
              schema = mapped;
            }
          }
          if (isFn(props.filterProperties)) {
            if (props.filterProperties(schema, name) === false) {
              return null;
            }
          }
          setRender(schema["x-slot"] ?? "default", (field) => {
            return h(
              RecursionField,
              {
                key: `${index}-${name}`,
                schema,
                name,
                basePath: field?.address ?? basePath,
              },
              {}
            );
          });
        });
        console.log("renderMap", renderMap);
        const slots = {};
        Object.keys(renderMap).forEach((key) => {
          const renderFns = renderMap[key];
          slots[key] = scoped
            ? ({ field }) => renderFns.map((fn) => fn(field))
            : () => renderFns.map((fn) => fn());
        });
        return slots;
      };
      const render = () => {
        if (!isValid(props.name)) {
          return resolveEmptySlot(generateSlotsByProperties());
        }
        // return h("div", {}, props.schema.type);
        return h(
          Field,
          {
            attrs: {
              ...fieldProps,
              name: props.name,
              basePath: basePath,
            },
          },
          {}
        );
      };
      if (!fieldSchemaRef.value) return;
      return render();
    };
  },
} as unknown as any;

export default RecursionField;
