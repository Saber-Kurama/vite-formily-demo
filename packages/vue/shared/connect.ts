import { isVoidField } from "@formily/core";
import { each, FormPath, isFn, isStr } from "@formily/shared";
import { VueComponent } from "@formily/vue";
import { defineComponent, h, markRaw } from "vue";
import { useField } from "../hooks/useField";

// 主要解决字段的映射 例如 Filed 的value 对应 modelValue
export function mapProps(...args: any[]) {
  const transform = (input: any, field: any) =>
    args.reduce((props, mapper) => {
      // 如果是函数
      if (isFn(mapper)) {
        // 执行函数 然后 覆盖
        props = Object.assign(props, mapper(props, field));
      } else {
        each(mapper, (to, extract) => {
          // 从 字段获取值
          const extractValue = FormPath.getIn(field, extract);
          const targetValue = isStr(to) ? to : extract;
          // 如果是 value 的话
          if (extract === "value") {
            if (to !== extract) {
              delete props["value"];
            }
          }
          // 更新 props 中值为 Field 的值
          FormPath.setIn(props, targetValue, extractValue);
        });
      }
      return props;
    }, input);

  return (target: any) => {
    return defineComponent({
      name: target.name ? `Connected${target.name}` : `ConnectedComponent`,
      setup(props, { slots, attrs }) {
        const fieldRef = useField();
        return () => {
          const newAttrs = fieldRef.value
            ? transform({ ...attrs } as any, fieldRef.value)
            : { ...attrs };
          return h(
            target,
            {
              attrs: newAttrs,
            },
            slots
          );
        };
      },
    });
  };
}

// 读模式的显示
export function mapReadPretty<T extends VueComponent, C extends VueComponent>(
  component: C,
  readPrettyProps?: Record<string, any>
) {
  return (target: T) => {
    return defineComponent({
      name: target.name ? `Read${target.name}` : `ReadComponent`,
      setup(props, { attrs, slots, listeners }: Record<string, any>) {
        const fieldRef = useField();
        return () => {
          const field = fieldRef.value;
          return h(
            field && !isVoidField(field) && field.pattern === "readPretty"
              ? component
              : target,
            {
              attrs: {
                ...readPrettyProps,
                ...attrs,
              },
              on: listeners,
            },
            slots
          );
        };
      },
    });
  };
}

// 高级组件
export function connect<T extends VueComponent>(target: T, ...args: any[]) {
  // 一层一层的封装
  const Component = args.reduce((target: any, mapper) => {
    return mapper(target);
  }, target);

  const functionComponent = defineComponent({
    name: target.name,
    setup(props, { attrs, slots }) {
      return () => {
        return h(Component, { props, attrs }, slots);
      };
    },
  });
  return markRaw(functionComponent) as T;
}
