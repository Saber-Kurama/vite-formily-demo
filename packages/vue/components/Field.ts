import { h, defineComponent } from "vue";
import { getRawComponent } from "../utils/getRawComponent";
import ReactiveField from "./ReactiveField";

export default defineComponent({
  name: "Field",
  props: {
    name: {},
    decorator: Array,
    component: Array,
  },
  setup(props: any, { slots }) {
    return () => {
      return h(
        ReactiveField as any,
        {
          fieldType: "Field",
          fieldProps: { ...props, ...getRawComponent(props) },
        },
        slots
      );
    };
  },
});
