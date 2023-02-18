import { VueComponent } from "@formily/vue";
import { defineComponent, h, markRaw } from "vue";

export function connect<T extends VueComponent>(target: T, ...args: any[]) {
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
