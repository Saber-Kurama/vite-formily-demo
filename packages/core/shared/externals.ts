// externals 外部的
import { Form } from "../models";
const createForm = <T extends object = any>(options?: any) => {
  return new Form(options);
};

export { createForm };
