<template>
  <div>
    <FormProvider :form="form">
      <Field
        name="single"
        title="是否确认"
        :decorator="[FormItem]"
        :component="[Checkbox]"
      />

      <!-- <Field
        name="single"
        title="是否确认qqqq"
        :decorator="[FormItem]"
        :component="[Checkbox]"
      /> -->

      <Field
        name="size1"
        title="数字"
        :decorator="[FormItem]"
        :component="[InputNumber]"
      />
      <Field
        name="size2"
        title="数字2"
        :decorator="[FormItem]"
        :component="[SaberInputNumber]"
      />
      <Field
        name="size3"
        title="数字3"
        :decorator="[FormItem]"
        :component="[BInputNumber]"
      />

      <div @click="onSubmit">这是一个提交aaaxxx</div>
    </FormProvider>
  </div>
</template>

<script lang="ts" setup>
import { createForm } from "@formily/core";
import {
  Field,
  FormProvider,
  connect,
  mapReadPretty,
  mapProps,
} from "@formily/vue";
import {
  FormItem,
  Checkbox,
  Submit,
  InputNumber,
  PreviewText,
} from "@formily/antdv-x3";
import { InputNumber as AInputNumber } from "@arco-design/web-vue";
import { InputNumber as BInputNumber } from "ant-design-vue";
import { defineComponent, h } from "vue";

const __CheckBox = defineComponent({
  name: "FCheckBox",
  inheritAttrs: false,
  props: ["onChange", "checked"],
  setup(props, { attrs, slots }) {
    const newAttrs = {
      ...attrs,
    };
    delete newAttrs.value;

    return () => {
      return h(AInputNumber, { ...props, ...newAttrs }, slots);
    };
  },
});

const SaberInputNumber = connect(
  AInputNumber,
  mapProps({
    value: "modelValue",
  })
);

const form = createForm();

const onSubmit = (value: any) => {
  console.log(form);
};

setTimeout(() => {
  form.setValuesIn("size1", 10);
  form.setValuesIn("size2", 10);
  form.setValuesIn("size3", 10);
}, 3000);
</script>
