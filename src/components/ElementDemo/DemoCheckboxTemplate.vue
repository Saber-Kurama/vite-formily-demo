<template>
  <div>
    <FormProvider :form="form">
      <Field
        name="single"
        title="是否确认"
        :decorator="[FormItem]"
        :component="[Checkbox]"
      />
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
      <div @click="onSubmit">这是一个提交aaa</div>
    </FormProvider>
  </div>
</template>

<script lang="ts" setup>
import { createForm } from "@formily/core";
import { Field, FormProvider } from "@formily/vue";
import { FormItem, Checkbox, Submit } from "@formily/element-plus";

const form = createForm();

const onSubmit = (value: any) => {
  console.log(form);
};
</script>
