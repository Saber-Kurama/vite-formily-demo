import { h } from "vue";
import { defineComponent } from "vue";
import { useField, useForm } from "../hooks";
import { formatVue3VNodeData } from "../utils/formatVNodeData";

export default defineComponent({
  name: "ReactiveField",
  props: {
    fieldType: {
      type: String,
      default: "Field",
    },
    fieldProps: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props: any, { slots }) {
    const formRef = useForm();
    const parentRef = useField();
    let createField = () => {
      return formRef?.value?.[`create${props.fieldType}`]?.({
        ...props.fieldProps,
        basePath: props.fieldProps?.basePath ?? parentRef.value?.address,
      });
    };
    createField();
    const renderDecorator = (childNodes: any[]) => {
      //  if (!field.decoratorType) {
      //    return wrapFragment(childNodes);
      //  }
      return h(
        // props.fieldProps.decorator,
        "div",
        { class: "a123" },
        // {
        //   default: () => slots,
        // }
        childNodes
      );
    };

    const renderComponent = () => {
      console.log("props.fieldProps.component", props.fieldProps);
      return h(props.fieldProps.component[0], { class: "xxxx" }, slots);
    };
    return () => {
      // return h("div", formatVue3VNodeData({ class: "a1" }), slots);
      return renderDecorator([renderComponent()]);
    };
  },
});
