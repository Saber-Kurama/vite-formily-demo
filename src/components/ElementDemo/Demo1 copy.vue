<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="onSubmit">提交</Submit>
  </FormProvider>
</template>

<script lang="ts" setup>
import { createForm } from "@formily/core";
import { createSchemaField, FormProvider } from "@formily/vue";
import { FormItem, Input, Submit, FormLayout } from "@formily/element-plus";

const schema = {
  type: "object",
  properties: {
    layout: {
      type: "void",
      "x-component": "FormLayout",
      "x-component-props": {
        layout: "inline",
        size: "small",
        labelCol: 6,
        wrapperCol: 10,
      },
      properties: {
        input: {
          type: "string",
          title: "输入框",
          "x-decorator": "FormItem",
          "x-component": "Input",
        },
        textarea: {
          type: "string",
          title: "文本框",
          "x-decorator": "FormItem",
          "x-component": "Input.TextArea",
        },
      },
    },
  },
};

const form = createForm();
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Input,
    FormLayout,
  },
});

const onSubmit = (value) => {
  console.log(value);
};
</script>
