import { toRaw } from "vue";

export const getRawComponent = (props: any) => {
  const { component, decorator } = props;
  let newComponent: typeof props.component;
  let newDecorator: typeof props.component;
  if (Array.isArray(component)) {
    newComponent = [toRaw(component[0]), component[1]];
  }
  if (Array.isArray(decorator)) {
    newDecorator = [toRaw(decorator[0]), decorator[1]];
  }
  return { component: newComponent, decorator: newDecorator };
};
