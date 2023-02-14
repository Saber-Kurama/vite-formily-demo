import { h, defineComponent } from "vue";
import { formatVue3VNodeData } from "../utils/formatVNodeData";
import ReactiveField from "./ReactiveField";

export default defineComponent({
  name: "Field",
  props: {
    decorator: Array,
    component: Array,
  },
  setup(props: any, { slots }) {
    return () => {
      return h(
        ReactiveField as any,
        { fieldType: "Field", fieldProps: { ...props } },
        slots
      );
    };
  },
});
