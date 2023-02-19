import { inject, Ref, ref } from "vue";
import { FieldSymbol } from "../shared/context";

export const useField = <T = any>(): Ref<T> => {
  return inject(FieldSymbol, ref()) as any;
};
