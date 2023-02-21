import { FragmentComponent } from "@formily/vue";
import { computed, h } from "vue";
import RecursionField from "./RecursionField";

export function createSchemaField(options: any) {
  const SchemaField = {
    name: "SchemaField",
    inheritAttrs: false,
    props: {
      schema: {},
    },
    setup(props, { slots }) {
      // const schemaRef = computed(() =>
      //   Schema.isSchemaInstance(props.schema)
      //     ? props.schema
      //     : new Schema({
      //         type: "object",
      //         ...props.schema,
      //       })
      // );
      const schemaRef = computed(() => {
        return props.schema;
      });
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
