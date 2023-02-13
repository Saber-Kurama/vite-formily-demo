import { h } from "vue";
import { Fragment } from "vue";
import { defineComponent } from "vue";
import { formatVue3VNodeData } from "../utils/formatVNodeData";

export default defineComponent({
  name: "FormProvider",
  inheritAttrs: false,
  props: ["form"],
  setup(props: any, { slots }) {
    return () => {
      return h(Fragment, formatVue3VNodeData({}), slots.default?.());
    };
  },
});
