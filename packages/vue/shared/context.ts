import { InjectionKey, Ref } from "vue";

export const FormSymbol: InjectionKey<Ref<any>> = Symbol("form");
export const FieldSymbol: InjectionKey<Ref<any>> = Symbol("field");
