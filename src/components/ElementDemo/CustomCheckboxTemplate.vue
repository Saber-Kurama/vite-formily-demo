<template>
  <FormProvider :form="form">
    <Field
      name="single"
      title="是否确认"
      :decorator="[FormItem]"
      :component="[Input]"
    >
      asdasd====asasd
    </Field>
    <!-- <ArrayField
      name="multiple"
      title="复选"
      :dataSource="[
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
      ]"
      :decorator="[FormItem]"
      :component="[Checkbox.Group, { optionType: 'button' }]"
    >
    </ArrayField> -->
    <!-- <Submit @submit="onSubmit">提交</Submit> -->
    <div @click="onSubmit">这是一个提交</div>
    <ElButton>element-plus的按钮</ElButton>
  </FormProvider>
</template>

<script lang="ts" setup>
import { createForm } from "../../../packages/core/index";
import { FormProvider, Field } from "../../../packages/vue/index";
import { ElButton } from "element-plus";
import { FormItem, Checkbox, Submit, Input } from "@formily/element-plus";

const form = createForm();

const onSubmit = (value: any) => {
  console.log(form);
};
</script>
