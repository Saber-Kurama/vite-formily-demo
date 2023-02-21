import { lazyMerge } from "@formily/shared";
import { FragmentComponent } from "@formily/vue";
import { computed, h, provide } from "vue";
import { Schema } from "../../json-schema";
import {
  SchemaExpressionScopeSymbol,
  SchemaMarkupSymbol,
  SchemaOptionsSymbol,
} from "../shared/context";
import RecursionField from "./RecursionField";

export function createSchemaField(options: any) {
  // todo: 是否应该 分开 json 和 markup
  const SchemaField = {
    name: "SchemaField",
    inheritAttrs: false,
    props: {
      schema: {},
      // 作用域
      scope: {},
      components: {},
      name: [String, Number],
    },
    setup(props, { slots }) {
      const schemaRef = computed(() =>
        Schema.isSchemaInstance(props.schema)
          ? props.schema
          : new Schema({
              type: "object",
              ...props.schema,
            })
      );
      // 作用域
      const scopeRef = computed(() => lazyMerge(options.scope, props.scope));

      const optionsRef = computed(() => ({
        ...options,
        components: {
          ...options.components,
          ...props.components,
        },
      }));
      // Scema 对象实例
      provide(SchemaMarkupSymbol, schemaRef);
      // 整个 Scema 的 options 配置 对象
      provide(SchemaOptionsSymbol, optionsRef);
      provide(SchemaExpressionScopeSymbol, scopeRef);
      return () => {
        return h(
          FragmentComponent,
          {},
          {
            default: () => {
              console.log("sabner------", schemaRef.value, props);
              const children: any[] = [];
              // todo: 模板怎么展示
              if (slots.default) {
                children.push(
                  h(
                    "template",
                    {},
                    {
                      default: () => slots.default(),
                    }
                  )
                );
              }
              children.push(
                h(
                  RecursionField,
                  {
                    ...props,
                    schema: schemaRef.value,
                  },
                  {}
                )
              );
              return children;
            },
          }
        );
      };
    },
  };

  return {
    SchemaField,
  } as unknown as any;
}
