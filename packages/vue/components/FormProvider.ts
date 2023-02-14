import { h } from "vue";
import { toRef } from "vue";
import { Fragment } from "vue";
import { provide } from "vue";
import { defineComponent } from "vue";
import { useAttach } from "../hooks/useAttach";
import { FormSymbol } from "../shared/context";
import { formatVue3VNodeData } from "../utils/formatVNodeData";

export default defineComponent({
  name: "FormProvider",
  inheritAttrs: false,
  props: ["form"],
  setup(props: any, { slots }) {
    const formRef = useAttach(toRef(props, "form"));
    // 创建一个 form Model 的ref
    provide(FormSymbol, formRef);
    return () => {
      return h(Fragment, formatVue3VNodeData({}), slots.default?.());
    };
  },
});
