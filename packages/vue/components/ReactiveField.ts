import { FormPath, isVoidField } from "@formily/core";
import { h, inject, provide, Ref, ref, shallowRef, watch } from "vue";
import { defineComponent } from "vue";
import { useField, useForm } from "../hooks";
import { useAttach } from "../hooks/useAttach";
import { FieldSymbol, SchemaOptionsSymbol } from "../shared/context";
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
    // 获取 表单 数据
    const formRef = useForm();
    // 获取 父字段  数据
    const parentRef = useField();
    const optionsRef = inject(SchemaOptionsSymbol, ref(null));
    let createField = () => {
      return formRef?.value?.[`create${props.fieldType}`]?.({
        ...props.fieldProps,
        basePath: props.fieldProps?.basePath ?? parentRef.value?.address,
      });
    };
    const fieldRef = shallowRef(createField()) as Ref<any>;
    watch(
      () => props.fieldProps,
      () => (fieldRef.value = createField())
    );
    useAttach(fieldRef);
    // 字段数据提供
    provide(FieldSymbol, fieldRef);
    return () => {
      // 指向了 Filed 模型数据
      const field = fieldRef.value;
      const options = optionsRef.value;
      // return h("div", formatVue3VNodeData({ class: "a1" }), slots);
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
        const component =
          FormPath.getIn(options?.components, field.componentType as string) ??
          field.componentType;
        console.log("component??", component, field);
        return h(
          component,
          {
            class: "xxxx",
            value: !isVoidField(field) ? field.value : undefined,
          },
          slots
        );
      };
      return renderDecorator([renderComponent()]);
    };
  },
});
