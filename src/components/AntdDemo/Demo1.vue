<template>
  <Form :form="form">
    <SchemaField :schema="schema" />
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script lang="ts">
import { createForm } from "@formily/core";
import { createSchemaField } from "@formily/vue";
import { Form, FormItem, Input, Submit, FormLayout } from "@formily/antdv-x3";

const schema = {
  type: "object",
  // "x-component": "FormLayout",
  // "x-component-props": {
  //   layout: "inline",
  //   labelCol: 6,
  //   wrapperCol: 10,
  // },
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
    layout1: {
      type: "void",
      "x-component": "FormLayout",
      "x-component-props": {
        // layout: "inline",
        size: "small",
        labelCol: 6,
        wrapperCol: 10,
      },
      properties: {
        input1: {
          type: "string",
          title: "输入框33",
          "x-decorator": "FormItem",
          "x-component": "Input",
        },
        textarea2: {
          type: "string",
          title: "文本框",
          "x-decorator": "FormItem",
          "x-component": "Input.TextArea",
        },
      },
    },
  },
  // properties: {
  //   input: {
  //     type: "string",
  //     title: "输入框",
  //     "x-decorator": "FormItem",
  //     "x-component": "Input",
  //   },
  //   textarea: {
  //     type: "string",
  //     title: "文本框",
  //     "x-decorator": "FormItem",
  //     "x-component": "Input.TextArea",
  //   },
  // },
};

const form = createForm();
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Input,
    FormLayout,
  },
});

export default {
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Form, SchemaField, Submit },
  data() {
    return {
      form,
      schema,
    };
  },
  methods: {
    onSubmit(value) {
      console.log(value);
    },
  },
};
</script>
