<template>
  <div>
    <FormProvider :form="form">
      <SchemaField :schema="schema">
        <div>asdasd</div>
        <div>这是另外一个测试</div></SchemaField
      >
    </FormProvider>
  </div>
</template>

<script lang="ts" setup>
import { createForm } from "../../../packages/core/index";
import {
  FormProvider,
  Field,
  createSchemaField,
} from "../../../packages/vue/index";
import { FormItem, Input } from "@arco-design/web-vue";

const schema = {
  type: "object",
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
      "x-component": "Input",
    },
  },
};

const form = createForm();
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Input,
  },
});
</script>
