import { inject, ref, Ref } from "vue";
import { FormSymbol } from "../shared/context";

export const useForm = (): Ref<any> => {
  const form = inject(FormSymbol, ref());
  return form;
};
